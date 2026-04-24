'use client';

import { FormErrors, FormFiles, FormPart, FormValues } from '@/types/forms';
import SectionRenderer from './SectionRenderer';

export default function PartRenderer({
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
    <div>
      <h2>{part.title}</h2>
      {part.description ? <p className="muted">{part.description}</p> : null}
      {part.sections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
          values={values}
          files={files}
          errors={errors}
          onValueChange={onValueChange}
          onFileChange={onFileChange}
        />
      ))}
    </div>
  );
}
