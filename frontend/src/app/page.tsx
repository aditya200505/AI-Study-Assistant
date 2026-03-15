"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-500 rounded-full mb-4"></div>
        <div className="text-gray-500 dark:text-gray-400">Loading AI Study Assistant...</div>
      </div>
    </div>
  );
}
