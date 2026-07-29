import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-primary text-8xl font-extrabold tracking-tight">404</h1>
      <p className="text-text-secondary text-lg">Page not found</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary-light rounded-lg px-6 py-3 text-sm font-medium transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
