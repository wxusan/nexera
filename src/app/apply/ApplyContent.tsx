'use client';

import { motion } from 'framer-motion';
import IntakeForm from '@/components/forms/IntakeForm';
import FadeInSection from '@/components/ui/FadeInSection';
import * as Icons from 'lucide-react';

export default function ApplyContent({
  countries,
  contactEmail,
  telegramUsername,
}: {
  countries: string[];
  contactEmail: string;
  telegramUsername: string;
}) {
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
            Start Your Application
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subheading max-w-2xl mx-auto"
          >
            Take the first step towards your international education goals. Fill out this form and our consultants will be in touch within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <FadeInSection>
                <div className="bg-light p-8 rounded-xl">
                  <IntakeForm countries={countries} />
                </div>
              </FadeInSection>
            </div>

            {/* Sidebar */}
            <div>
              <FadeInSection direction="right">
                <motion.div
                  className="sticky top-24 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Trust Indicators */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-navy mb-4">Why Choose Us</h3>
                    <div className="space-y-4">
                      {[
                        { icon: 'CheckCircle', text: '500+ students placed' },
                        { icon: 'Award', text: '96% success rate' },
                        { icon: 'Clock', text: '24-hour response time' },
                        { icon: 'Globe', text: 'Partner in 40+ countries' },
                      ].map((item, index) => {
                        const IconComponent = (Icons as Record<string, any>)[item.icon] || Icons.CheckCircle;
                        return (
                          <motion.div
                            key={item.text}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <IconComponent size={20} className="text-primary-600 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item.text}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Card */}
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white">
                    <h3 className="font-bold mb-4">Need Help?</h3>
                    <p className="text-sm text-blue-100 mb-4">
                      Have questions? Our team is here to help.
                    </p>
                    <div className="space-y-3">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="flex items-center gap-2 text-sm hover:text-blue-100 transition-colors"
                      >
                        <Icons.Mail size={16} />
                        {contactEmail}
                      </a>
                      <a
                        href={`https://t.me/${telegramUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-blue-100 transition-colors"
                      >
                        <Icons.MessageCircle size={16} />
                        @{telegramUsername}
                      </a>
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-primary-200">
                    <h4 className="font-bold text-navy mb-3 flex items-center gap-2">
                      <Icons.Info size={18} />
                      What to Expect
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Review your application</li>
                      <li>• Schedule a consultation call</li>
                      <li>• Create your action plan</li>
                      <li>• Start your journey</li>
                    </ul>
                  </div>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
