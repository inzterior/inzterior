import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        // Renamed 2026-09-19. The article covers four councils, not only MBJB,
        // so the old slug asserted the wrong jurisdiction in the URL itself.
        source: "/articles/renovation-permit-johor-bahru-mbjb-approval",
        destination: "/articles/renovation-permit-johor-bahru",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
