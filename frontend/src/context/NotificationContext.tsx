"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'study';

interface NotificationProps {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextProps {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notify: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const notify = useCallback((message: string, type: NotificationType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center gap-3 py-3 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-sm w-full"
            >
              {n.type === 'success' && <CheckCircle className="text-green-500 flex-shrink-0" size={20} />}
              {n.type === 'error' && <AlertCircle className="text-red-500 flex-shrink-0" size={20} />}
              {n.type === 'study' && <Bell className="text-blue-500 flex-shrink-0" size={20} />}
              {n.type === 'info' && <Info className="text-gray-500 flex-shrink-0" size={20} />}
              
              <p className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">{n.message}</p>
              
              <button 
                onClick={() => removeNotification(n.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
