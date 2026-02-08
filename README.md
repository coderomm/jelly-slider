# Jelly Slider

A WebGPU-powered interactive jelly slider component built with [TypeGPU](https://github.com/typegpu/typegpu), featuring real-time raymarched SDF rendering, physics-based animation, and TAA.

## Credits

The original jelly slider concept and implementation are by **[Voicu Apostol](https://x.com/cerpow)** ([original post](https://x.com/cerpow/status/1964953851603358112)). This repository is a Next.js port and reorganization of that work; the core rendering and physics logic are derived from it.

## Tech stack

- **Next.js** (App Router) – demo app
- **TypeGPU** – WebGPU abstraction and shader authoring
- **@typegpu/sdf** – SDF primitives and operations
- **React** – optional React wrapper component

## Running the demo

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000). The jelly slider runs in the browser and requires **WebGPU** support (Chrome, Edge, or other Chromium-based browsers).

## Using the component in your project

### In a Next.js app

1. Copy the `src/jelly-slider` folder into your project (e.g. under `src/` or `lib/`).
2. Copy the React wrapper `components/JellySlider.tsx` (or implement your own that calls `initJellySlider`).
3. Ensure path aliases resolve the jelly-slider entry (e.g. `@/src/jelly-slider` or equivalent).
4. Render the component in a client tree:

```tsx
'use client';
import { JellySlider } from '@/components/JellySlider';

export default function Page() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <JellySlider />
    </div>
  );
}
```

### Vanilla / no framework

Use the canvas-based API:

```ts
import { initJellySlider } from './path-to/jelly-slider';

const canvas = document.querySelector('canvas');
const { controls, onCleanup } = await initJellySlider(canvas);

// Optional: use controls for quality, light direction, jelly color, blur
// When done (e.g. route change): onCleanup();
```

## License

MIT
