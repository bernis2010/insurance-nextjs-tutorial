'use client';

import Link from 'next/link';
import { useFormEngine } from '@/hooks/useFormEngine';
import { useFormNavigation } from '@/hooks/useFormNavigation';
import { useFormSchema } from '@/hooks/useFormSchema';
import { useSchemaValidation } from '@/hooks/useSchemaValidation';
import ActionButtons from './ActionButtons';
import ErrorSidebar from './ErrorSidebar';
import FormRenderer from './FormRenderer';
import FormTreeNav from './FormTreeNav';
import NotesSection from './NotesSection';

export default function FormContainer({ formId }: { formId: string }) {
  const { schema, loading } = useFormSchema(formId);
  const { errors, errorCount, validate } = useSchemaValidation(schema);
  const navigation = useFormNavigation(schema);
  const engine = useFormEngine(schema, errors, validate);

  if (loading) {
    return <div className="container"><div className="card" style={{ padding: 24 }}>Loading form…</div></div>;
  }

  if (!schema || !navigation.currentPart) {
    return (
      <div className="container">
        <div className="card" style={{ padding: 24 }}>
          <h1>Form not found</h1>
          <p className="muted">The requested claim form does not exist in the schema registry.</p>
          <Link href="/">Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="headerRow">
        <div>
          <Link href="/" className="muted">← Back to forms</Link>
          <h1>{schema.title}</h1>
          <p className="muted">{schema.description}</p>
        </div>
        <div>
          <div className="badge">Visible fields: {engine.visibleFieldCount}</div>
          <div className="muted" style={{ marginTop: 8 }}>Validation errors: {errorCount}</div>
        </div>
      </div>

      <div className="grid">
        <FormTreeNav
          parts={navigation.parts}
          currentPartIndex={navigation.currentPartIndex}
          onSelect={navigation.goToPart}
        />

        <main className="card content">
          <FormRenderer
            part={navigation.currentPart}
            values={engine.values}
            files={engine.files}
            errors={errors}
            onValueChange={engine.updateValue}
            onFileChange={engine.updateFiles}
          />

          <ActionButtons
            isFirst={navigation.isFirst}
            isLast={navigation.isLast}
            submitting={engine.submitting}
            onBack={navigation.goBack}
            onNext={navigation.goNext}
            onSubmit={() => engine.submit(formId)}
          />

          <NotesSection notes={engine.notes} onChange={engine.setNotes} />

          {engine.submissionResult ? (
            <div className="card" style={{ padding: 18, marginTop: 16 }}>
              <h3>{engine.submissionResult.ok ? 'Submission received' : 'Submission blocked'}</h3>
              <p>{engine.submissionResult.message}</p>
              <pre>{JSON.stringify(engine.submissionResult, null, 2)}</pre>
            </div>
          ) : null}
        </main>

        <ErrorSidebar errors={errors} />
      </div>
    </div>
  );
}
