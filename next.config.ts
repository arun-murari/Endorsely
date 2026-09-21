import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so the lockfile lookup stays inside the repo.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
