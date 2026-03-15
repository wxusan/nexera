'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';
import CTABanner from '@/components/ui/CTABanner';
import FadeInSection from '@/components/ui/FadeInSection';
import { SERVICES } from '@/lib/constants';

export const metadata = {
  title: 'Our Services',
  description: 'Comprehensive study abroad services including university admissions and visa processing.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 pt-32 sm:pt-40">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-subheading max-w-2xl mx-auto"
          >
            Comprehensive support for every step of your international education journey. Choose the service that fits your needs.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <FadeInSection key={service.id} delay={index * 0.1}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  color={service.color}
                  variant="large"
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Why Choose EduPath Global?</h2>
              <p className="section-subheading">
                We're committed to making your study abroad dream a reality.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Award',
                title: '500+ Placements',
                description: 'Over 500 students successfully placed at top universities worldwide.',
              },
              {
                icon: 'Users',
                title: 'Expert Consultants',
                description: 'Our team has 15+ years of experience in international education.',
              },
              {
                icon: 'Globe',
                title: '40+ Countries',
                description: 'We support students from and to over 40 countries globally.',
              },
            ].map((item, index) => {
              const IconComponent = (Icons as Record<string, any>)[item.icon] || Icons.Globe;
              return (
                <FadeInSection key={item.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center"
                  >
                    <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent size={28} color="#2563EB" />
                    </div>
                    <h3 className="font-bold text-navy mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Our Process</h2>
              <p className="section-subheading">
                A streamlined approach to ensure your success.
              </p>
            </div>
          </FadeInSection>

          <div className="max-w-3xl mx-auto">
            {[
              { num: '01', title: 'Initial Consultation', desc: 'Understand your goals and needs' },
              { num: '02', title: 'Personalized Planning', desc: 'Create a customized action plan' },
              { num: '03', title: 'Application Support', desc: 'Expert guidance throughout the process' },
              { num: '04', title: 'Success', desc: 'Celebrate your admission and enrollment' },
            ].map((item, index) => (
              <FadeInSection key={item.num} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-6 py-6 border-l-2 border-primary-200 pl-6 hover:border-primary-600 transition-colors"
                >
                  <div className="text-4xl font-bold text-primary-600 flex-shrink-0">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Get Started?"
        subtitle="Choose your service and begin your journey to a world-class education."
        buttonText="Start Application"
        buttonHref="/apply"
      />
    </>
  );
}
