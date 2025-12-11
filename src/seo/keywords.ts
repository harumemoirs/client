/**
 * SEO Keywords Strategy for Haru Memoirs
 *
 * This file contains comprehensive keyword targeting for seasonal memoir writing,
 * Japanese-inspired storytelling, and coastal heritage narratives.
 */

export const SEO_KEYWORDS = {
  // Primary Keywords (High Priority - Target for main pages)
  primary: [
    "seasonal memoir blog",
    "Japanese inspired writing",
    "Haru memoirs",
    "seasonal storytelling",
    "contemplative writing blog",
    "impermanence writing",
    "coastal memoir",
    "seasonal poetry blog",
  ],

  // Secondary Keywords (Medium Priority - Target for blog posts and sections)
  secondary: [
    "spring renewal poetry",
    "summer travel letters",
    "autumn self reflection",
    "winter solitude journal",
    "sakura inspired writing",
    "Japanese seasons writing",
    "mindful memoir blog",
    "gentle reflections blog",
    "nature inspired writing",
    "seasonal change stories",
  ],

  // Long-tail Keywords (Specific - Target for individual blog posts)
  longTail: [
    "writing about impermanence and change",
    "Japanese seasonal memoir blog",
    "coastal heritage storytelling",
    "contemplative writing about nature",
    "poetry about spring renewal",
    "letters about summer travels",
    "autumn reflections on change",
    "winter journal writing",
    "sakura poetry and prose",
    "mindful writing about seasons",
    "gentle reflections on life",
    "stories about belonging and change",
    "writing through seasonal transitions",
    "Japanese inspired memoir writing",
    "coastal life reflections",
  ],

  // Seasonal Content Keywords
  seasonal: {
    haru: [
      "spring poetry",
      "sakura writing",
      "renewal and beginnings",
      "spring memoir",
      "cherry blossom reflections",
      "gentle verses",
      "spring awakening stories",
    ],
    natsu: [
      "summer travel letters",
      "warm musings",
      "summer wanderings",
      "travel memoir blog",
      "summer reading reflections",
      "sunlight stories",
      "fleeting joys writing",
    ],
    aki: [
      "autumn self reflection",
      "impermanence writing",
      "change and transition stories",
      "autumn memoir",
      "fading colors metaphor",
      "deeper meaning reflections",
      "fall contemplation",
    ],
    fuyu: [
      "winter journal",
      "solitude writing",
      "peaceful reflections",
      "winter memoir",
      "quiet contemplation",
      "snow and silence stories",
      "winter introspection",
    ],
  },

  // Niche-Specific Keywords
  niche: [
    "tenderness in writing",
    "belonging and identity memoir",
    "spaces between change",
    "silence into story",
    "airy calm writing",
    "natural textures in prose",
    "gentle typography aesthetic",
    "rhythm of change stories",
    "moments that bloom and fade",
    "time and memory writing",
  ],

  // Location-Based Keywords (if applicable)
  location: [
    "coastal writer",
    "seaside memoir",
    "ocean inspired writing",
    "coastal heritage stories",
    "writing from the coast",
    "maritime reflections",
  ],

  // Audience-Specific Keywords
  audience: [
    "mindful readers",
    "contemplative literature",
    "slow living blog",
    "intentional writing",
    "literary memoir blog",
    "poetic prose blog",
    "reflective writing community",
    "gentle storytelling",
  ],

  // Content Type Keywords
  contentType: [
    "memoir blog",
    "poetry and prose",
    "personal essays",
    "reflective letters",
    "journal entries blog",
    "seasonal writing series",
    "literary blog",
    "creative nonfiction",
  ],
};

// Meta Keywords String (for meta tags - use sparingly, most search engines ignore this)
export const META_KEYWORDS = [
  ...SEO_KEYWORDS.primary,
  ...SEO_KEYWORDS.secondary.slice(0, 10),
].join(", ");

// Structured Keywords for Different Pages
export const PAGE_KEYWORDS = {
  home: [
    "Haru memoirs",
    "seasonal memoir blog",
    "Japanese inspired writing",
    "contemplative writing",
    "coastal memoir",
    "impermanence and change",
    "gentle reflections",
    "seasonal storytelling",
  ],

  about: [
    "Christina memoir writer",
    "seasonal writing author",
    "Japanese inspired storytelling",
    "coastal heritage writer",
    "contemplative author",
    "memoir blog about change",
  ],

  blogs: [
    "seasonal memoir posts",
    "Japanese inspired stories",
    "contemplative essays",
    "poetry and prose",
    "reflective writing",
    "seasonal change stories",
  ],

  contact: [
    "contact memoir writer",
    "writing collaboration",
    "seasonal storytelling inquiries",
    "literary blog contact",
  ],
};

export default SEO_KEYWORDS;
