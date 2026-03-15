'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import TestimonialCard from '@/components/ui/TestimonialCard';
import CTABanner from '@/components/ui/CTABanner';
import FadeInSection from '@/components/ui/FadeInSection';
import { TESTIMONIALS, SERVICES } from '@/lib/constants';

export default function SuccoriesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = useMemo(
    () => Array.from(new Set(TESTIMONIALS.map((t) => t.country))),
    []
  );

  const filteredTestimonials = useMemo(
    () => {
      let filtered = TESTIMONIALS;

      if (selectedCountry) {
        filtered = filtered.filter((t) => t.country === selectedCountry);
      }

      return filtered;
    },
    [selectedCountry]
  );

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 pt-32 sm:pt-40">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-heading mb-4"
          >
            Success Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subheading max-w-2xl mx-auto"
          >
            Meet the students who achieved their dreams with EduPath Global. These are real stories from real students.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { number: '500+', label: 'Students Placed' },
                { number: '96%', label: 'Success Rate' },
                { number: '80+', label: 'Universities' },
                { number: '40+', label: 'Countries' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-light p-6 rounded-xl"
                >
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-navy mb-4">Filter Stories</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">By Country of Origin</p>
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCountry(null)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCountry === null
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-navy hover:bg-gray-100'
                      }`}
                    >
                      All Countries ({TESTIMONIALS.length})
                    </motion.button>
                    {countries.map((country) => {
                      const count = TESTIMONIALS.filter(
                        (t) => t.country === country
                      ).length;
                      return (
                        <motion.button
                          key={country}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCountry(country)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedCountry === country
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-navy hover:bg-gray-100'
                          }`}
                        >
                          {country} ({count})
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          {filteredTestimonials.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {filteredTestimonials.map((testimonial, index) => (
                <FadeInSection key={testimonial.id} delay={index * 0.05}>
                  <TestimonialCard {...testimonial} />
                </FadeInSection>
              ))}
            </motion.div>
          ) : (
            <FadeInSection>
              <div className="text-center py-12">
                <Icons.Search size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">
                  No success stories found for the selected filters.
                </p>
              </div>
            </FadeInSection>
          )}
        </div>
      </section>

      {/* Why Students Choose Us */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Why Students Choose Us</h2>
              <p className="section-subheading">
                Real benefits from working with EduPath Global.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Zap',
                title: 'Faster Processing',
                description: 'Quick visa approvals and admissions through our partnerships.',
              },
              {
                icon: 'Target',
                title: 'Personalized Guidance',
                description: 'Customized strategies based on your unique profile and goals.',
              },
              {
                icon: 'Heart',
                title: 'Expert Support',
                description: 'Dedicated consultants with 15+ years of experience.',
              },
              {
                icon: 'Star',
                title: 'Proven Results',
                description: '96% success rate with 500+ students placed worldwide.',
              },
            ].map((item, index) => {
              const IconComponent = (Icons as Record<string, any>)[item.icon] || Icons.Globe;
              return (
                <FadeInSection key={item.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <IconComponent size={24} color="#2563EB" />
                    </div>
                    <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Write Your Success Story?"
        subtitle="Join hundreds of successful students who trusted EduPath Global with their dreams."
        buttonText="Start Your Application"
        buttonHref="/apply"
      />
    </>
  );
}
