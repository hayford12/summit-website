# Summit Website

React + Vite implementation of the Summit Performance and Transformation Consult Limited website.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Router + layout
├── styles/
│   ├── global.css        # CSS reset + variables
│   └── tokens.js         # Design tokens (colors)
├── data/
│   ├── services.js       # All 6 service definitions
│   ├── sectors.js        # All 5 sector definitions
│   └── insights.js       # Insights, 4D methodology, values
├── components/
│   ├── Nav.jsx           # Global navigation
│   ├── Footer.jsx        # Global footer
│   └── UI.jsx            # Shared components (buttons, labels, CTA banner)
└── pages/
    ├── HomePage.jsx
    ├── AboutPage.jsx
    ├── ApproachPage.jsx
    ├── ServicesPage.jsx
    ├── ServiceDetailPage.jsx
    ├── SectorsPage.jsx
    ├── SectorDetailPage.jsx
    ├── InsightsPage.jsx
    ├── InsightDetailPage.jsx
    ├── ContactPage.jsx
    ├── LegalPage.jsx
    └── NotFoundPage.jsx
```

## Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/about` | About |
| `/approach` | 4D™ Methodology |
| `/services` | Services Hub |
| `/services/:slug` | Service Detail |
| `/sectors` | Sectors Hub |
| `/sectors/:slug` | Sector Detail |
| `/insights` | Insights Listing |
| `/insights/:slug` | Insight Article |
| `/contact` | Diagnostic Intake Form |
| `/legal/privacy` | Privacy Policy |
| `/legal/terms` | Terms of Engagement |
| `/legal/accessibility` | Accessibility Statement |

## Design Tokens

Defined in `src/styles/tokens.js` and as CSS variables in `src/styles/global.css`:

| Token | Value |
|---|---|
| Navy | `#102A43` |
| Teal | `#007C83` |
| Gold | `#D4A72C` |
| Warm | `#F7F5F0` |
| Mist | `#EAF3F4` |
| Ink  | `#243B53` |

## Adding Content

- **New service**: Add to `src/data/services.js` — the detail page renders automatically via the `:slug` route.
- **New sector**: Add to `src/data/sectors.js` — same pattern.
- **New insight**: Add to `src/data/insights.js`.

## Contact Form

The form in `ContactPage.jsx` currently simulates submission with a timeout. Replace the `setTimeout` block with your real form handler (e.g. Formspree, EmailJS, or a backend endpoint).
