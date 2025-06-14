<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      elevate-on-scroll
    >
      <v-app-bar-title>
        <v-icon class="mr-2">mdi-coffee</v-icon>
        Brewson
      </v-app-bar-title>

      <v-spacer />

      <template v-if="user">
        <v-chip
          class="mr-4"
          color="black"
          text-color="primary"
          variant="outlined"
        >
          <v-icon
            start
            icon="mdi-account"
          />
          {{ user.name }}
        </v-chip>

        <v-btn
          icon="mdi-logout"
          variant="text"
          @click="logout"
        />
      </template>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script
  setup
  lang="ts"
>
const { user, logout } = useAuth();
</script>
