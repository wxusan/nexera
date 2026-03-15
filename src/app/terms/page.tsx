'use client';

import { motion } from 'framer-motion';
import FadeInSection from '@/components/ui/FadeInSection';

export default function TermsPage() {
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
            Terms of Service
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
                <h2 className="text-2xl font-bold text-navy mb-3">Agreement to Terms</h2>
                <p>
                  These Terms of Service ("Terms") constitute a legally binding agreement between you
                  and EduPath Global ("Company," "we," "us," or "our") regarding your use of the EduPath
                  Global website and services (the "Service"). By accessing or using our Service, you
                  agree to be bound by these Terms. If you do not agree to abide by the above, please
                  do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information
                  or software) on our Service for personal, non-commercial transitory viewing only.
                  This is the grant of a license, not a transfer of title, and under this license you
                  may not:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on our Service</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Disclaimer</h2>
                <p>
                  The materials on EduPath Global's Service are provided on an "as is" basis. EduPath Global
                  makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties
                  including, without limitation, implied warranties or conditions of merchantability, fitness for
                  a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Limitations</h2>
                <p>
                  In no event shall EduPath Global or its suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to business interruption) arising out of
                  the use or inability to use the materials on EduPath Global's Service, even if EduPath Global or
                  an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Accuracy of Materials</h2>
                <p>
                  The materials appearing on our Service could include technical, typographical, or photographic
                  errors. EduPath Global does not warrant that any of the materials on our Service are accurate,
                  complete, or current. EduPath Global may make changes to the materials contained on our Service
                  at any time without notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Links</h2>
                <p>
                  EduPath Global has not reviewed all of the sites linked to our Service and is not responsible
                  for the contents of any such linked site. The inclusion of any link does not imply endorsement
                  by EduPath Global of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Modifications</h2>
                <p>
                  EduPath Global may revise these Terms of Service for our Service at any time without notice.
                  By using this Service, you are agreeing to be bound by the then current version of these Terms
                  of Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Governing Law</h2>
                <p>
                  These Terms and Conditions and any separate agreements we may have with you relating to our
                  Service are governed by and construed in accordance with the laws of United Kingdom, and you
                  irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                  <br />
                  <strong>Email:</strong> legal@edupathglobal.com
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
