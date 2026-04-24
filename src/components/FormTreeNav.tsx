'use client';

import { FormPart } from '@/types/forms';

export default function FormTreeNav({
  parts,
  currentPartIndex,
  onSelect
}: {
  parts: FormPart[];
  currentPartIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <aside className="card sidebar">
      <h3>Form navigation</h3>
      <p className="muted">Jump between major parts of the claim.</p>
      {parts.map((part, index) => (
        <button
          key={part.id}
          type="button"
          className={`navButton ${index === currentPartIndex ? 'active' : ''}`}
          onClick={() => onSelect(index)}
        >
          <div style={{ fontWeight: 700 }}>{part.title}</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>{part.sections.length} sections</div>
        </button>
      ))}
    </aside>
  );
}
