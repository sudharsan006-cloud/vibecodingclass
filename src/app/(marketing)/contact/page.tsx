"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Parallax, ScrollReveal } from "@/components/effects/Parallax";
import { TiltCard } from "@/components/effects/TiltCard";
import { FloatingParticles } from "@/components/effects/FloatingParticles";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Mouse Parallax for Background Depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Create parallax transforms based on mouse position
  // The background will move slightly in the opposite direction of the mouse
  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);
  
  // Foreground glow follows mouse
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["-20%", "20%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["-20%", "20%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -0.5 and 0.5
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMessage(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
    }
  }

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status === "error") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  return (
    <div className="pt-32 pb-24 relative overflow-hidden min-h-screen">
      {/* Animated Deep Background */}
      <motion.div 
        className="absolute inset-[-5%] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen scale-[1.05]"
          style={{ backgroundImage: "url('/bull_bear_bg.png')" }}
        />
        {/* Gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0e12]/80 via-[#0d0e12]/50 to-[#0d0e12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e12] via-transparent to-[#0d0e12]" />
      </motion.div>

      {/* Dynamic Mouse Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gold-start/15 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-color-dodge opacity-50"
        style={{ x: glowX, y: glowY }}
      />

      {/* Foreground Particles */}
      <div className="relative z-0">
        <FloatingParticles count={40} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <ScrollReveal direction="up">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 drop-shadow-2xl">
              Let&apos;s Build Smarter Financial Futures Together
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-xl text-muted max-w-2xl mx-auto drop-shadow-lg">
              Reach out to our team to learn more about how Finfix can transform
              your financial clarity.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 perspective-[1200px]">
          {/* Form */}
          <ScrollReveal direction="left" delay={0.2}>
            <TiltCard
              maxTilt={12}
              className="p-8 md:p-10 rounded-3xl bg-black/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.1)] border border-white/10"
            >
              <form
                className="space-y-6 relative z-10"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-sm font-medium text-muted group-focus-within:text-gold-start transition-colors">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold-start/50 focus:bg-white/10 transition-all shadow-inner placeholder:text-muted/50"
                      placeholder="John Doe"
                      disabled={status === "submitting"}
                      required
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-medium text-muted group-focus-within:text-gold-start transition-colors">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold-start/50 focus:bg-white/10 transition-all shadow-inner placeholder:text-muted/50"
                      placeholder="john@example.com"
                      disabled={status === "submitting"}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-muted group-focus-within:text-gold-start transition-colors">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold-start/50 focus:bg-white/10 transition-all shadow-inner placeholder:text-muted/50"
                    placeholder="How can we help?"
                    disabled={status === "submitting"}
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-muted group-focus-within:text-gold-start transition-colors">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold-start/50 focus:bg-white/10 transition-all resize-none shadow-inner placeholder:text-muted/50"
                    placeholder="Write your message here..."
                    disabled={status === "submitting"}
                    required
                  />
                </div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                        status === "success"
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-red-500/10 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {status === "success" ? (
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 shrink-0" />
                      )}
                      {statusMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  whileHover={
                    status !== "submitting" && status !== "success"
                      ? { scale: 1.02 }
                      : {}
                  }
                  whileTap={
                    status !== "submitting" && status !== "success"
                      ? { scale: 0.98 }
                      : {}
                  }
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === "success"
                      ? "bg-emerald-500/80 text-white cursor-default"
                      : status === "submitting"
                      ? "bg-gradient-to-r from-gold-start/70 to-gold-end/70 text-primary/70 cursor-wait"
                      : "bg-gradient-to-r from-gold-start to-gold-end text-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  }`}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </TiltCard>
          </ScrollReveal>

          {/* Contact Details & Map Placeholder */}
          <div className="flex flex-col gap-12">
            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  info: "hello@finfix.ai",
                  delay: 0.3,
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  info: "+91 98765 43210",
                  delay: 0.4,
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  info: "4th Floor, Tidel Park,\nTaramani, Chennai,\nTamil Nadu 600113, India",
                  delay: 0.5,
                },
              ].map((item, i) => (
                <ScrollReveal key={i} direction="right" delay={item.delay}>
                  <TiltCard
                    maxTilt={5}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/5 transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center shrink-0 border border-gold-start/20 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:bg-gold-start/20 transition-colors">
                      <item.icon className="w-5 h-5 text-gold-start" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg text-foreground/90 group-hover:text-gold-start transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted mt-1 whitespace-pre-line leading-relaxed">
                        {item.info}
                      </p>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Dark Mode Map Placeholder */}
            <ScrollReveal direction="up" delay={0.6}>
              <Parallax
                speed={0.1}
                className="w-full h-64 rounded-3xl border border-steel-start/30 bg-black/40 backdrop-blur-xl overflow-hidden relative flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(200, 204, 212, 0.4) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="flex flex-col items-center z-10 mix-blend-screen">
                  <MapPin className="w-10 h-10 text-gold-start animate-bounce mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,1)]" />
                  <span className="text-sm font-bold text-white uppercase tracking-widest bg-black/60 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                    Chennai HQ
                  </span>
                </div>
              </Parallax>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
