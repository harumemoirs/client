/**
 * Server-side story fetcher with ISR (Incremental Static Regeneration) support
 */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.harumemoirs.xyz";

export interface StoryData {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  synopsis?: string;
  content?: string;
  image?: string;
  imageUrls?: string[];
  date?: string;
  createdAt?: string;
  likes?: number | string;
  likeCount?: number | string;
  category?: string;
  type?: string;
}

export async function getStoryBySlug(
  slug: string,
  typeParam?: string | null
): Promise<StoryData | null> {
  if (!slug) return null;

  // 1. Try with type hint if present
  if (typeParam) {
    const hintMap: Record<
      string,
      { path: string; key: string; type: string; category: string }
    > = {
      blog: {
        path: `/api/v2/blog/by-slug/${slug}`,
        key: "blog",
        type: "blog",
        category: "SELF_REFLECTION",
      },
      journal: {
        path: `/api/v2/journal/journal-slug/${slug}`,
        key: "journal",
        type: "journal",
        category: "JOURNALS",
      },
      letter: {
        path: `/api/v2/letter/by-slug/${slug}`,
        key: "letter",
        type: "letter",
        category: "LETTERS",
      },
      poem: {
        path: `/api/v2/poem/by-slug/${slug}`,
        key: "poem",
        type: "poem",
        category: "POETRY",
      },
    };

    const target = hintMap[typeParam.toLowerCase()];
    if (target) {
      try {
        const res = await fetch(`${API_URL}${target.path}`, {
          next: { revalidate: 60 },
        });
        if (res.ok) {
          const json = await res.json();
          const item = json[target.key] || json.data || json;
          if (item) {
            return {
              ...item,
              category: target.category,
              type: target.type,
            };
          }
        }
      } catch (err) {
        // Fall back to multi-endpoint check
      }
    }
  }

  // 2. Fallback: check all four endpoints concurrently
  const endpoints = [
    {
      path: `/api/v2/blog/by-slug/${slug}`,
      key: "blog",
      type: "blog",
      category: "SELF_REFLECTION",
    },
    {
      path: `/api/v2/journal/journal-slug/${slug}`,
      key: "journal",
      type: "journal",
      category: "JOURNALS",
    },
    {
      path: `/api/v2/letter/by-slug/${slug}`,
      key: "letter",
      type: "letter",
      category: "LETTERS",
    },
    {
      path: `/api/v2/poem/by-slug/${slug}`,
      key: "poem",
      type: "poem",
      category: "POETRY",
    },
  ];

  const results = await Promise.allSettled(
    endpoints.map(async (ep) => {
      const res = await fetch(`${API_URL}${ep.path}`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) throw new Error("Not found");
      const json = await res.json();
      const item = json[ep.key] || json.data || json;
      if (!item) throw new Error("Empty item");
      return {
        ...item,
        category: ep.category,
        type: ep.type,
      };
    })
  );

  for (const r of results) {
    if (r.status === "fulfilled" && r.value) {
      return r.value;
    }
  }

  return null;
}
