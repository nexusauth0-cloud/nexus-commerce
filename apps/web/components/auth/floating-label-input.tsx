'use client';

import { useState, useCallback } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export function FloatingLabelInput({
  label,
  error,
  showPasswordToggle,
  type: typeProp,
  className = '',
  ...props
}: FloatingLabelInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const hasValue = props.value !== undefined && props.value !== '';

  const type = showPasswordToggle && showPassword ? 'text' : typeProp;

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const form = e.currentTarget.form;
      if (form) {
        const formEl = form as HTMLFormElement;
        const elements = Array.from(formEl.elements) as HTMLElement[];
        const idx = elements.indexOf(e.currentTarget);
        if (idx < elements.length - 1) {
          const next = elements[idx + 1];
          if (next instanceof HTMLElement) next.focus();
        }
      }
    }
  }, []);

  const inputId = `floating-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="relative">
      <div
        className={`group relative rounded-xl border transition-all duration-200 ${
          error
            ? 'border-danger/50 bg-danger/5'
            : focused
              ? 'border-primary/50 bg-primary/5'
              : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.15)]'
        }`}
      >
        <input
          id={inputId}
          type={type}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full bg-transparent px-4 pt-5 pb-2 text-sm text-white outline-none placeholder-transparent transition-colors autofill:bg-transparent ${className}`}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute left-4 transition-all duration-200 ${
            focused || hasValue
              ? 'top-1.5 text-[10px] font-medium text-primary'
              : 'top-1/2 -translate-y-1/2 text-sm text-text-muted'
          }`}
        >
          {label}
        </label>
        {showPasswordToggle && typeProp === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-white"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 px-1 text-xs text-danger">
          <X className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordRequirement({ met, label }: { met: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs transition-colors ${met ? 'text-success' : 'text-text-muted'}`}>
      {met ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {label}
    </div>
  );
}
