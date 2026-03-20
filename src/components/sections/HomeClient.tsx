'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  BookOpen, GraduationCap, Plane, Briefcase,
  Calendar, Building2, FileText, Send, CheckCircle, Globe,
  ArrowRight, Star, Phone, Mail, MapPin, ChevronDown,
  Users, Award, TrendingUp, Clock, Shield, Heart,
} from 'lucide-react';
import type { SiteData } from '@/lib/types';
import IntakeForm from '@/components/forms/IntakeForm';
import FAQAccordion from '@/components/sections/FAQAccordion';
import UniversityGlobe from '@/components/sections/UniversityGlobe';

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = (ts: number, t0: number) => {
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame((t) => step(t, t0));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ─── FADE IN ──────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── ICON MAP ─────────────────────────────────────────────────────────────
const IconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={24} />, GraduationCap: <GraduationCap size={24} />,
  Plane: <Plane size={24} />, Briefcase: <Briefcase size={24} />,
  Calendar: <Calendar size={22} />, Building2: <Building2 size={22} />,
  FileText: <FileText size={22} />, Send: <Send size={22} />,
  CheckCircle: <CheckCircle size={22} />, Globe: <Globe size={22} />,
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
    </div>
  );
}

// ─── TESTIMONIALS CAROUSEL ────────────────────────────────────────────────
type Testimonial = SiteData['testimonials'][number];

function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const SPEED = 0.5; // px per frame

  // triple-clone for seamless loop
  const items = [...testimonials, ...testimonials, ...testimonials];
  const CARD_W = 320 + 20; // card width + gap
  const LOOP_W = testimonials.length * CARD_W;

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }
  }, []);

  useEffect(() => {
    // start from middle clone so both left and right drag work
    offsetRef.current = -LOOP_W;
    applyTransform();

    const tick = () => {
      if (!isPaused.current && !isDragging.current) {
        offsetRef.current -= SPEED;
        // wrap: if we scroll past end of first clone, jump back by one loop length
        if (offsetRef.current < -(LOOP_W * 2)) {
          offsetRef.current += LOOP_W;
        }
        if (offsetRef.current > -LOOP_W + LOOP_W) {
          offsetRef.current -= LOOP_W;
        }
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [LOOP_W, applyTransform]);

  // mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
  };
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - dragStartX.current;
      offsetRef.current = dragStartOffset.current + delta;
      // wrap during drag
      if (offsetRef.current > 0) offsetRef.current -= LOOP_W;
      if (offsetRef.current < -(LOOP_W * 2)) offsetRef.current += LOOP_W;
      applyTransform();
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [LOOP_W, applyTransform]);

  // touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = offsetRef.current;
  };
  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const delta = e.touches[0].clientX - dragStartX.current;
      offsetRef.current = dragStartOffset.current + delta;
      if (offsetRef.current > 0) offsetRef.current -= LOOP_W;
      if (offsetRef.current < -(LOOP_W * 2)) offsetRef.current += LOOP_W;
      applyTransform();
    };
    const onEnd = () => { isDragging.current = false; };
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [LOOP_W, applyTransform]);

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div
        ref={trackRef}
        className="flex gap-5"
        style={{ willChange: 'transform', width: items.length * CARD_W }}
      >
        {items.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col flex-shrink-0"
            style={{ width: 320 }}
          >
            <Stars n={t.rating} />
            <p className="text-slate-700 text-sm leading-relaxed my-4 flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">{t.flag}</div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                <div className="text-xs text-slate-500">{t.university} · {t.program}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function HomeClient({ data }: { data: SiteData }) {
  const { content: c, stats, services, process, team, testimonials, universities, faq } = data;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  {c.hero_badge}
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
                  {c.hero_headline}
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-xl">
                  {c.hero_subtext}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-3">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => scrollTo('aloqa')}
                    className="bg-white text-blue-600 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm">
                    {c.hero_cta_primary} <ArrowRight size={16} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => scrollTo('xizmatlar')}
                    className="bg-white/15 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/25 transition-colors text-sm backdrop-blur-sm">
                    {c.hero_cta_secondary}
                  </motion.button>
                </div>
              </FadeIn>
            </div>

            {/* Right — floating stat cards (desktop only) */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
              {[
                { icon: <GraduationCap size={22} />, value: `${stats[0]?.number ?? 500}+`, label: "Muvaffaqiyatli talaba", delay: 0.4  },
                { icon: <Globe size={22} />,         value: `${stats[2]?.number ?? 40}+`,  label: "Mamlakat bo'ylab",      delay: 0.55 },
                { icon: <Building2 size={22} />,     value: `${stats[1]?.number ?? 120}+`, label: "Hamkor universitetlar", delay: 0.7  },
                { icon: <TrendingUp size={22} />,    value: `${stats[3]?.number ?? 96}%`,  label: "Muvaffaqiyat darajasi", delay: 0.85 },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: card.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, x: -4 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-4 w-64"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-white font-black text-2xl leading-none">{card.value}</div>
                    <div className="text-blue-100 text-xs mt-1">{card.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer" onClick={() => scrollTo('stats')}>
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ══════════════════════════ STATS ══════════════════════════ */}
      <section id="stats" className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SERVICES ══════════════════════════ */}
      <section id="xizmatlar" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="section-heading">{c.services_title}</h2>
            <p className="section-subheading mx-auto text-center">{c.services_subtitle}</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 h-full cursor-pointer group"
                  onClick={() => scrollTo('aloqa')}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: service.color }}>
                    {IconMap[service.icon] ?? <Globe size={24} />}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Batafsil <ArrowRight size={14} />
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} className="mt-10">
            <div className="bg-blue-50 rounded-2xl p-5 flex flex-wrap justify-center gap-8">
              {[
                { icon: <Shield size={18} className="text-blue-600" />, text: "100% rasmiy hujjatlar" },
                { icon: <Clock size={18} className="text-blue-600" />,  text: "Tez ko'rib chiqish" },
                { icon: <Heart size={18} className="text-blue-600" />,  text: "Shaxsiy yondashuv" },
                { icon: <Award size={18} className="text-blue-600" />,  text: `${stats.find(s => s.label.includes('Muvaffaqiyat'))?.number ?? 96}% muvaffaqiyat` },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════ PROCESS ═══════════════════════════ */}
      <section id="jarayon" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="section-heading">{c.process_title}</h2>
            <p className="section-subheading mx-auto text-center">{c.process_subtitle}</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.07}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{step.description}</p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                        <Clock size={11} /> {step.timeline}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} className="text-center mt-10">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('aloqa')} className="btn-primary">
              Hoziroq boshlash <ArrowRight size={16} />
            </motion.button>
          </FadeIn>
        </div>
      </section>

      {/* ═════════════════ TESTIMONIALS ═══════════════════════════ */}
      <section id="muvaffaqiyatlar" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="section-heading">{c.testimonials_title}</h2>
            <p className="section-subheading mx-auto text-center">{c.testimonials_subtitle}</p>
          </FadeIn>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ══════════════════ UNIVERSITIES ══════════════════════════ */}
      <section id="universitetlar" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="section-heading">{c.universities_title}</h2>
            <p className="section-subheading mx-auto text-center">{c.universities_subtitle}</p>
          </FadeIn>
          <div className="flex justify-center">
            <UniversityGlobe universities={universities} />
          </div>
          <FadeIn delay={0.3} className="text-center mt-8">
            <p className="text-slate-500 text-sm">{c.universities_extra}</p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════ ABOUT ═══════════════════════════════ */}
      <section id="haqimizda" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-tight">{c.about_title}</h2>
              <p className="text-slate-600 leading-relaxed mb-5">{c.about_text1}</p>
              <p className="text-slate-600 leading-relaxed mb-8">{c.about_text2}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Users size={20} className="text-blue-600" />,      label: `${stats[0]?.number ?? 500}+ talaba` },
                  { icon: <Globe size={20} className="text-teal-600" />,      label: `${stats[2]?.number ?? 40}+ mamlakat` },
                  { icon: <Award size={20} className="text-amber-500" />,     label: `${stats[3]?.number ?? 96}% muvaffaqiyat` },
                  { icon: <TrendingUp size={20} className="text-blue-600" />, label: "8+ yil tajriba" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                    {item.icon}
                    <span className="font-semibold text-slate-800 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-4">
                {team.map((member, i) => (
                  <motion.div key={member.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4">
                    {member.photo_url ? (
                      <img src={member.photo_url} alt={member.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: member.color }}>
                        {member.initials}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-900">{member.name}</div>
                      <div className="text-xs text-blue-600 font-semibold mb-1.5">{member.role}</div>
                      <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═════════════════════ FAQ ════════════════════════════════ */}
      <section id="faq" className="section-padding bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-10">
            <h2 className="section-heading">{c.faq_title}</h2>
          </FadeIn>
          <FAQAccordion items={faq} />
        </div>
      </section>

      {/* ═════════════════ CONTACT / APPLY ════════════════════════ */}
      <section id="aloqa" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-tight">{c.contact_title}</h2>
              <p className="text-slate-600 leading-relaxed mb-8">{c.contact_subtext}</p>
              <div className="space-y-4 mb-6">
                <a href={`tel:${c.contact_phone.replace(/\s/g,'')}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Phone size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Telefon</div>
                    <div className="text-slate-900 font-semibold text-sm group-hover:text-blue-600 transition-colors">{c.contact_phone}</div>
                  </div>
                </a>
                <a href={`https://t.me/${c.telegram_username}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="text-blue-600"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.56-.46.7-.93.43l-2.58-1.9-1.24 1.2c-.14.14-.26.26-.53.26l.19-2.66 4.84-4.37c.21-.19-.05-.29-.32-.1L7.7 14.57l-2.55-.8c-.55-.17-.56-.55.12-.82l9.96-3.84c.46-.17.86.11.71.81-.01 0-.01 0 0 0z" fill="currentColor"/></svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Telegram</div>
                    <div className="text-slate-900 font-semibold text-sm group-hover:text-blue-600 transition-colors">@{c.telegram_username}</div>
                  </div>
                </a>
                <a href={`mailto:${c.contact_email}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Email</div>
                    <div className="text-slate-900 font-semibold text-sm group-hover:text-blue-600 transition-colors">{c.contact_email}</div>
                  </div>
                </a>
                <a href="https://maps.app.goo.gl/nexera" target="_blank" rel="noopener noreferrer"
                  onClick={(e) => { e.preventDefault(); window.open('https://www.google.com/maps/place/NeXera+consulting,+Galaba+shokh+st,+210100,+Navoi', '_blank'); }}
                  className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <MapPin size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Manzil</div>
                    <div className="text-slate-900 font-semibold text-sm group-hover:text-blue-600 transition-colors">{c.contact_address}</div>
                  </div>
                </a>
              </div>

              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm mb-8" style={{ height: 200 }}>
                <iframe
                  src="https://maps.google.com/maps?q=40.0971014,65.3838355&z=15&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nexera Consulting joylashuvi"
                />
              </div>

              <div className="bg-blue-50 rounded-2xl p-5 space-y-2.5">
                <p className="font-bold text-slate-900 text-sm mb-3">Nima uchun Nexera?</p>
                {[
                  "Bepul dastlabki maslahat",
                  "Shaxsiy maslahatchi tayinlanadi",
                  `${stats[3]?.number ?? 96}% muvaffaqiyat darajasi`,
                  "Hujjat tayyorlashda to'liq yordam",
                  "Viza rad etilsa, qayta ishlashga yordam",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle size={15} className="text-teal-500 flex-shrink-0" /> {text}
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <IntakeForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
