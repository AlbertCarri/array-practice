import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://codechallenge.edelbyte.com.ar";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.ts`,
  };
}
