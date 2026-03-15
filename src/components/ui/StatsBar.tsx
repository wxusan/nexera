'use client';

import AnimatedCounter from './AnimatedCounter';
import { STATS } from '@/lib/constants';

export default function StatsBar() {
  return (
    <section className="bg-navy py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedCounter
                target={stat.number}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <p className="text-white mt-3 text-sm sm:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
