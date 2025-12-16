/**
 * SEO Metadata Configuration for Haru Memoirs
 *
 * Centralized metadata management for consistent SEO across all pages.
 */

import { Metadata } from "next";
import { PAGE_KEYWORDS } from "./keywords";

const SITE_URL = "https://harumemoirs.xyz";
const SITE_NAME = "Haru Memoirs by Christina";
const SITE_DESCRIPTION =
  "Inspired by Haru - the season of return. Writing from the spaces between change, where silence turns into story and moments unfold like sakura in spring. Exploring impermanence, tenderness, and belonging through seasonal reflections.";

// Default OG Image - Update with your actual image URL
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Base metadata configuration
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
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
    creator: "@harumemoirs",
  },
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
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: "website" | "article";
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
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Generate blog post metadata with article-specific fields
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
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  image?: string;
  slug: string;
}): Metadata {
  const url = `${SITE_URL}/blogs/${slug}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: tags,
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
      modifiedTime: modifiedTime || publishedTime,
      authors: authors,
      tags: tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Structured Data Generators
 */

// Website Schema
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
};

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Christina",
  },
  sameAs: [
    // Add your social media URLs
    "https://www.instagram.com/harumemoirs",
    "https://x.com/harumemoirs",
  ],
};

// Site Navigation Schema for Sitelinks
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

// Blog Posting Schema Generator
export function generateBlogPostingSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  image,
  slug,
  author = "Christina",
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  slug: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image || DEFAULT_OG_IMAGE,
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
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${slug}`,
    },
  };
}

// Breadcrumb Schema Generator
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
