'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  color?: string;
  variant?: 'default' | 'large';
}

export default function ServiceCard({
  icon,
  title,
  description,
  href,
  color = '#2563EB',
  variant = 'default',
}: ServiceCardProps) {
  const IconComponent = (Icons as Record<string, any>)[icon] || Icons.Globe;
  const isLarge = variant === 'large';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href}>
        <div
          className={cn(
            'h-full p-6 sm:p-8 rounded-xl bg-white card-shadow cursor-pointer border border-gray-100 hover:border-primary-300',
            isLarge && 'p-8 sm:p-10'
          )}
        >
          <div className="mb-4">
            <div
              className={cn(
                'w-14 h-14 rounded-lg flex items-center justify-center',
                isLarge && 'w-16 h-16'
              )}
              style={{ backgroundColor: color + '20' }}
            >
              <IconComponent
                size={isLarge ? 32 : 28}
                color={color}
              />
            </div>
          </div>
          <h3 className={cn('font-bold text-navy mb-3', isLarge && 'text-xl')}>
            {title}
          </h3>
          <p className={cn('text-gray-600 leading-relaxed', isLarge && 'text-base')}>
            {description}
          </p>
          <div className="mt-4 text-primary-600 font-semibold flex items-center gap-2">
            Learn more
            <Icons.ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
