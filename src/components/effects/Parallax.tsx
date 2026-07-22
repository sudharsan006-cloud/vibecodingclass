"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface ParallaxProps {
  children?: ReactNode;
  speed?: number; // negative = slower (background), positive = faster (foreground)
  className?: string;
  rotateX?: [number, number]; // rotate range as scroll progresses
  rotateY?: [number, number];
  scale?: [number, number];
  opacity?: [number, number];
  direction?: "y" | "x";
}

export function Parallax({
  children,
  speed = 0.5,
  className = "",
  rotateX,
  rotateY,
  scale,
  opacity,
  direction = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const rawY = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const rawX = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const y = useSpring(rawY, springConfig);
  const x = useSpring(rawX, springConfig);

  const transforms: Record<string, MotionValue<number>> = {};
  if (direction === "y") transforms.y = y;
  if (direction === "x") transforms.x = x;

  const rawRotateX = useTransform(scrollYProgress, [0, 1], rotateX || [0, 0]);
  const springRotateX = useSpring(rawRotateX, springConfig);

  const rawRotateY = useTransform(scrollYProgress, [0, 1], rotateY || [0, 0]);
  const springRotateY = useSpring(rawRotateY, springConfig);

  const rawScale = useTransform(scrollYProgress, [0, 1], scale || [1, 1]);
  const springScale = useSpring(rawScale, springConfig);

  const rawOpacity = useTransform(scrollYProgress, [0, 1], opacity || [1, 1]);
  const springOpacity = useSpring(rawOpacity, springConfig);

  if (rotateX) transforms.rotateX = springRotateX;
  if (rotateY) transforms.rotateY = springRotateY;
  if (scale) transforms.scale = springScale;
  if (opacity) transforms.opacity = springOpacity;

  return (
    <motion.div ref={ref} style={transforms} className={className}>
      {children}
    </motion.div>
  );
}

/* Scroll-triggered reveal with 3D transform */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "depth";
}

export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) {
  const variants = {
    up: { hidden: { opacity: 0, y: 80, rotateX: 8 }, visible: { opacity: 1, y: 0, rotateX: 0 } },
    left: { hidden: { opacity: 0, x: -100, rotateY: 12 }, visible: { opacity: 1, x: 0, rotateY: 0 } },
    right: { hidden: { opacity: 0, x: 100, rotateY: -12 }, visible: { opacity: 1, x: 0, rotateY: 0 } },
    depth: { hidden: { opacity: 0, scale: 0.8, z: -200 }, visible: { opacity: 1, scale: 1, z: 0 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      variants={variants[direction]}
      className={className}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
