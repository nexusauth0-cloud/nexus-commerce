import * as React from 'react';
import { cn } from '@nexus/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="text-text-secondary mb-2 block text-sm font-medium">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'bg-surface text-text-primary placeholder:text-text-muted flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200',
            'focus:ring-primary/50 focus:border-primary/50 focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            error
              ? 'border-danger focus:ring-danger/50 focus:border-danger/50'
              : 'border-border hover:border-border-hover',
            className,
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-danger mt-1.5 text-xs" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
export type { InputProps };
