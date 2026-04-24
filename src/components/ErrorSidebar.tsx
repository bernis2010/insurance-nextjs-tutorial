'use client';

import { FormErrors } from '@/types/forms';

export default function ErrorSidebar({ errors }: { errors: FormErrors }) {
  const items = Object.entries(errors);

  return (
    <aside className="card rightbar">
      <h3>Error summary</h3>
      {items.length === 0 ? (
        <p className="muted">No current validation errors.</p>
      ) : (
        items.map(([name, message]) => (
          <div className="errorBox" key={name}>
            <strong>{name}</strong>
            <div>{message}</div>
          </div>
        ))
      )}
    </aside>
  );
}
