'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle2, XCircle, Mail } from 'lucide-react';
import { Button } from '@nexus/ui';
import { AuthCard } from '@/components/auth/auth-card';
import { verifyEmailAction } from '@/lib/actions/auth';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('No verification token provided');
      return;
    }

    verifyEmailAction(token).then((result) => {
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setError(result.error ?? 'Verification failed');
      }
    });
  }, [token]);

  return (
    <AuthCard
      title={
        status === 'loading' ? 'Verifying your email' :
        status === 'success' ? 'Email verified!' :
        'Verification failed'
      }
      subtitle={
        status === 'loading' ? 'Please wait...' :
        status === 'success' ? 'Your email has been successfully verified.' :
        'We could not verify your email.'
      }
    >
      <div className="text-center">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
          status === 'loading' ? 'bg-primary/10' :
          status === 'success' ? 'bg-success/10' :
          'bg-danger/10'
        }`}>
          {status === 'loading' && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
          {status === 'success' && <CheckCircle2 className="h-8 w-8 text-success" />}
          {status === 'error' && <XCircle className="h-8 w-8 text-danger" />}
        </div>

        {status === 'loading' && (
          <p className="mt-4 text-sm text-text-muted">Verifying your email address...</p>
        )}

        {status === 'success' && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-text-muted">
              You can now sign in to your account.
            </p>
            <Button onClick={() => router.push('/auth/sign-in')} className="w-full">
              Sign In
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-danger">{error}</p>
            <p className="text-xs text-text-muted">
              The verification link may have expired. Try signing in to request a new verification email.
            </p>
            <Button onClick={() => window.location.href = '/auth/sign-in'} className="w-full" variant="secondary">
              Go to Sign In
            </Button>
          </div>
        )}
      </div>
    </AuthCard>
  );
}
