import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.asciiName} — ${site.tagline}`,
    short_name: site.asciiName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: site.background,
    theme_color: site.background,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
