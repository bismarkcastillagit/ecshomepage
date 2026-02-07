import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECSVault | Elevate Cyber Solutions - Cloud, Cybersecurity & AI Automation",
  description: "Empowering businesses through secure cloud architecture, cybersecurity consulting, DevOps automation, and AI-powered solutions. Expert guidance from Elevate Cyber Solutions.",
  keywords: ["cloud architecture", "cybersecurity", "DevOps", "AI automation", "cloud migration", "security compliance", "managed cloud services"],
  authors: [{ name: "Elevate Cyber Solutions" }],
  openGraph: {
    title: "ECSVault | Elevate Cyber Solutions",
    description: "Empowering Businesses Through Secure Cloud, Automation, and AI",
    type: "website",
    images: ['/ecsvault-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://ai.ecsvault.com/widget.js"
          data-business-id="jh710agf54rs0hn6wpk0sj4nhd80fnvz"
          data-api-url="https://flippant-seahorse-299.convex.site"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
