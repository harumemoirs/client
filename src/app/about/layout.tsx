import { generatePageMetadata } from "@/seo/metadata";
import { PAGE_KEYWORDS } from "@/seo/keywords";

export const metadata = generatePageMetadata({
  title: "About Christina - Seasonal Memoir Writer",
  description:
    "Discover Christina's journey as a seasonal memoir writer inspired by Haru. Exploring impermanence, tenderness, and belonging through contemplative storytelling and coastal heritage narratives.",
  keywords: PAGE_KEYWORDS.about,
  path: "/about",
  image: "/og-image.jpg",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
