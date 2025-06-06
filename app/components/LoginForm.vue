<template>
  <v-card
    class="mx-auto"
    max-width="400"
    elevation="12"
    rounded="lg"
  >
    <v-card-title class="text-center py-6">
      <v-icon
        class="mb-2"
        color="primary"
        size="48"
        icon="mdi-coffee"
      />
      <div class="text-h4 font-weight-bold">Brewson</div>
      <div class="text-subtitle-1 text-medium-emphasis">Welcome back</div>
    </v-card-title>

    <v-card-text class="px-8 pb-8">
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="credentials.usernameOrEmail"
          :error-messages="errors.usernameOrEmail"
          label="Username or Email"
          placeholder="Enter your username or email"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          class="mb-4"
          :disabled="loading"
          @input="clearError('usernameOrEmail')"
        />

        <v-text-field
          v-model="credentials.password"
          :error-messages="errors.password"
          label="Password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          variant="outlined"
          class="mb-6"
          :disabled="loading"
          @click:append-inner="showPassword = !showPassword"
          @input="clearError('password')"
        />

        <v-alert
          v-if="loginError"
          type="error"
          variant="tonal"
          class="mb-4"
          closable
          @click:close="loginError = ''"
        >
          {{ loginError }}
        </v-alert> <v-btn
          type="submit"
          color="primary"
          size="large"
          block
          :loading="loading"
          class="mb-4"
        >
          Sign In
        </v-btn>
        <div class="d-flex justify-center">
          <TestAccountsMenu />
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script
  setup
  lang="ts"
>
interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

const { login } = useAuth();

const credentials = ref<LoginCredentials>({
  usernameOrEmail: '',
  password: ''
});

const errors = ref<Partial<Record<keyof LoginCredentials, string>>>({});
const loginError = ref('');
const loading = ref(false);
const showPassword = ref(false);

const clearError = (field: keyof LoginCredentials) => {
  errors.value[field] = '';
  loginError.value = '';
};

const validateForm = (): boolean => {
  errors.value = {};

  if (!credentials.value.usernameOrEmail.trim()) {
    errors.value.usernameOrEmail = 'Username or email is required';
  }

  if (!credentials.value.password.trim()) {
    errors.value.password = 'Password is required';
  }

  return Object.keys(errors.value).length === 0;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  loading.value = true;
  loginError.value = '';

  try {
    const result = await login(credentials.value);

    if (result.success) {
      // Redirect to home page
      await navigateTo('/');
    } else {
      loginError.value = result.error || 'Login failed';
    }
  } catch {
    loginError.value = 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Login form specific styles */
</style>
