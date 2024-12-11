import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseURL = "https://athawda-bazaar.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
