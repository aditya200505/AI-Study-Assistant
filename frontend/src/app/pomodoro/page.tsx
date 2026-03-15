"use client";

import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Brain, Coffee } from 'lucide-react';

export default function PomodoroPage() {
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleComplete = async () => {
    setIsActive(false);
    
    // Play sound notification logic could go here

    if (mode === 'study') {
      try {
        await api.post('/sessions', { duration: 25 });
        setSessionsCompleted(s => s + 1);
      } catch (e) {
        console.error("Failed to save session");
      }
      setMode('break');
      setTimeLeft(5 * 60);
    } else {
      setMode('study');
      setTimeLeft(25 * 60);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'study' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'study' | 'break') => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'study' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Circular progress calculation
  const totalSeconds = mode === 'study' ? 25 * 60 : 5 * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pomodoro Timer</h1>
        <p className="text-gray-500 dark:text-gray-400">Stay focused and track your study sessions.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 w-full max-w-md">
        
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-12">
          <button
            onClick={() => switchMode('study')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              mode === 'study' 
                ? 'bg-white dark:bg-gray-700 text-rose-500 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Brain size={16} /> Focus
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              mode === 'break' 
                ? 'bg-white dark:bg-gray-700 text-teal-500 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Coffee size={16} /> Break
          </button>
        </div>

        {/* Circular Timer Display */}
        <div className="relative flex justify-center items-center mb-12">
          <svg className="w-64 h-64 transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              className="stroke-current text-gray-100 dark:text-gray-800"
              strokeWidth="8"
              fill="transparent"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              className={`stroke-current ${mode === 'study' ? 'text-rose-500' : 'text-teal-500'}`}
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 120}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: (2 * Math.PI * 120) * (progress / 100) }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-6xl font-black text-gray-900 dark:text-white font-mono tracking-tighter">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
              isActive 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                : mode === 'study'
                  ? 'bg-rose-500 text-white shadow-rose-500/30'
                  : 'bg-teal-500 text-white shadow-teal-500/30'
            }`}
          >
            {isActive ? <Pause size={28} className="fill-current" /> : <Play size={28} className="fill-current transform translate-x-0.5" />}
          </button>
          
          <button
            onClick={resetTimer}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>

      </div>

      <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
        <p>Sessions Completed Today: <span className="font-bold text-gray-900 dark:text-white ml-2">{sessionsCompleted}</span></p>
      </div>

    </div>
  );
}
