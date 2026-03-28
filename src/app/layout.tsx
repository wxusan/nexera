import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import PopupForm from '@/components/sections/PopupForm';
import { getSiteData } from '@/lib/sheets';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: "Nexera | Chet el ta'limiga ishonchli yo'l",
    template: "%s | Nexera",
  },
  description:
    "Nexera: O'zbekiston talabalariga xorijiy universitetlarga qabul va viza olishda professional yordam ko'rsatuvchi maslahat agentligi. 500+ talaba, 40+ mamlakat.",
  keywords: [
    "chet el ta'limi",
    "xorij universitetiga qabul",
    "talaba vizasi",
    "turist vizasi",
    "biznes vizasi",
    "O'zbekiston",
    "Nexera",
    "ta'lim maslahat",
  ],
  authors: [{ name: 'Nexera' }],
  creator: 'Nexera',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://nexera.uz',
    siteName: 'Nexera',
    title: "Nexera | Chet el ta'limiga ishonchli yo'l",
    description:
      "Xorijiy universitetlarga qabul va viza olishda professional yordam. 500+ talaba muvaffaqiyatli joylashtirildi.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nexera | Chet el ta'limi",
    description: "Xorijiy universitetlarga qabul va viza olishda professional yordam.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();

  return (
    <html lang="uz" className={inter.variable}>
      <head />
      <body className="text-slate-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp telegramUsername={data.content.telegram_username} />
        <PopupForm countries={data.countries} />
      </body>
    </html>
  );
}
