export type PrimitiveFieldType = 'text' | 'date' | 'number' | 'email' | 'textarea' | 'radio' | 'select' | 'file';

export type ConditionalRule = {
  field: string;
  equals: string | number | boolean;
};

export type FormField = {
  name: string;
  label: string;
  type: PrimitiveFieldType;
  required?: boolean;
  placeholder?: string;
  accept?: string;
  options?: string[];
  description?: string;
  showIf?: ConditionalRule;
  multiple?: boolean;
};

export type FormSection = {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
};

export type FormPart = {
  id: string;
  title: string;
  description?: string;
  sections: FormSection[];
};

export type FormSchema = {
  formId: string;
  title: string;
  description?: string;
  submitLabel?: string;
  parts: FormPart[];
};

export type FormValues = Record<string, string>;
export type FormFiles = Record<string, File[]>;
export type FormErrors = Record<string, string>;

export type SubmissionResult = {
  ok: boolean;
  message: string;
  formId?: string;
  claimReference?: string;
  fileSummary?: Array<{ field: string; files: string[] }>;
  payload?: unknown;
};
