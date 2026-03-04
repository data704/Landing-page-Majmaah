"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type MarqueeProps = {
  children: ReactNode;
  speedPxPerSecond?: number; // constant speed
  gapPx?: number; // spacing between items
  duration?: number; // fallback duration
};

type MarqueeTrackStyle = CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};

export default function Marquee({
  children,
  speedPxPerSecond = 140,
  gapPx = 64,
  duration = 30,
}: MarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const [repeatCount, setRepeatCount] = useState(2);
  const [distance, setDistance] = useState(0);
  const [finalDuration, setFinalDuration] = useState(duration);

  const items = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  const repeated = useMemo(() => {
    const arr: ReactNode[] = [];
    for (let i = 0; i < repeatCount; i++) arr.push(...items);
    return arr;
  }, [items, repeatCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const measure = measureRef.current;
    if (!viewport || !measure) return;

    const update = () => {
      const oneSetWidth = measure.scrollWidth;
      if (!oneSetWidth) return;

      const viewportWidth = viewport.clientWidth;

      // ensure no empty space
      const minRepeats =
        Math.ceil((viewportWidth + oneSetWidth) / oneSetWidth) + 1;

      setRepeatCount(Math.max(2, minRepeats));
      setDistance(oneSetWidth);

      // constant speed calculation
      const seconds = oneSetWidth / speedPxPerSecond;
      setFinalDuration(Math.max(5, seconds));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    ro.observe(measure);
    return () => ro.disconnect();
  }, [items, speedPxPerSecond]);

  return (
    <div
      ref={viewportRef}
      className="relative w-full overflow-hidden marquee-hover"
    >
      {/* hidden measurer */}
      <div
        ref={measureRef}
        className="absolute invisible h-0 overflow-hidden whitespace-nowrap"
      >
        <div className="inline-flex" style={{ gap: gapPx }}>
          {items.map((item, i) => (
            <div key={i} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* animated track */}
      <div
        className="flex w-max marquee-track motion-reduce:animate-none"
        style={
          {
            gap: gapPx,
            "--marquee-distance": `${distance}px`,
            "--marquee-duration": `${finalDuration}s`,
          } as MarqueeTrackStyle
        }
      >
        {repeated.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
