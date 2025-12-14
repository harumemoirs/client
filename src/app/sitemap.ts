import { MetadataRoute } from "next";

const SITE_URL = "https://harumemoirs.xyz";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.harumemoirs.xyz";

// Revalidate sitemap every 24 hours (86400 seconds)
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 1. Static routes
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
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
    // 2. Fetch all content types from backend
    const [blogsRes, journalsRes, lettersRes, poemsRes] = await Promise.all([
      fetch(`${API_URL}/api/v2/blog/all-blogs?page=1&limit=1000`, {
        next: { revalidate: 86400 },
      }),
      fetch(`${API_URL}/api/v2/journal/all-journals?page=1&limit=1000`, {
        next: { revalidate: 86400 },
      }),
      fetch(`${API_URL}/api/v2/letter/all-letters?page=1&limit=1000`, {
        next: { revalidate: 86400 },
      }),
      fetch(`${API_URL}/api/v2/poem/all-poems?page=1&limit=1000`, {
        next: { revalidate: 86400 },
      }),
    ]);

    // 3. Parse responses
    const blogsData = await blogsRes.json();
    const journalsData = await journalsRes.json();
    const lettersData = await lettersRes.json();
    const poemsData = await poemsRes.json();

    // Extract items from response (handle different response structures)
    const blogs = blogsData.data?.data || blogsData.blogs || blogsData.data || [];
    const journals = journalsData.data?.data || journalsData.journals || journalsData.data || [];
    const letters = lettersData.data?.data || lettersData.letters || lettersData.data || [];
    const poems = poemsData.data?.data || poemsData.poems || poemsData.data || [];

    // 4. Map content to sitemap entries
    const mapToSitemap = (
      items: any[],
      isRecent: (date: string) => boolean
    ): MetadataRoute.Sitemap => {
      return items.map((item: any) => {
        const lastModified = item.updatedAt || item.createdAt || item.date;
        const modifiedDate = lastModified ? new Date(lastModified) : currentDate;
        const recent = lastModified ? isRecent(lastModified) : false;

        return {
          url: `${SITE_URL}/blogs/${item.slug}`,
          lastModified: modifiedDate,
          changeFrequency: "monthly" as const, // Memoir content doesn't change frequently
          priority: recent ? 0.8 : 0.7, // Higher priority for recent posts
        };
      });
    };

    // Helper to check if post is recent (within last 30 days)
    const isRecent = (dateString: string): boolean => {
      const postDate = new Date(dateString);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return postDate > thirtyDaysAgo;
    };

    // 5. Combine all dynamic routes
    const dynamicPages: MetadataRoute.Sitemap = [
      ...mapToSitemap(blogs, isRecent),
      ...mapToSitemap(journals, isRecent),
      ...mapToSitemap(letters, isRecent),
      ...mapToSitemap(poems, isRecent),
    ];

    // 6. Return combined sitemap
    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback to static routes if API fails
    return staticPages;
  }
}
