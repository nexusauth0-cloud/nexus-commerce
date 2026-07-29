import { BarChart3, ShoppingBag, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="from-primary to-secondary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">NEXUS Admin</h1>
        <p className="text-text-secondary mt-2">Admin panel coming in Milestone 2</p>
      </div>
    </div>
  );
}
