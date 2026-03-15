'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CTABannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: 'primary' | 'secondary';
}

export default function CTABanner({
  title,
  subtitle,
  buttonText = 'Get Started',
  buttonHref = '/apply',
  variant = 'primary',
}: CTABannerProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`py-16 sm:py-20 lg:py-24 ${isPrimary ? 'bg-gradient-to-r from-primary-600 to-primary-700' : 'bg-gradient-to-r from-navy to-primary-800'}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <Link href={buttonHref}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors duration-200 inline-block"
          >
            {buttonText}
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
}
