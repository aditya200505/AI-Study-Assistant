"use client";

import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface Subject {
  id: string;
  subjectName: string;
  color: string;
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [newColor, setNewColor] = useState('#3B82F6');
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get('/subjects');
      setSubjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    try {
      const { data } = await api.post('/subjects', { subjectName: newSubject, color: newColor });
      setSubjects([...subjects, data]);
      setNewSubject('');
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/subjects/${id}`);
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const colors = ['#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subjects</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your classes and course topics.</p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Subject</h3>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Name</label>
            <input 
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Data Structures & Algorithms"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setNewColor(c)}
                  className={`w-8 h-8 rounded-full transition-transform ${newColor === c ? 'scale-125 ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-blue-500' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mt-4 md:mt-0"
          >
            <Plus size={20} /> Add
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading subjects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, idx) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
            >
              <div 
                className="absolute top-0 left-0 w-2 h-full"
                style={{ backgroundColor: subject.color }}
              />
              <div className="pl-4 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{subject.subjectName}</h3>
                  <p className="text-sm text-gray-500 mt-2">0 Notes • 0 Tasks</p>
                </div>
                <button 
                  onClick={() => handleDelete(subject.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
          {subjects.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
              No subjects added yet. Create one to get started!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
