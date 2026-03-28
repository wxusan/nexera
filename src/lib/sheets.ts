import { unstable_cache } from 'next/cache';
import type { SiteData, SiteContent, Stat, Service, ProcessStep, TeamMember, Testimonial, University, FaqItem } from './types';
import {
  SERVICES as FB_SERVICES,
  PROCESS_STEPS as FB_PROCESS,
  STATS as FB_STATS,
  TEAM_MEMBERS as FB_TEAM,
  TESTIMONIALS as FB_TESTIMONIALS,
  UNIVERSITIES as FB_UNIVERSITIES,
  FAQ_ITEMS as FB_FAQ,
  COUNTRIES as FB_COUNTRIES,
} from './constants';

// ─── FALLBACK CONTENT (shown when Sheets is not configured) ────────────────
const FALLBACK_CONTENT: SiteContent = {
  hero_badge:           "500+ talaba muvaffaqiyatli joylashtirildi",
  hero_headline:        "Chet el universitetiga kirish, biz bilan oson",
  hero_subtext:         "Nexera: O'zbekiston talabalariga xorijiy universitetlarga qabul va viza olishda professional yordam ko'rsatuvchi maslahat agentligi.",
  hero_cta_primary:     "Bepul maslahat olish",
  hero_cta_secondary:   "Xizmatlar",
  services_section_tag: "Nima qila olamiz",
  services_title:       "Bizning xizmatlar",
  services_subtitle:    "Qabul arizasidan viza olishgacha har bir qadamda professional yordam.",
  process_section_tag:  "Qanday ishlaydi",
  process_title:        "Jarayon bosqichlari",
  process_subtitle:     "Birinchi maslahatdan o'qishga kirishgacha, aniq va shaffof 6 qadam.",
  testimonials_tag:     "Real natijalar",
  testimonials_title:   "Muvaffaqiyat hikoyalari",
  testimonials_subtitle:"Nexera bilan chet elga chiqqan talabalarimiz tajribalari.",
  universities_tag:     "Hamkorlar",
  universities_title:   "Hamkor universitetlar",
  universities_subtitle:"Dunyoning yetakchi universitetlariga kirishda sizga yordam beramiz.",
  universities_extra:   "Va yana 70+ hamkor universitetlar bilan ishlashimiz davom etmoqda.",
  about_tag:            "Bizning hikoya",
  about_title:          "Nima uchun talabalar Nexerani tanlaydi?",
  about_text1:          "Nexera O'zbekistondan chet elga o'qishga chiqmoqchi bo'lgan talabalar uchun yaratilgan ixtisoslashtirilgan maslahat agentligidir.",
  about_text2:          "Birinchi bepul maslahatdan tortib universitetga muvaffaqiyatli kirishgacha, jarayonning har bir bosqichida siz bilan birga bo'lamiz.",
  faq_tag:              "Savollar",
  faq_title:            "Ko'p so'raladigan savollar",
  contact_tag:          "Bog'laning",
  contact_title:        "Bepul maslahat olish uchun murojaat qiling",
  contact_subtext:      "Mutaxassisimiz 24 soat ichida siz bilan bog'lanadi va bepul maslahat uchun qulay vaqt belgilaydi.",
  contact_phone:        "+998 99 212 99 44",
  contact_email:        "nexeraconsulting@gmail.com",
  contact_address:      "Galaba shokh ko'chasi, Navoiy",
  telegram_username:    "Nexera_consulting",
  instagram_username:   "Nexera_consulting",
  footer_tagline:       "O'zbekiston talabalariga xorijiy universitetlarga qabul va viza olishda professional yordam.",
};

// ─── GOOGLE SHEETS RAW FETCH ───────────────────────────────────────────────
async function fetchSheet(sheetName: string): Promise<string[][]> {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const id  = process.env.GOOGLE_SHEETS_ID;
  if (!key || !id) return [];

  try {
    const { google } = await import('googleapis');
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(key),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: `${sheetName}!A:Z`,
    });
    return (res.data.values ?? []) as string[][];
  } catch (err) {
    console.warn(`[sheets] Failed to fetch "${sheetName}":`, err);
    return [];
  }
}

// Skip header rows (row 1 = title, row 2 = note, row 3 = blank, row 4 = headers)
function dataRows(rows: string[][]): string[][] {
  return rows.slice(4).filter((r) => r.length > 0 && r[0]?.trim() !== '');
}

// ─── PARSERS ──────────────────────────────────────────────────────────────
// These fields are editable from the Content sheet — everything else uses FALLBACK_CONTENT
const EDITABLE_KEYS = new Set([
  'hero_headline',
  'hero_subtext',
  'contact_phone',
  'contact_email',
  'contact_address',
  'telegram_username',
  'instagram_username',
]);

function parseContent(rows: string[][]): SiteContent {
  const result: SiteContent = { ...FALLBACK_CONTENT };
  dataRows(rows).forEach(([key, value]) => {
    if (key && value !== undefined && EDITABLE_KEYS.has(key)) {
      result[key] = value;
    }
  });
  return result;
}

function parseStats(rows: string[][]): Stat[] {
  const data = dataRows(rows).map(([number, suffix, prefix, label]) => ({
    number: parseInt(number) || 0,
    suffix: suffix ?? '',
    prefix: prefix ?? '',
    label:  label  ?? '',
  })).filter(s => s.label);
  return data.length ? data : FB_STATS;
}

function parseServices(rows: string[][]): Service[] {
  const data = dataRows(rows).map(([id, title, description, icon, color]) => ({
    id, title, description, icon, color,
  })).filter(s => s.title);
  return data.length ? data : FB_SERVICES;
}

function parseProcess(rows: string[][]): ProcessStep[] {
  const data = dataRows(rows).map(([number, title, description, timeline, icon]) => ({
    number: parseInt(number) || 0,
    title, description, timeline, icon,
  })).filter(s => s.title);
  return data.length ? data : FB_PROCESS;
}

function parseTeam(rows: string[][]): TeamMember[] {
  const data = dataRows(rows).map(([name, role, bio, initials, color, photo_url]) => ({
    name, role, bio, initials, color, photo_url: photo_url ?? '',
  })).filter(t => t.name);
  return data.length ? data : FB_TEAM.map(t => ({ ...t, photo_url: '' }));
}

function parseTestimonials(rows: string[][]): Testimonial[] {
  const data = dataRows(rows)
    .filter(r => r[7]?.toLowerCase() !== 'false')   // published column
    .map(([name, country, university, program, quote, rating, flag]) => ({
      name, country, university, program, quote,
      rating: parseInt(rating) || 5,
      flag: flag ?? '🇺🇿',
    })).filter(t => t.name);
  return data.length ? data : FB_TESTIMONIALS;
}

function parseUniversities(rows: string[][]): University[] {
  const data = dataRows(rows)
    .filter(r => r[4]?.toLowerCase() !== 'false')   // published column
    .map(([name, country, countryCode, programs]) => ({
      name, country, countryCode,
      programs: programs?.split(',').map(p => p.trim()) ?? [],
    })).filter(u => u.name);
  return data.length ? data : FB_UNIVERSITIES;
}

function parseFaq(rows: string[][]): FaqItem[] {
  const data = dataRows(rows)
    .filter(r => r[3]?.toLowerCase() !== 'false')   // published column
    .map(([id, question, answer]) => ({ id, question, answer }))
    .filter(f => f.question);
  return data.length ? data : FB_FAQ;
}

// Countries sheet: Column A = country name. One country per row.
function parseCountries(rows: string[][]): string[] {
  const data = dataRows(rows)
    .map(([name]) => name?.trim())
    .filter(Boolean) as string[];
  return data.length ? data : FB_COUNTRIES;
}

// ─── CORE FETCHER (no cache) ───────────────────────────────────────────────
async function fetchSiteData(): Promise<SiteData> {
  const [contentRaw, statsRaw, servicesRaw, processRaw, teamRaw, testimonialsRaw, universitiesRaw, faqRaw, countriesRaw] =
    await Promise.all([
      fetchSheet('Content'),
      fetchSheet('Stats'),
      fetchSheet('Services'),
      fetchSheet('Process'),
      fetchSheet('Team'),
      fetchSheet('Testimonials'),
      fetchSheet('Universities'),
      fetchSheet('FAQ'),
      fetchSheet('Countries'),
    ]);

  return {
    content:      parseContent(contentRaw),
    stats:        parseStats(statsRaw),
    services:     parseServices(servicesRaw),
    process:      parseProcess(processRaw),
    team:         parseTeam(teamRaw),
    testimonials: parseTestimonials(testimonialsRaw),
    universities: parseUniversities(universitiesRaw),
    faq:          parseFaq(faqRaw),
    countries:    parseCountries(countriesRaw),
  };
}

// ─── CACHED FETCHER ────────────────────────────────────────────────────────
// In development: no cache — every page refresh hits Sheets directly (instant)
// In production:  1-hour cache — call /api/revalidate for instant refresh
export const getSiteData: () => Promise<SiteData> =
  process.env.NODE_ENV === 'development'
    ? fetchSiteData
    : unstable_cache(fetchSiteData, ['site-data'], { revalidate: 3600, tags: ['site-data'] });
