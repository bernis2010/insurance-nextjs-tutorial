import autoClaim from '../../schemas/forms/auto-claim.schema.json';
import homeClaim from '../../schemas/forms/home-claim.schema.json';
import { FormSchema } from '@/types/forms';

const registry: Record<string, FormSchema> = {
  auto: autoClaim as FormSchema,
  home: homeClaim as FormSchema
};

export function getAvailableForms(): string[] {
  return Object.keys(registry);
}

export function getSchemaById(formId: string): FormSchema | null {
  return registry[formId] ?? null;
}
