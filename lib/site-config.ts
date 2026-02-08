export const appConfig = {
  name: "Jelly Slider",
  shortName: "Jelly Slider",
  description:
    "An interactive jelly slider built with WebGPU and TypeGPU featuring real-time raymarched SDF rendering, physics-based deformation, elastic motion, and temporal anti-aliasing (TAA). A modern UI animation and shader experiment for the web.",
  tagline: "Interactive WebGPU Jelly Slider",

  url: 'https://jelly-slider-demo.vercel.app',
  githubUrl: "https://github.com/coderomm/jelly-slider",

  seo: {
    defaultTitle:
      "Jelly Slider — WebGPU Interactive Elastic Slider Demo (TypeGPU + SDF)",
    defaultDescription:
      "A WebGPU-powered elastic jelly slider built with TypeGPU. Demonstrates raymarching, signed distance fields (SDF), physics-based UI animation, shaders, and real-time rendering in React and Next.js.",

    keywords: [
      // Core project keywords
      "jelly slider",
      "elastic slider",
      "interactive slider UI",
      "physics slider",
      "deformable UI",
      "elastic UI animation",

      // Graphics + rendering
      "WebGPU demo",
      "raymarching demo",
      "SDF rendering",
      "signed distance field",
      "shader animation",
      "GPU rendering",
      "real-time rendering",
      "procedural graphics",
      "3D UI rendering",
      "temporal anti-aliasing",
      "TAA rendering",

      // Dev ecosystem
      "TypeGPU",
      "React WebGPU",
      "Next.js WebGPU",
      "WebGL alternative",
      "frontend graphics",
      "creative coding",
      "shader playground",
      "generative UI",

      // Discovery keywords
      "modern UI animation",
      "experimental UI component",
      "interactive web demo",
      "portfolio UI experiment",
      "motion UI demo",
      "advanced frontend animation",
    ],

    author: "Voicu Apostol",
    ogImage: "/og.png",
    twitterHandle: "@cerpow",
    googleVerification: "",
  },

  settings: {
    themeStorageKey: "jelly-slider-theme",
  },

  features: {
    webgpu: true,
    raymarching: true,
    sdfRendering: true,
    physicsAnimation: true,
    taa: true,
  },
} as const;

export type AppConfig = typeof appConfig;
