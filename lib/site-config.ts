const defaultUrl = "https://jelly-slider.vercel.app";

export const appConfig = {
  name: "Jelly Slider",
  shortName: "Jelly Slider",
  description:
    "A WebGPU-powered interactive jelly slider built with TypeGPU — real-time raymarched SDF rendering, physics-based animation, and TAA. Inspired by Voicu Apostol.",
  tagline: "WebGPU Jelly Slider Demo",

  url: process.env.NEXT_PUBLIC_APP_URL ?? defaultUrl,
  githubUrl: "https://github.com/coderomm/jelly-slider",

  seo: {
    defaultTitle: "Jelly Slider – WebGPU Jelly Slider Demo",
    defaultDescription:
      "A WebGPU-powered interactive jelly slider built with TypeGPU — real-time raymarched SDF rendering, physics-based animation, and TAA. Inspired by Voicu Apostol.",
    keywords: [
      "WebGPU",
      "TypeGPU",
      "jelly slider",
      "SDF",
      "raymarching",
      "React",
      "Next.js",
      "WebGL",
      "shader",
      "interactive demo",
    ],
    author: "Jelly Slider",
    ogImage: "/og.png",
    twitterHandle: "",
    googleVerification: "",
  },

  settings: {
    themeStorageKey: "jelly-slider-theme",
  },

  features: {},
} as const;

export type AppConfig = typeof appConfig;
