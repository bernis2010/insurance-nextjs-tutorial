'use client';

import { useMemo, useState } from 'react';
import { FormErrors, FormFiles, FormSchema, FormValues } from '@/types/forms';
import { validateSchema } from '@/utils/schemaValidator';

export function useSchemaValidation(schema: FormSchema | null) {
  const [errors, setErrors] = useState<FormErrors>({});

  const errorCount = useMemo(() => Object.keys(errors).length, [errors]);

  function validate(values: FormValues, files: FormFiles) {
    if (!schema) {
      setErrors({});
      return {};
    }

    const nextErrors = validateSchema(schema, values, files);
    setErrors(nextErrors);
    return nextErrors;
  }

  return { errors, setErrors, errorCount, validate };
}
