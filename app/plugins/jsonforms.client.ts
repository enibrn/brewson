import { JsonForms } from '@jsonforms/vue';
import { extendedVuetifyRenderers } from '@jsonforms/vue-vuetify';
import '@jsonforms/vue-vuetify/lib/jsonforms-vue-vuetify.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('JsonForms', JsonForms);
  
  // Make renderers available globally
  nuxtApp.provide('jsonformsRenderers', extendedVuetifyRenderers);
});
