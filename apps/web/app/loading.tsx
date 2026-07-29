export default function Loading() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" />
        <p className="text-text-secondary text-sm">Loading NEXUS...</p>
      </div>
    </div>
  );
}
