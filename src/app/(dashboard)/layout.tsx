import Link from "next/link";
import Image from "next/image";
import { User, Bell, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0B0D] flex flex-col">
      {/* Dashboard Top Nav */}
      <header className="h-16 border-b border-steel-start/20 bg-elevated/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/dashboard" className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <Image src="/logo.png" alt="Finfix Logo" width={24} height={24} className="object-contain" />
            FINFIX
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-muted transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-muted transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-start to-steel-end p-[2px]">
              <div className="w-full h-full rounded-full bg-primary flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-gold-start" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex">
        {/* Sidebar Nav */}
        <aside className="w-64 border-r border-steel-start/20 hidden lg:block py-8 px-4">
          <nav className="space-y-2">
            {[
              { name: "Overview", href: "/dashboard" },
              { name: "Market Intelligence", href: "/dashboard/market" },
              { name: "Portfolio", href: "/dashboard/portfolio" },
              { name: "AI Assistant", href: "/dashboard/assistant" },
              { name: "Simulator", href: "/dashboard/simulator" },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
