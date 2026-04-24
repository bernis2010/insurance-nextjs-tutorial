import { NextResponse } from 'next/server';

function generateClaimReference(formId: string) {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${formId.toUpperCase()}-${suffix}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const formId = String(formData.get('formId') ?? 'unknown');
  const payloadRaw = String(formData.get('payload') ?? '{}');

  let payload: unknown = {};
  try {
    payload = JSON.parse(payloadRaw);
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON payload.' }, { status: 400 });
  }

  const fileSummary = new Map<string, string[]>();

  formData.forEach((value, key) => {
    if (key === 'formId' || key === 'payload') return;
    if (value instanceof File) {
      const existing = fileSummary.get(key) ?? [];
      existing.push(value.name);
      fileSummary.set(key, existing);
    }
  });

  return NextResponse.json({
    ok: true,
    message: 'Claim submitted successfully to the demo API route.',
    formId,
    claimReference: generateClaimReference(formId),
    fileSummary: Array.from(fileSummary.entries()).map(([field, files]) => ({ field, files })),
    payload
  });
}
