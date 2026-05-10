# Zhi Systems Website

## Overview

This React-based single-page website showcases Zhi Systems' Living Books and AI-powered applications. Its primary purpose is to highlight their offerings, including an interactive journal system with advanced AI features, providing persistent data storage and a robust platform for their intellectual property. The project emphasizes simplicity, direct functionality, and a modern tech stack.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Framework**: React with TypeScript, built using Vite.
- **UI Library**: shadcn/ui (built on Radix UI primitives) for accessible and customizable components.
- **Styling**: Tailwind CSS with CSS variables for a utility-first approach.
- **Design Principles**: Mobile-first, responsive, minimal animations, and direct functionality.
- **Branding**: Custom logo featuring the Chinese character "知" (zhī - knowledge/wisdom) with integrated company name and slogan.
- **Content Organization**: Book collections are alphabetically sorted, and applications are categorized with emojis for improved user experience.

### Technical Implementations
- **Frontend**: React with TypeScript, Wouter for routing, TanStack Query for state management.
- **Backend**: Node.js with Express.js and TypeScript (ES modules) providing a RESTful API.
- **Database**: PostgreSQL (via Neon Database serverless) managed with Drizzle ORM and Drizzle Kit for migrations.
- **Monorepo Structure**: Shared folder (`shared/schema.ts`) for client/server type consistency.
- **Data Flow**: Static content for books/apps is hardcoded, with client-side routing and centralized error handling.
- **Deployment**: Configured for Render.

### Feature Specifications
- **Journal System**: A comprehensive blog system ("Zhi Systems Journal") featuring volume/issue numbering (Roman numerals) and markdown support, including an admin interface. It integrates 8 AI-powered functions for text analysis (e.g., rewrite, study guides, tests, podcasts, visual cognitive maps, deep dives, summaries) and OpenAI TTS-1 for audio generation. All AI-generated content can be downloaded in structured formats. The journal currently includes 100 issues across 72 volumes covering diverse interdisciplinary research including philosophy, mathematical philosophy, evolutionary game theory, epistemology, and metaphysics. Volume XLVII is the largest multi-issue volume with 11 issues on systematic reinterpretations of classical philosophical theories (Leibniz, Rawls, James, Berkeley, Plato's Forms, Plato's Recollection, Hegel, Marx, Spinoza, Kant) plus a critique of economics as predictive science. Volume XLVIII continues the multi-issue series on evolutionary psychology and political economy (3 issues). Volume LVII is a 4-issue "Self-Cancelling Concepts" series. Volume LVIII opens with a critique of van Fraassen's constructive empiricism (by John-Michael Kuczynski).
- **Podcast Library**: 14 episodes with AI-generated audio content aligned with journal research.
- **Core Applications**: 28 applications organized into 6 categories (Writing & Books, Education & Learning, Intelligence & Psychology, Visual & Multimedia, Audio & Interactive Media, Utility & Conversion).
- **Video Tutorial System**: Instructional video tutorials for apps, indicated by prominent "📹 Tutorial" buttons. Videos are stored in `/client/public/videos/`. Nine tutorials are currently implemented.

### System Design Choices
- **Persistent Storage**: Transitioned from in-memory session storage to PostgreSQL for robust data persistence.
- **Component Control**: Selected shadcn/ui for fine-grained control over UI styling and accessibility.
- **Static Content Handling**: Hardcoded static book and application data to simplify architecture due to their unchanging nature.
- **Authorship**: Clear attribution for John-Michael Kuczynski on 13 specific Living Books titles.
- **Scalable Video Infrastructure**: Implemented an optional `videoUrl` property in the app data structure to enable dynamic tutorial button display.

## External Dependencies

### UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library.
- **Class Variance Authority**: Utility for creating component variants.

### Development Tools
- **TypeScript**: For type safety.
- **ESBuild**: Fast JavaScript bundler.

### Database and ORM
- **@neondatabase/serverless**: Serverless PostgreSQL client.
- **Drizzle ORM**: Type-safe database toolkit.
- **Drizzle Zod**: Schema validation integration.

### AI/Content Generation
- **OpenAI TTS-1**: Text-to-speech for audio generation.