import { generatePageMetadata } from "@/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and conditions for Haru Memoirs. Read our terms of service and usage guidelines.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "Haru memoirs terms",
    "usage policy",
  ],
  path: "/terms-and-conditions",
  image: "/og-image.jpg",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
