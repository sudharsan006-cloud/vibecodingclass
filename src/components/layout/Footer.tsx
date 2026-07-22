import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-steel-start/20 pt-[70px] pb-[34px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-[60px]">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="font-heading text-[19px] font-semibold tracking-[0.02em] text-foreground flex items-center gap-2.5 mb-3.5"
            >
              <svg className="w-[26px] h-[26px]" viewBox="0 0 40 40" fill="none">
                <path
                  d="M4 30 L14 14 L20 22 L28 8 L36 20"
                  stroke="url(#footGrad)"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="footGrad" x1="0" y1="0" x2="40" y2="0">
                    <stop offset="0%" stopColor="rgb(212,175,55)" />
                    <stop offset="100%" stopColor="rgb(59,130,246)" />
                  </linearGradient>
                </defs>
              </svg>
              FINFIX
            </Link>
            <p className="text-muted max-w-[320px] text-[14.5px] leading-[1.6]">
              Turning financial complexity into intelligent clarity.
            </p>
          </div>

          {/* Products column */}
          <div>
            <h4 className="text-[12.5px] tracking-[0.1em] uppercase font-heading font-semibold text-foreground mb-5">
              Products
            </h4>
            <ul className="flex flex-col gap-3.5">
              {["Analytics", "Market Intelligence", "Portfolio", "Financial Health", "AI Insights"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/products"
                      className="text-sm text-muted hover:text-gold-start transition-colors duration-250"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-[12.5px] tracking-[0.1em] uppercase font-heading font-semibold text-foreground mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: "About", href: "/why" },
                { label: "Founder", href: "/founder" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-gold-start transition-colors duration-250"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-steel-start/20 pt-[26px] text-[13px] text-muted flex justify-between flex-wrap gap-2.5">
          <span>
            © {new Date().getFullYear()} Finfix. Built for the future of
            financial intelligence.
          </span>
        </div>
      </div>
    </footer>
  );
}
