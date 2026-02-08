import type { SampledFlag, TgpuRoot, TgpuTexture } from 'typegpu';

const PERCENTAGE_WIDTH = 256 * 2;
const PERCENTAGE_HEIGHT = 128 * 2;
const PERCENTAGE_COUNT = 101; // 0% to 100%

export class NumberProvider {
  digitTextureAtlas:
    & TgpuTexture<{
      size: [
        typeof PERCENTAGE_WIDTH,
        typeof PERCENTAGE_HEIGHT,
        typeof PERCENTAGE_COUNT,
      ];
      format: 'rgba8unorm';
    }>
    & SampledFlag;

  constructor(root: TgpuRoot) {
    this.digitTextureAtlas = root['~unstable'].createTexture({
      size: [PERCENTAGE_WIDTH, PERCENTAGE_HEIGHT, PERCENTAGE_COUNT],
      format: 'rgba8unorm' as const,
    }).$usage('sampled', 'render');
  }

  async fillAtlas() {
    // Prefer Reddit Mono / JetBrains Mono if available; otherwise fall back to monospace
    const fontLoadTimeout = 2000;
    const loadWithTimeout = (font: string) =>
      Promise.race([
        document.fonts.load(font),
        new Promise<void>((resolve) => setTimeout(resolve, fontLoadTimeout)),
      ]);
    await Promise.all([
      loadWithTimeout('180px "Reddit Mono", monospace'),
      loadWithTimeout('140px "JetBrains Mono", monospace'),
    ]).catch(() => {});

    const canvas = document.createElement('canvas');
    canvas.width = PERCENTAGE_WIDTH;
    canvas.height = PERCENTAGE_HEIGHT;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }

    const regularFont = '180px "Reddit Mono", monospace';
    const percentageFont = '140px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';

    const percentageImages: ImageBitmap[] = [];

    for (let i = 0; i <= 100; i++) {
      ctx.clearRect(0, 0, PERCENTAGE_WIDTH, PERCENTAGE_HEIGHT);

      const x = PERCENTAGE_WIDTH - 20;
      const y = PERCENTAGE_HEIGHT / 2;

      ctx.font = regularFont;
      ctx.fillText(`${i} `, x, y);

      ctx.font = percentageFont;
      ctx.fillText(`%`, x, y + 10);

      const bitmap = await createImageBitmap(canvas);
      percentageImages.push(bitmap);
    }

    this.digitTextureAtlas.write(percentageImages);
  }
}
