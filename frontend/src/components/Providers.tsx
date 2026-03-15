"use client";

import React, { useEffect, useState } from 'react';
import { AuthProvider } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>; // Prevent hydration errors
  }

  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/';
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy-id';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 relative">
          <Sidebar />
          <main className={`flex-1 overflow-y-auto transition-all duration-300 pt-16 md:pt-0 ${!isAuthPage ? 'md:ml-64 p-4 md:p-8' : ''}`}>
            {children}
          </main>
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
