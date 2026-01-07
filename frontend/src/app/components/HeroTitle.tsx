import { motion } from 'motion/react';

interface HeroTitleProps {
  children: string;
  className?: string;
}

export function HeroTitle({ children, className = '' }: HeroTitleProps) {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 16,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block mr-3 md:mr-4 lg:mr-5"
          variants={child}
          style={{ transformOrigin: 'bottom' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
