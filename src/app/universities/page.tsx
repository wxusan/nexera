'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import CTABanner from '@/components/ui/CTABanner';
import FadeInSection from '@/components/ui/FadeInSection';
import { UNIVERSITIES } from '@/lib/constants';

export default function UniversitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = useMemo(
    () => Array.from(new Set(UNIVERSITIES.map((uni) => uni.country))),
    []
  );

  const filteredUniversities = useMemo(
    () =>
      selectedCountry
        ? UNIVERSITIES.filter((uni) => uni.country === selectedCountry)
        : UNIVERSITIES,
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
            Partner Universities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subheading max-w-2xl mx-auto"
          >
            We work with over 80+ prestigious universities across 40+ countries to secure placements for our students.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-navy mb-4">Filter by Country</h2>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCountry(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCountry === null
                      ? 'bg-primary-600 text-white'
                      : 'bg-light text-navy hover:bg-gray-200'
                  }`}
                >
                  All Countries ({UNIVERSITIES.length})
                </motion.button>
                {countries.map((country) => {
                  const count = UNIVERSITIES.filter((uni) => uni.country === country).length;
                  return (
                    <motion.button
                      key={country}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCountry(country)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCountry === country
                          ? 'bg-primary-600 text-white'
                          : 'bg-light text-navy hover:bg-gray-200'
                      }`}
                    >
                      {country} ({count})
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </FadeInSection>

          {/* Universities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((university, index) => (
              <FadeInSection key={university.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-light rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200"
                >
                  {/* Logo Area */}
                  <div className="bg-gradient-to-br from-primary-100 to-blue-100 p-8 flex items-center justify-center h-40">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <span className="text-2xl font-bold text-primary-600">
                          {university.logo[0]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">Logo</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-navy mb-2 text-lg">{university.name}</h3>
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                      <Icons.MapPin size={16} />
                      <span>{university.country}</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Programs:</p>
                      <div className="flex flex-wrap gap-2">
                        {university.programs.map((program) => (
                          <span
                            key={program}
                            className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <FadeInSection>
              <div className="text-center py-12">
                <Icons.Search size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">
                  No universities found for the selected country.
                </p>
              </div>
            </FadeInSection>
          )}
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Why Our University Partnerships Matter</h2>
              <p className="section-subheading">
                We've built strong relationships with leading institutions worldwide.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Building2',
                title: '80+ Partner Universities',
                description: 'Carefully selected institutions across multiple continents.',
              },
              {
                icon: 'Users',
                title: 'Direct Relationships',
                description: 'Our consultants maintain direct contacts with admissions teams.',
              },
              {
                icon: 'TrendingUp',
                title: 'Higher Acceptance Rates',
                description: 'Students benefit from our established partnerships and networks.',
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
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Apply to Your Dream University?"
        subtitle="Let our consultants help you identify the best-fit universities and prepare a winning application."
        buttonText="Explore Your Options"
        buttonHref="/apply"
      />
    </>
  );
}
