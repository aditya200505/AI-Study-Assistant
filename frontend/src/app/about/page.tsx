"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Code2, 
  Palette, 
  Rocket, 
  ExternalLink, 
  Linkedin, 
  Instagram,
  Heart,
  Target
} from 'lucide-react';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="relative w-36 h-36 mx-auto mb-10 mt-24 overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-2xl">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <img 
            src="/assets/aditya.jpg" 
            alt="Aditya Vajpayee" 
            className="w-full h-full object-cover scale-[1.3] object-[center_20%] relative z-10"
          />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          About the Dev
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Bridging the gap between technical excellence and creative digital design.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Profile Card */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Aditya Vajpayee
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">
              "Aditya Vajpayee is a Computer Science Engineering student with a strong passion for technology, software development, and creative digital design. He combines technical programming skills with a creative mindset to build visually appealing and functional digital solutions."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <GraduationCap size={16} /> Education
              </h3>
              <p className="text-gray-900 dark:text-gray-100 font-medium">Bachelors in Computer Science Engineering (CSE)</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Rocket size={16} /> Vision
              </h3>
              <p className="text-gray-900 dark:text-gray-100 font-medium">Versatile tech professional blending development and design to create impactful digital products.</p>
            </div>
          </div>
        </motion.div>

        {/* Social Links Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-blue-600 rounded-3xl p-8 flex flex-col justify-between text-white shadow-xl shadow-blue-500/20"
        >
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Connect with me</h3>
            <p className="text-blue-100 text-sm">Let's build something amazing together.</p>
          </div>
          
          <div className="space-y-3 mt-8">
            <a 
              href="https://www.linkedin.com/in/contactadityavajpayee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <Linkedin size={20} />
                <span className="font-medium">LinkedIn</span>
              </div>
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="https://www.instagram.com/aditya_vajpayee.5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <Instagram size={20} />
                <span className="font-medium">Instagram</span>
              </div>
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Skills & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technical Stack */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Technical Skills</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Programming Languages</span>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Web Development</span>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'Interactive UI'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Creative Skills */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-600 dark:text-pink-400">
              <Palette size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Creative Expert</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Graphic Design</span>
              <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                Posters, Banners & Digital Visuals
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">UI/UX Design</span>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Focus on user-friendly layouts & Canva integration
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Areas of Interest */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-blue-900/10 rounded-3xl p-8 md:p-12 text-center space-y-8"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Target className="text-blue-500" /> Focus Areas
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Passionate about learning new technologies and improving skills.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Software Dev',
            'UI/UX Design',
            'Web Solutions',
            'Technology'
          ].map(interest => (
            <div key={interest} className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-800 font-semibold text-blue-600 dark:text-blue-400">
              {interest}
            </div>
          ))}
        </div>

        <div className="pt-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 rounded-full shadow-sm text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
            <Heart size={16} className="text-pink-500" /> Detail-Oriented & Self-Driven
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
