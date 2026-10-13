# 🌸 Bloom & Petal — Artisan Florist Website

A complete, polished florist business website built with React, Vite, and Tailwind CSS.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev) | UI library |
| [Vite 8](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://framer.com/motion) | Animations & transitions |
| [Lucide React](https://lucide.dev) | Icon library |

## Features

- **Responsive Navigation** — scroll-aware navbar with mobile slide menu
- **Hero Section** — full-screen floral hero with animated headline and stats
- **Product Catalog** — 8 product cards with category filters (All / Bouquets / Wedding / Seasonal)
- **Product Modal** — quick-view drawer with details, color options, and add-to-cart
- **Shopping Cart** — slide-out drawer with quantity controls, subtotal, and free-delivery progress bar
- **Wedding Services** — editorial two-column layout with service cards and consultation CTA
- **Seasonal Collections** — four full-bleed image cards with hover reveal
- **Brand Story** — photo collage + founder narrative on dark background
- **Testimonials** — clearly labelled as sample content; star ratings and stats bar
- **FAQ Accordion** — animated single-open accordion with 5 FAQs
- **Contact Form** — real-time validation, blur-triggered errors, submitting state, success screen
- **Newsletter** — email validation, loading spinner, success animation
- **Footer** — link columns, social icons, legal disclaimer

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone or download the project
cd bloom-and-petal

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

The production bundle will be output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Responsive nav with mobile menu
│   ├── Hero.jsx            # Full-screen hero section
│   ├── FeaturedBouquets.jsx  # Product grid with filters
│   ├── ProductModal.jsx    # Product detail modal
│   ├── CartDrawer.jsx      # Shopping cart slide-out
│   ├── WeddingServices.jsx # Wedding florals section
│   ├── SeasonalCollections.jsx  # Seasonal image cards
│   ├── BrandStory.jsx      # About/story section
│   ├── Testimonials.jsx    # Customer reviews (sample)
│   ├── FAQ.jsx             # Accordion FAQ
│   ├── Contact.jsx         # Validated contact form
│   ├── Newsletter.jsx      # Email signup with demo state
│   └── Footer.jsx          # Site footer
├── context/
│   └── CartContext.jsx     # Cart state via useReducer
├── data/
│   └── products.js         # Products, testimonials, FAQs
├── App.jsx                 # Root component
├── main.jsx                # Entry point
└── index.css               # Tailwind + design tokens
```

## Design System

The site uses a cohesive botanical colour palette defined as CSS custom properties:

| Token | Colour | Usage |
|-------|--------|-------|
| `ivory` | `#faf7f2` | Page background |
| `ivory-dark` | `#f2ece0` | Section alternates |
| `sage` | `#7a9e7e` | Primary brand colour |
| `blush` | `#d4a5a5` | Accent, badges |
| `charcoal` | `#2c2c2c` | Headings, dark sections |
| `gold` | `#c9a96e` | Stars, accents |

Typography: **Playfair Display** (serif, headings) + **Inter** (sans-serif, body)

## Important Disclaimers

- **Forms are demo-only** — no data is transmitted or stored
- **Cart does not process payments** — checkout shows an informational alert
- **Testimonials are sample content** — clearly labelled in the UI
- **Business details are fictional** — Bloom & Petal does not exist
- **Images** — sourced from [Unsplash](https://unsplash.com) (free for commercial use with attribution)

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel

```bash
npx vercel --prod
```

### Manual / Static Hosting

Run `npm run build`, then deploy the contents of the `dist/` folder to any static host.
