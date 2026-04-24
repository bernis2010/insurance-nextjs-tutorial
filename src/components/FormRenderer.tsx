'use client';

import { FormErrors, FormFiles, FormPart, FormValues } from '@/types/forms';
import PartRenderer from './PartRenderer';

export default function FormRenderer({
  part,
  values,
  files,
  errors,
  onValueChange,
  onFileChange
}: {
  part: FormPart;
  values: FormValues;
  files: FormFiles;
  errors: FormErrors;
  onValueChange: (name: string, value: string) => void;
  onFileChange: (name: string, files: FileList | null) => void;
}) {
  return (
    <PartRenderer
      part={part}
      values={values}
      files={files}
      errors={errors}
      onValueChange={onValueChange}
      onFileChange={onFileChange}
    />
  );
}
