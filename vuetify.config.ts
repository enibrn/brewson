import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'dark',
    themes: {      dark: {
        colors: {
          primary: '#FFB74D',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#FFB74D',
          success: '#4CAF50',
          warning: '#FFC107',
        }
      }
    }
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none;'
    }
  }
})
