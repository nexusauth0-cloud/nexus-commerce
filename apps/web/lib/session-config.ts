import type { AuthConfig } from '@auth/core';

export function createSessionConfig(): AuthConfig {
  return {
    session: { strategy: 'jwt' },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [],
  };
}
