"use client";

import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Calendar, Trash2, Plus } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

interface Task {
  id: string;
  title: string;
  subjectId: { id: string, subjectName: string, color: string } | null;
  deadline: string;
  completed: boolean;
}

interface Subject {
  id: string;
  subjectName: string;
  color: string;
}

export default function PlannerPage() {
  const { notify } = useNotification();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlannerData = async () => {
      try {
        const [tasksRes, subjectsRes] = await Promise.all([
          api.get('/tasks'),
          api.get('/subjects')
        ]);
        setTasks(tasksRes.data);
        setSubjects(subjectsRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlannerData();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const { data } = await api.post('/tasks', {
        title: newTaskTitle,
        subjectId: newTaskSubject || null,
        deadline: newTaskDeadline || null,
      });

      // Populate manually for immediate UI update
      const subjectDetail = subjects.find(s => s.id === newTaskSubject);
      const newTask = { ...data, subjectId: subjectDetail || null };
      
      setTasks([...tasks, newTask]);
      
      setNewTaskTitle('');
      setNewTaskSubject('');
      setNewTaskDeadline('');
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      const updatedStatus = !task.completed;
      await api.put(`/tasks/${task.id}`, { completed: updatedStatus });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: updatedStatus } : t));
      
      if (updatedStatus) {
        notify('Task completed! Keep up the good work.', 'success');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Study Planner</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your study tasks and assignments.</p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <input 
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="What do you need to study?"
            />
          </div>
          <div className="w-full md:w-48">
            <select 
              value={newTaskSubject}
              onChange={(e) => setNewTaskSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">No Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.subjectName}</option>)}
            </select>
          </div>
          <div className="w-full md:w-48">
            <div className="relative">
              <input 
                type="date"
                value={newTaskDeadline}
                onChange={(e) => setNewTaskDeadline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors md:w-auto w-full flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">To Do ({activeTasks.length})</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {activeTasks.map(task => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 group"
                >
                  <button onClick={() => toggleTask(task)} className="text-gray-300 hover:text-blue-500 transition-colors">
                    <Circle size={24} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {task.subjectId && (
                        <span 
                          className="text-xs px-2 py-0.5 rounded-md font-medium"
                          style={{ backgroundColor: `${task.subjectId.color}20`, color: task.subjectId.color }}
                        >
                          {task.subjectId.subjectName}
                        </span>
                      )}
                      {task.deadline && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} />
                          {new Date(task.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Completed ({completedTasks.length})</h3>
          <div className="space-y-3 opacity-70">
            <AnimatePresence>
              {completedTasks.map(task => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 group"
                >
                  <button onClick={() => toggleTask(task)} className="text-green-500 transition-colors">
                    <CheckCircle2 size={24} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-500 dark:text-gray-400 font-medium line-through truncate">{task.title}</p>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
