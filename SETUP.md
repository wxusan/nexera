# EduPath Global - Setup & Configuration Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
```env
# Google Sheets Integration (optional for testing)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GOOGLE_SHEETS_ID=your_spreadsheet_id

# Email Service (optional for testing)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONSULTANT_EMAIL=your_email@company.com

# Public Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## Configuration Details

### Google Sheets Setup (for Form Submissions)

The form submission system saves leads to a Google Sheets spreadsheet.

#### Steps:
1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable the "Google Sheets API"

2. **Create a Service Account**
   - In Google Cloud Console, go to "Service Accounts"
   - Create a new service account
   - Create a JSON key
   - Download the JSON file

3. **Create a Google Sheets Spreadsheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet named "EduPath Leads"
   - Create two sheets: "Leads" and "Contacts"

4. **Set Up Columns**
   - In "Leads" sheet, add headers:
     - A: Timestamp
     - B: Full Name
     - C: Email
     - D: Phone
     - E: Service Type
     - F: Destination Country
     - G: University Name
     - H: Program
     - I: Timeline
     - J: Education Level
     - K: Additional Notes

5. **Share with Service Account**
   - Copy the service account email from JSON
   - Share the spreadsheet with that email (Editor access)

6. **Update Environment Variables**
   - Copy the entire JSON content to `GOOGLE_SERVICE_ACCOUNT_KEY`
   - Copy the spreadsheet ID (from URL) to `GOOGLE_SHEETS_ID`

### Email Service Setup (Resend)

The system sends confirmation emails via Resend.

#### Steps:
1. **Sign Up for Resend**
   - Go to [resend.com](https://resend.com)
   - Create an account
   - Verify your email

2. **Get API Key**
   - Go to "API Keys" in dashboard
   - Copy your API key
   - Add to `RESEND_API_KEY` in `.env.local`

3. **Optional: Verify Domain**
   - For production, verify your domain
   - This allows sending from `yourname@yourdomain.com`
   - Without verification, use `noreply@resend.dev`

---

## File Structure Summary

```
consulting-site/
├── .env.example              # Environment variable template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── next.config.ts           # Next.js configuration
├── README.md                # Project documentation
├── SETUP.md                 # This file
│
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── intake/route.ts      # Form submission endpoint
    │   │   └── contact/route.ts     # Contact form endpoint
    │   │
    │   ├── services/
    │   │   ├── page.tsx                      # Services overview
    │   │   ├── university-admissions/page.tsx
    │   │   ├── student-visa/page.tsx
    │   │   ├── tourist-visa/page.tsx
    │   │   └── business-visa/page.tsx
    │   │
    │   ├── about/page.tsx           # About page
    │   ├── apply/page.tsx           # Application page
    │   ├── contact/page.tsx         # Contact page
    │   ├── faq/page.tsx             # FAQ page
    │   ├── process/page.tsx         # Process page
    │   ├── success-stories/page.tsx # Testimonials
    │   ├── universities/page.tsx    # Partner universities
    │   ├── privacy-policy/page.tsx  # Privacy policy
    │   ├── terms/page.tsx           # Terms of service
    │   │
    │   ├── layout.tsx               # Root layout with Navbar/Footer
    │   ├── page.tsx                 # Home page
    │   ├── globals.css              # Global styles
    │   ├── robots.ts                # robots.txt generator
    │   └── sitemap.ts               # Sitemap generator
    │
    ├── components/
    │   ├── forms/
    │   │   ├── IntakeForm.tsx       # Multi-step form
    │   │   └── ContactForm.tsx      # Contact form
    │   │
    │   ├── layout/
    │   │   ├── Navbar.tsx           # Navigation bar
    │   │   ├── Footer.tsx           # Footer
    │   │   └── FloatingWhatsApp.tsx # WhatsApp button
    │   │
    │   └── ui/
    │       ├── AnimatedCounter.tsx
    │       ├── CTABanner.tsx
    │       ├── FadeInSection.tsx
    │       ├── ServiceCard.tsx
    │       ├── StatsBar.tsx
    │       └── TestimonialCard.tsx
    │
    └── lib/
        ├── constants.ts             # All static data
        └── utils.ts                 # Helper functions
```

---

## Development Workflow

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Starting Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```

---

## Data Management

### Adding New Services
1. Edit `src/lib/constants.ts`
2. Add to `SERVICES` array
3. Create service page: `src/app/services/[service-name]/page.tsx`

### Adding Testimonials
1. Edit `src/lib/constants.ts`
2. Add to `TESTIMONIALS` array
3. Testimonials auto-appear on success stories page

### Adding Universities
1. Edit `src/lib/constants.ts`
2. Add to `UNIVERSITIES` array
3. Universities auto-appear on universities page

### Adding FAQ Items
1. Edit `src/lib/constants.ts`
2. Add to `FAQ_ITEMS` array
3. FAQs auto-group by category

---

## Customization

### Brand Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: { 600: '#2563EB' },  // Main blue
  navy: '#1A2E4A',               // Dark navy
  teal: '#0D9488',               // Accent teal
  light: '#F4F7FB',              // Light background
}
```

### Company Name & Info
Edit `src/lib/constants.ts` and component files:
- `src/components/layout/Navbar.tsx` - Logo
- `src/components/layout/Footer.tsx` - Company info
- Search for hardcoded strings to replace

### Contact Information
Edit environment variables and constants:
- `.env.local` - WhatsApp number, site URL
- `src/app/contact/page.tsx` - Contact details
- `src/components/layout/Footer.tsx` - Footer contact

---

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Environment Variables for Production
Set these in your hosting platform:
- `GOOGLE_SERVICE_ACCOUNT_KEY`
- `GOOGLE_SHEETS_ID`
- `RESEND_API_KEY`
- `CONSULTANT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL`

### Build Size Optimization
- Remove unused components
- Optimize images in `public/`
- Use Next.js image optimization
- Monitor bundle size with `npm run build`

---

## Troubleshooting

### Form Submissions Not Working
1. Check if `GOOGLE_SERVICE_ACCOUNT_KEY` is set
2. Verify spreadsheet is shared with service account
3. Check API quota in Google Cloud Console
4. Look for errors in browser console and server logs

### Emails Not Sending
1. Verify `RESEND_API_KEY` is correct
2. Check sender email (should be verified domain or `noreply@resend.dev`)
3. Check spam folder for test emails
4. Review Resend dashboard for bounce info

### Styling Issues
1. Clear `.next` folder: `rm -rf .next`
2. Rebuild: `npm run build`
3. Check Tailwind config and global styles
4. Verify CSS classes are in `content` paths

### Mobile Issues
1. Test on device (not just browser DevTools)
2. Check viewport meta tag in layout
3. Use responsive Tailwind classes
4. Test touch interactions

---

## Performance Tips

1. **Image Optimization**
   - Use `next/image` for all images
   - Specify width and height
   - Use WebP format when possible

2. **Code Splitting**
   - Use dynamic imports for heavy components
   - Next.js automatically splits routes

3. **Caching**
   - Set appropriate Cache-Control headers
   - Use ISR (Incremental Static Regeneration)
   - Cache API responses

4. **Monitoring**
   - Set up analytics with Vercel
   - Monitor Core Web Vitals
   - Use lighthouse for audits

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **React Hook Form**: https://react-hook-form.com/
- **Zod Validation**: https://zod.dev/

---

## License

All rights reserved. This website is proprietary to EduPath Global.
