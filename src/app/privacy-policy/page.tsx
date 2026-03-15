'use client';

import { motion } from 'framer-motion';
import FadeInSection from '@/components/ui/FadeInSection';

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 pt-32 sm:pt-40">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-heading mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Last Updated: March 16, 2026
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto prose prose-invert max-w-none">
          <FadeInSection>
            <div className="space-y-8 text-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Introduction</h2>
                <p>
                  EduPath Global ("Company," "we," "us," or "our") operates the EduPath Global website
                  (the "Service"). This page informs you of our policies regarding the collection, use,
                  and disclosure of personal data when you use our Service and the choices you have
                  associated with that data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Information Collection and Use</h2>
                <p className="mb-3">We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                <h3 className="text-xl font-semibold text-navy mb-2">Types of Data Collected</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Personal Data:</strong> Contact information, educational history, visa status, and related documents</li>
                  <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on pages</li>
                  <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Use of Data</h2>
                <p className="mb-3">EduPath Global uses the collected data for various purposes:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our Service</li>
                  <li>To monitor the usage of our Service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Security of Data</h2>
                <p>
                  The security of your data is important to us, but remember that no method of transmission
                  over the Internet or method of electronic storage is 100% secure. While we strive to use
                  commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute
                  security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                  the new Privacy Policy on this page and updating the "Last Updated" date at the top of this
                  Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <strong>Email:</strong> privacy@edupathglobal.com
                  <br />
                  <strong>Address:</strong> 123 Education Lane, Global City, WC 10001, United Kingdom
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
