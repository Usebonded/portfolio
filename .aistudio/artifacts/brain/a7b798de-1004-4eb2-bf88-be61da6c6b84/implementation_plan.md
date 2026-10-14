# Portfolio Website Upgrade — Architecture & Implementation Plan

A comprehensive engineering plan to transform Savar Shetty's portfolio into a premium, minimal-futuristic portfolio with architectural brutalist influences for an applied AI/ML engineer and full-stack developer.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions have been synthesized from the master requirements to preserve working features while significantly elevating design maturity, contrast, and performance:

- **Confirmed Palette Alignment**: Transition base dark tones to `#0B0B0C` (primary canvas), `#141416` (secondary cards/surfaces), `#303034` (refined hairline borders), `#F2F0E6` (ivory primary text), `#A6A6AA` (secondary metadata), and `#7C7CFF` (restrained electric indigo accent).
- **Particle Background Preservation**: The existing Three.js WebGL particle universe and its dynamic mouse-follow physics are strictly preserved.
- **Hero Readability Solution**: Primary text set to `#F2F0E6` over an understated, card-free horizontal gradient scrim (`rgba(11,11,12,0.92)` fading to transparent) so the text remains 100% legible without obscuring the particle universe or looking like an artificial card container.
- **Projects Presentation**: Provide an architectural editorial card system by default displaying verified problem statements, solutions, technologies, roles, and repository links, with the interactive 3D phone coverflow accessible via view toggle.
- **Zero Hallucination Policy**: All project descriptions, education dates (Symbiosis B.Tech AI & ML, 2025–2029), and technical competencies are strictly bound to verified portfolio data without fabricated revenue metrics or mock company titles.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Savar Shetty's applied machine learning models, autonomous agentic workflows, embedded hardware interfaces, and hackathon prototypes in an engineered, editorial digital monograph.
- **Target Audience**: Technical recruiters, engineering managers, hackathon judges, and research collaborators evaluating applied AI/ML engineering, system architecture, and rapid prototyping capabilities.
- **Key Value**: Replaces generic template aesthetics with intentional typographic rhythm, honest system-level case studies, zero dead clicks, and flawless cross-device performance.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Landing & Identity Verification**: Visitor lands on the hero viewport; reads the clear hierarchy (`SAVAR SHETTY` → `B.Tech AI & ML` → Positioning Statement); sees the live particle universe with high contrast.
2. **Direct Action**: User can immediately click `"Explore My Work"` to smooth-scroll directly to `#projects`, `"Get in Touch"` to jump to `#contact`, or `"Inspect CV / Résumé"` to trigger the interactive modal preview.
3. **Deep Architecture Inspection**: In the Projects section, user browses structured project cards detailing real problems, engineering solutions, verified tech stacks, and source links. Clicking any card triggers the deep Case Study Modal with architecture diagrams and telemetry.
4. **Skills & Journey Assessment**: User scans categorized competencies (Programming, Web Dev, AI/ML, Tools) and chronological milestones from 2025 inception to projected 2029 graduation.
5. **Direct Outreach**: User dispatches an inquiry via validated contact channels with instant feedback, SLA indicators, and verified external profiles (GitHub, LinkedIn).

### Visual Identity & Theme
- **Aesthetic Direction**: Minimal-futuristic with architectural brutalist discipline. Hairline dividers, crisp typography, generous whitespace, and purposeful micro-interactions.
- **Color System**:
  - Primary Background (Canvas): `#0B0B0C`
  - Secondary Surface: `#141416`
  - Primary Text: `#F2F0E6`
  - Secondary / Supporting Text: `#A6A6AA`
  - Borders & Hairstyle Separators: `#303034`
  - High-Intent Accent: `#7C7CFF`
  - Live Status Indicator: `#00FF66`
- **Typography**:
  - Display & Headings: `Bricolage Grotesque` with tight tracking (`tracking-tight`) and balanced line wrapping (`text-wrap: balance`).
  - Body & Reading Text: `Plus Jakarta Sans` / system sans-serif (15px–16px, line-height 1.6).
  - Telemetry & Metadata: `Geist Mono` / `tabular-nums` for timestamps, tags, and metrics.
- **Contrast & Spatial Restraint**: Zero card-inside-card clutter, no decorative status dot scatter, no artificial version tags, no ghost typography.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Smooth Anchor Scrolling with Route Synchronization
- **Chosen Approach**: Establish a cohesive single-page scroll layout on the home route (`#home`, `#about`, `#projects`, `#skills`, `#experience`, `#contact`) with appropriate `scroll-margin-top: 5.5rem` to prevent the sticky navbar from obscuring headings, while preserving deep routing for direct links (`/projects`, `/systems`, `/about`, `/contact`).
- **Why**: Recruiter research shows technical portfolios perform best when all core achievements can be quickly scanned in 60 seconds on a single page without mandatory page transitions, while direct URLs remain shareable.

### Decision 2: Architectural Project Card Grid with 3D Coverflow Toggle
- **Chosen Approach**: Present an architectural editorial grid by default where project problems, solutions, tech stacks, and links are immediately readable in DOM without required interaction, with a prominent toggle button allowing visitors to switch into the 3D phone coverflow.
- **Why**: Ensures recruiters on mobile or slow connections can immediately read technical contributions and GitHub links without horizontal drag fatigue, while retaining the creative coverflow mode for interactive showreels.

### Decision 3: Hero Scrim Contrast without Card Containers
- **Chosen Approach**: Render a directional 90° linear gradient (`linear-gradient(90deg, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.68) 65%, rgba(11,11,12,0) 100%)`) with comfortable horizontal padding directly behind the positioning statement.
- **Why**: Eliminates contrast interference from moving background particles without boxing the statement into an unnatural card or adding distracting borders or blur filters.

---

## 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          App.tsx (Root Shell)                          │
│   ├── ThreeCanvasBackground (WebGL Particle Universe - Preserved)      │
│   ├── AmbientGlowFollower (Subtle #7C7CFF Spotlight)                  │
│   ├── ScrollProgressBar (Top 2px Luminous Accent Line)                 │
│   ├── Navbar (3-Zone Top Bar Contract with Mobile Sheet & Anchors)     │
│   │                                                                    │
│   ├── Main Viewport Area:                                              │
│   │   ├── #hero (Savar Shetty, Positioning Statement, CTAs, Terminal) │
│   │   ├── #about (Technical Focus, Philosophy, Academic Inception)     │
│   │   ├── #projects (8 Verified Systems, Case Study Modal Triggers)    │
│   │   ├── #skills (4 Structured Competency Domains, Zero Fake Bars)   │
│   │   ├── #experience (Chronological Milestones, Hackathons, Labs)     │
│   │   └── #contact (Direct Email, LinkedIn, GitHub, Dispatch Form)     │
│   │                                                                    │
│   ├── Footer (Quiet 1-line Copyright, Legal Links, System Status)      │
│   ├── CaseStudyModal (Deep Architecture, Problems, Solutions, Telemetry│
│   └── ResumeModal (Interactive In-App CV Preview & Export)             │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & Data Refactoring Plan

1. **Global Theme (`src/index.css`)**:
   - Update Tailwind `@theme` and `:root` variables to the refined palette:
     - `--color-canvas: #0B0B0C`
     - `--color-surface: #141416`
     - `--color-white: #F2F0E6`
     - `--color-border: #303034`
     - `--color-secondary: #A6A6AA`
     - `--color-accent: #7C7CFF`
   - Configure global `scroll-behavior: smooth` and `scroll-margin-top: 5rem` on section anchors.

2. **Hero Section (`src/components/Hero.tsx`)**:
   - Primary heading: `SAVAR SHETTY` with B.Tech AI & ML academic status.
   - Positioning statement: `"Building intelligent systems at the intersection of AI, machine learning and real-world applications."` in `#F2F0E6` with directional dark scrim.
   - Verified supporting description: Concisely summarizing applied machine learning, autonomous systems, and embedded IoT architectures.
   - Dual Call to Actions:
     - Primary button: `"Explore My Work"` (scrolls to `#projects`).
     - Secondary button: `"Get in Touch"` (scrolls to `#contact`).
     - Tertiary action: `"View Résumé / CV"` (opens `ResumeModal`).
   - Retain the interactive `DeveloperEnvironmentShell` seamlessly beneath the headline.

3. **Navigation (`src/components/Navbar.tsx`)**:
   - Enforce the 3-zone contract:
     - Zone 1: Single-element wordmark `SAVAR SHETTY` linking to `#home`.
     - Zone 2: 5 clean text navigation links (`Home`, `About`, `Projects`, `Skills`, `Journey`, `Contact`) with clear active/hover underlines.
     - Zone 3: Single primary action (`Get in Touch` or `Résumé`).
   - Mobile menu sheet with touch targets $\ge 44\text{px}$ and smooth backdrop transition.

4. **Projects Architecture (`src/components/Projects.tsx` & Data)**:
   - Present the 8 verified projects with honest statuses:
     1. `A.R.G.U.S.`: Real-time financial fraud detection with ESP32 IoT POS integration and ML ensembles.
     2. `M.M.A.`: Multimodal AI assistant reasoning across vision, audio, and language.
     3. `V.A.L.I.D.`: AI-generated voice detection project (Smart India Hackathon 2026).
     4. `Stock Trading Bot`: Reinforcement learning automated trading system (Synapse Hackathon 2026).
     5. `MeshRoute Ops`: AI-powered emergency dispatch & disaster relief command center (Smart India Hackathon 2025).
     6. `HostelEase`: Centralized student hostel administrative management platform.
     7. `Blood Donation Dashboard`: Healthcare operations console for donor blood unit inventory (Internship).
     8. `Synk Wallet` (Campus Wallet): Digital campus balance settlement platform.
   - Each card displays: Name, Problem Statement, Engineered Solution, Verified Tech Stack, Role, Status badge, and Source / Demo links.
   - View mode switcher: Default architectural grid + interactive 3D coverflow carousel.

5. **Skills Section (`src/components/CoreSystems.tsx` / `SkillsMatrix.tsx`)**:
   - 4 scannable domains:
     - *Programming*: Python, C, C++, JavaScript, TypeScript.
     - *AI/ML & Data*: PyTorch, TensorFlow, Scikit-Learn, OpenCV, Whisper, Gemini API, Exploratory Data Analysis.
     - *Web Development*: React, FastAPI, Node.js, REST APIs, WebSockets, Tailwind CSS.
     - *Tools & Edge Platforms*: Git, GitHub, ESP32 Microcontrollers, Linux, n8n Automation.
   - Strictly remove any arbitrary percentage bars or vanity proficiency scores.

6. **Experience & Education (`src/components/AboutExperience.tsx`)**:
   - Academic record: B.Tech in AI & ML at Symbiosis Skills and Professional University (Inception: June 2025 · Expected Graduation: 2029).
   - Hackathon record: Smart India Hackathon (Lead), Google Synapse Hackathon (RL Trading Bot).
   - Software engineering internship and coursework certifications.

7. **Contact & Footer (`src/components/ContactSection.tsx`, `src/components/Footer.tsx`)**:
   - Direct communication channels: Email (`shettysavar14@gmail.com`), GitHub (`github.com/Usebonded`), LinkedIn.
   - Working contact form with immediate validation feedback and toast confirmations.
   - Minimalist single-row footer with live copyright, system status indicator, and legal modals.
