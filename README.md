# EduPath Global - Study Abroad Consulting Website

A modern, responsive Next.js 14 website for a study-abroad consulting agency that helps students with university admissions and visa processing.

## Features

### Core Pages
- **Home** - Hero section with stats, services overview, testimonials, and partner universities
- **Services** - Detailed service cards (University Admissions, Student Visa, Tourist Visa, Business Visa)
- **Individual Service Pages** - Deep-dive pages for each service with processes, documents, and FAQs
- **Apply** - Multi-step intake form with validation
- **About** - Company story, team, values, and accreditations
- **Process** - 6-step process timeline with details
- **Universities** - Filterable list of partner universities
- **Success Stories** - Student testimonials with filtering
- **Contact** - Contact form and contact information
- **FAQ** - Comprehensive FAQ grouped by category
- **Legal** - Privacy Policy and Terms of Service

### Components
- **Navbar** - Sticky navigation with mobile menu
- **Footer** - Multi-column footer with links and contact info
- **Floating WhatsApp** - Fixed WhatsApp button with animation
- **Forms**
  - IntakeForm: Multi-step form with service selection, destination, and contact details
  - ContactForm: Simple contact form
- **UI Components**
  - ServiceCard: Reusable service card with hover effects
  - TestimonialCard: Student testimonial display
  - StatsBar: Animated counter section
  - CTABanner: Call-to-action section
  - AnimatedCounter: Number counter with scroll animation
  - FadeInSection: Fade-in animation wrapper

### Features
- Fully responsive design (mobile-first)
- Smooth animations with Framer Motion
- Form validation with React Hook Form + Zod
- Google Sheets integration for form submissions
- Email notifications via Resend
- SEO optimized with proper metadata
- Tailwind CSS for styling
- TypeScript throughout
- Dark/light brand colors with teal accent

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives
- **Email**: Resend
- **Database**: Google Sheets API
- **Font**: Inter (via next/font/google)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── intake/route.ts          # Form submission API
│   │   └── contact/route.ts         # Contact form API
│   ├── services/
│   │   ├── page.tsx
│   │   ├── university-admissions/page.tsx
│   │   ├── student-visa/page.tsx
│   │   ├── tourist-visa/page.tsx
│   │   └── business-visa/page.tsx
│   ├── about/page.tsx
│   ├── apply/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── process/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── success-stories/page.tsx
│   ├── terms/page.tsx
│   ├── universities/page.tsx
│   ├── layout.tsx
│   ├── page.tsx                     # Home page
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── forms/
│   │   ├── IntakeForm.tsx
│   │   └── ContactForm.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingWhatsApp.tsx
│   └── ui/
│       ├── AnimatedCounter.tsx
│       ├── CTABanner.tsx
│       ├── FadeInSection.tsx
│       ├── ServiceCard.tsx
│       ├── StatsBar.tsx
│       └── TestimonialCard.tsx
└── lib/
    ├── constants.ts                 # All data (services, testimonials, etc)
    └── utils.ts                     # Helper functions
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# Google Sheets Integration
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GOOGLE_SHEETS_ID=your_spreadsheet_id

# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxx
CONSULTANT_EMAIL=consultant@edupathglobal.com

# Public Config
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Setting Up Google Sheets

1. Create a service account in Google Cloud Console
2. Enable Google Sheets API
3. Create a spreadsheet with tabs: "Leads", "Contacts"
4. Share the spreadsheet with the service account email
5. Add columns to the "Leads" tab for: Timestamp, Name, Email, Phone, Service, Country, University, Program, Timeline, Education Level, Notes
6. Copy the service account JSON and spreadsheet ID to environment variables

### Setting Up Resend

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify the sender domain (or use noreply@yourresend.com)
4. Add the API key to environment variables

## Installation & Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

The site will be available at `http://localhost:3000`

## Key Features Explained

### Multi-Step Form
The intake form uses Framer Motion for smooth transitions between steps:
1. Service selection with 4 large icon cards
2. Destination and program details
3. Contact information and education level

Form validation happens at each step with inline error messages.

### Animations
- Hero section has floating gradient backgrounds
- Service cards lift on hover
- Counter numbers animate when scrolled into view
- Form steps fade in/out smoothly
- All animations respect `prefers-reduced-motion`

### Responsive Design
- Mobile-first approach
- Grid layouts adapt from 1 column (mobile) to 3-4 columns (desktop)
- Navigation transforms to hamburger menu on mobile
- Fonts scale appropriately for readability

### SEO
- Proper Open Graph metadata
- Sitemap and robots.txt
- Semantic HTML structure
- Meta descriptions for all pages
- Structured data ready

## Color Scheme

- **Primary**: #2563EB (Blue)
- **Dark/Navy**: #1A2E4A
- **Teal Accent**: #0D9488
- **Light Background**: #F4F7FB
- **White**: #FFFFFF
- **Grays**: Various shades for text and borders

## Form Submission Flow

1. User fills out intake form
2. Form data is validated with Zod
3. POST request to `/api/intake`
4. Data appended to Google Sheets
5. Confirmation email sent to user
6. Notification email sent to consultant
7. Success message displayed to user

## Customization

### Adding New Services
Edit `src/lib/constants.ts` and add to `SERVICES` array, then create corresponding page in `src/app/services/[service-name]/page.tsx`

### Adding Testimonials
Edit `src/lib/constants.ts` and add to `TESTIMONIALS` array

### Changing Colors
Edit `tailwind.config.ts` in the `theme.extend.colors` section

### Updating FAQs
Edit `src/lib/constants.ts` and add to `FAQ_ITEMS` array

## Deployment

This site is ready for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting

### Vercel Deployment
```bash
npm install -g vercel
vercel
```

## Performance

- Images optimized with Next.js Image component
- Code splitting and lazy loading
- Tailwind CSS for minimal CSS
- Framer Motion for performant animations
- Static generation for most pages

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

All rights reserved. This website is proprietary to EduPath Global.

## Support

For questions or issues, contact: info@edupathglobal.com
# nexera
