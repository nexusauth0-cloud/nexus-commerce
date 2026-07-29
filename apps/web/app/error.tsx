'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-text-secondary">{error.message}</p>
      <button
        onClick={reset}
        className="bg-primary text-primary-foreground hover:bg-primary-light rounded-lg px-6 py-3 text-sm font-medium transition-all"
      >
        Try again
      </button>
    </div>
  );
}
