import PasswordControl from '~/components/PasswordControl.vue';
import { rankWith, isStringControl, formatIs } from '@jsonforms/core';
import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core';

export const passwordControlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: PasswordControl,
  tester: rankWith(10, isStringControl)
};

// Tester specifico per password format
export const passwordFormatTester = rankWith(
  10,
  (uischema, schema, context) => {
    return isStringControl(uischema, schema, context) && formatIs('password')(uischema, schema, context);
  }
);

export const passwordControlRendererWithFormat: JsonFormsRendererRegistryEntry = {
  renderer: PasswordControl,
  tester: passwordFormatTester
};
