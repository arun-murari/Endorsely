import path from "node:path";
import type { NextConfig } from "next";

// Set to "/Endorsely" in CI so the GitHub Pages project subpath resolves.
// Left empty locally so `next dev` keeps serving from the domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Pin the workspace root so the lockfile lookup stays inside the repo.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
