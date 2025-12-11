import { generatePageMetadata } from "@/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Haru Memoirs. Learn how we protect and handle your personal information.",
  keywords: [
    "privacy policy",
    "data protection",
    "Haru memoirs privacy",
    "user data",
  ],
  path: "/privacy-policy",
  image: "/og-image.jpg",
});

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
