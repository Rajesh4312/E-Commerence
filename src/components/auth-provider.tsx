'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // If you ever want to pass an initial session, you can add it here
  return <SessionProvider>{children}</SessionProvider>;
}
