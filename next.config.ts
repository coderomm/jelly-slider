import type { NextConfig } from "next";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const nextConfig: NextConfig = {
  webpack(config) {
    const TypegpuPlugin = require("unplugin-typegpu/webpack").default;
    config.plugins = config.plugins ?? [];
    config.plugins.push(TypegpuPlugin());
    return config;
  },
};

export default nextConfig;
