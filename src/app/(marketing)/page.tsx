"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ScrollReveal } from "@/components/effects/Parallax";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { HeroMorphCanvas } from "@/components/effects/HeroMorphCanvas";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { AnimatedLineChart } from "@/components/effects/AnimatedLineChart";
import { TiltCard } from "@/components/effects/TiltCard";

/* ── Main Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollProgress />
      <FloatingParticles count={35} />

      {/* ═══ HERO ═══ */}
      <HeroSection />

      {/* ═══ WHY FINFIX ═══ */}
      <WhySection />

      {/* ═══ METRICS BAND ═══ */}
      <MetricsBand />

      {/* ═══ PRODUCTS ═══ */}
      <ProductsSection />

      {/* ═══ PORTFOLIO CHART ═══ */}
      <ChartSection />

      {/* ═══ FOUNDER ═══ */}
      <FounderBanner />

      {/* ═══ FINAL CTA ═══ */}
      <CTASection />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative pt-[110px] pb-[60px]">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] -z-10 pointer-events-none bg-gold-start/10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-accent-spark/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          {/* Left — Text */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 text-[12.5px] tracking-[0.16em] uppercase text-gold-start font-semibold mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-spark shadow-[0_0_10px_rgba(59,130,246,0.9)] animate-pulse-dot" />
              Financial Intelligence Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: "easeOut" }}
              className="text-[clamp(36px,5.4vw,64px)] leading-[1.05] font-heading font-semibold tracking-[-0.01em] mb-6"
            >
              Market Forces.
              <br />
              <span className="gradient-text-sheen">Shaped Into Clarity.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
              className="text-[17px] leading-[1.6] max-w-[520px] text-muted mb-8"
            >
              Finfix transforms fragmented financial data into clear visual
              insight — bringing your investments, expenses, savings, market
              trends and financial health into one intelligent dashboard.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: "easeOut" }}
              className="flex gap-4 items-center"
            >
              <Link
                href="/products"
                className="text-sm font-semibold px-[26px] py-[13px] rounded-full text-[#14120a] bg-gradient-to-br from-gold-start to-gold-end hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(212,175,55,0.55)] transition-all duration-250"
              >
                Explore the Platform
              </Link>
              <Link
                href="/why"
                className="text-sm font-medium text-foreground px-5 py-3 rounded-full border border-steel-start/60 hover:border-steel-end/70 hover:bg-elevated transition-all duration-300"
              >
                Why We Built This →
              </Link>
            </motion.div>
          </div>

          {/* Right — Morph Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            <HeroMorphCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   WHY FINFIX SECTION
   ═══════════════════════════════════════════════════════════════════ */
function WhySection() {
  const cards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 19V10M12 19V5M20 19v-7"
            stroke="rgb(212,175,55)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "One place, not five",
      desc: "No more switching between five different apps. Your bank, portfolio, loans and crypto — all in one place.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
            stroke="rgb(212,175,55)"
            strokeWidth="2"
          />
          <path
            d="M12 8v4l3 2"
            stroke="rgb(212,175,55)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Instant explanation",
      desc: "Charts explain everything at a glance. Understand your asset allocation and performance instantly.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
            stroke="rgb(59,130,246)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Ahead of the moment",
      desc: "AI highlights opportunities before you notice them — turning raw numbers into actionable meaning.",
    },
  ];

  return (
    <section id="why" className="relative py-[110px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="max-w-[640px] mx-auto mb-[60px] text-center">
            <h2 className="text-[clamp(28px,3.6vw,42px)] font-heading font-semibold mb-4">
              Built for Clarity.
            </h2>
            <p className="text-base text-muted leading-[1.6]">
              Stop guessing with your finances. We transform raw data into
              actionable intelligence.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.12} direction="depth">
              <TiltCard
                maxTilt={8}
                className="bg-elevated/70 border border-steel-start/[0.28] rounded-[18px] p-8 hover:-translate-y-1.5 hover:border-gold-start/40 hover:bg-elevated transition-all duration-350 h-full"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold-start/[0.18] to-accent-spark/[0.12] mb-5">
                  {card.icon}
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2.5">
                  {card.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-muted">
                  {card.desc}
                </p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   METRICS BAND
   ═══════════════════════════════════════════════════════════════════ */
function MetricsBand() {
  const metrics = [
    { target: 48.2, prefix: "₹", suffix: "L", label: "Net Worth Tracked" },
    { target: 44.4, prefix: "₹", suffix: "L", label: "Investments" },
    { target: 84, prefix: "", suffix: "", label: "Health Score" },
    { target: 782, prefix: "", suffix: "", label: "Credit Score", accent: true },
  ];

  return (
    <section className="py-[110px] border-t border-b border-steel-start/25 bg-elevated/40">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <ScrollReveal key={i} delay={i * 0.08} direction="up">
              <div className="text-center py-2.5">
                <AnimatedCounter
                  target={m.target}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  className="font-heading font-bold text-[clamp(26px,3.4vw,38px)] text-foreground"
                  accentClassName={
                    m.accent ? "text-gold-start" : undefined
                  }
                />
                <div className="text-xs tracking-[0.08em] uppercase text-muted mt-2">
                  {m.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRODUCTS SECTION — chip pills
   ═══════════════════════════════════════════════════════════════════ */
function ProductsSection() {
  const products = [
    "Analytics",
    "Market Intelligence",
    "Portfolio",
    "Financial Health",
    "AI Insights",
  ];

  return (
    <section id="products" className="relative py-[110px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="max-w-[640px] mx-auto mb-[60px] text-center">
            <h2 className="text-[clamp(28px,3.6vw,42px)] font-heading font-semibold mb-4">
              Five lenses on one financial life.
            </h2>
            <p className="text-base text-muted leading-[1.6]">
              Every product in Finfix answers one question well — together they
              answer all of them.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-wrap gap-3.5 justify-center">
            {products.map((product) => (
              <div
                key={product}
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-full border border-steel-start/35 text-sm font-medium hover:-translate-y-0.5 hover:border-gold-start/50 hover:bg-elevated transition-all duration-300 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-accent-spark shadow-[0_0_8px_rgba(59,130,246,0.7)] animate-glow-pulse" />
                {product}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CHART SECTION — Portfolio Growth
   ═══════════════════════════════════════════════════════════════════ */
function ChartSection() {
  return (
    <section className="relative py-[110px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="bg-elevated/70 border border-steel-start/[0.28] rounded-[20px] p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-9 items-center">
            <div>
              <h3 className="text-[22px] font-heading font-semibold mb-3.5">
                Portfolio Growth
              </h3>
              <p className="text-muted text-[15px] leading-[1.6]">
                Every rupee, plotted. Finfix draws your growth curve the moment
                new data lands — no spreadsheets, no manual exports.
              </p>
            </div>
            <AnimatedLineChart />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOUNDER BANNER
   ═══════════════════════════════════════════════════════════════════ */
function FounderBanner() {
  return (
    <section id="founder" className="relative py-[110px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="bg-elevated/70 border border-steel-start/[0.28] rounded-[20px] p-8 md:p-10 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-9 items-center">
            {/* Avatar */}
            <div className="flex items-center justify-center">
              <div className="w-[120px] h-[120px] rounded-[20px] bg-gradient-to-br from-gold-start/25 to-accent-spark/[0.18] flex items-center justify-center font-heading font-bold text-[34px] text-gold-start border border-steel-start/35">
                SK
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 text-[12.5px] tracking-[0.16em] uppercase text-gold-start font-semibold mb-2">
                Founder & Product Designer
              </div>
              <h3 className="text-[22px] font-heading font-semibold mb-3">
                Sudharsan K. K.
              </h3>
              <p className="text-muted text-[15px] leading-[1.6]">
                Building Finfix end-to-end — product design, brand system, and
                the intelligence layer underneath it. Finfix exists because five
                apps for one financial life never made sense.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FINAL CTA SECTION
   ═══════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-[110px] text-center">
      <div className="max-w-[1180px] mx-auto px-6">
        <ScrollReveal direction="up">
          <h2 className="text-[clamp(28px,4vw,44px)] font-heading font-semibold mb-5">
            See your entire financial life,
            <br />
            in one intelligent dashboard.
          </h2>
          <p className="text-muted max-w-[520px] mx-auto mb-8 text-base">
            Finfix brings the full picture together so every decision starts
            from clarity, not guesswork.
          </p>
          <Link
            href="/dashboard"
            className="inline-block text-sm font-semibold px-[26px] py-[13px] rounded-full text-[#14120a] bg-gradient-to-br from-gold-start to-gold-end hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(212,175,55,0.55)] transition-all duration-250"
          >
            Get Started Free
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
