import { Auth } from '@auth/core';
import { authConfig } from '@nexus/auth/config';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Glass } from '@nexus/ui';
import { UserProfile } from '@/components/auth/user-profile';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') ?? 'http';
  const url = new URL('/api/auth/session', `${proto}://${host}`);
  const cookie = headersList.get('cookie') ?? '';

  const response = await Auth(new Request(url, { headers: { cookie } }), authConfig);
  const session = response.ok ? await response.json().catch(() => null) : null;

  if (!session?.user) {
    redirect('/auth/sign-in?callbackUrl=/account');
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-white">My Account</h1>
        <Glass variant="elevated" glow="primary" className="p-6 sm:p-8">
          <UserProfile user={session.user} />
        </Glass>
      </div>
    </div>
  );
}
