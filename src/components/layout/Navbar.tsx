"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/why", label: "Why Finfix" },
    { href: "/founder", label: "Founder" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/55 backdrop-blur-[14px] border-b border-steel-start/25"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-[19px] font-semibold tracking-[0.02em] text-foreground flex items-center gap-2.5"
        >
          {/* SVG Brand Mark matching the enhanced HTML */}
          <svg className="w-[26px] h-[26px]" viewBox="0 0 40 40" fill="none">
            <path
              d="M4 30 L14 14 L20 22 L28 8 L36 20"
              stroke="url(#navGrad)"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="navGrad" x1="0" y1="0" x2="40" y2="0">
                <stop offset="0%" stopColor="rgb(212,175,55)" />
                <stop offset="100%" stopColor="rgb(59,130,246)" />
              </linearGradient>
            </defs>
          </svg>
          FINFIX
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm text-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors duration-250 hover:text-foreground group"
            >
              {link.label}
              {/* Gold gradient underline on hover */}
              <span className="absolute left-0 bottom-0 w-0 h-px bg-gradient-to-r from-gold-start to-gold-end transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          href="/dashboard"
          className="text-[13.5px] font-semibold px-[22px] py-[10px] rounded-full bg-gradient-to-br from-gold-start to-gold-end text-[#14120a] tracking-[0.01em] shadow-[0_0_0_0_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(212,175,55,0.55)] transition-all duration-250"
        >
          Get Started
        </Link>
      </div>
    </motion.header>
  );
}
