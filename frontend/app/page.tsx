"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
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
  Gamepad2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Star
} from 'lucide-react';
import Card from '../components/ui/Card';

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

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
      ],
      color: "brand-blue"
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
      ],
      color: "brand-green"
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
      ],
      color: "brand-orange"
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
      ],
      color: "brand-red"
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
      ],
      color: "brand-skyblue"
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
      ],
      color: "brand-green"
    }
  ];

  const workflowSteps = [
    {
      title: "Create a Trip",
      desc: "Add your friends and set a group name. No login required for them initially.",
      icon: Users
    },
    {
      title: "Add Expenses",
      desc: "Add who paid and how to split. Use our AI scan to save time.",
      icon: Receipt
    },
    {
      title: "Settle Up",
      desc: "One click to see the final tally. Use UPI or Apps to settle directly.",
      icon: CheckCircle2
    }
  ];

  const stats = [
    { label: "Trips Created", value: "10K+", icon: Globe },
    { label: "Settled Bills", value: "50K+", icon: Zap },
    { label: "AI Suggestions", value: "2M+", icon: Bot },
    { label: "Active Users", value: "100K+", icon: Users }
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

  const [particles, setParticles] = useState<{ x: number, y: number, op: number, dur: number }[]>([]);

  React.useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      op: 0.1 + Math.random() * 0.3,
      dur: 10 + Math.random() * 20
    })));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-brand-blue/30 to-brand-green/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-tr from-brand-green/30 to-brand-orange/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Floating Particles/Shapes Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${p.x}%`, 
              y: `${p.y}%`,
              opacity: p.op
            }}
            animate={{
              y: ["-20px", "20px", "-20px"],
              x: ["-20px", "20px", "-20px"],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-2 h-2 sm:w-4 sm:h-4 bg-brand-blue/20 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-44 pb-20 sm:pb-32 px-6 relative overflow-visible">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black mb-10 leading-[1] text-gray-900 dark:text-white tracking-tighter uppercase italic">
              SPLIT BILLS, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-blue to-brand-skyblue">
                NOT FRIENDSHIPS.
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-semibold"
          >
            The world's most intelligent expense tracker. 
            Stop the awkward math and start enjoying the moment.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/register')} 
              className="group relative px-12 py-6 text-2xl font-black text-white bg-brand-green rounded-3xl shadow-[0_20px_50px_-10px_rgba(34,197,94,0.5)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, border: "2px solid var(--color-brand-blue)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/login')} 
              className="px-12 py-6 text-2xl font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border-2 border-transparent rounded-3xl shadow-xl transition-all"
            >
              Log In
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
          >
             <div className="flex items-center gap-2 font-black text-2xl"><ShieldCheck /> SECURE</div>
             <div className="flex items-center gap-2 font-black text-2xl"><Smartphone /> MOBILE FIRST</div>
             <div className="flex items-center gap-2 font-black text-2xl"><Star /> 4.9 RATING</div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 bg-white/40 dark:bg-gray-900/40 backdrop-blur-3xl border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 inline-flex p-4 bg-brand-blue/10 rounded-2xl text-brand-blue">
                <stat.icon size={32} />
              </div>
              <h4 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-2">{stat.value}</h4>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4 italic uppercase">How it works</h2>
            <div className="h-2 w-32 bg-brand-green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="text-8xl font-black text-gray-100 dark:text-gray-900 absolute -top-12 -left-4 z-0 group-hover:text-brand-green/20 transition-colors">
                  0{i+1}
                </div>
                <div className="relative z-10 flex flex-col items-start gap-6">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-[32px] shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-gray-100 dark:border-gray-700">
                    <step.icon size={44} className="text-brand-green" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-12 translate-y-[-50%] z-0">
                    <ArrowRight className="text-gray-200 dark:text-gray-800" size={40} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with 3D Tilt */}
      <section className="py-32 px-6 relative">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl sm:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase italic">
                Everything <br /> you need.
              </h2>
              <p className="text-2xl text-gray-500 dark:text-gray-400 font-bold">
                Powerful features designed for every shared spending scenario.
              </p>
            </div>
            <motion.div 
               whileHover={{ scale: 1.05 }}
               className="bg-brand-blue/10 px-8 py-4 rounded-full text-brand-blue font-black flex items-center gap-2 cursor-pointer"
            >
              EXPLORE ALL FEATURES <ArrowRight size={20} />
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {useCases.map((item, i) => {
              const colorClasses: Record<string, string> = {
                "brand-blue": "bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.6)]",
                "brand-green": "bg-brand-green/10 text-brand-green group-hover:bg-brand-green shadow-[0_0_15px_rgba(34,197,94,0.6)]",
                "brand-orange": "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange shadow-[0_0_15px_rgba(249,115,22,0.6)]",
                "brand-red": "bg-brand-red/10 text-brand-red group-hover:bg-brand-red shadow-[0_0_15px_rgba(239,68,68,0.6)]",
                "brand-skyblue": "bg-brand-skyblue/10 text-brand-skyblue group-hover:bg-brand-skyblue shadow-[0_0_15px_rgba(14,165,233,0.6)]",
              };

              const dotColors: Record<string, string> = {
                "brand-blue": "bg-brand-blue",
                "brand-green": "bg-brand-green",
                "brand-orange": "bg-brand-orange",
                "brand-red": "bg-brand-red",
                "brand-skyblue": "bg-brand-skyblue",
              };

              const glowColors: Record<string, string> = {
                "brand-blue": "bg-brand-blue/10",
                "brand-green": "bg-brand-green/10",
                "brand-orange": "bg-brand-orange/10",
                "brand-red": "bg-brand-red/10",
                "brand-skyblue": "bg-brand-skyblue/10",
              };

              return (
                <TiltCard key={i} className="h-full">
                  <Card className={`group relative h-full flex flex-col p-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl rounded-[48px] border-2 border-transparent hover:border-brand-blue/30 transition-all duration-500 shadow-2xl hover:shadow-[0_30px_100px_-20px_rgba(59,130,246,0.3)]`}>
                    
                    {/* Glowing background effect */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 ${glowColors[item.color]} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                    <div className="flex items-center gap-6 mb-10">
                      <div className={`p-5 rounded-3xl transition-all duration-500 group-hover:rotate-12 group-hover:text-white ${colorClasses[item.color]}`}>
                        <item.icon size={40} />
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 mb-12 leading-relaxed text-xl font-semibold min-h-[80px]">{item.desc}</p>

                    <div className="space-y-5 mt-auto">
                      {item.features.map((feat, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0.8 }}
                          whileHover={{ x: 5, opacity: 1 }}
                          className="flex items-center gap-5 text-gray-700 dark:text-gray-200 bg-gray-50/80 dark:bg-black/20 p-5 rounded-2xl border border-transparent hover:bg-white dark:hover:bg-gray-800 transition-all group/feat"
                        >
                          <div className={`w-3 h-3 rounded-full ${dotColors[item.color]} flex-shrink-0`} />
                          <span className="font-bold text-lg">{feat}</span>
                          <CheckCircle2 className="ml-auto opacity-0 group-hover/feat:opacity-100 text-brand-green transition-opacity" size={20}/>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </TiltCard>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto bg-brand-blue rounded-[64px] p-12 sm:p-24 relative overflow-hidden">
          {/* Decorative stuff */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-skyblue/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl sm:text-7xl font-black text-white mb-10 leading-tight uppercase italic tracking-tighter">
                Ready to <br /> stop the math?
              </h2>
              <p className="text-2xl text-brand-blue-50 font-bold mb-12 text-blue-100">
                Join 100,000+ users who split smarter with SmartSplit. 
                Available on Web, iOS, and Android.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <button onClick={() => router.push('/register')} className="px-12 py-6 bg-white text-brand-blue rounded-3xl font-black text-2xl hover:scale-105 transition-transform shadow-2xl">
                  Get Started Free
                </button>
                <button className="px-12 py-6 border-2 border-white/30 text-white rounded-3xl font-black text-2xl hover:bg-white/10 transition-colors">
                  View Demo
                </button>
              </div>
            </div>
            
            <div className="flex-1 relative group">
              <motion.div
                initial={{ rotate: 10, y: 50, opacity: 0 }}
                whileInView={{ rotate: -5, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring" }}
                className="bg-white/20 backdrop-blur-md p-4 rounded-[40px] shadow-2xl border border-white/30"
              >
                {/* Mock Card UI */}
                <div className="bg-gray-900 rounded-[32px] p-8 aspect-[9/16] w-full max-w-[320px] mx-auto flex flex-col text-white">
                  <div className="flex justify-between items-center mb-10">
                    <div className="w-12 h-12 bg-brand-green rounded-full" />
                    <div className="text-xl font-black">€ 1,240.50</div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-12 bg-white/10 rounded-2xl w-full" />
                    <div className="h-12 bg-white/10 rounded-2xl w-[80%]" />
                    <div className="h-40 bg-brand-blue/30 rounded-3xl w-full border border-brand-blue/50 flex flex-col items-center justify-center gap-4">
                      <div className="text-xs uppercase tracking-widest font-black opacity-60">Settle Up</div>
                      <div className="text-2xl font-black">All Expenses</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simplified for landing) */}
      <footer className="py-20 px-6 border-t border-gray-100 dark:border-gray-900">
         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10 opacity-50">
            <div className="font-black text-3xl italic tracking-tighter">SMARTSPLIT</div>
            <div className="flex gap-10 font-bold">
              <a href="#" className="hover:text-brand-blue transition-colors">Terms</a>
              <a href="#" className="hover:text-brand-blue transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-blue transition-colors">Twitter</a>
              <a href="#" className="hover:text-brand-blue transition-colors">Contact</a>
            </div>
            <div className="font-bold">© 2026 SmartSplit Inc.</div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;


