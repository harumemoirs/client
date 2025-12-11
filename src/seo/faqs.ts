/**
 * SEO-Optimized FAQs for Haru Memoirs
 * 
 * These FAQs are structured for Schema.org FAQPage markup and target
 * common search queries related to seasonal memoir writing and the brand.
 */

export interface FAQ {
  question: string
  answer: string
  category: 'brand' | 'content' | 'writing' | 'seasonal' | 'general'
}

export const BRAND_FAQS: FAQ[] = [
  {
    question: 'What is Haru Memoirs?',
    answer: 'Haru Memoirs is a seasonal memoir blog by Christina, inspired by the Japanese concept of Haru (春) - the season of return. It explores themes of impermanence, tenderness, and belonging through gentle reflections on life\'s shifting seasons. The writing follows the rhythm of change, with stories that bloom, fade, and return like time itself.',
    category: 'brand',
  },
  {
    question: 'What does "Haru" mean?',
    answer: 'Haru (春) is the Japanese word for spring, representing renewal, return, and new beginnings. In Haru Memoirs, it symbolizes the cyclical nature of life and the gentle unfolding of moments, much like sakura (cherry blossoms) blooming in spring after winter\'s stillness.',
    category: 'brand',
  },
  {
    question: 'Who is Christina?',
    answer: 'Christina is the writer behind Haru Memoirs, crafting contemplative stories from the coast. She writes from the spaces between change - where silence turns into story, and moments unfold with tenderness and meaning. Her work explores seasonal transitions, impermanence, and the quiet beauty of everyday life.',
    category: 'brand',
  },
  {
    question: 'What type of content does Haru Memoirs publish?',
    answer: 'Haru Memoirs publishes seasonal writing organized into four sections: Haru (Spring) features poetry about renewal and soft beginnings; Natsu (Summer) contains warm letters about books, travels, and fleeting joys; Aki (Autumn) offers self-reflections on change and impermanence; and Fuyu (Winter) presents quiet journals of solitude and peace.',
    category: 'content',
  },
  {
    question: 'How often is new content published on Haru Memoirs?',
    answer: 'Haru Memoirs follows the natural rhythm of seasons, publishing contemplative pieces that honor the pace of change. New stories, poetry, letters, and reflections are shared regularly, allowing each piece to bloom in its own time, much like the seasonal transitions that inspire the writing.',
    category: 'content',
  },
  {
    question: 'What are the four seasons of Haru Memoirs?',
    answer: 'The four seasons are: Haru (Spring) for poetry and renewal; Natsu (Summer) for letters and wanderings; Aki (Autumn) for self-reflections on change; and Fuyu (Winter) for journals of solitude. Each season represents a different writing style and thematic focus, following the natural rhythm of change throughout the year.',
    category: 'seasonal',
  },
  {
    question: 'What is seasonal memoir writing?',
    answer: 'Seasonal memoir writing is a contemplative approach to storytelling that follows the rhythm of natural seasons. It explores how personal experiences, memories, and reflections shift with time, much like nature\'s cycles. This style emphasizes impermanence, gentle observation, and the beauty found in life\'s transitions.',
    category: 'writing',
  },
  {
    question: 'What themes does Haru Memoirs explore?',
    answer: 'Haru Memoirs explores themes of impermanence, tenderness, belonging, seasonal change, silence and story, gentle reflection, coastal life, Japanese-inspired aesthetics, mindfulness, solitude, renewal, and the spaces between moments. The writing seeks to find meaning in life\'s quiet transitions and fleeting beauty.',
    category: 'writing',
  },
  {
    question: 'Is Haru Memoirs inspired by Japanese culture?',
    answer: 'Yes, Haru Memoirs draws inspiration from Japanese concepts of seasonal awareness, impermanence (mono no aware), and the gentle appreciation of fleeting beauty. The four-season structure mirrors traditional Japanese seasonal divisions, and the aesthetic emphasizes natural textures, calm spaces, and mindful observation.',
    category: 'brand',
  },
  {
    question: 'How can I read Haru Memoirs?',
    answer: 'You can read Haru Memoirs by visiting the blog and exploring the four seasonal sections: Haru (Spring Poetry), Natsu (Summer Letters), Aki (Autumn Self Reflections), and Fuyu (Winter Journals). Each section offers a different perspective on life\'s gentle transitions and seasonal rhythms.',
    category: 'general',
  },
  {
    question: 'What makes Haru Memoirs different from other memoir blogs?',
    answer: 'Haru Memoirs stands apart through its seasonal structure, Japanese-inspired aesthetic, and focus on impermanence and gentle reflection. Rather than linear storytelling, it embraces the cyclical nature of time, with writing that blooms, fades, and returns like seasons. The aesthetic is airy and calm, with natural textures and contemplative prose.',
    category: 'brand',
  },
  {
    question: 'Can I subscribe to Haru Memoirs?',
    answer: 'Yes, you can subscribe to Haru Memoirs to receive seasonal reflections, new stories, and gentle musings directly. Stay connected with the rhythm of change and never miss a moment as it unfolds like sakura in spring.',
    category: 'general',
  },
  {
    question: 'What is the writing style of Haru Memoirs?',
    answer: 'The writing style is contemplative, gentle, and poetic. It emphasizes quiet observation, natural imagery, and mindful reflection. The prose flows like seasons - sometimes blooming with vivid detail, sometimes fading into silence, always honoring the rhythm of change and the beauty of impermanence.',
    category: 'writing',
  },
  {
    question: 'Where is Haru Memoirs written from?',
    answer: 'Haru Memoirs is written from the coast, where the rhythm of waves and changing tides mirrors the seasonal transitions explored in the writing. The coastal setting influences the themes of impermanence, natural beauty, and the spaces between moments.',
    category: 'brand',
  },
  {
    question: 'What is "writing from the spaces between change"?',
    answer: 'Writing from the spaces between change means capturing the quiet moments of transition - the pause between seasons, the silence before words, the gentle shift from one state to another. It\'s about finding story in stillness and meaning in the liminal spaces where transformation unfolds.',
    category: 'writing',
  },
]

// Group FAQs by category for easy access
export const FAQ_BY_CATEGORY = {
  brand: BRAND_FAQS.filter(faq => faq.category === 'brand'),
  content: BRAND_FAQS.filter(faq => faq.category === 'content'),
  writing: BRAND_FAQS.filter(faq => faq.category === 'writing'),
  seasonal: BRAND_FAQS.filter(faq => faq.category === 'seasonal'),
  general: BRAND_FAQS.filter(faq => faq.category === 'general'),
}

// Schema.org FAQPage structured data generator
export function generateFAQSchema(faqs: FAQ[] = BRAND_FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export default BRAND_FAQS
