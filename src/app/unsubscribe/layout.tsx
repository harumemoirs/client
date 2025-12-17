import { generatePageMetadata } from "@/seo/metadata";
import { PAGE_KEYWORDS } from "@/seo/keywords";

export const metadata = generatePageMetadata({
  title: "Unsubscribed - Haru Memoirs Newsletter",
  description:
    "Thank you for being part of our story circle. You've been unsubscribed from Haru Memoirs newsletter. You can always resubscribe anytime.",
  keywords: ["newsletter", "unsubscribe", "haru memoirs"],
  path: "/unsubscribe",
});

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
