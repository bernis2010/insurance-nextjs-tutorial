'use client';

import { FormErrors, FormField, FormFiles, FormValues } from '@/types/forms';

export default function FieldRenderer({
  field,
  values,
  files,
  errors,
  onValueChange,
  onFileChange
}: {
  field: FormField;
  values: FormValues;
  files: FormFiles;
  errors: FormErrors;
  onValueChange: (name: string, value: string) => void;
  onFileChange: (name: string, files: FileList | null) => void;
}) {
  const error = errors[field.name];

  return (
    <div className="field">
      <label htmlFor={field.name}>
        {field.label} {field.required ? '*' : ''}
      </label>
      {field.description ? <div className="muted" style={{ marginBottom: 6 }}>{field.description}</div> : null}

      {field.type === 'text' || field.type === 'date' || field.type === 'number' || field.type === 'email' ? (
        <input
          id={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={values[field.name] ?? ''}
          onChange={(e) => onValueChange(field.name, e.target.value)}
        />
      ) : null}

      {field.type === 'textarea' ? (
        <textarea
          id={field.name}
          placeholder={field.placeholder}
          value={values[field.name] ?? ''}
          onChange={(e) => onValueChange(field.name, e.target.value)}
        />
      ) : null}

      {field.type === 'radio' ? (
        <div className="radioGroup">
          {(field.options ?? []).map((option) => (
            <label key={option} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <input
                type="radio"
                name={field.name}
                checked={(values[field.name] ?? '') === option}
                onChange={() => onValueChange(field.name, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ) : null}

      {field.type === 'select' ? (
        <select id={field.name} value={values[field.name] ?? ''} onChange={(e) => onValueChange(field.name, e.target.value)}>
          <option value="">Select an option</option>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : null}

      {field.type === 'file' ? (
        <>
          <input
            id={field.name}
            type="file"
            accept={field.accept}
            multiple={field.multiple}
            onChange={(e) => onFileChange(field.name, e.target.files)}
          />
          {(files[field.name] ?? []).length > 0 ? (
            <ul className="fileList">
              {(files[field.name] ?? []).map((file) => (
                <li key={`${field.name}-${file.name}-${file.size}`}>{file.name}</li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}

      {error ? <div className="errorText">{error}</div> : null}
    </div>
  );
}
