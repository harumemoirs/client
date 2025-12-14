import { MetadataRoute } from "next";
import { getAllBlogs } from "@/functions/services/main/blogs";
import { getAllJournals } from "@/functions/services/main/journal";
import { getAllLetters } from "@/functions/services/main/letter";
import { getAllPoems } from "@/functions/services/main/poem";

// Enable ISR: Cache sitemap and revalidate every 24 hours (86400 seconds)
// This prevents timeout issues with Google Search Console
export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://harumemoirs.xyz";
  const currentDate = new Date().toISOString();

  // Static routes with SEO-optimized priorities and change frequencies
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    // Helper to fetch ALL items across pages for a specific service
    const fetchAllItems = async (
      fetchFunction: (page: number, limit: number) => Promise<any>,
      type: string
    ) => {
      let allItems: any[] = [];
      let page = 1;
      let hasMore = true;
      const limit = 100; // Batch size per request

      while (hasMore) {
        try {
          const res = await fetchFunction(page, limit);
          const data = res.data || res[type] || [];
          const items = Array.isArray(data) ? data : data.data || []; // Handle nested data structure

          if (items.length > 0) {
            allItems = [...allItems, ...items];

            //Check pagination info if available
            const pagination = res.pagination || {};
            hasMore = pagination.hasNextPage || items.length === limit;

            if (hasMore) page++;
          } else {
            hasMore = false;
          }
        } catch (err) {
          hasMore = false; // Stop on error
        }
      }

      return allItems;
    };

    // Fetch all content types in parallel using the robust fetcher
    const [blogs, journals, letters, poems] = await Promise.all([
      fetchAllItems(getAllBlogs, "blogs"),
      fetchAllItems(getAllJournals, "journals"),
      fetchAllItems(getAllLetters, "letters"),
      fetchAllItems(getAllPoems, "poems"),
    ]);

    // Map helper
    const mapToSitemap = (items: any[]) =>
      items.map((item: any) => ({
        url: `${baseUrl}/blogs/${item.slug}`,
        lastModified:
          item.updatedAt || item.createdAt || item.date
            ? new Date(
                item.updatedAt || item.createdAt || item.date
              ).toISOString()
            : currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    const dynamicRoutes = [
      ...mapToSitemap(blogs),
      ...mapToSitemap(journals),
      ...mapToSitemap(letters),
      ...mapToSitemap(poems),
    ];

    return [...routes, ...dynamicRoutes];
  } catch (error) {
    return routes;
  }
}
