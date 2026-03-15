'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import CTABanner from '@/components/ui/CTABanner';
import FadeInSection from '@/components/ui/FadeInSection';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));

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
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subheading max-w-2xl mx-auto"
          >
            Find answers to common questions about our services, processes, and how we can help you.
          </motion.p>
        </div>
      </section>

      {/* FAQ by Category */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          {categories.map((category, categoryIndex) => {
            const categoryItems = FAQ_ITEMS.filter((item) => item.category === category);

            return (
              <FadeInSection key={category} delay={categoryIndex * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  {/* Category Title */}
                  <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-primary-600 rounded" />
                    {category}
                  </h2>

                  {/* FAQ Items */}
                  <div className="space-y-4">
                    {categoryItems.map((item, index) => (
                      <FadeInSection key={item.id} delay={index * 0.05}>
                        <motion.div
                          className="bg-light rounded-xl overflow-hidden border border-gray-200 hover:border-primary-300 transition-colors"
                          whileHover={{ y: -2 }}
                        >
                          <button
                            onClick={() =>
                              setExpandedId(expandedId === item.id ? null : item.id)
                            }
                            className="w-full p-6 text-left hover:bg-white transition-colors flex items-start justify-between gap-4"
                          >
                            <div className="flex-1">
                              <h3 className="font-bold text-navy flex items-center gap-2">
                                <Icons.HelpCircle
                                  size={18}
                                  className="text-primary-600 flex-shrink-0"
                                />
                                {item.question}
                              </h3>
                            </div>
                            <motion.div
                              animate={{
                                rotate: expandedId === item.id ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0 mt-1"
                            >
                              <Icons.ChevronDown size={20} color="#2563EB" />
                            </motion.div>
                          </button>

                          {/* Answer */}
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: expandedId === item.id ? 'auto' : 0,
                              opacity: expandedId === item.id ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0 border-t border-gray-200 text-gray-700 leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        </motion.div>
                      </FadeInSection>
                    ))}
                  </div>
                </motion.div>
              </FadeInSection>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-light">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="section-heading mb-6">Still Have Questions?</h2>
            <p className="section-subheading mb-8">
              Couldn't find the answer you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/contact"
                className="btn-primary"
              >
                Contact Us
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890').replace(/\D/g, '')}?text=Hi, I have a question`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Icons.MessageCircle size={18} />
                WhatsApp Us
              </motion.a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Start Your Journey?"
        subtitle="If you have any other questions, our team is just one click away."
        buttonText="Get Started Today"
        buttonHref="/apply"
      />
    </>
  );
}
