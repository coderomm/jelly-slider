'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const attributionStyles: React.CSSProperties = {
  opacity: 1,
  position: 'absolute',
  bottom: '0.625rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '0.75rem 1rem',
  borderRadius: '0.625rem',
  userSelect: 'none',
  pointerEvents: 'auto',
  transition: 'opacity 0.5s',
  fontSize: '1rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

export interface JellySliderProps {
  className?: string;
  attribution?: boolean;
}

type Status = 'loading' | 'ready' | 'no-webgpu' | 'error';

export function JellySlider({ className, attribution = true }: JellySliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>('loading');
  const initStartedRef = useRef(false);
  const finishedRef = useRef(false);

  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1;
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const canvasEl = canvas;
    const containerEl = container;
    let mounted = true;
    let cleanup: (() => void) | undefined;

    async function init() {
      if (initStartedRef.current) return;
      if (typeof navigator === 'undefined' || !(navigator as { gpu?: unknown }).gpu) {
        finishedRef.current = true;
        setStatus('no-webgpu');
        return;
      }
      resizeCanvas();
      if (canvasEl.width === 0 || canvasEl.height === 0) return;

      initStartedRef.current = true;
      try {
        const { initJellySlider } = await import('@/src/jelly-slider');
        const result = await initJellySlider(canvasEl, { attribution });
        if (mounted) {
          cleanup = result.onCleanup;
          finishedRef.current = true;
          setStatus('ready');
        } else {
          result.onCleanup();
        }
      } catch (err) {
        if (mounted) {
          finishedRef.current = true;
          setStatus('error');
          console.error('JellySlider init failed:', err);
        }
      }
    }

    function maybeInit() {
      resizeCanvas();
      if (containerEl.clientWidth > 0 && containerEl.clientHeight > 0) {
        init();
      }
    }

    maybeInit();

    // Retry init after layout (in case container had 0 size on first run)
    const t1 = setTimeout(maybeInit, 100);
    const t2 = setTimeout(maybeInit, 500);

    // If still loading after 15s, show error so we don't hang forever
    const timeout = setTimeout(() => {
      if (mounted && !finishedRef.current) {
        setStatus('error');
        console.error(
          'JellySlider: init did not complete in time. Check console for errors (e.g. WebGPU or font loading).',
        );
      }
    }, 15000);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (!initStartedRef.current && containerEl.clientWidth > 0 && containerEl.clientHeight > 0) {
        init();
      }
    });
    resizeObserver.observe(containerEl);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(timeout);
      mounted = false;
      initStartedRef.current = false;
      resizeObserver.disconnect();
      cleanup?.();
    };
  }, [attribution, resizeCanvas]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {status === 'loading' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a1a',
            color: '#888',
            fontSize: '0.875rem',
            zIndex: 1,
          }}
        >
          Loading…
        </div>
      )}
      {status === 'no-webgpu' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a1a',
            color: '#ccc',
            fontSize: '0.875rem',
            padding: '1.5rem',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          WebGPU is not supported in this browser. Try Chrome, Edge, or another Chromium-based browser.
        </div>
      )}
      {status === 'error' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a1a',
            color: '#e88',
            fontSize: '0.875rem',
            padding: '1.5rem',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          Failed to start the jelly slider. Check the console for details.
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 0,
        }}
      />
      {attribution && (
        <div id="attribution" style={attributionStyles}>
          Inspired by work of{' '}
          <a
            href="https://x.com/cerpow/status/1964953851603358112"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#87ceeb', textDecoration: 'none', cursor: 'pointer' }}
          >
            Voicu Apostol
          </a>
        </div>
      )}
    </div>
  );
}
