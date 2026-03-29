'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Globe, Award, Mail, Send, Info } from 'lucide-react';
import IntakeForm from '@/components/forms/IntakeForm';

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
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 pt-32 sm:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight"
          >
            Ariza topshirish
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            Xorijiy universitetga o&apos;qishga kirish yo&apos;lingizda birinchi qadamni qo&apos;ying.
            Formani to&apos;ldiring — mutaxassisimiz 24 soat ichida siz bilan bog&apos;lanadi.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <IntakeForm countries={countries} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Trust indicators */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm">Nima uchun Nexera?</h3>
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle, text: '500+ talaba muvaffaqiyatli joylashtirildi' },
                    { icon: Award,        text: '96% muvaffaqiyat darajasi' },
                    { icon: Clock,        text: '24 soat ichida javob' },
                    { icon: Globe,        text: '40+ mamlakatda hamkorlik' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="bg-blue-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-3 text-sm">Savollaringiz bormi?</h3>
                <p className="text-blue-100 text-xs mb-4 leading-relaxed">
                  Jarayon haqida savol bo&apos;lsa, biz bilan bog&apos;laning — bepul maslahat beramiz.
                </p>
                <div className="space-y-2.5">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex items-center gap-2 text-xs hover:text-blue-100 transition-colors"
                  >
                    <Mail size={14} />
                    {contactEmail}
                  </a>
                  <a
                    href={`https://t.me/${telegramUsername}?text=Assalomu+aleykum.+Konsultatsiya+olmoqchi+edim.+Yordam+berolasizmi%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs hover:text-blue-100 transition-colors"
                  >
                    <Send size={14} />
                    @{telegramUsername}
                  </a>
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                  <Info size={15} className="text-blue-600" />
                  Keyingi qadamlar
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold text-xs mt-0.5">1.</span> Arizangizni ko&apos;rib chiqamiz</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold text-xs mt-0.5">2.</span> Qulay vaqtda qo&apos;ng&apos;iroq qilamiz</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold text-xs mt-0.5">3.</span> Shaxsiy harakat rejasini tuzamiz</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold text-xs mt-0.5">4.</span> Birgalikda maqsadga erishamiz</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
