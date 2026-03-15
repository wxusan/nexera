'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import CTABanner from '@/components/ui/CTABanner';
import FadeInSection from '@/components/ui/FadeInSection';
import { SERVICE_DETAILS } from '@/lib/constants';

const service = SERVICE_DETAILS['tourist-visa'];

export default function TouristVisaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-50 pt-32 sm:pt-40">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Link href="/services" className="hover:text-amber-600">
                Services
              </Link>
              <Icons.ChevronRight size={16} />
              <span className="text-navy font-semibold">{service.title}</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-heading mb-4"
            >
              {service.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-subheading max-w-2xl"
            >
              {service.description}
            </motion.p>
          </FadeInSection>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <h2 className="section-heading mb-8">What's Included</h2>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-12">
            <FadeInSection direction="left">
              <div className="space-y-4">
                {service.whatsIncluded.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icons.Check size={16} color="#F59E0B" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </FadeInSection>

            <FadeInSection direction="right">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl">
                <h3 className="font-bold text-navy mb-6">Service Highlights</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Approval Rate</p>
                    <p className="text-2xl font-bold text-amber-600">94%</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Processing Speed</p>
                    <p className="text-2xl font-bold text-amber-600">2-4 Weeks</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Destinations</p>
                    <p className="text-2xl font-bold text-amber-600">100+</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Service Steps */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <h2 className="section-heading mb-8">Our Process</h2>
          </FadeInSection>

          <div className="space-y-6">
            {service.steps.map((step, index) => (
              <FadeInSection key={step.step} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex gap-6"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-amber-600">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="section-heading mb-8 text-center">Required Documents</h2>
          </FadeInSection>

          <div className="space-y-4">
            {service.documents.map((doc, index) => (
              <FadeInSection key={doc} delay={index * 0.05}>
                <motion.div
                  className="bg-light p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-3">
                    <Icons.FileText size={20} className="text-amber-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{doc}</span>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-light">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="section-heading mb-8 text-center">Frequently Asked Questions</h2>
          </FadeInSection>

          <div className="space-y-4">
            {service.faq.map((item, index) => (
              <FadeInSection key={index} delay={index * 0.05}>
                <motion.div
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-amber-300 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <div className="p-6 cursor-pointer hover:bg-amber-50 transition-colors">
                    <h3 className="font-bold text-navy flex items-center gap-2">
                      <Icons.HelpCircle size={18} className="text-amber-600 flex-shrink-0" />
                      {item.q}
                    </h3>
                    <p className="text-gray-600 mt-3">{item.a}</p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Plan Your Trip with Confidence"
        subtitle="Get your tourist visa processed smoothly and quickly."
        buttonText="Apply for Tourist Visa"
        buttonHref="/apply?service=tourist-visa"
      />
    </>
  );
}
