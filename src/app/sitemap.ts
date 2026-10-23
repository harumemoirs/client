import { MetadataRoute } from "next";

const SITE_URL = "https://harumemoirs.in";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.harumemoirs.in";

// Revalidate sitemap every 12 hours for better freshness
export const revalidate = 43200;
export const dynamic = "force-dynamic";

/**
 * Fetch content from API with error handling
 */
async function fetchContent(endpoint: string): Promise<any[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 43200 }, // Cache for 12 hours
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Failed to fetch ${endpoint}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // Handle different response structures
    return data.data?.data || data.data || data.blogs || data.journals || data.letters || data.poems || [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

/**
 * Check if a post is recent (within last 30 days)
 */
function isRecent(dateString: string | undefined): boolean {
  if (!dateString) return false;
  try {
    const postDate = new Date(dateString);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return postDate > thirtyDaysAgo && postDate <= new Date();
  } catch {
    return false;
  }
}

/**
 * Get last modified date from content item
 */
function getLastModified(item: any): Date {
  try {
    if (item.updatedAt) return new Date(item.updatedAt);
    if (item.createdAt) return new Date(item.createdAt);
    if (item.date) return new Date(item.date);
    return new Date();
  } catch {
    return new Date();
  }
}

/**
 * Generate sitemap entries for content items
 */
function mapContentToSitemap(
  items: any[],
  baseUrl: string
): MetadataRoute.Sitemap {
  return items
    .filter((item) => item?.slug) // Only include items with valid slugs
    .map((item) => {
      const lastModified = getLastModified(item);
      const recent = isRecent(item.updatedAt || item.createdAt || item.date);

      return {
        url: `${baseUrl}/blogs/${item.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: recent ? 0.8 : 0.6,
      };
    });
}

/**
 * Main sitemap generator
 * Following Google's sitemap best practices:
 * - Maximum 50,000 URLs per sitemap
 * - Maximum file size of 50MB (uncompressed)
 * - Proper lastModified dates
 * - Appropriate priority and changeFrequency values
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Static pages with proper priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    // Fetch all content types in parallel with timeout protection
    const [blogs, journals, letters, poems] = await Promise.all([
      fetchContent("/api/v2/blog/all-blogs?page=1&limit=5000"),
      fetchContent("/api/v2/journal/all-journals?page=1&limit=5000"),
      fetchContent("/api/v2/letter/all-letters?page=1&limit=5000"),
      fetchContent("/api/v2/poem/all-poems?page=1&limit=5000"),
    ]);

    // Combine all content
    const allContent = [...blogs, ...journals, ...letters, ...poems];

    // Map to sitemap entries
    const dynamicPages = mapContentToSitemap(allContent, SITE_URL);

    // Combine static and dynamic pages
    const sitemapEntries = [...staticPages, ...dynamicPages];

    // Log for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log(`Generated sitemap with ${sitemapEntries.length} URLs`);
      console.log(`- Static pages: ${staticPages.length}`);
      console.log(`- Dynamic pages: ${dynamicPages.length}`);
    }

    return sitemapEntries;
  } catch (error) {
    console.error("Critical error generating sitemap:", error);
    // Always return at least static pages
    return staticPages;
  }
}
