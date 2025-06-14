<template>
  <v-app>
    <v-main class="auth-background">
      <slot />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<style scoped>
.auth-background {
  background: linear-gradient(135deg, #E65100 0%, #FFB74D 100%);
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>