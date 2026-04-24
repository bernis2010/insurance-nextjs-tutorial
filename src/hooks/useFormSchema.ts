'use client';

import { useEffect, useState } from 'react';
import { FormSchema } from '@/types/forms';
import { loadSchema } from '@/utils/schemaLoader';

export function useFormSchema(formId: string) {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function run() {
      setLoading(true);
      const nextSchema = await loadSchema(formId);
      if (active) {
        setSchema(nextSchema);
        setLoading(false);
      }
    }

    run();

    return () => {
      active = false;
    };
  }, [formId]);

  return { schema, loading };
}
