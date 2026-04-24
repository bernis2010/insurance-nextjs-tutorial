'use client';

export default function NotesSection({ notes, onChange }: { notes: string; onChange: (value: string) => void }) {
  return (
    <div className="card" style={{ padding: 18, marginTop: 16 }}>
      <h3>Internal notes</h3>
      <p className="muted">Use this for adjuster or intake notes before submission.</p>
      <textarea className="noteBox" value={notes} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
