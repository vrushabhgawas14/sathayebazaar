import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const basURL = "https://athawda-bazaar.vercel.app";
  return [
    {
      url: `${basURL}`,
      lastModified: new Date(),
    },
    {
      url: `${basURL}/shops`,
      lastModified: new Date(),
    },
  ];
}
