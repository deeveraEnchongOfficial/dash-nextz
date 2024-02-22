"use client"

import React, { ReactNode, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface AuthProviderProps {
  children: any;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (status !== 'authenticated') {
      router.push('/auth/signin'); // Redirect to your login page
    }
  }, [session, status, router]);

  return <>{children}</>;
};

export default AuthProvider;
