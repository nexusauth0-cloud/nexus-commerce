'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, UserPlus } from 'lucide-react';
import { Button } from '@nexus/ui';
import { AuthCard } from '@/components/auth/auth-card';
import { FloatingLabelInput, PasswordRequirement } from '@/components/auth/floating-label-input';
import { PasswordStrength } from '@/components/auth/password-strength';
import { OAuthButtons } from '@/components/auth/oauth-buttons';
import { registerAction } from '@/lib/actions/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const requirements = [
    { met: form.password.length >= 8, label: 'At least 8 characters' },
    { met: /[A-Z]/.test(form.password), label: 'One uppercase letter' },
    { met: /[a-z]/.test(form.password), label: 'One lowercase letter' },
    { met: /[0-9]/.test(form.password), label: 'One number' },
  ];

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!form.name || form.name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Must contain an uppercase letter';
    else if (!/[a-z]/.test(form.password)) errs.password = 'Must contain a lowercase letter';
    else if (!/[0-9]/.test(form.password)) errs.password = 'Must contain a number';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);

    const result = await registerAction(form.name, form.email, form.password);
    if (result.error) {
      setServerError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <AuthCard title="Check your email" subtitle="Almost there!">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            We sent a verification email to <span className="font-medium text-white">{form.email}</span>.
            Click the link in the email to verify your account and complete registration.
          </p>
          <Button onClick={() => router.push('/auth/sign-in')} className="mt-6 w-full">
            Go to Sign In
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create account" subtitle="Start your NEXUS journey">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {serverError && (
          <div className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
            {serverError}
          </div>
        )}

        <FloatingLabelInput
          label="Full Name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />

        <FloatingLabelInput
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <div>
          <FloatingLabelInput
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            showPasswordToggle
          />
          {form.password && (
            <div className="mt-2">
              <PasswordStrength password={form.password} />
              <div className="mt-2 space-y-1">
                {requirements.map((req, i) => (
                  <PasswordRequirement key={i} met={req.met} label={req.label} />
                ))}
              </div>
            </div>
          )}
        </div>

        <FloatingLabelInput
          label="Confirm Password"
          type={showConfirm ? 'text' : 'password'}
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          showPasswordToggle
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <UserPlus className="h-4 w-4" />
              Create Account
            </span>
          )}
        </Button>

        <p className="text-xs text-text-muted">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:text-primary-light">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-primary hover:text-primary-light">Privacy Policy</Link>.
        </p>
      </form>

      <div className="mt-6">
        <OAuthButtons />
      </div>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="font-medium text-primary transition-colors hover:text-primary-light">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
