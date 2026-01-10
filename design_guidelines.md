# Neycha Soto Onicoplastia - Design Guidelines

## Design Approach
**Reference-Based**: Luxury spa aesthetic inspired by high-end beauty brands like Glossier, Aesop, and premium salon websites. Dark, sophisticated palette with strategic cream/gold accents creating an exclusive, intimate atmosphere.

## Core Design Elements

### Typography
- **Primary Font**: Cormorant Garamond (serif, elegant headers)
- **Secondary Font**: Montserrat (sans-serif, body & UI)
- **Hierarchy**: 
  - H1: 4xl-6xl, Cormorant, font-light
  - H2: 3xl-4xl, Cormorant, font-light
  - H3: 2xl, Montserrat, font-medium
  - Body: base-lg, Montserrat, font-light
  - Accents: tracking-widest uppercase for labels

### Layout System
- **Spacing Primitives**: 4, 8, 12, 16, 24, 32 (p-4, py-8, my-12, etc.)
- **Container**: max-w-7xl, centered with px-6
- **Vertical Rhythm**: py-24 for desktop sections, py-16 for mobile
- **Grid**: 2-column for services/features, masonry for portfolio

### Component Library

**Navigation**
- Sticky dark navbar (bg-black/90 backdrop-blur)
- Logo left, menu center, "Book Now" CTA right
- Cream/gold underline on hover for links
- Mobile: Slide-in menu from right

**Buttons**
- Primary: Cream/gold (#F2E6D8) bg, dark text, px-8 py-4
- Secondary: Dark bg, cream border, cream text
- Floating Action: Fixed bottom-right, "WhatsApp" or "Book" with cream bg
- Image overlays: Backdrop-blur-md bg-white/10 with cream text

**Cards**
- Service cards: Dark bg (bg-zinc-900), subtle cream border, p-8
- Portfolio items: Full-bleed images, overlay gradient on hover
- Testimonials: Cream quote marks, italic text, author photos

## Page Structure

**Hero Section** (100vh)
- Large hero image: Elegant hands with manicured nails, soft lighting, luxury setting
- Dark gradient overlay (from transparent to black)
- Centered content: Brand name in Cormorant, tagline, dual CTAs
- Subtle scroll indicator at bottom

**Services** (py-24)
- 3-column grid (1 on mobile)
- Each service: Icon, title, description, price range, "Learn More" link
- Dark cards with cream accent borders appearing on hover

**Portfolio Gallery** (py-24)
- Masonry grid layout (3 columns desktop, 2 tablet, 1 mobile)
- High-quality nail art images
- Lightbox on click with navigation

**About Section** (2-column, py-24)
- Left: Professional headshot of Neycha
- Right: Bio, certifications, experience
- Cream divider line between sections

**Testimonials** (py-20)
- Carousel with 2 visible cards at desktop
- Client photos, 5-star ratings in cream/gold
- Auto-rotating with manual controls

**Booking CTA** (py-32)
- Full-width dark section with cream accent border top/bottom
- Centered: Bold headline, subtext, prominent booking button
- Background: Subtle texture or pattern

**Footer** (py-16)
- 3-column: Brand info, Quick links, Contact/Hours
- Social icons in cream
- Newsletter signup with cream input borders
- Copyright in muted gray

## Images

**Hero Image**: Professional photograph of perfectly manicured hands against dark, textured background (velvet or silk). Dramatic side lighting. High-resolution, cinematic quality.

**About Section**: Professional headshot of Neycha in elegant, minimalist setting. Natural lighting, confidence-inspiring pose.

**Portfolio Grid**: 12-15 images showcasing diverse nail art - French tips, gel designs, nail art, natural looks. Consistent dark/neutral backgrounds. Professional photography with macro details.

**Service Icons**: Use Heroicons (Sparkles, Star, PaintBrush) in cream color

## Animations (Framer-Motion)
- Page transitions: Fade with slight upward motion (y: 20)
- Scroll reveals: Elements fade-in with stagger (0.1s delay)
- Card hovers: Subtle lift (y: -4) with shadow increase
- Image overlays: Gradient opacity transition (0.3s)
- Navigation: Smooth color transitions (0.2s)

## Accessibility
- Cream text (#F2E6D8) on dark backgrounds meets WCAG AA
- Focus states: Cream outline (ring-2 ring-cream)
- Alt text for all portfolio images
- Keyboard navigation for all interactive elements