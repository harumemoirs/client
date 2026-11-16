import { generatePageMetadata } from "@/seo/metadata";
import { PAGE_KEYWORDS } from "@/seo/keywords";

export const metadata = generatePageMetadata({
  title: "All Stories - Poems, Journals, Letters & Blogs",
  description:
    "Explore gentle reflections, poetry, journals, and letters inspired by the rhythm of change. Contemplative storytelling and seasonal memoirs by Christina.",
  keywords: PAGE_KEYWORDS.blogs,
  path: "/blogs",
  image: "/og-image.jpg",
});

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
