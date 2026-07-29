'use client';

import { useRouter } from 'next/navigation';
import { User, Mail, Shield, Calendar, LogOut } from 'lucide-react';
import { Button, Avatar, AvatarFallback, AvatarImage, Separator } from '@nexus/ui';
import type { User as AuthUser } from '@auth/core/types';

interface UserProfileProps {
  user: AuthUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const router = useRouter();
  const initials = (user.name ?? user.email ?? 'U').charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    router.push('/auth/sign-in');
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          {user.image && <AvatarImage src={user.image} alt={user.name ?? ''} />}
          <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-white">{user.name ?? 'User'}</h2>
          <p className="text-sm text-text-muted">{user.email}</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <Mail className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <Shield className="h-4 w-4" />
          <span className="capitalize">{(user as any).role?.toLowerCase() ?? 'customer'}</span>
        </div>
      </div>

      <Separator />

      <Button
        onClick={handleSignOut}
        variant="secondary"
        className="w-full"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
