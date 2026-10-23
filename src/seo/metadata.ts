/**
 * SEO Metadata Configuration for Haru Memoirs
 * 
 * Comprehensive SEO setup following Google's best practices:
 * - Proper metadata structure
 * - Open Graph and Twitter Card support
 * - Structured data (Schema.org)
 * - Canonical URLs
 * - Proper robots directives
 */

import { Metadata } from "next";
import { PAGE_KEYWORDS } from "./keywords";

const SITE_URL = "https://harumemoirs.in";
const SITE_NAME = "Haru Memoirs by Christina";
const SITE_DESCRIPTION =
  "Inspired by Haru - the season of return. Writing from the spaces between change, where silence turns into story and moments unfold like sakura in spring. Exploring impermanence, tenderness, and belonging through seasonal reflections.";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Base metadata configuration
 * Following Next.js 13+ App Router best practices
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: PAGE_KEYWORDS.home,
  authors: [{ name: "Christina", url: SITE_URL }],
  creator: "Christina",
  publisher: "Haru Memoirs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Haru Memoirs - Seasonal Writing and Gentle Reflections",
        type: "image/jpeg",
      },
    ],
  },
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
    creator: "@harumemoirs",
    site: "@harumemoirs",
  },
  // Robots directives for search engines
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Verification (add when you have Google Search Console verification code)
  // verification: {
  //   google: "your-google-verification-code",
  // },
  // Favicon configuration
  // Next.js automatically converts these to <link> tags in HTML
  // Using absolute URLs for Google Search compatibility
  icons: {
    icon: [
      { url: `${SITE_URL}/favicon.ico`, sizes: "any" }, // Primary favicon
      {
        url: `${SITE_URL}/favicon/favicon-96x96.png`,
        sizes: "96x96",
        type: "image/png",
      },
    ],
    shortcut: `${SITE_URL}/favicon.ico`,
    apple: `${SITE_URL}/apple-icon.png`,
  },
  manifest: `${SITE_URL}/favicon/site.webmanifest`,
  // Alternates for internationalization (if needed in future)
  alternates: {
    canonical: SITE_URL,
  },
};

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  path = "",
  image,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords || PAGE_KEYWORDS.home,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@harumemoirs",
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Generate blog post metadata with article-specific fields
 * Following Schema.org Article schema requirements
 */
export function generateBlogMetadata({
  title,
  description,
  publishedTime,
  modifiedTime,
  authors = ["Christina"],
  tags = [],
  image,
  slug,
  noindex = false,
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  image?: string;
  slug: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}/blogs/${slug}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  const modified = modifiedTime || publishedTime;

  return {
    title,
    description,
    keywords: tags.length > 0 ? tags : PAGE_KEYWORDS.home,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: SITE_NAME,
      publishedTime,
      modifiedTime: modified,
      authors: authors,
      tags: tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@harumemoirs",
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Structured Data Generators (Schema.org JSON-LD)
 */

// Website Schema - Required for sitelinks and site search
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  author: {
    "@type": "Person",
    name: "Christina",
  },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blogs?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Organization Schema - Helps with brand recognition
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  description: SITE_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Christina",
  },
  sameAs: [
    "https://www.instagram.com/harumemoirs",
    "https://x.com/harumemoirs",
  ],
};

// Site Navigation Schema - Helps with sitelinks
export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Site Navigation",
  description: "Main navigation links for Haru Memoirs",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "Home",
      description: "Haru Memoirs homepage - Seasonal writing and gentle reflections",
      url: SITE_URL,
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "All Stories",
      description: "Browse all blogs, journals, letters, and poems",
      url: `${SITE_URL}/blogs`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "About Christina",
      description: "Learn more about Christina and Haru Memoirs",
      url: `${SITE_URL}/about`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "Contact",
      description: "Get in touch with Christina",
      url: `${SITE_URL}/contact-us`,
    },
  ],
};

/**
 * Blog Posting Schema Generator
 * Following Schema.org BlogPosting requirements
 */
export function generateBlogPostingSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  image,
  slug,
  author = "Christina",
  tags = [],
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  slug: string;
  author?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: image || DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${slug}`,
    },
    keywords: tags.join(", "),
    articleSection: tags[0] || "General",
    inLanguage: "en-US",
  };
}

/**
 * Breadcrumb Schema Generator
 * Helps with navigation in search results
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default baseMetadata;
