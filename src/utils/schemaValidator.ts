import { FormErrors, FormField, FormFiles, FormSchema, FormValues } from '@/types/forms';
import { shouldShowField } from './conditionalLogic';

function validateField(field: FormField, values: FormValues, files: FormFiles): string | null {
  const textValue = values[field.name]?.trim() ?? '';
  const fileValue = files[field.name] ?? [];

  if (field.required) {
    if (field.type === 'file' && fileValue.length === 0) {
      return `${field.label} is required.`;
    }

    if (field.type !== 'file' && textValue.length === 0) {
      return `${field.label} is required.`;
    }
  }

  if (field.type === 'email' && textValue) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(textValue)) {
      return `Enter a valid email for ${field.label}.`;
    }
  }

  return null;
}

export function validateSchema(schema: FormSchema, values: FormValues, files: FormFiles): FormErrors {
  const errors: FormErrors = {};

  schema.parts.forEach((part) => {
    part.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (!shouldShowField(field, values)) return;
        const error = validateField(field, values, files);
        if (error) {
          errors[field.name] = error;
        }
      });
    });
  });

  return errors;
}
