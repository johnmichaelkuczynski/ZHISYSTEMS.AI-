# Zhi Systems Website Design Guidelines

## Design Approach

**Selected Framework**: Hybrid approach drawing from Linear's clean professionalism, academic platforms (JSTOR, IEEE), and modern SaaS design patterns. Focus on information clarity, credibility, and sophisticated simplicity befitting an academic technology platform.

**Core Principles**:
- Academic authority meets modern interface design
- Information architecture that guides researchers efficiently
- Visual restraint that emphasizes content and functionality
- Trust-building through professional presentation

---

## Typography System

**Primary Typeface**: Inter (via Google Fonts CDN)
- Headings: 600-700 weight
- Body: 400-500 weight
- UI Elements: 500-600 weight

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl (font-semibold)
- Section Headers: text-3xl md:text-4xl (font-semibold)
- Subsections: text-2xl md:text-3xl (font-semibold)
- Feature Titles: text-xl md:text-2xl (font-medium)
- Body Text: text-base md:text-lg (font-normal, leading-relaxed)
- Small Text: text-sm md:text-base
- Captions: text-xs md:text-sm

**Chinese Typography**: Noto Sans SC (for 知 logo integration and any Chinese text)
- Display weight for logo prominence
- Regular weight for supporting Chinese content

---

## Layout System

**Spacing Primitives**: Tailwind units of 3, 4, 6, 8, 12, 16, 20, 24
- Micro spacing (component internals): 3, 4
- Standard spacing (between elements): 6, 8, 12
- Section spacing: 16, 20, 24
- Viewport padding: py-16 md:py-20 lg:py-24 for major sections

**Container Strategy**:
- Page wrapper: max-w-7xl mx-auto px-6 md:px-8
- Content sections: max-w-6xl mx-auto
- Text-heavy content: max-w-4xl
- Hero content: max-w-5xl

**Grid Systems**:
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Products showcase: grid-cols-1 md:grid-cols-2 gap-12
- Stats/Metrics: grid-cols-2 md:grid-cols-4 gap-6

---

## Component Library

### Navigation
**Primary Header**: Sticky top navigation
- Logo left (知 + Zhi Systems wordmark)
- Center navigation: AI Tools | Living Books | Core Applications | Research | About
- Right: Search icon, Sign In button, Get Started (primary CTA)
- Height: h-16 md:h-20
- Backdrop blur effect when scrolled

### Hero Section
**Layout**: Full-width with centered content overlay
- Large hero image showing abstract research/knowledge visualization (neural networks, book imagery, or academic workspace)
- Content: Headline + supporting text + dual CTAs (Start Free Trial + Watch Demo)
- Buttons with backdrop-blur-md bg-white/10 treatment over image
- Height: min-h-[600px] md:min-h-[700px]
- Trust indicator below CTAs: "Trusted by 500+ research institutions worldwide"

### Product Sections
**Three Major Sections** (AI Tools, Living Books, Core Applications):

Each section alternates layout:
- Section 1: Image left, content right (2-column split)
- Section 2: Content left, image right
- Section 3: Image left, content right

Content structure per section:
- Overline (small text): "AI-Powered Analysis" / "Digital Publishing" / "Core Platform"
- Section heading (text-3xl/4xl)
- Description paragraph (2-3 lines)
- Feature list (3-4 bullet points with checkmarks)
- CTA: "Explore AI Tools" / "Browse Living Books" / "View Applications"

### Feature Cards
**Grid Layout**: 3-column on desktop
- Card design: Bordered cards with subtle shadow on hover
- Icon top (60x60px, via Heroicons)
- Feature title (text-xl, font-medium)
- Description (2-3 lines, text-base)
- "Learn more" link with arrow
- Padding: p-8
- Consistent height using flex structure

### Statistics Section
**4-column metric display**:
- Large number (text-4xl md:text-5xl, font-bold)
- Metric label below (text-sm uppercase tracking-wide)
- Optional supporting text
- Subtle dividers between columns

### Research Showcase
**Academic Credibility Section**:
- Headline: "Advancing Academic Research"
- 2-column grid featuring:
  - Journal system capabilities
  - Published research statistics
  - Integration partnerships (university logos)
  - Case study highlights
- Mixed card sizes for visual interest

### CTA Sections
**Primary CTA Block** (appears 2x on page):
- Centered layout with gradient background treatment
- Headline + supporting text
- Dual buttons (primary + secondary)
- Optional: Demo calendar embed or contact form
- py-20 md:py-24 spacing

### Footer
**Comprehensive footer structure**:
- 4-column grid on desktop, stacks on mobile
- Column 1: Logo + tagline + social links
- Column 2: Products (AI Tools, Living Books, Core Apps)
- Column 3: Resources (Documentation, Research, Support, Blog)
- Column 4: Company (About, Careers, Contact, Privacy)
- Bottom bar: Copyright + legal links
- Newsletter signup integrated in top section

---

## Images Specification

**Hero Image**: 
- Full-width, high-quality photograph or illustration
- Subject: Abstract representation of knowledge/wisdom - could be neural network visualization overlaid on ancient manuscripts, or modern research workspace with traditional scholarly elements
- Treatment: Subtle gradient overlay (dark to transparent) for text readability
- Dimensions: 1920x800px minimum, optimized for web

**Product Section Images**:
- Screenshot-style images showing platform interfaces
- AI Tools: Dashboard with data visualization and analysis results
- Living Books: Digital book reader interface with annotation features
- Core Applications: Multi-panel view of journal management system
- Each image: 800x600px minimum, subtle border treatment

**Research Showcase Images**:
- University partner logos (grayscale, hover to color)
- Optional: Researcher photos or academic setting imagery

**Background Elements**:
- Subtle geometric patterns or grid overlays in specific sections for visual depth
- Never competing with primary content

---

## Animations & Interactions

**Minimal Motion Philosophy**:
- Fade-in on scroll for section reveals (subtle, once only)
- Hover states on cards: subtle lift (translate-y-1) + shadow enhancement
- Button interactions: Built-in button component handles all states
- Navigation: Smooth scroll behavior
- Page transitions: None (instant)

**No Animations For**:
- Hero section (static)
- Text elements
- Background elements
- Image galleries

---

## Accessibility Standards

- All interactive elements: min-h-12 touch target
- Focus visible states on all interactive elements (ring-2 ring-offset-2)
- ARIA labels for icon-only buttons
- Semantic HTML structure throughout
- Sufficient contrast ratios (WCAG AA minimum)
- Keyboard navigation fully supported

---

## Special Branding Integration

**知 Logo Treatment**:
- Prominent in header (32x32px md:40x40px)
- Paired with "Zhi Systems" wordmark
- Can appear as decorative element in section dividers (subtle, large, low opacity)
- Potential usage as watermark in hero or major section backgrounds