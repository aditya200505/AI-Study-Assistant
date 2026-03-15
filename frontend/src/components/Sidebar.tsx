"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Brain, CheckSquare, Timer, LogOut, Menu, X, User } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  // Hide sidebar on login/register pages
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') return null;
  if (!user) return null;

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Subjects', href: '/subjects', icon: BookOpen },
    { name: 'AI Notes', href: '/ai-notes', icon: Brain },
    { name: 'Planner', href: '/planner', icon: CheckSquare },
    { name: 'Pomodoro', href: '/pomodoro', icon: Timer },
    { name: 'About Dev', href: '/about', icon: User },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        {isOpen ? <X size={24} className="text-gray-900 dark:text-white" /> : <Menu size={24} className="text-gray-900 dark:text-white" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-900/50 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen fixed top-0 left-0 flex flex-col transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 mt-12 md:mt-0">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Study Assist
          </h1>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'} size={20} />
                {link.name}
              </Link>
            );
          })}
        </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-4 px-4">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-200 max-w-[180px] truncate">{user?.name}</p>
          <p className="text-xs text-gray-500 max-w-[180px] truncate">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
