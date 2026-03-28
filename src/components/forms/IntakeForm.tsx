'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { COUNTRIES, SERVICE_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// ─── SCHEMA ──────────────────────────────────────────────────────────────
const schema = z.object({
  fullName:    z.string().min(2, "Ism va familiyangizni kiriting"),
  phone:       z.string().min(9, "To'g'ri telefon raqam kiriting"),
  telegram:    z.string().min(3, "Telegram username kiriting"),
  serviceType: z.string().min(1, "Xizmat turini tanlang"),
  country:     z.string().min(1, "Mamlakatni tanlang"),
  message:     z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const STEP1_FIELDS = ['fullName', 'phone', 'telegram', 'serviceType'] as const;
const STEP2_FIELDS = ['country'] as const;

// ─── FIELD COMPONENTS ────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputCls = (error?: string) => cn(
  "w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none",
  "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  error
    ? "border-red-300 bg-red-50"
    : "border-slate-200 bg-white hover:border-slate-300"
);

export default function IntakeForm({ onSuccess, countries: countriesProp }: { onSuccess?: () => void; countries?: string[] }) {
  const countries = countriesProp ?? COUNTRIES;
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  const goNext = async () => {
    const valid = await trigger(STEP1_FIELDS as unknown as (keyof FormData)[]);
    if (valid) setStep(2);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError('');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setServerError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring yoki WhatsApp orqali bog'laning.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Murojaatingiz qabul qilindi!</h3>
        <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
          Mutaxassisimiz <span className="font-semibold text-blue-600">24 soat ichida</span> siz bilan
          bog'lanadi. Sabr qiling!
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-900 mb-1">Bepul maslahat olish</h3>
        <p className="text-slate-500 text-sm">Formani to'ldiring, biz sizga yozamiz.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2].map((n) => (
          <div key={n} className="flex items-center gap-2 flex-1">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
              step >= n ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
            )}>
              {n}
            </div>
            <div className={cn(
              "flex-1 h-1 rounded-full transition-all duration-300",
              n === 1 ? (step >= 2 ? "bg-blue-600" : "bg-slate-100") : "hidden"
            )} />
          </div>
        ))}
        <span className="text-xs text-slate-400 font-medium">{step}/2</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Field label="Ism va familiya *" error={errors.fullName?.message}>
                <input
                  {...register('fullName')}
                  placeholder="Masalan: Aziz Rahimov"
                  className={inputCls(errors.fullName?.message)}
                />
              </Field>

              <Field label="Telefon raqam *" error={errors.phone?.message}>
                <input
                  {...register('phone')}
                  placeholder="+998 90 000 00 00"
                  type="tel"
                  className={inputCls(errors.phone?.message)}
                />
              </Field>

              <Field label="Telegram username *" error={errors.telegram?.message}>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">@</span>
                  <input
                    {...register('telegram')}
                    placeholder="username"
                    className={cn(inputCls(errors.telegram?.message), 'pl-8')}
                  />
                </div>
              </Field>

              <Field label="Xizmat turi *" error={errors.serviceType?.message}>
                <select {...register('serviceType')} className={inputCls(errors.serviceType?.message)}>
                  <option value="">Xizmat turini tanlang</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </Field>

              <motion.button
                type="button"
                onClick={goNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary justify-center mt-2"
              >
                Keyingisi <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Field label="Qaysi mamlakatga bormoqchisiz? *" error={errors.country?.message}>
                <select {...register('country')} className={inputCls(errors.country?.message)}>
                  <option value="">Mamlakatni tanlang</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field label="Qo'shimcha ma'lumot (ixtiyoriy)" error={undefined}>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="O'qimoqchi bo'lgan yo'nalish, maqsad, savollar..."
                  className={cn(inputCls(), "resize-none")}
                />
              </Field>

              {serverError && (
                <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{serverError}</p>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <ArrowLeft size={15} /> Orqaga
                </button>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="flex-1 btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Yuborilmoqda...</>
                  ) : (
                    <>Yuborish <ArrowRight size={16} /></>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
