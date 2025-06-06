<template>
  <v-menu
    v-model="showMenu"
    location="top"
    :close-on-content-click="false"
    offset="10"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-information-outline"
        variant="text"
        size="small"
        color="info"
        @mouseenter="handleMenuMouseEnter"
        @mouseleave="handleMenuMouseLeave"
      />
    </template>
    <v-card
      max-width="320"
      class="pa-3 menu-content"
      @mouseenter="handleMenuContentMouseEnter"
      @mouseleave="handleMenuContentMouseLeave"
    >
      <div class="text-subtitle-2 mb-2 font-weight-bold">
        <v-icon
          class="mr-1"
          size="16"
        >mdi-account-multiple</v-icon>
        Test Accounts
      </div>
      <div class="text-caption">
        <div class="mb-2">
          <strong>Admin:</strong><br>
          Username: <code>admin</code><br>
          Email: <code>admin@brewson.com</code><br>
          Password: <code>admin123</code>
        </div>
        <div>
          <strong>User:</strong><br>
          Username: <code>user</code><br>
          Email: <code>user@brewson.com</code><br>
          Password: <code>user123</code>
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script
  setup
  lang="ts"
>
const showMenu = ref(false);

// Menu management functions
let hideMenuTimeout: ReturnType<typeof setTimeout> | null = null;

const clearHideTimeout = () => {
  if (hideMenuTimeout) {
    clearTimeout(hideMenuTimeout);
    hideMenuTimeout = null;
  }
};

const handleMenuMouseEnter = () => {
  clearHideTimeout();
  showMenu.value = true;
};

const handleMenuMouseLeave = () => {
  // Longer delay to allow moving to menu content
  hideMenuTimeout = setTimeout(() => {
    showMenu.value = false;
  }, 300);
};

const handleMenuContentMouseEnter = () => {
  clearHideTimeout();
  showMenu.value = true;
};

const handleMenuContentMouseLeave = () => {
  showMenu.value = false;
};

// Cleanup timeout on component unmount
onUnmounted(() => {
  clearHideTimeout();
});
</script>

<style scoped>
.menu-content {
  user-select: text;
  cursor: text;
}

.menu-content code {
  user-select: text;
  cursor: text;
  font-family: 'Courier New', monospace;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
}
</style>
