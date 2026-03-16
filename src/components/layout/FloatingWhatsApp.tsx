'use client';

import { motion } from 'framer-motion';

export default function FloatingTelegram() {
  const username = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? 'nexera_uz';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6 }}
        className="bg-white rounded-xl shadow-lg border border-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 whitespace-nowrap"
      >
        Telegram orqali yozing
      </motion.div>

      {/* Telegram button */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-25" />
        <a
          href={`https://t.me/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram orqali bog'laning"
          className="relative w-14 h-14 bg-[#229ED9] hover:bg-[#1a8fbf] rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
