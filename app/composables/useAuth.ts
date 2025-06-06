// composables/useAuth.ts
interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

// Hardcoded test users
const testUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@brewson.com',
    name: 'Administrator'
  },
  {
    id: 2,
    username: 'user',
    email: 'user@brewson.com',
    name: 'Test User'
  }
];

const testPasswords: Record<number, string> = {
  1: 'admin123',
  2: 'user123'
};

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null);
  const isLoggedIn = computed(() => !!user.value);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      // Find user by username or email
      const foundUser = testUsers.find(u => 
        u.username === credentials.usernameOrEmail || 
        u.email === credentials.usernameOrEmail
      );

      if (!foundUser) {
        return { success: false, error: 'User not found' };
      }

      // Check password
      if (testPasswords[foundUser.id] !== credentials.password) {
        return { success: false, error: 'Invalid password' };
      }

      // Set user in state
      user.value = foundUser;

      // Store in localStorage for persistence
      if (import.meta.client) {
        localStorage.setItem('auth.user', JSON.stringify(foundUser));
      }

      return { success: true };
    } catch {
      return { success: false, error: 'Login failed' };
    }
  };  const logout = () => {
    user.value = null;
    if (import.meta.client) {
      localStorage.removeItem('auth.user');
    }
    navigateTo('/login');
  };

  const initAuth = () => {
    // Initialize auth state from localStorage on client side
    if (import.meta.client) {
      const storedUser = localStorage.getItem('auth.user');
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser);
        } catch {
          // Clear invalid stored data
          localStorage.removeItem('auth.user');
        }
      }
    }
  };

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    logout,
    initAuth
  };
};
