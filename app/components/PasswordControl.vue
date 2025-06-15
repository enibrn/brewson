<template>
  <v-text-field
    :model-value="control.data"
    :label="control.label"
    :placeholder="control.uischema.options?.placeholder as string"
    :prepend-inner-icon="control.uischema.options?.['prepend-inner-icon'] as string"
    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    :variant="(control.uischema.options?.variant as 'outlined') || 'outlined'"
    :class="control.uischema.options?.class as string"
    :readonly="!control.enabled"
    :error-messages="control.errors"
    @update:model-value="handleChange"
    @click:append-inner="showPassword = !showPassword"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Interfaccia basata sulle props reali di JSONForms
interface JsonFormsControl {
  data: string;
  handleChange: (path: string, value: unknown) => void;
  path: string;
  enabled: boolean;
  errors: string;
  label: string;
  description?: string;
  uischema: {
    type: string;
    scope?: string;
    options?: Record<string, unknown>;
  };
  schema: {
    type: string;
    format?: string;
    [key: string]: unknown;
  };
}

interface Props {
  control: JsonFormsControl;
}

const props = defineProps<Props>();

const showPassword = ref(false);

const handleChange = (value: string) => {
  props.control.handleChange(props.control.path, value);
};
</script>
