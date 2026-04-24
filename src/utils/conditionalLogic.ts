import { FormField, FormValues } from '@/types/forms';

export function shouldShowField(field: FormField, values: FormValues): boolean {
  if (!field.showIf) return true;
  return values[field.showIf.field] === String(field.showIf.equals);
}
