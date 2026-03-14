"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plane,
  Utensils,
  TrendingUp,
  Wallet,
  Bot,
  Zap,
  BarChart3,
  Globe,
  Receipt,
  Film,
  Gamepad2
} from 'lucide-react';
import Card from '../components/ui/Card';

const LandingPage = () => {
  const router = useRouter();

  const useCases = [
    {
      title: 'Trips',
      icon: Plane,
      desc: 'The ultimate travel expense manager for groups.',
      features: [
        'Smart Settlements (Who pays whom)',
        'AI Assistant for quick entry',
        'Detailed Category Analytics',
        'Multi-currency support'
      ]
    },
    {
      title: 'Daily Expense',
      icon: Wallet,
      desc: 'Master your personal finances day by day.',
      features: [
        'AI Chatbot for tracking',
        'Monthly Budgeting',
        'Day-wise spending trends',
        'Expense Insights'
      ]
    },
    {
      title: 'Restaurant',
      icon: Utensils,
      desc: 'Dine out without the math headache.',
      features: [
        'Receipt Scanning',
        'Itemized Splitting',
        'Tax & Tip Calculation',
        'Instant Share Generation'
      ]
    },
    {
      title: 'Entertainment',
      icon: Film,
      desc: 'Movies, concerts, and fun times.',
      features: [
        'Quick Ticket Splitting',
        'Group Booking Management',
        'Settlement Reminders',
        'Event History'
      ]
    },
    {
      title: 'Sports & Play',
      icon: Gamepad2,
      desc: 'Turf bookings and equipment sharing.',
      features: [
        'Court Rental Division',
        'Recurring Games',
        'Equipment Cost Sharing',
        'Team Settlements'
      ]
    },
    {
      title: 'Shared Investments',
      icon: TrendingUp,
      desc: 'Track SIPs and group savings goals.',
      features: [
        'Goal Progress Tracking',
        'Contribution History',
        'Growth Projections',
        'Automated Reminders'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring' as const, 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-brand-blue/10 dark:bg-brand-blue/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-brand-green/10 dark:bg-brand-green/5 rounded-full blur-3xl"
        />

        {/* Decorative Floating Icons */}
        {[Plane, Utensils, Wallet, TrendingUp, Globe, Zap].map((Icon, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + idx,
              repeat: Infinity,
              delay: idx * 0.5,
              ease: "easeInOut"
            }}
            className="absolute text-brand-blue/20 dark:text-brand-blue/10 pointer-events-none hidden lg:block"
            style={{
              top: `${15 + idx * 15}%`,
              left: idx % 2 === 0 ? '5%' : '90%',
            }}
          >
            <Icon size={48 + idx * 8} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-36 pb-20 sm:pb-32 px-6 relative">
        <div className="max-w-[1600px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 leading-[1.1] text-gray-900 dark:text-white tracking-tight italic">
              SPLIT BILLS, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue">
                NOT FRIENDSHIPS.
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            The smartest way to track shared expenses for travel, dining, and daily life.
            Settling up has never been this easy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/register')} 
              className="px-12 py-5 text-xl font-black text-white bg-brand-green rounded-2xl shadow-2xl shadow-brand-green/40 hover:bg-brand-green/90 transition-all cursor-pointer"
            >
              Get Started Free
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/login')} 
              className="px-12 py-5 text-xl font-bold text-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all cursor-pointer"
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-gray-900 dark:text-white mb-20 text-center tracking-tight"
        >
          Everything you need
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {useCases.map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 border border-gray-100 dark:border-gray-800 h-full flex flex-col p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[40px] group">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-brand-blue/10 text-brand-blue rounded-2xl group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">{item.title}</h3>
                </div>

                <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed text-lg min-h-[60px]">{item.desc}</p>

                <div className="space-y-4 mt-auto">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-transparent hover:border-brand-green/20 transition-all">
                      <div className="w-2 h-2 rounded-full bg-brand-green flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      <span className="font-bold text-sm">{feat}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;

