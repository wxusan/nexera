'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const currentCount = Math.floor(progress * target);
      setCount(currentCount);

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl font-bold text-primary-600">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
    </motion.div>
  );
}
