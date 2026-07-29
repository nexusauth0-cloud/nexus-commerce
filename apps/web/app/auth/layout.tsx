import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Authentication | NEXUS Commerce',
    template: '%s | NEXUS Commerce',
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-primary/5 lg:via-secondary/5 lg:to-background lg:p-12">
        <div className="relative max-w-md">
          <div className="absolute -inset-20 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white">
              Welcome to NEXUS
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Experience the future of commerce with AI-powered recommendations,
              intelligent search, and seamless checkout. Sign in to unlock your
              personalized shopping experience.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { label: 'AI-Powered Recommendations', desc: 'Discover products tailored to your taste' },
                { label: 'Secure Checkout', desc: 'Fast and encrypted payment processing' },
                { label: 'Real-Time Inventory', desc: 'Always know what\'s in stock' },
                { label: 'Order Tracking', desc: 'Monitor your orders from anywhere' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
