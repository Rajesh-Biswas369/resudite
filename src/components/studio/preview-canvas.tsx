"use client";

import { useEffect, useRef, useState } from "react";

const MIN_ZOOM = 0.45;
const MAX_ZOOM = 1.6;
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

function clamp(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

export function PreviewCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const dragState = useRef({
    active: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const [zoom, setZoom] = useState(0.75);
  const [dragging, setDragging] = useState(false);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      // contentRef wraps the resume, so its scrollHeight tells us the true content height
      const height = el.scrollHeight;
      setPages(Math.max(1, Math.ceil(height / A4_HEIGHT)));
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  function changeZoom(nextZoom: number) {
    setZoom(clamp(nextZoom));
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    // Touchpad pinch gestures in Chrome usually arrive as Ctrl + wheel.
    if (!event.ctrlKey && !event.metaKey) return;

    event.preventDefault();

    const viewport = viewportRef.current;

    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    const cursorX =
      event.clientX - rect.left + viewport.scrollLeft;
    const cursorY =
      event.clientY - rect.top + viewport.scrollTop;

    setZoom((currentZoom) => {
      const factor = event.deltaY < 0 ? 1.1 : 0.9;
      const nextZoom = clamp(currentZoom * factor);

      requestAnimationFrame(() => {
        viewport.scrollLeft =
          cursorX * (nextZoom / currentZoom) -
          (event.clientX - rect.left);

        viewport.scrollTop =
          cursorY * (nextZoom / currentZoom) -
          (event.clientY - rect.top);
      });

      return nextZoom;
    });
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (event.button !== 0) return;

    const viewport = viewportRef.current;

    if (!viewport) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    dragState.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };

    setDragging(true);
  }

  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    const viewport = viewportRef.current;
    const drag = dragState.current;

    if (!viewport || !drag.active) return;

    viewport.scrollLeft =
      drag.scrollLeft - (event.clientX - drag.startX);

    viewport.scrollTop =
      drag.scrollTop - (event.clientY - drag.startY);
  }

  function stopDragging(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    dragState.current.active = false;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div className="relative">
      {/* Zoom controls */}
      <div className="no-print absolute right-5 top-5 z-20 flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/85 p-1 shadow-xl backdrop-blur-xl">
        <button
          type="button"
          onClick={() => changeZoom(zoom - 0.1)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-white transition hover:bg-white/10"
          aria-label="Zoom out"
        >
          −
        </button>

        <button
          type="button"
          onClick={() => changeZoom(0.75)}
          className="min-w-16 rounded-full px-2 py-2 text-xs font-bold text-cyan-300 transition hover:bg-white/10"
          aria-label="Reset zoom"
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          type="button"
          onClick={() => changeZoom(zoom + 0.1)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-white transition hover:bg-white/10"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>

      <div
        ref={viewportRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        className={`studio-scrollbar max-h-[calc(100vh-150px)] overflow-auto p-8 select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          overscrollBehavior: "contain",
          touchAction: "none",
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            width: A4_WIDTH * zoom,
            height: pages * A4_HEIGHT * zoom,
          }}
        >
          <div
            className="absolute left-0 top-0 overflow-hidden shadow-[0_35px_120px_rgba(0,0,0,0.55)] bg-white"
            style={{
              width: A4_WIDTH,
              height: pages * A4_HEIGHT,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            <div ref={contentRef} className="w-full h-full absolute left-0 top-0">
              {children}
            </div>

            {/* Render exact page dividers so the user can see where the pages split */}
            {pages > 1 &&
              Array.from({ length: pages - 1 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 w-full flex flex-col items-center justify-center pointer-events-none z-10"
                  style={{ top: (i + 1) * A4_HEIGHT - 2 }}
                >
                  {/* Subtle dark line showing the actual print break */}
                  <div className="w-full h-[4px] bg-slate-900/40 shadow-sm" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}