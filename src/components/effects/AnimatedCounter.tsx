"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  accentClassName?: string;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1400,
  className = "",
  accentClassName,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start: number | null = null;

            const step = (ts: number) => {
              if (!start) start = ts;
              const p = Math.min((ts - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out
              const val = target * eased;
              const formatted =
                target % 1 === 0 ? Math.round(val).toString() : val.toFixed(1);
              setDisplay(formatted);
              if (p < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <div ref={ref} className={className}>
      {accentClassName ? (
        <>
          {prefix}
          <span className={accentClassName}>{display}</span>
          {suffix}
        </>
      ) : (
        <>
          {prefix}
          {display}
          {suffix}
        </>
      )}
    </div>
  );
}
