import { Auth } from '@auth/core';
import { authConfig } from '@nexus/auth';
import type { Session } from '@auth/core/types';

export async function getSession(request: Request): Promise<Session | null> {
  const url = new URL('/api/auth/session', request.url);
  const sessionRequest = new Request(url, {
    headers: { cookie: request.headers.get('cookie') ?? '' },
  });
  const response = await Auth(sessionRequest, authConfig);
  if (response.ok) {
    const data = await response.json();
    if (data?.user) return data as Session;
  }
  return null;
}
