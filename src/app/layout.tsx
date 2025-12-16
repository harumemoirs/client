import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import Footer from "@/ui/footer";
import Navbar from "@/ui/navbar";
import "./globals.css";
import { baseMetadata, websiteSchema, organizationSchema, siteNavigationSchema } from "@/seo/metadata";
import QueryProvider from "@/components/QueryProvider";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Enhanced SEO metadata with Open Graph, Twitter Cards, and structured data
export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", rel: "icon" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml", rel: "icon" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png", rel: "icon" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
      </head>
      <body
        className={`${ebGaramond.variable} ${montserrat.variable} font-montserrat antialiased`}
      >
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
