"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Globe, Mail } from "lucide-react";
import Image from "next/image";
import { Parallax, ScrollReveal } from "@/components/effects/Parallax";
import { FloatingParticles } from "@/components/effects/FloatingParticles";

export default function FounderPage() {
  const quote = `"I wanted to create the kind of financial platform I wished existed—one that doesn't just display data, but helps people truly understand it. Finfix is built around clarity, confidence, and intelligent decision-making."`;
  
  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center relative overflow-hidden">
      <FloatingParticles count={15} />
      
      {/* Background depth planes */}
      <Parallax speed={-0.3} className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gold-start/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Avatar with Parallax */}
          <Parallax speed={-0.2} scale={[0.9, 1.05]} className="w-64 h-64 md:w-96 md:h-96 shrink-0 rounded-3xl bg-gradient-to-br from-gold-start/20 to-steel-end/20 border border-white/10 flex items-center justify-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <Image 
              src="/founder.jpg"
              alt="Sudharsan K. K."
              fill
              className="object-cover"
            />
          </Parallax>

          {/* Content */}
          <div className="flex-1 space-y-8">
            <div>
              <ScrollReveal direction="up" delay={0.1}>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
                  Sudharsan K. K.
                </h1>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <p className="text-xl text-gold-start font-medium">
                  Founder & Product Designer
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left" delay={0.3}>
              <blockquote className="text-2xl md:text-3xl text-muted font-heading italic leading-relaxed border-l-4 border-steel-start/40 pl-6 py-2 relative">
                {quote.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.1, delay: index * 0.02 + 0.3 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </blockquote>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.8}>
              <div className="flex items-center gap-6 pt-4">
                {[MessageSquare, FileText, Globe, Mail].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.8 + i * 0.1 }}
                    className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:bg-gold-start/10 hover:text-gold-start hover:border-gold-start/30 hover:-translate-y-2 transition-all text-muted shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
}
