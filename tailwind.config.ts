import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--bg-primary) / <alpha-value>)",
        foreground: "rgb(var(--text-primary) / <alpha-value>)",
        primary: "rgb(var(--bg-primary) / <alpha-value>)",
        elevated: "rgb(var(--bg-elevated) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        "accent-spark": "rgb(var(--accent-spark) / <alpha-value>)",
        "gold-start": "rgb(var(--gold-start) / <alpha-value>)",
        "gold-end": "rgb(var(--gold-end) / <alpha-value>)",
        "steel-start": "rgb(var(--steel-start) / <alpha-value>)",
        "steel-end": "rgb(var(--steel-end) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(to right, rgb(var(--gold-start)), rgb(var(--gold-end)))',
        'gradient-steel': 'linear-gradient(to right, rgb(var(--steel-start)), rgb(var(--steel-end)))',
      },
    },
  },
  plugins: [],
};
export default config;
