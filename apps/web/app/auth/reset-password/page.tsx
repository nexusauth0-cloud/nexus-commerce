'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, KeyRound, ArrowLeft } from 'lucide-react';
import { Button } from '@nexus/ui';
import { AuthCard } from '@/components/auth/auth-card';
import { FloatingLabelInput, PasswordRequirement } from '@/components/auth/floating-label-input';
import { PasswordStrength } from '@/components/auth/password-strength';
import { resetPasswordAction } from '@/lib/actions/auth';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requirements = [
    { met: password.length >= 8, label: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), label: 'One uppercase letter' },
    { met: /[a-z]/.test(password), label: 'One lowercase letter' },
    { met: /[0-9]/.test(password), label: 'One number' },
  ];

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!token) errs.token = 'Missing reset token';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(password)) errs.password = 'Must contain an uppercase letter';
    else if (!/[a-z]/.test(password)) errs.password = 'Must contain a lowercase letter';
    else if (!/[0-9]/.test(password)) errs.password = 'Must contain a number';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [password, confirmPassword, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;
    setLoading(true);

    const result = await resetPasswordAction(token, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setLoading(false);
  };

  if (!token) {
    return (
      <AuthCard title="Invalid link" subtitle="This password reset link is invalid">
        <div className="text-center">
          <p className="text-sm text-text-muted">
            The reset link is missing or invalid. Please request a new password reset.
          </p>
          <Link
            href="/auth/forgot-password"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-primary transition-colors hover:text-primary-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Request new link
          </Link>
        </div>
      </AuthCard>
    );
  }

  if (success) {
    return (
      <AuthCard title="Password updated" subtitle="Your password has been reset successfully">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <KeyRound className="h-8 w-8 text-success" />
          </div>
          <p className="mt-4 text-sm text-text-muted">
            You can now sign in with your new password.
          </p>
          <Button onClick={() => router.push('/auth/sign-in')} className="mt-6 w-full">
            Sign In
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Set new password" subtitle="Enter your new password below">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
            {error}
          </div>
        )}

        <div>
          <FloatingLabelInput
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            showPasswordToggle
          />
          {password && (
            <div className="mt-2">
              <PasswordStrength password={password} />
              <div className="mt-2 space-y-1">
                {requirements.map((req, i) => (
                  <PasswordRequirement key={i} met={req.met} label={req.label} />
                ))}
              </div>
            </div>
          )}
        </div>

        <FloatingLabelInput
          label="Confirm New Password"
          type={showConfirm ? 'text' : 'password'}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          showPasswordToggle
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Resetting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <KeyRound className="h-4 w-4" />
              Reset Password
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
