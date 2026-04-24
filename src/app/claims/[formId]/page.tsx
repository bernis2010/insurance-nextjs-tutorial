import FormContainer from '@/components/FormContainer';
import { getAvailableForms } from '@/utils/schemaRegistry';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAvailableForms().map((formId) => ({ formId }));
}

export default async function ClaimPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;

  if (!getAvailableForms().includes(formId)) {
    notFound();
  }

  return <FormContainer formId={formId} />;
}
