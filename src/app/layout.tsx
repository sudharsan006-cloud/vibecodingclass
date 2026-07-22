import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finfix | Market Forces. Shaped Into Clarity.",
  description: "Turning Financial Complexity Into Intelligent Clarity. See Your Entire Financial Life In One Intelligent Dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body
        className="font-body antialiased text-foreground bg-background"
      >
        {children}
      </body>
    </html>
  );
}
