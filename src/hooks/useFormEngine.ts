'use client';

import { useMemo, useState } from 'react';
import { FormErrors, FormFiles, FormSchema, FormValues, SubmissionResult } from '@/types/forms';
import { shouldShowField } from '@/utils/conditionalLogic';

export function useFormEngine(schema: FormSchema | null, errors: FormErrors, validate: (values: FormValues, files: FormFiles) => FormErrors) {
  const [values, setValues] = useState<FormValues>({});
  const [files, setFiles] = useState<FormFiles>({});
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const visibleFieldCount = useMemo(() => {
    if (!schema) return 0;
    return schema.parts.flatMap((part) => part.sections).flatMap((section) => section.fields)
      .filter((field) => shouldShowField(field, values)).length;
  }, [schema, values]);

  function updateValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function updateFiles(name: string, list: FileList | null) {
    const nextFiles = list ? Array.from(list) : [];
    setFiles((prev) => ({ ...prev, [name]: nextFiles }));
  }

  async function submit(formId: string) {
    if (!schema) return;

    const nextErrors = validate(values, files);
    if (Object.keys(nextErrors).length > 0) {
      setSubmissionResult({ ok: false, message: 'Please fix the validation errors before submitting.' });
      return;
    }

    setSubmitting(true);
    setSubmissionResult(null);

    try {
      const formData = new FormData();
      formData.append('formId', formId);
      formData.append('payload', JSON.stringify({ values, notes }));

      Object.entries(files).forEach(([fieldName, fieldFiles]) => {
        fieldFiles.forEach((file) => {
          formData.append(fieldName, file);
        });
      });

      const response = await fetch('/api/claims', {
        method: 'POST',
        body: formData
      });

      const data = (await response.json()) as SubmissionResult;
      setSubmissionResult(data);
    } catch (error) {
      setSubmissionResult({
        ok: false,
        message: error instanceof Error ? error.message : 'Unknown submission error.'
      });
    } finally {
      setSubmitting(false);
    }
  }

  return {
    values,
    files,
    notes,
    submitting,
    submissionResult,
    visibleFieldCount,
    updateValue,
    updateFiles,
    setNotes,
    submit
  };
}
