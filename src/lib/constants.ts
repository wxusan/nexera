export const SERVICES = [
  {
    id: 'university-admissions',
    title: "Universitetga qabul",
    description: "Xorij universitetlariga hujjat topshirish, esse yozish va qabul jarayonini boshqarishda to'liq yordam.",
    icon: 'BookOpen',
    href: '#xizmatlar',
    color: '#2563EB',
  },
  {
    id: 'student-visa',
    title: "Talaba vizasi",
    description: "O'qish uchun viza olishda hujjat tayyorlashdan intervyugacha professional ko'mak.",
    icon: 'GraduationCap',
    href: '#xizmatlar',
    color: '#0D9488',
  },
  {
    id: 'tourist-visa',
    title: "Turist vizasi",
    description: "Sayohat qilish yoki yaqinlarni ziyorat qilish uchun turist vizasini tezkor rasmiylashtiramiz.",
    icon: 'Plane',
    href: '#xizmatlar',
    color: '#F59E0B',
  },
  {
    id: 'business-visa',
    title: "Biznes vizasi",
    description: "Xorijga ish safari uchun biznes vizasini tezkor va to'g'ri rasmiylashtirishga yordam.",
    icon: 'Briefcase',
    href: '#xizmatlar',
    color: '#8B5CF6',
  },
];

export const PROCESS_STEPS = [
  {
    number: 1,
    title: "Bepul maslahat",
    description: "Maqsadlaringiz, akademik profilingiz va viza talablarini aniqlaymiz. Sizga eng mos yo'nalishni tavsiya etamiz.",
    timeline: "1-2 kun",
    icon: 'Calendar',
  },
  {
    number: 2,
    title: "Universitetni tanlash",
    description: "Profilingiz va imtiyozlaringizga qarab eng mos universitetlarni aniqlaymiz.",
    timeline: "1-2 hafta",
    icon: 'Building2',
  },
  {
    number: 3,
    title: "Hujjatlar tayyorlash",
    description: "Barcha kerakli hujjatlar, motivatsion xat va tavsiya xatlarini birga tayyorlaymiz.",
    timeline: "2-4 hafta",
    icon: 'FileText',
  },
  {
    number: 4,
    title: "Ariza topshirish",
    description: "Universitetlarga arizalarni vaqtida va to'g'ri topshiramiz, javoblarini kuzatib boramiz.",
    timeline: "1-2 hafta",
    icon: 'Send',
  },
  {
    number: 5,
    title: "Qabul takliflari",
    description: "Qabul takliflari kelib tushgach, eng yaxshi variantni tanlashda yordam beramiz.",
    timeline: "2-3 oy",
    icon: 'CheckCircle',
  },
  {
    number: 6,
    title: "Viza va ro'yxatga olish",
    description: "Viza hujjatlarini to'liq tayyorlaymiz va universitetda ro'yxatga olishda kuzatib boramiz.",
    timeline: "4-8 hafta",
    icon: 'Globe',
  },
];

export const STATS = [
  { number: 500, label: "Ta'lim oluvchi talabalar", prefix: '', suffix: '+' },
  { number: 80,  label: "Hamkor universitetlar",    prefix: '', suffix: '+' },
  { number: 40,  label: "Qamrab olingan davlatlar", prefix: '', suffix: '+' },
  { number: 96,  label: "Muvaffaqiyat darajasi",    prefix: '', suffix: '%' },
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Sardor Karimov',
    role: "Asoschi & Bosh maslahatchi",
    bio: "15 yillik xalqaro ta'lim tajribasi bilan Sardor yuzlab talabalarning chet el universitetlariga kirishiga yordam bergan.",
    specializations: ["Universitetga qabul", "Karyera maslahat", "Strategik rejalashtirish"],
    initials: 'SK',
    color: '#2563EB',
  },
  {
    id: 2,
    name: 'Nilufar Toshmatova',
    role: "Viza mutaxassisi",
    bio: "40+ mamlakatning immigratsiya qonunchiligini chuqur biladigan Nilufar viza jarayoningizni muammosiz olib boradi.",
    specializations: ["Talaba vizasi", "Biznes vizasi", "Turist vizasi"],
    initials: 'NT',
    color: '#0D9488',
  },
  {
    id: 3,
    name: 'Bobur Yusupov',
    role: "Qabul murabbiysi",
    bio: "Bobur talabalarning motivatsion xat va intervyuga tayyorlanishida yordam berib, ular uchun ajoyib natijalar qo'lga kiritgan.",
    specializations: ["Esse yozish", "Intervyu tayyorgarligi", "Ariza strategiyasi"],
    initials: 'BY',
    color: '#8B5CF6',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Aziz Rahimov",
    country: "Toshkent",
    university: "Imperial College London",
    program: "Muhandislik",
    quote: "Nexera jamoasi tufayli Imperial College'ga kirdim. Ular har bir qadamda yonimda bo'lishdi va hujjatlarimni a'lo darajada tayyorlashga yordam berdi.",
    rating: 5,
    flag: '🇺🇿',
  },
  {
    id: 2,
    name: "Malika Yusupova",
    country: "Samarqand",
    university: "University of Amsterdam",
    program: "Iqtisodiyot",
    quote: "Viza olish jarayoni juda murakkab edi, lekin Nexera mutaxassislari barchasi bilan yordam berdi. 3 hafta ichida vizamni oldim!",
    rating: 5,
    flag: '🇺🇿',
  },
  {
    id: 3,
    name: "Jasur Mirzayev",
    country: "Farg'ona",
    university: "TU Berlin",
    program: "Kompyuter fanlari",
    quote: "TU Berlin — mening orzuim edi. Nexera bu orzuni haqiqatga aylantirdi. Professional, tez va ishonchli xizmat.",
    rating: 5,
    flag: '🇺🇿',
  },
  {
    id: 4,
    name: "Dilnoza Abdullayeva",
    country: "Toshkent",
    university: "University of Vienna",
    program: "Tibbiyot",
    quote: "Tibbiyot yo'nalishi uchun talab juda baland. Nexera mening profilimni ko'rib, eng mos universitetlarni tanladi va muvaffaqiyatli kirdim.",
    rating: 5,
    flag: '🇺🇿',
  },
  {
    id: 5,
    name: "Umid Xasanov",
    country: "Namangan",
    university: "Utrecht University",
    program: "Moliya",
    quote: "Bepul maslahatdan boshlab viza olganimgacha Nexera har doim yonimda edi. Bunday xizmatni hamma talabaga tavsiya qilaman.",
    rating: 5,
    flag: '🇺🇿',
  },
  {
    id: 6,
    name: "Gulnora Qodirova",
    country: "Buxoro",
    university: "University of Warsaw",
    program: "Pedagogika",
    quote: "Polshaga o'qishga ketish haqida o'ylardim, lekin qaerdan boshlashni bilmasdim. Nexera hamma narsani tushuntirdi va yordam berdi.",
    rating: 5,
    flag: '🇺🇿',
  },
];

export const UNIVERSITIES = [
  { id: 1, name: 'Imperial College London', country: 'Buyuk Britaniya', countryCode: 'GB', programs: ['Muhandislik', 'Tibbiyot', 'Biznes', 'Fan'] },
  { id: 2, name: 'TU Berlin',               country: 'Germaniya',       countryCode: 'DE', programs: ['Muhandislik', 'Kompyuter fanlari', 'Fizika', 'Matematika'] },
  { id: 3, name: 'University of Amsterdam', country: 'Niderlandiya',    countryCode: 'NL', programs: ['Iqtisodiyot', 'Huquq', 'Ijtimoiy fanlar', 'Tibbiyot'] },
  { id: 4, name: 'University of Vienna',    country: 'Avstriya',        countryCode: 'AT', programs: ['Tibbiyot', 'Huquq', 'Gumanitar fanlar', 'Tabiiy fanlar'] },
  { id: 5, name: 'Utrecht University',      country: 'Niderlandiya',    countryCode: 'NL', programs: ['Moliya', 'Muhandislik', 'Tibbiyot', 'Fan'] },
  { id: 6, name: 'University of Warsaw',    country: 'Polsha',          countryCode: 'PL', programs: ['Pedagogika', 'Iqtisodiyot', 'Huquq', 'Tarix'] },
  { id: 7, name: 'Charles University',      country: 'Chexiya',         countryCode: 'CZ', programs: ['Tibbiyot', 'Farmatsevtika', 'Huquq', 'Tabiiy fanlar'] },
  { id: 8, name: 'Masaryk University',      country: 'Chexiya',         countryCode: 'CZ', programs: ['Iqtisodiyot', 'Informatika', 'Ijtimoiy fanlar', 'Sport'] },
];

export const FAQ_ITEMS = [
  {
    id: 'q1',
    question: "Qabul jarayoni qachon boshlanishi kerak?",
    answer: "O'qishni boshlashni rejalashtirgan sanadan 12–18 oy oldin boshlash tavsiya etiladi. Bu hujjat tayyorlash, ariza topshirish va viza olish uchun yetarli vaqt beradi.",
  },
  {
    id: 'q2',
    question: "Chet el universitetiga kirish uchun qanday talablar bor?",
    answer: "Asosiy talablar: yaxshi akademik ko'rsatkichlar, ingliz tili bilimi (IELTS/TOEFL), ba'zi hollarda SAT/GRE natijalari. Biz sizning profilingizni ko'rib, qaysi universitetlarga murojaat qilish mumkinligini aniqlaymiz.",
  },
  {
    id: 'q3',
    question: "Stipendiya olish imkoniyati bormi?",
    answer: "Ha, ko'pgina xorij universitetlari stipendiya taklif qiladi. Biz sizni mos stipendiya dasturlarini topishda va ariza tayyorlashda yordam beramiz.",
  },
  {
    id: 'q4',
    question: "Talaba vizasini olish qancha vaqt oladi?",
    answer: "Viza ko'rib chiqish muddati mamlakatga qarab 2–8 hafta davom etadi. Biz jarayonni qabul xati kelgandan so'ng darhol boshlaymiz.",
  },
  {
    id: 'q5',
    question: "Viza rad etilsa nima bo'ladi?",
    answer: "Rad etish sabablarini tahlil qilib, hujjatlarni yaxshilagan holda qayta ariza topshirishga yordam beramiz. Ko'pchilik talabalar ikkinchi urinishda vizani oladilar.",
  },
  {
    id: 'q6',
    question: "Xizmatlaringiz narxi qancha?",
    answer: "Narx tanlangan xizmat paketiga qarab farq qiladi. Bepul maslahat uchun murojaat qiling — biz sizning holatizni ko'rib, eng mos paketni tavsiya etamiz.",
  },
  {
    id: 'q7',
    question: "Magistratura va doktorantura uchun ham yordam berasizmi?",
    answer: "Ha, biz bakalavriat, magistratura va doktorantura dasturlari uchun ham to'liq yordam ko'rsatamiz.",
  },
  {
    id: 'q8',
    question: "Turist va biznes vizasi uchun ham murojaat qilsa bo'ladimi?",
    answer: "Albatta. Biz nafaqat talaba vizasi, balki turist va biznes vizalarini rasmiylashtirishda ham professional yordam beramiz.",
  },
];

export const COUNTRIES = [
  "Germaniya", "Niderlandiya", "Polsha", "Chexiya", "Avstriya",
  "Shvetsariya", "Shvetsiya", "Norvegiya", "Daniya", "Finlandiya",
  "Buyuk Britaniya", "Irlandiya", "Belgiya", "Fransiya", "Italiya",
  "Ispaniya", "Portugaliya", "AQSh", "Kanada", "Avstraliya",
  "Yaponiya", "Janubiy Koreya", "Singapur", "Turkiya", "Boshqa",
];

export const SERVICE_OPTIONS = [
  { value: 'university-admissions', label: "Universitetga qabul" },
  { value: 'student-visa',          label: "Talaba vizasi" },
  { value: 'tourist-visa',          label: "Turist vizasi" },
  { value: 'business-visa',         label: "Biznes vizasi" },
];
