import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="pageShell">
      <div className="container">
        <div className="card" style={{ padding: 24 }}>
          <span className="badge">Schema-driven starter</span>
          <h1>Insurance Claim Forms</h1>
          <p className="muted">
            This project demonstrates a React + TypeScript + Next.js architecture for dynamic insurance forms,
            real file upload handling, and multipart API submission.
          </p>
          <div className="homeLinks">
            <Link className="card linkCard" href="/claims/auto">
              <h2>Auto claim</h2>
              <p className="muted">Policyholder details, accident info, police report logic, vehicle photos.</p>
            </Link>
            <Link className="card linkCard" href="/claims/home">
              <h2>Home claim</h2>
              <p className="muted">Property details, incident type, estimated loss, contractor documents.</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
