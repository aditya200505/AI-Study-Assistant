"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import { motion } from 'framer-motion';
import { Clock, BookOpen, CheckSquare, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudyMinutes: 0,
    totalTasks: 0,
    completedTasks: 0,
    totalSubjects: 0
  });
  const [loading, setLoading] = useState(true);

  // Mock data for the chart since we don't have historical data API yet
  const chartData = [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 3.5 },
    { name: 'Wed', hours: 1.5 },
    { name: 'Thu', hours: 4 },
    { name: 'Fri', hours: 2.5 },
    { name: 'Sat', hours: 5 },
    { name: 'Sun', hours: 3 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchStats();
    }
  }, [user]);

  const cards = [
    { title: 'Study Time', value: `${Math.floor(stats.totalStudyMinutes / 60)}h ${stats.totalStudyMinutes % 60}m`, icon: Clock, color: 'bg-blue-500' },
    { title: 'Subjects', value: stats.totalSubjects, icon: BookOpen, color: 'bg-indigo-500' },
    { title: 'Tasks Completed', value: `${stats.completedTasks} / ${stats.totalTasks}`, icon: CheckSquare, color: 'bg-green-500' },
    { title: 'Weekly Streak', value: `${(stats as any).currentStreak || 0} Days`, icon: TrendingUp, color: 'bg-orange-500' },
  ];

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back, {user?.name}! Here's your study progress.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg text-white ${card.color}`}>
                <card.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{card.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Study Hours (This Week)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="hours" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <p className="font-semibold text-gray-900 dark:text-gray-100">AI Assignment</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Due Today, 11:59 PM</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Math Quiz Preparation</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Due Tomorrow</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <p className="font-semibold text-gray-900 dark:text-gray-100">DSA LeetCode Grinding</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Ongoing</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
