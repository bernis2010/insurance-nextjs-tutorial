import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Forms Starter',
  description: 'Schema-driven insurance claims app with file upload and API submission.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
