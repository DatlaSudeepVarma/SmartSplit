"use client";

import { motion } from "motion/react";

export interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: "letters" | "words";
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  initialY?: number;
  initialOpacity?: number;
  animateY?: number;
  animateOpacity?: number;
  /** Increment on hover/click to replay letter stagger. 0 = static label. */
  replayKey?: number;
}

export default function AnimatedText({
  text,
  className = "text-4xl font-bold",
  animationType = "letters",
  duration = 0.6,
  delay = 0,
  staggerDelay = 0.05,
  initialY = 10,
  initialOpacity = 0,
  animateY = 0,
  animateOpacity = 1,
  replayKey = 0,
}: AnimatedTextProps) {
  if (replayKey === 0) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: initialY,
      opacity: initialOpacity,
    },
    visible: {
      y: animateY,
      opacity: animateOpacity,
      transition: {
        duration,
        ease: "easeOut" as const,
      },
    },
  };

  const renderLetters = () =>
    text.split("").map((char, index) => (
      <motion.span
        key={`${replayKey}-${index}`}
        variants={itemVariants}
        className="inline-block"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </motion.span>
    ));

  const renderWords = () =>
    text.split(" ").map((word, index) => (
      <motion.span
        key={`${replayKey}-${index}`}
        variants={itemVariants}
        className="mr-2 inline-block"
      >
        {word}
      </motion.span>
    ));

  return (
    <motion.span
      key={replayKey}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {animationType === "letters" ? renderLetters() : renderWords()}
    </motion.span>
  );
}
