/**
 * images.js — All site image URLs in one place.
 * To swap any image for a real Summit photo, just replace the URL here.
 * All images are from Unsplash (free, no attribution required).
 */

export const IMG = {
  // ── Hero ──────────────────────────────────────────────────────────────────
  // Modern Accra-style business district / skyline
  hero: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1600&q=80&fit=crop",

  // ── About ─────────────────────────────────────────────────────────────────
  // African professional in a meeting / boardroom context
  about: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&fit=crop",

  // ── Promise section background ────────────────────────────────────────────
  // Team collaborating around a table
  promise: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=80&fit=crop",

  // ── CTA banner background ─────────────────────────────────────────────────
  // Modern office / glass building exterior
  ctaBg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&fit=crop",

  // ── Service card images, keyed by the service's actual slug (not position) ─
  // Keying by slug means reordering, inserting, or removing a service in
  // services.js can never cause an image to silently mismatch its service.
  services: {
    'strategy-execution-performance':            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80&fit=crop",
    'digital-transformation-it-enabled-business': "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80&fit=crop",
    'operational-excellence-process-innovation':  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=700&q=80&fit=crop",
    'customer-citizen-experience':                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80&fit=crop",
    'leadership-change-capability':               "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&q=80&fit=crop",
    'resilience-risk-governance':                 "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&fit=crop",
  },
  // Fallback image used if a service is added without a matching entry above
  serviceFallback: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80&fit=crop",

  // ── Leadership portraits ──────────────────────────────────────────────────
  // Replace these with real Summit team photos
  leaders: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop&crop=face",
  ],

  // ── Insight author avatar, keyed by the insight's "author" string ──────────
  // 'Summit Team' is the current generic byline so it maps to the first
  // leader photo. When a real named author is added to insights.js, add
  // their name here too — otherwise authorFallback is used, so a new author
  // never silently inherits someone else's photo.
  authorPhotos: {
    'Summit Team': "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face",
  },
  authorFallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face",

  // ── Insight thumbnails, keyed by the insight's actual slug ─────────────────
  // Add a new entry here whenever a new insight is published — if a slug is
  // missing, components fall back to insightFallback rather than breaking.
  insights: {
    'strategy-execution-gap':           "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&fit=crop",
    'digital-adoption-change-management': "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&fit=crop",
    'leadership-pipelines-ghana':        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80&fit=crop",
  },
  // Fallback used if an insight is added without a matching thumbnail above
  insightFallback: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&fit=crop",

  // ── Sector hero images ────────────────────────────────────────────────────
  sectors: {
    'banking-financial-services':    "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1200&q=80&fit=crop",
    'insurance-general-life':        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&fit=crop",
    'public-government-institutions':"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fit=crop",
    'private-organizations':         "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&fit=crop",
    'small-medium-enterprises':      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&q=80&fit=crop",
  },
}
