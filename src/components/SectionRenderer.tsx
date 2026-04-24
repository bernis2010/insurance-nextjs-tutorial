'use client';

import { FormErrors, FormFiles, FormSection, FormValues } from '@/types/forms';
import { shouldShowField } from '@/utils/conditionalLogic';
import FieldRenderer from './FieldRenderer';

export default function SectionRenderer({
  section,
  values,
  files,
  errors,
  onValueChange,
  onFileChange
}: {
  section: FormSection;
  values: FormValues;
  files: FormFiles;
  errors: FormErrors;
  onValueChange: (name: string, value: string) => void;
  onFileChange: (name: string, files: FileList | null) => void;
}) {
  const visibleFields = section.fields.filter((field) => shouldShowField(field, values));
  if (visibleFields.length === 0) return null;

  return (
    <section className="section">
      <h3>{section.title}</h3>
      {section.description ? <p className="muted">{section.description}</p> : null}
      {visibleFields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          values={values}
          files={files}
          errors={errors}
          onValueChange={onValueChange}
          onFileChange={onFileChange}
        />
      ))}
    </section>
  );
}
