import { getSchemaById } from './schemaRegistry';
import { FormSchema } from '@/types/forms';

export async function loadSchema(formId: string): Promise<FormSchema | null> {
  return getSchemaById(formId);
}
