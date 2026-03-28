'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap } from 'lucide-react';
import IntakeForm from '@/components/forms/IntakeForm';

const INACTIVITY_MS = 45_000;

export default function PopupForm({ countries }: { countries?: string[] }) {
  const [show, setShow]       = useState(false);
  const dismissedRef          = useRef(false);   // ref avoids stale closure
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open  = () => {
    if (dismissedRef.current) return;
    setShow(true);
    dismissedRef.current = true; // only show once
  };

  const close = () => setShow(false);

  useEffect(() => {
    // ── Inactivity timer ────────────────────────────────────────
    const resetTimer = () => {
      if (dismissedRef.current) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(open, INACTIVITY_MS);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer(); // kick off immediately on mount

    // ── Scroll-to-bottom trigger ─────────────────────────────────
    const handleScroll = () => {
      if (dismissedRef.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total    = document.documentElement.scrollHeight;
      if (scrolled >= total - 80) open();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // run once on mount — no deps needed since we use refs

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.92, y: 24  }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto pointer-events-auto">
              <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-blue-600 via-teal-500 to-green-500" />
              <div className="flex items-start justify-between px-6 pt-5 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg leading-tight">Bepul maslahat olish</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Mutaxassisimiz 24 soat ichida bog'lanadi</p>
                  </div>
                </div>
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5"
                  aria-label="Yopish"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="px-6 pb-6 pt-2">
                <IntakeForm onSuccess={close} countries={countries} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
