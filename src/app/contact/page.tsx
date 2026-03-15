'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import FadeInSection from '@/components/ui/FadeInSection';

export default function ContactPage() {
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+1234567890').replace(/\D/g, '');

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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subheading max-w-2xl mx-auto"
          >
            Have questions? We'd love to hear from you. Get in touch with our team and let's discuss your study abroad goals.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <FadeInSection>
                <div className="bg-light p-8 rounded-xl">
                  <h2 className="text-2xl font-bold text-navy mb-6">Send us a Message</h2>
                  <ContactForm />
                </div>
              </FadeInSection>
            </div>

            {/* Contact Info */}
            <FadeInSection direction="right">
              <div className="space-y-6">
                {/* Email */}
                <motion.a
                  whileHover={{ y: -4 }}
                  href="mailto:info@edupathglobal.com"
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icons.Mail size={24} color="#2563EB" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">info@edupathglobal.com</p>
                  <p className="text-xs text-gray-500 mt-2">We respond within 24 hours</p>
                </motion.a>

                {/* Phone */}
                <motion.a
                  whileHover={{ y: -4 }}
                  href="tel:+15550000000"
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icons.Phone size={24} color="#2563EB" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm">+1 (555) 000-0000</p>
                  <p className="text-xs text-gray-500 mt-2">Mon-Fri, 9am-6pm UTC</p>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  whileHover={{ y: -4 }}
                  href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in your services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-green-200"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icons.MessageCircle size={24} color="#10B981" />
                  </div>
                  <h3 className="font-bold text-green-900 mb-2">WhatsApp</h3>
                  <p className="text-green-700 text-sm">Quick chat support</p>
                  <p className="text-xs text-green-600 mt-2">Instant messaging available</p>
                </motion.a>

                {/* Address */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icons.MapPin size={24} color="#2563EB" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">Address</h3>
                  <p className="text-gray-600 text-sm">
                    123 Education Lane<br />
                    Global City, WC 10001<br />
                    United Kingdom
                  </p>
                </motion.div>

                {/* Hours */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-light p-6 rounded-xl border border-gray-200"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icons.Clock size={24} color="#2563EB" />
                  </div>
                  <h3 className="font-bold text-navy mb-3">Office Hours</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM UTC</p>
                    <p>Saturday: 10:00 AM - 4:00 PM UTC</p>
                    <p>Sunday: Closed</p>
                  </div>
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-padding bg-light">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl font-bold text-navy mb-8">Visit Us</h2>
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <Icons.MapPin size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-600 font-semibold">Map Integration Coming Soon</p>
                <p className="text-sm text-gray-500 mt-2">123 Education Lane, Global City, WC 10001</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="section-heading">Still Have Questions?</h2>
              <p className="section-subheading">
                Check out our FAQ page for common questions and answers.
              </p>
            </div>
          </FadeInSection>

          <div className="text-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/faq"
              className="btn-primary inline-flex items-center gap-2"
            >
              Browse FAQs
              <Icons.ArrowRight size={18} />
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
}
