<script setup>
// Initialize authentication state
const { initAuth } = useAuth();

onMounted(() => {
  initAuth();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
