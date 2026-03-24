# High-Level Plan: Emerson & Quinn Website

## What It Does
A single-page marketing website for Emerson & Quinn, a consulting firm that helps small, family-run businesses improve operations using AI and practical systems. The site communicates the brand's partnership-focused values, explains their process, and drives visitors toward booking a free consultation.

## Key Features
- Hero section with headline, subheadline, and CTA button
- "How We Work" 3-step process section (Listen & Learn → Collaborate & Improve → Grow & Measure)
- "Why We Do This" purpose/values section with personal, professional tone
- Industries section (Trades & Home Services, Property Management, Wellness & Fitness, Construction & Contractors)
- Results/Impact section with outcome bullets (no hype)
- Bottom CTA section driving to contact form
- Contact form (Name, Email, Business Type, Short Message) with Resend email delivery
- Smooth scroll navigation anchored to sections
- Fully responsive, mobile-first layout

## Tech Stack
- Frontend: React + Vite + Tailwind (template already in place)
- Backend: Convex (store contact form submissions)
- AI: Not needed
- Email: Resend (deliver contact form submissions to owner)
- Auth: None — public marketing site

## Scope & Constraints
**In scope:**
- Full single-page site with all 6 sections per the brief
- Contact form with Convex persistence and Resend email notification
- Responsive design with warm, minimal aesthetic (white/light base, teal/slate-blue accent)
- Google Fonts for typography (clean sans-serif)
- Placeholder analytics hook (e.g., `gtag` stub in index.html)

**Out of scope:**
- CMS or editable content management
- Multi-page routing
- Authentication or user accounts
- Blog or case studies section
- Live chat or scheduling integrations (Calendly embed is a stretch goal only)
- Real testimonials/logos (copy-only, no client assets)

## Implementation Approach
- Stand up layout shell: nav anchor, all 6 section components scaffolded with placeholder content
- Build and style each section top-to-bottom, applying Tailwind design system (colors, spacing, typography scale)
- Wire contact form to Convex mutation for persistence, then add Resend email action triggered on submission
- Polish responsiveness across mobile/tablet/desktop breakpoints and add scroll behavior + subtle animations
- Drop in analytics placeholder and do final copy pass to match all specified headlines/CTAs exactly

## Open Questions
- None — brief is comprehensive and copy is fully specified
