'use client';

import { motion } from 'framer-motion';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Weak', color: 'bg-danger', width: 'w-1/6', textColor: 'text-danger' },
    { label: 'Fair', color: 'bg-warning', width: 'w-2/6', textColor: 'text-warning' },
    { label: 'Good', color: 'bg-primary', width: 'w-3/6', textColor: 'text-primary' },
    { label: 'Strong', color: 'bg-success', width: 'w-4/6', textColor: 'text-success' },
    { label: 'Very Strong', color: 'bg-success', width: 'w-5/6', textColor: 'text-success' },
  ];

  const idx = Math.min(Math.max(Math.floor(score / 1.2), 0), 4);
  const level = levels[idx]!;

  return (
    <div className="space-y-1.5">
      <div className="flex h-1 gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-full transition-all duration-500 ${
              i <= idx ? level.color : 'bg-white/5'
            }`}
          />
        ))}
      </div>
      <motion.p
        key={idx}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-[11px] font-medium ${level.textColor}`}
      >
        {level.label}
      </motion.p>
    </div>
  );
}
