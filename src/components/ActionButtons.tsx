'use client';

export default function ActionButtons({
  isFirst,
  isLast,
  submitting,
  onBack,
  onNext,
  onSubmit
}: {
  isFirst: boolean;
  isLast: boolean;
  submitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="actions">
      <button type="button" className="btn secondary" onClick={onBack} disabled={isFirst || submitting}>
        Previous
      </button>
      {isLast ? (
        <button type="button" className="btn primary" onClick={onSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit claim'}
        </button>
      ) : (
        <button type="button" className="btn primary" onClick={onNext} disabled={submitting}>
          Next section
        </button>
      )}
    </div>
  );
}
