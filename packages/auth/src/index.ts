import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from '@auth/core/providers/credentials';
import Google from '@auth/core/providers/google';
import GitHub from '@auth/core/providers/github';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@nexus/database';
import type { AuthConfig } from '@auth/core';

export const authConfig: AuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in',
    verifyRequest: '/auth/verify-email',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(1) })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      if (trigger === 'update') {
        const updated = await prisma.user.findUnique({ where: { id: token.id as string } });
        if (updated) {
          token.name = updated.name;
          token.email = updated.email;
          token.picture = updated.image;
          token.role = updated.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
};

const MIN_LENGTH = 8;
const MAX_LENGTH = 128;

export const authSchemas = {
  signUp: z
    .object({
      name: z.string().min(2, 'Name must be at least 2 characters').max(64),
      email: z.string().email('Invalid email address'),
      password: z
        .string()
        .min(MIN_LENGTH, `Password must be at least ${MIN_LENGTH} characters`)
        .max(MAX_LENGTH)
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),

  signIn: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional().default(false),
  }),

  forgotPassword: z.object({
    email: z.string().email('Invalid email address'),
  }),

  resetPassword: z
    .object({
      token: z.string().min(1),
      password: z
        .string()
        .min(MIN_LENGTH, `Password must be at least ${MIN_LENGTH} characters`)
        .max(MAX_LENGTH)
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),

  verifyEmail: z.object({
    token: z.string().min(1),
  }),
};

export type SignUpInput = z.infer<typeof authSchemas.signUp>;
export type SignInInput = z.infer<typeof authSchemas.signIn>;
export type ForgotPasswordInput = z.infer<typeof authSchemas.forgotPassword>;
export type ResetPasswordInput = z.infer<typeof authSchemas.resetPassword>;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function isPasswordStrong(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-danger' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-warning' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-primary' };
  if (score <= 4) return { score, label: 'Strong', color: 'bg-success' };
  return { score, label: 'Very Strong', color: 'bg-success' };
}

export function getPasswordError(password: string): string | null {
  if (password.length < MIN_LENGTH) return `At least ${MIN_LENGTH} characters`;
  if (!/[A-Z]/.test(password)) return 'One uppercase letter required';
  if (!/[a-z]/.test(password)) return 'One lowercase letter required';
  if (!/[0-9]/.test(password)) return 'One number required';
  return null;
}
