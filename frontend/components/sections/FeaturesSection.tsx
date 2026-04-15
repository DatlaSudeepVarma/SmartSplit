"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Plane, 
  Wallet, 
  Utensils, 
  Film, 
  Gamepad2, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import Card from '../ui/Card';

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

const FeaturesSection = () => {
    const useCases = [
        {
          title: 'Trips',
          icon: Plane,
          gif: '/travel.gif',
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
          gif: '/shopping.gif',
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
          gif: '/food.gif',
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
          gif: '/entertainment.gif',
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
          gif: '/games.gif',
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
          gif: '/Others.gif',
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

    return (
        <section className="py-32 px-6 relative">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 tracking-tighter uppercase italic leading-tight">
                            From coffee <br /> to car rentals.
                        </h2>
                        <p className="text-lg sm:text-2xl text-gray-500 dark:text-gray-400 font-bold">
                            SmartSplit handles every shared expense scenario with effortless precision.
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
                                <Card className={`group relative h-full flex flex-col p-6 sm:p-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[32px] sm:rounded-[48px] border-2 border-transparent hover:border-brand-blue/30 transition-all duration-500 shadow-2xl hover:shadow-[0_30px_100px_-20px_rgba(59,130,246,0.3)]`}>
                                    
                                    {/* Glowing background effect */}
                                    <div className={`absolute -top-20 -right-20 w-40 h-40 ${glowColors[item.color]} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                    <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl transition-all duration-500 group-hover:rotate-12 overflow-hidden flex items-center justify-center ${colorClasses[item.color]}`}>
                                            <img src={item.gif} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400 mb-8 sm:mb-12 leading-relaxed text-base sm:text-xl font-semibold min-h-0 sm:min-h-[80px]">{item.desc}</p>

                                    <div className="space-y-4 sm:space-y-5 mt-auto">
                                        {item.features.map((feat, idx) => (
                                            <motion.div 
                                                key={idx} 
                                                initial={{ opacity: 0.8 }}
                                                whileHover={{ x: 5, opacity: 1 }}
                                                className="flex items-center gap-3 sm:gap-5 text-gray-700 dark:text-gray-200 bg-gray-50/80 dark:bg-black/20 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-transparent hover:bg-white dark:hover:bg-gray-800 transition-all group/feat"
                                            >
                                                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${dotColors[item.color]} flex-shrink-0`} />
                                                <span className="font-bold text-sm sm:text-lg">{feat}</span>
                                                <CheckCircle2 size={18} className="ml-auto opacity-0 group-hover/feat:opacity-100 text-brand-green transition-opacity sm:w-5 sm:h-5"/>
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
    );
};

export default FeaturesSection;
