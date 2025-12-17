import { MetadataRoute } from "next";

const SITE_URL = "https://harumemoirs.xyz";

/**
 * Robots.txt configuration following Google's best practices
 *
 * Best practices implemented:
 * - Explicit sitemap location
 * - Proper allow/disallow rules
 * - Support for all major search engines
 * - Clear directives for crawlers
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/static/",
          "/*.json$",
          "/*?*utm_*",
          "/*?*ref=*",
        ],
      },
      // Special rules for Googlebot - allow favicon access
      {
        userAgent: "Googlebot",
        allow: ["/", "/favicon.ico", "/favicon/"],
        disallow: ["/api/", "/admin/"],
      },
      // Special rules for Googlebot-Image (fetches favicons)
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/favicon.ico", "/favicon/", "/apple-icon.png"],
        disallow: [],
      },
      // Special rules for Bingbot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
