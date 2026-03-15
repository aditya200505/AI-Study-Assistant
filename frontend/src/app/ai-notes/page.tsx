"use client";

import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { motion } from 'framer-motion';
import { Sparkles, Save, BookOpen } from 'lucide-react';

interface Subject {
  id: string;
  subjectName: string;
}

export default function AINotesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingSubjects, setFetchingSubjects] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await api.get('/subjects');
        setSubjects(data);
        if (data.length > 0) setSubjectId(data[0].id);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleSummarize = async () => {
    if (!content || !title || !subjectId) return;
    
    setLoading(true);
    try {
      const { data } = await api.post('/notes', { title, content, subjectId });
      setSummary(data.summary);
    } catch (e: any) {
      console.error("Frontend Summarize Error:", e);
      const errorMsg = e.response?.data?.message || e.message || 'Failed to generate summary';
      setSummary(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingSubjects) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Sparkles className="text-purple-500" />
          AI Notes Summarizer
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Paste your long lecture notes and let AI summarize them for you.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-[70vh]"
        >
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="e.g. Binary Search Trees"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select 
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="" disabled>Select Subject</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.subjectName}</option>)}
              </select>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raw Notes</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              placeholder="Paste your notes here..."
            />
          </div>

          <button 
            onClick={handleSummarize}
            disabled={loading || !content || !title || !subjectId}
            className="mt-4 w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">Generating Summary...</span>
            ) : (
              <>
                <Sparkles size={20} /> Summarize with AI
              </>
            )}
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-[70vh]"
        >
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">AI Summary Output</label>
            {summary && (
              <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1 font-medium bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-lg transition-colors">
                <Save size={16} /> Saved to Notes
              </button>
            )}
          </div>
          
          <div className={`flex-1 w-full p-6 text-gray-800 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-700 overflow-y-auto ${summary ? 'bg-purple-50/50 dark:bg-purple-900/10' : 'bg-gray-50 dark:bg-gray-800 flex items-center justify-center'}`}>
            {summary ? (
              <div className="prose dark:prose-invert max-w-none">
                {summary}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your AI-generated summary will appear here.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
