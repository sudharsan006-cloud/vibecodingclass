"use client";

import { Parallax, ScrollReveal } from "@/components/effects/Parallax";
import { TiltCard } from "@/components/effects/TiltCard";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { FloatingParticles } from "@/components/effects/FloatingParticles";

export default function WhyPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden min-h-screen">
      <ScrollProgress />
      <FloatingParticles count={20} />
      
      {/* Background depth planes */}
      <Parallax speed={-0.2} className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-start/5 rounded-full blur-[100px] pointer-events-none" />
      <Parallax speed={-0.4} className="absolute bottom-20 left-10 w-[600px] h-[400px] bg-steel-start/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal direction="up">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gold-start to-white leading-tight pb-2">
            Finance Shouldn&apos;t Feel Complicated.
          </h1>
        </ScrollReveal>

        <div className="space-y-12 text-lg md:text-xl text-muted leading-relaxed mb-32 perspective-[1200px]">
          <ScrollReveal direction="up" delay={0.1}>
            <p>
              Modern finance has become fragmented. People rely on multiple platforms to track income, investments, expenses, loans, market trends, and savings. While data is everywhere, meaningful understanding is rare.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.1}>
            <p>
              We observed that users spend more time collecting financial information than actually making informed decisions. Valuable insights are hidden behind disconnected dashboards, spreadsheets, and complex charts.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.1}>
            <p>
              Finfix was created to solve this fragmentation by bringing every aspect of personal finance into one intelligent ecosystem. Instead of overwhelming users with numbers, Finfix transforms financial data into intuitive visual analytics, empowering individuals to understand their money with confidence.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 perspective-[1200px]">
          <ScrollReveal direction="left">
            <TiltCard className="p-8 rounded-2xl glass-effect border-t-2 border-t-gold-start h-full shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              <h3 className="text-sm font-bold tracking-widest uppercase text-gold-start mb-4">Our Mission</h3>
              <p className="text-foreground text-lg">Simplify financial decision-making through intelligent visualization.</p>
            </TiltCard>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <TiltCard className="p-8 rounded-2xl glass-effect border-t-2 border-t-steel-end h-full shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              <h3 className="text-sm font-bold tracking-widest uppercase text-steel-end mb-4">Our Vision</h3>
              <p className="text-foreground text-lg">Build the world&apos;s most intuitive financial intelligence platform where every individual, regardless of financial expertise, can understand and grow their wealth.</p>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
