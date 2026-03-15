'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  country: string;
  university: string;
  program: string;
  quote: string;
  rating: number;
  flag: string;
}

export default function TestimonialCard({
  name,
  country,
  university,
  program,
  quote,
  rating,
  flag,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full p-6 sm:p-8 rounded-xl bg-white card-shadow border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{flag}</div>
          <div>
            <p className="font-semibold text-navy">{name}</p>
            <p className="text-sm text-gray-500">{country}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Icons.Star key={i} size={16} fill="#FFB82C" color="#FFB82C" />
        ))}
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed italic">"{quote}"</p>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-primary-600">{university}</p>
        <p className="text-xs text-gray-500 mt-1">{program}</p>
      </div>
    </motion.div>
  );
}
