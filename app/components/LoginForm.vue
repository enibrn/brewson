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
    </v-card-title>    <v-card-text class="px-8 pb-8">
      <!-- JSONForms Integration -->
      <JsonForms
        :data="formData"
        :schema="conditionalSchema"
        :uischema="uischema"
        :readonly="loading"
        :renderers="renderers"
        :additional-errors="externalErrors"
        @change="handleFormChange"
      />

      <!-- Generic Backend Errors Alert -->
      <v-alert
        v-if="genericError"
        type="error"
        variant="tonal"
        class="mb-4"
        closable
        @click:close="genericError = ''"
      >
        {{ genericError }}
      </v-alert>

      <v-btn
        color="primary"
        size="large"
        block
        :loading="loading"
        class="mb-3"
        @click="handleLogin"
      >
        Sign In
      </v-btn>

      <v-btn
        color="secondary"
        size="large"
        block
        :loading="loading"
        class="mb-4"
        @click="handleGuestLogin"
      >
        <v-icon left>mdi-account-question</v-icon>
        Continue as Guest
      </v-btn>
      
      <div class="d-flex justify-center">
        <TestAccountsMenu />
      </div>
    </v-card-text>
  </v-card>
</template>

<script
  setup
  lang="ts"
>
import { markRaw, computed } from 'vue';
import { extendedVuetifyRenderers } from '@jsonforms/vue-vuetify';

interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

interface JsonFormsChangeEvent {
  data: LoginCredentials;
  errors?: unknown[];
}

interface ErrorObject {
  instancePath: string;
  schemaPath: string;
  keyword: string;
  params: Record<string, unknown>;
  message: string;
}

const { login, loginAsGuest } = useAuth();

// JSONForms Configuration
const renderers = markRaw(extendedVuetifyRenderers);

// Form Data
const formData = ref<LoginCredentials>({
  usernameOrEmail: '',
  password: ''
});

// State Management
const loading = ref(false);
const genericError = ref('');
const hasSubmitted = ref(false);

// Phase 2: External validation errors for individual fields
const externalErrors = ref<ErrorObject[]>([]);

// JSON Schema with conditional validation
const conditionalSchema = computed(() => {
  const baseProperties = {
    usernameOrEmail: {
      type: 'string',
      title: 'Username or Email',
      description: 'Enter your username or email'
    },
    password: {
      type: 'string',
      title: 'Password',
      format: 'password', // Questo attiva il PasswordControlRenderer
      description: 'Enter your password'
    }
  };

  if (hasSubmitted.value) {
    // Dopo il primo submit, aggiungi validazioni
    return {
      type: 'object',
      properties: {
        usernameOrEmail: {
          ...baseProperties.usernameOrEmail,
          minLength: 4
        },
        password: {
          ...baseProperties.password,
          minLength: 8
        }
      },
      required: ['usernameOrEmail', 'password']
    };
  }

  // Prima del submit, nessuna validazione
  return {
    type: 'object',
    properties: baseProperties
  };
});

// UI Schema 
const uischema = ref({
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/usernameOrEmail',
      options: {
        variant: 'outlined',
        placeholder: 'Enter your username or email',
        'prepend-inner-icon': 'mdi-account',
        class: 'mb-4'
      }
    },
    {
      type: 'Control',
      scope: '#/properties/password',
      options: {
        variant: 'outlined',
        placeholder: 'Enter your password',
        'prepend-inner-icon': 'mdi-lock',
        class: 'mb-6'
      }
    }
  ]
});

// Form change handler
const handleFormChange = (event: JsonFormsChangeEvent) => {
  formData.value = event.data;
  // Clear external errors when user types
  if (externalErrors.value.length > 0) {
    externalErrors.value = [];
  }
  // Clear generic error when user types
  if (genericError.value) {
    genericError.value = '';
  }
};

// Simulate backend field validation
const simulateBackendFieldValidation = async (credentials: LoginCredentials): Promise<ErrorObject[]> => {
  const errors: ErrorObject[] = [];
  
  // Simulate user not found (Phase 2)
  if (credentials.usernameOrEmail === 'notfound@test.com' || credentials.usernameOrEmail === 'notfound') {
    errors.push({
      instancePath: '/usernameOrEmail',
      schemaPath: '#/properties/usernameOrEmail',
      keyword: 'backend',
      params: {},
      message: 'User not found'
    });
  }
  
  // Simulate wrong password (Phase 2)
  if (credentials.password === 'wrongpass' && credentials.usernameOrEmail !== 'notfound@test.com') {
    errors.push({
      instancePath: '/password',
      schemaPath: '#/properties/password',
      keyword: 'backend',
      params: {},
      message: 'Password is incorrect'
    });
  }
  
  return errors;
};

// Phase 3: Generic backend error simulation (30% chance)
const simulateGenericBackendError = (): string | null => {
  if (Math.random() < 0.3) {
    return 'Ops something went wrong code:123';
  }
  return null;
};

const handleLogin = async () => {
  // Attiva le validazioni dopo il primo submit
  hasSubmitted.value = true;
  
  // Clear previous errors
  externalErrors.value = [];
  genericError.value = '';
  
  loading.value = true;
  
  try {
    // Phase 2: Backend field validation
    const fieldErrors = await simulateBackendFieldValidation(formData.value);
    
    if (fieldErrors.length > 0) {
      externalErrors.value = fieldErrors;
      loading.value = false;
      return;
    }
    
    // Phase 3: Generic backend error simulation
    const genericErr = simulateGenericBackendError();
    if (genericErr) {
      genericError.value = genericErr;
      loading.value = false;
      return;
    }
    
    // Proceed with actual login
    const result = await login(formData.value);
    
    if (result.success) {
      await navigateTo('/');
    } else {
      genericError.value = result.error || 'Login failed';
    }  } catch {
    genericError.value = 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};

const handleGuestLogin = async () => {
  loading.value = true;
  genericError.value = '';
  
  try {
    const result = await loginAsGuest();
    
    if (result.success) {
      await navigateTo('/');
    } else {
      genericError.value = result.error || 'Guest login failed';
    }
  } catch {
    genericError.value = 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Login form specific styles */
</style>
