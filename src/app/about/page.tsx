'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import CTABanner from '@/components/ui/CTABanner';
import FadeInSection from '@/components/ui/FadeInSection';
import { TEAM_MEMBERS } from '@/lib/constants';

export default function AboutPage() {
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
            About EduPath Global
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subheading max-w-2xl mx-auto"
          >
            Empowering students worldwide to achieve their dreams of studying abroad.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection direction="left">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-navy">Our Story</h2>
                <p className="text-gray-700 leading-relaxed">
                  EduPath Global was founded in 2015 with a simple mission: to make international education accessible to ambitious students from all backgrounds. What started as a small consulting firm has grown into a trusted partner for hundreds of students pursuing their dreams at top universities worldwide.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our founder, Sarah Williams, studied at Cambridge and witnessed firsthand the challenges students faced when navigating international admissions and visa processes. She decided to create a platform that provides expert guidance, support, and personalized attention to every student.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, our team of experienced consultants works tirelessly to help students achieve their academic goals, secure visas, and successfully enroll in universities across 40+ countries.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection direction="right">
              <div className="bg-gradient-to-br from-primary-100 via-blue-50 to-teal-100 rounded-xl h-96 relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center text-center p-8"
                >
                  <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-lg">
                    <Icons.Globe size={48} className="mx-auto text-primary-600 mb-4" />
                    <p className="text-navy font-bold text-lg">Global Excellence in Education</p>
                    <p className="text-gray-600 text-sm mt-2">Connecting students to world-class universities</p>
                  </div>
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Our Values</h2>
              <p className="section-subheading">
                The principles that guide everything we do.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Heart',
                title: 'Student-Centric',
                description: 'We put our students first, providing personalized support every step of the way.',
              },
              {
                icon: 'Award',
                title: 'Excellence',
                description: 'We strive for the highest standards in everything we do, from advice to execution.',
              },
              {
                icon: 'Handshake',
                title: 'Integrity',
                description: 'We believe in transparency, honesty, and building long-term relationships of trust.',
              },
            ].map((value, index) => {
              const IconComponent = (Icons as Record<string, any>)[value.icon] || Icons.Globe;
              return (
                <FadeInSection key={value.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent size={32} color="#2563EB" />
                    </div>
                    <h3 className="font-bold text-navy mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Our Expert Team</h2>
              <p className="section-subheading">
                Meet the experienced consultants guiding your journey.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <FadeInSection key={member.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-light rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-br from-primary-100 to-blue-100 h-48 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {member.image}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-navy mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-semibold text-sm mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-700">Specializations:</p>
                      <div className="flex flex-wrap gap-2">
                        {member.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Trusted & Accredited</h2>
              <p className="section-subheading">
                Recognized by leading educational organizations worldwide.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['NAFSA', 'EAIE', 'ICEF', 'ACERI'].map((org, index) => (
              <FadeInSection key={org} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icons.Award size={24} color="#2563EB" />
                  </div>
                  <p className="font-semibold text-navy text-sm">{org}</p>
                  <p className="text-xs text-gray-600 mt-1">Accredited Member</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Work with Us?"
        subtitle="Join hundreds of successful students who trusted us with their dreams."
        buttonText="Start Your Journey"
        buttonHref="/apply"
      />
    </>
  );
}
