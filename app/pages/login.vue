<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
      class="fill-height"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xl="3"
      >
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script
  setup
  lang="ts"
>
// Set page meta
definePageMeta({
  layout: 'auth',
  auth: false // This page doesn't require authentication
});

// Redirect if already logged in
const { isLoggedIn } = useAuth();

if (isLoggedIn.value) {
  await navigateTo('/');
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
