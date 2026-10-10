# PunePulse — Premium Pune Local Discovery & Outing Planner

> **"Find your kind of Pune. Less planning. More living."**

PunePulse is an editorial-grade, mobile-first local discovery platform and personalized outing planner designed for students, young adults, and urban explorers in Pune. Rather than acting as a generic business directory, it answers a core practical question:

> *"What should I do in Pune today, given my mood, budget, available time, and starting area?"*

---

## 🏛 Visual System & Brand Direction

- **Art Direction**: Inspired by luxury travel publications, independent culture journals, and architectural portfolios.
- **Palette**:
  - Warm Ivory (`#FBF9F5`, `#F5F0E6`): Paper-like, tactile surface.
  - Deep Charcoal (`#141312`, `#1A1917`): Editorial typographic contrast.
  - Forest Green (`#1E3A2F`, `#E3EDE8`): Natural park & Sahyadri hill accent.
  - Burnt Terracotta (`#C85A32`): Warm sunset & Irani café accent.
- **Typography**: Refined dual pairing of **Newsreader** (high-contrast display serif for editorial headlines) and **Plus Jakarta Sans** (clean, geometric sans-serif for UI, pricing, and filters).
- **Interactive Topographic Visualizer**: Custom HTML5 Canvas rendering real elevation contours of the Pune basin (Vetal Tekdi, Fergusson Ridge, Old Peths) with mouse-tracking parallax, golden-hour radiance, and landmark pulse beacons.

---

## 🚀 Key Functional Modules

### 1. Personalized Outing Planner (8-Step Concierge)
- **Step 1: Mood Curation**: Select from 10 distinct vibes (*Slow morning*, *Coffee and conversations*, *Date night*, *Friends and chaos*, *Nature escape*, *Food hunt*, *Art and culture*, *Nightlife*, *Solo reset*, *Spontaneous*).
- **Step 2: Real Budget Tuning**: Set per-person thresholds (*Under ₹200*, *₹200–₹500*, *₹500–₹1,000*, *₹1,000–₹2,000*, *Custom numeric slider*) with itemized inclusions (Food & drinks, Transport/fuel, Activity/entry fees).
- **Step 3: Available Duration**: *1–2 hours* (1 stop), *3–4 hours* (2 complementary stops), *Half day* (3 stops with transfer buffers), *Full day* (4 stops across day).
- **Step 4: Starting Location**: Default FC Road & Deccan (clearly marked as a default hub, not GPS tracker) with all 11 Pune districts selectable.
- **Step 5: Group Dynamics**: *Solo*, *Couple*, *2–3 friends*, *4–6 friends*, *Larger crew* with custom headcount counter for shared cab and fuel splitting.
- **Step 6: Transport Mode**: *Walking*, *Two-wheeler* (40% faster in Pune peak traffic), *Public transit / Metro*, *Car / Cab*, *Flexible*.
- **Step 7: Atmosphere**: Setting options (Indoor/Outdoor, Quiet/Lively, Avoid weekend crowds).
- **Step 8: Output & Itinerary Editor**:
  - Dynamic editorial title and curator note.
  - Itemized per-person spend, group total, and 10% contingency buffer.
  - Real timeline with arrival and departure clock times.
  - **Live Editing**: Replace stop (swap with compatible alternatives), Remove stop, Reorder stops (▲/▼), Copy shareable text summary, and Save plan to browser localStorage.

### 2. Comprehensive Curated Dataset
- **29 Verified Pune Spots** focusing heavily on **FC Road & Deccan** (the MVP deep-coverage anchor), alongside Koregaon Park, JM Road, Camp, Kothrud, Kalyani Nagar, and Nature Hills.
- Includes iconic Pune institutions:
  - *Vaishali* (FC Road — SPDP, filter coffee, garden courtyard)
  - *Café Goodluck* (Deccan — Est. 1935, bun maska, Irani chai, kheema pav)
  - *Vetal Tekdi / ARAI Hill* (2,600 ft peak, quarry lake, sunrise walks, free entry)
  - *Wadeshwar* (FC Road — Appam with coconut stew, Ghee Podi Idli)
  - *Pagdandi Books Chai Café* (Baner — Indie books, barefoot mattresses, organic kahwa)
  - *Pataleshwar Cave Temple* (JM Road — 8th-century monolithic basalt rock shrine)
  - *German Bakery & French Window Patisserie* (Koregaon Park — Leafy European courtyards)
  - *Le Plaisir* (Prabhat Road — Gourmet French bistro, espresso panna cotta)
  - *Toit & Elephant and Co.* (Kalyani Nagar — Craft microbreweries, pet-friendly patios)
  - *Marz-O-Rin & Camp Burger* (Camp — Heritage Parsi balconies & colossal student burgers)
  - *Durga Café & Bedekar Misal* (Kothrud & Peths — Legendary chocolate cold coffee & misal)

### 3. Local Mobility & Traffic Intelligence
- Explicit heuristic modeling of Pune's real traffic choke-points: Goodluck Chowk, Alka Talkies Bridge, Sancheti Flyover, Yerwada Bridge, Radha Chowk.
- Recommends best departure windows (e.g. 2:00 PM – 4:30 PM unhurried afternoon window).
- Clearly labeled as historical planning heuristics without pretending to connect to live fake GPS heatmaps.

### 4. Search & Discovery Engine
- Real-time search across names, subcategories, tags, dishes, and streets.
- Multi-facet filtering: Category pills, Neighborhood dropdown, Spend brackets, and Verified only toggle.

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root Next.js layout with font imports
│   ├── page.tsx                # Homepage featuring all editorial sections
│   ├── globals.css             # Tailwind base & custom typography variables
│   ├── discover/page.tsx       # Live directory & multi-filter catalog
│   ├── plan/page.tsx           # Dedicated Outing Planner page
│   ├── hidden-gems/page.tsx    # Curated quiet sanctuaries
│   └── places/[slug]/page.tsx  # Dynamic place detail pages
├── components/
│   ├── navigation/
│   │   ├── Navbar.tsx          # Responsive navbar with area selector & drawer
│   │   └── Footer.tsx          # Editorial footer with policies and integrity notes
│   ├── hero/
│   │   ├── Hero.tsx            # Asymmetric editorial hero with value pills
│   │   └── TopographicCanvas.tsx # Interactive canvas drawing Sahyadri hill contours
│   ├── discovery/
│   │   ├── MoodStrip.tsx       # 10 interactive mood tiles
│   │   ├── TrendingSection.tsx # Asymmetric editorial radar picks
│   │   ├── NeighborhoodExplorer.tsx # Area briefings with walkability & transit
│   │   ├── HiddenGemsSection.tsx # Quiet spaces and heritage retreats
│   │   ├── BestTimeToVisit.tsx # 4-window time-of-day heuristic guide
│   │   └── PlannerTeaser.tsx   # Visual callout to outing concierge
│   ├── places/
│   │   ├── PlaceCard.tsx       # Image card with pricing and best-time tags
│   │   ├── PlaceModal.tsx      # Comprehensive modal with full budget & transit breakdown
│   │   └── PlaceFilter.tsx     # Search and filter panel
│   └── planner/
│       ├── OutingPlanner.tsx   # 8-step wizard with budget sliders & toggles
│       └── ItineraryView.tsx   # Editable itinerary sequence with live recalculation
├── data/
│   ├── places.ts               # 29 typed Pune places with rich metadata
│   ├── areas.ts                # 11 neighborhood descriptions, transit & highlights
│   └── traffic-guidance.ts     # Peak hour benchmarks and bottleneck matrices
├── lib/
│   ├── recommendations.ts      # Deterministic scoring & itinerary sequence algorithm
│   ├── budget.ts               # Spend calculation, group splits & contingency
│   ├── traffic.ts              # Travel time estimation & buffer calculations
│   └── filters.ts              # Multi-variable search and facet filters
├── types/
│   ├── place.ts                # TypeScript interfaces for places & categories
│   ├── preferences.ts          # Planner preference structures
│   └── itinerary.ts            # Generated itinerary & stop models
├── artifacts/
│   ├── planner/task.md         # Milestone progress checklist
│   └── file_generation/ttl=63d/
│       └── output/
│           └── punepulse_app.html # Standalone interactive single-file web app
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── test_punepulse.js           # Comprehensive unit and acceptance test suite
```

---

## 🛠 Local Setup & Development Commands

### Running the Next.js App (Standard Environment with Internet)
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
# Navigate to http://localhost:3000
```

### Running the Standalone Interactive Web App (Offline / Direct Browser)
The standalone web application `artifacts/file_generation/ttl=63d/output/punepulse_app.html` is completely self-contained with all 29 places, the 8-step outing planner, budget calculation engine, and topographic canvas animation.
```bash
# Open directly in any modern browser:
open artifacts/file_generation/ttl=63d/output/punepulse_app.html
# or serve via python:
python3 -m http.server 8080
```

### Running Acceptance Tests
```bash
node test_punepulse.js
```

---

## 🌐 External API Integrations (Phase 2 & 3 Roadmap)

For production expansion beyond the MVP:
1. **Live Traffic Provider** (e.g. Google Maps Platform / Mapbox Directions API): To upgrade the historical bottleneck heuristics into real-time congestion heatmaps.
2. **Real-time Transit Feeds (GTFS)**: Integration with Maha Metro and PMPML live bus tracking APIs.
3. **Verified Operating Hours & Table Booking**: Integration with Reserve with Google or Zomato/Dineout APIs.
4. **Cloud User Profiles**: Supabase or Firebase Auth for syncing saved itineraries across mobile devices.
