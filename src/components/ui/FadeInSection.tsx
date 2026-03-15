'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function FadeInSection({
  children,
  delay = 0,
  direction = 'up',
}: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  const directionVariants = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: -40, opacity: 0 },
    right: { x: 40, opacity: 0 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          delay,
          ease: 'easeOut',
        },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
