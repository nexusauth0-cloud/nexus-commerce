"use server";

import { hashPassword, generateToken, authSchemas, verifyPassword } from "@nexus/auth";
import { prisma } from "@nexus/database";

export async function signInAction(
  email: string,
  password: string,
): Promise<{ error?: string }> {
  const parsed = authSchemas.signIn.safeParse({ email, password });
  if (!parsed.success) {
    const first = parsed.error.errors[0];
    return { error: first?.message ?? "Invalid input" };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !user.password) return { error: "Invalid email or password" };

  const valid = await verifyPassword(parsed.data.password, user.password);
  if (!valid) return { error: "Invalid email or password" };

  return {};
}

export async function registerAction(
  name: string,
  email: string,
  password: string,
): Promise<{ error?: string; success?: boolean }> {
  const parsed = authSchemas.signUp.safeParse({ name, email, password, confirmPassword: password });
  if (!parsed.success) {
    const first = parsed.error.errors[0];
    return { error: first?.message ?? "Invalid input" };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { error: "An account with this email already exists" };

  const hashed = await hashPassword(parsed.data.password);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashed,
    },
  });

  const verificationToken = generateToken();
  await prisma.verificationToken.create({
    data: {
      identifier: `verify:${parsed.data.email}`,
      token: verificationToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  return { success: true };
}

export async function forgotPasswordAction(
  email: string,
): Promise<{ error?: string; success?: boolean }> {
  const parsed = authSchemas.forgotPassword.safeParse({ email });
  if (!parsed.success) {
    const first = parsed.error.errors[0];
    return { error: first?.message ?? "Invalid email" };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return { success: true };

  const resetToken = generateToken();
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpires: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  return { success: true };
}

export async function resetPasswordAction(
  token: string,
  password: string,
): Promise<{ error?: string; success?: boolean }> {
  const parsed = authSchemas.resetPassword.safeParse({
    token,
    password,
    confirmPassword: password,
  });
  if (!parsed.success) {
    const first = parsed.error.errors[0];
    return { error: first?.message ?? "Invalid input" };
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: parsed.data.token,
      resetTokenExpires: { gt: new Date() },
    },
  });

  if (!user) return { error: "Invalid or expired reset token" };

  const hashed = await hashPassword(parsed.data.password);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return { success: true };
}

export async function verifyEmailAction(
  token: string,
): Promise<{ error?: string; success?: boolean }> {
  const parsed = authSchemas.verifyEmail.safeParse({ token });
  if (!parsed.success) {
    const first = parsed.error.errors[0];
    return { error: first?.message ?? "Invalid token" };
  }

  const vt = await prisma.verificationToken.findUnique({
    where: { token: parsed.data.token },
  });
  if (!vt || vt.expires < new Date()) {
    return { error: "Invalid or expired verification token" };
  }

  const identifier = vt.identifier;
  if (!identifier.startsWith("verify:")) {
    return { error: "Invalid verification token" };
  }
  const email = identifier.replace("verify:", "");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "User not found" };

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { token: parsed.data.token },
  });

  return { success: true };
}
