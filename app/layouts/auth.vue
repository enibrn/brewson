<template>
  <v-app>
    <v-main class="auth-background">
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped>
.auth-background {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>