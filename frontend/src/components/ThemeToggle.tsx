"use client";

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check initial preference from class on html element or localStorage
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-4 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:scale-110 transition-transform flex items-center justify-center z-50"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-indigo-600" />}
    </button>
  );
}
