'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import CTABanner from '@/components/ui/CTABanner';
import FadeInSection from '@/components/ui/FadeInSection';
import { PROCESS_STEPS, FAQ_ITEMS } from '@/lib/constants';

export default function ProcessPage() {
  const processSteps = PROCESS_STEPS;
  const processFAQ = FAQ_ITEMS.filter(item => item.category === 'Services' || item.category === 'General').slice(0, 4);

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
            How We Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subheading max-w-2xl mx-auto"
          >
            Our streamlined 6-step process ensures you receive expert guidance at every stage of your international education journey.
          </motion.p>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8 sm:space-y-12">
            {processSteps.map((step, index) => {
              const IconComponent = (Icons as Record<string, any>)[step.icon] || Icons.Globe;
              const isEven = index % 2 === 0;

              return (
                <FadeInSection key={step.number} delay={index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`grid md:grid-cols-2 gap-8 items-center ${!isEven ? 'md:direction-rtl' : ''}`}
                  >
                    {/* Content */}
                    <div className={isEven ? 'md:col-span-1' : 'md:col-span-1 md:order-2'}>
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                          <Icons.Clock size={16} />
                          {step.timeline}
                        </div>
                        <h3 className="text-2xl font-bold text-navy">
                          Step {step.number}: {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Icon Section */}
                    <div className={isEven ? 'md:col-span-1 md:order-2' : 'md:col-span-1'}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-12 flex items-center justify-center h-80 border-2 border-primary-100">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <IconComponent size={40} color="#2563EB" />
                            </div>
                            <div className="text-5xl font-bold text-primary-600 mb-2">
                              {step.number}
                            </div>
                          </div>
                        </div>
                        {index < processSteps.length - 1 && (
                          <div className="hidden md:block absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-primary-300">
                            <Icons.ChevronDown size={32} />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Milestones */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Key Milestones</h2>
              <p className="section-subheading">
                Important dates and deadlines in your journey.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Initial Consultation', time: '1-2 days' },
              { label: 'Document Preparation', time: '2-4 weeks' },
              { label: 'Application Process', time: '2-4 weeks' },
              { label: 'Admission & Visa', time: '2-3 months' },
            ].map((milestone, index) => (
              <FadeInSection key={milestone.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-navy mb-2">{milestone.label}</h4>
                  <p className="text-sm text-gray-600">{milestone.time}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">What to Expect</h2>
              <p className="section-subheading">
                Regular communication and support throughout your journey.
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-4">
            {[
              'Weekly progress updates via email or WhatsApp',
              'Personalized action plans tailored to your goals',
              'Expert feedback on all application materials',
              'Interview preparation and coaching sessions',
              'Access to our resource library and templates',
              'Post-enrollment support and guidance',
            ].map((item, index) => (
              <FadeInSection key={item} delay={index * 0.05}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-4 bg-light rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
                >
                  <Icons.CheckCircle size={24} className="text-primary-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-light">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Frequently Asked Questions</h2>
            </div>
          </FadeInSection>

          <div className="space-y-4">
            {processFAQ.map((item, index) => (
              <FadeInSection key={item.id} delay={index * 0.05}>
                <motion.div
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary-300 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <div className="p-6 cursor-pointer hover:bg-blue-50 transition-colors">
                    <h3 className="font-bold text-navy flex items-center gap-2">
                      <Icons.HelpCircle size={18} className="text-primary-600 flex-shrink-0" />
                      {item.question}
                    </h3>
                    <p className="text-gray-600 mt-3">{item.answer}</p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Begin Your Journey?"
        subtitle="Let's start with a free consultation to understand your goals and create a personalized action plan."
        buttonText="Schedule Consultation"
        buttonHref="/apply"
      />
    </>
  );
}
