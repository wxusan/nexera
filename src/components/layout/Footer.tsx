import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';
import { getSiteData } from '@/lib/sheets';

const NAV_LINKS = [
  { label: "Xizmatlar",       href: "#xizmatlar" },
  { label: "Jarayon",         href: "#jarayon" },
  { label: "Muvaffaqiyatlar", href: "#muvaffaqiyatlar" },
  { label: "Universitetlar",  href: "#universitetlar" },
  { label: "Biz haqimizda",   href: "#haqimizda" },
  { label: "FAQ",             href: "#faq" },
];

export default async function Footer() {
  const { content } = await getSiteData();

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-2xl font-black text-white tracking-tight">Nexera</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mb-3" />
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              {content.footer_tagline}
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16} />, href: `https://instagram.com/${content.instagram_username}`, label: 'Instagram' },
                { icon: <Send size={16} />,      href: `https://t.me/${content.telegram_username}`,          label: 'Telegram'  },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Sahifalar</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Aloqa</h4>
            <ul className="space-y-3">
              {[
                { icon: <Phone size={15} />,  text: content.contact_phone },
                { icon: <Mail size={15} />,   text: content.contact_email },
                { icon: <MapPin size={15} />, text: content.contact_address },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm">
                  <span className="text-blue-400 flex-shrink-0">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Nexera. Barcha huquqlar himoyalangan.</span>
        </div>
      </div>
    </footer>
  );
}
