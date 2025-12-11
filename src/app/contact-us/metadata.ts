import { generatePageMetadata } from "@/seo/metadata";
import { PAGE_KEYWORDS } from "@/seo/keywords";

export const metadata = generatePageMetadata({
  title: "Contact - Get in Touch",
  description:
    "Connect with Christina about seasonal writing, creative collaborations, and contemplative storytelling. Share your reflections and explore gentle writing together.",
  keywords: PAGE_KEYWORDS.contact,
  path: "/contact-us",
  image: "/og-image.jpg",
});
