"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedLineChartProps {
  className?: string;
}

export function AnimatedLineChart({ className = "" }: AnimatedLineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 160"
      width="100%"
      height="160"
      className={className}
    >
      <defs>
        <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(212,175,55)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(212,175,55)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path
        fill="url(#chartAreaGrad)"
        d="M0,130 L40,120 L80,125 L120,95 L160,100 L200,70 L240,80 L280,50 L320,55 L360,30 L400,20 L400,160 L0,160 Z"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1.2s ease 1.4s",
        }}
      />
      {/* Line stroke with draw animation */}
      <path
        fill="none"
        stroke="rgb(212,175,55)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M0,130 L40,120 L80,125 L120,95 L160,100 L200,70 L240,80 L280,50 L320,55 L360,30 L400,20"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: isVisible ? 0 : 1000,
          transition: "stroke-dashoffset 2s cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      />
    </svg>
  );
}
