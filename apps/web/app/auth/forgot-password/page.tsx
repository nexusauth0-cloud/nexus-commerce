'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@nexus/ui';
import { AuthCard } from '@/components/auth/auth-card';
import { FloatingLabelInput } from '@/components/auth/floating-label-input';
import { forgotPasswordAction } from '@/lib/actions/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Invalid email address'); return; }

    setLoading(true);
    const result = await forgotPasswordAction(email);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <AuthCard title="Check your email" subtitle="Password reset link sent">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            If an account exists with <span className="font-medium text-white">{email}</span>,
            we sent a password reset link. It expires in 1 hour.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            Didn&apos;t receive it? Check your spam folder or{' '}
            <button onClick={() => setSent(false)} className="text-primary hover:text-primary-light">
              try again
            </button>.
          </p>
          <Link
            href="/auth/sign-in"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-primary transition-colors hover:text-primary-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Reset password" subtitle="Enter your email and we'll send you a reset link">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
            {error}
          </div>
        )}

        <FloatingLabelInput
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              Send Reset Link
            </span>
          )}
        </Button>
      </form>

      <Link
        href="/auth/sign-in"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </AuthCard>
  );
}
