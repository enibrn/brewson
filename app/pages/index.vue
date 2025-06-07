<script
  lang="ts"
  setup
>
// Apply auth middleware to protect this page
definePageMeta({
  middleware: 'auth'
});

const { user } = useAuth();
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          class="pa-6 mb-6"
          elevation="4"
          rounded="lg"
        >
          <v-card-title class="text-center pb-4">
            <v-icon
              class="mb-2"
              color="primary"
              size="64"
              icon="mdi-coffee"
            />
            <div class="text-h3 font-weight-bold">Welcome to Brewson</div>
            <div class="text-h6 text-medium-emphasis">
              Hello, {{ user?.name }}! 👋
            </div>
          </v-card-title>

          <v-card-text class="text-center">
            <p class="text-h6 mb-4">
              You are successfully logged in to the Brewson application.
            </p>
            <p class="text-body-1 text-medium-emphasis">
              This is a protected page that requires authentication to access.
              Your login session is managed securely and will persist across browser sessions.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
