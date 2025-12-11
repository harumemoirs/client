import { MetadataRoute } from "next";
import { getAllBlogs } from "@/functions/services/main/blogs";
import { getAllJournals } from "@/functions/services/main/journal";
import { getAllLetters } from "@/functions/services/main/letter";
import { getAllPoems } from "@/functions/services/main/poem";

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
    // Fetch all content concurrently with a high limit to get everything
    // Note: Google supports up to 50,000 URLs per sitemap, so 1000 is safe for now
    const [blogsRes, journalsRes, lettersRes, poemsRes] =
      await Promise.allSettled([
        getAllBlogs(1, 1000),
        getAllJournals(1, 1000),
        getAllLetters(1, 1000),
        getAllPoems(1, 1000),
      ]);

    // Helper to process response and Map to sitemap format
    const processItems = (result: PromiseSettledResult<any>, type: string) => {
      if (result.status !== "fulfilled") return [];

      // Handle different response structures (pagination wrapper vs direct array)
      const data = result.value;
      // Access the array based on the type key (blogs, journals, etc.) or generic 'data'
      const items = data[type] || data.data || [];

      if (!Array.isArray(items)) return [];

      return items.map((item: any) => ({
        url: `${baseUrl}/blogs/${item.id}`, // Using unique item.id instead of adminId
        lastModified: item.date
          ? new Date(item.date).toISOString()
          : currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    };

    const dynamicRoutes = [
      ...processItems(blogsRes, "blogs"),
      ...processItems(journalsRes, "journals"),
      ...processItems(lettersRes, "letters"),
      ...processItems(poemsRes, "poems"),
    ];

    console.log(
      `✅ Generated sitemap with ${routes.length} static and ${dynamicRoutes.length} dynamic routes`
    );

    return [...routes, ...dynamicRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
