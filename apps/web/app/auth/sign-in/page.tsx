'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, LogIn } from 'lucide-react';
import { Button } from '@nexus/ui';
import { AuthCard } from '@/components/auth/auth-card';
import { FloatingLabelInput } from '@/components/auth/floating-label-input';
import { OAuthButtons } from '@/components/auth/oauth-buttons';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const errorParam = searchParams.get('error');
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch('/api/auth/csrf')
      .then((r) => r.json())
      .then((data) => setCsrfToken(data.csrfToken ?? ''))
      .catch(() => {});
  }, []);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const body = new URLSearchParams({
      csrfToken,
      email: form.email,
      password: form.password,
      callbackUrl,
      json: 'true',
    });

    const res = await fetch('/api/auth/callback/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      redirect: 'manual',
    });

    if (res.status === 200 || res.type === 'opaqueredirect') {
      window.location.href = callbackUrl;
    } else {
      try {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      } catch {}
      setLoading(false);
    }
  };

  const errorMessage =
    errorParam === 'CredentialsSignin'
      ? 'Invalid email or password'
      : errorParam === 'OAuthAccountNotLinked'
        ? 'This email is already associated with another sign-in method'
        : null;

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your NEXUS account">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
        {errorMessage && (
          <div className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <FloatingLabelInput
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <FloatingLabelInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          showPasswordToggle
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-text-muted transition-colors hover:text-white">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
              className="h-4 w-4 rounded border-[rgba(255,255,255,0.15)] bg-transparent text-primary focus:ring-primary"
            />
            Remember me
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary transition-colors hover:text-primary-light"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" disabled={loading || !csrfToken} className="w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </span>
          )}
        </Button>
      </form>

      <div className="mt-6">
        <OAuthButtons />
      </div>

      <p className="mt-6 text-center text-sm text-text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/auth/sign-up" className="font-medium text-primary transition-colors hover:text-primary-light">
          Create one
        </Link>
      </p>
    </AuthCard>
  );
}
