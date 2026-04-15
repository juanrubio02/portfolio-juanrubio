import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { Navbar } from "@/components/Navbar";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

const siteUrl = "https://juanrubio.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Juan Rubio | Backend Developer (Python, FastAPI, PostgreSQL)",
  description:
    "Portfolio de backend con proyectos en Python, FastAPI, PostgreSQL, Docker y SQLAlchemy.",
  openGraph: {
    title: "Juan Rubio | Backend Developer (Python, FastAPI, PostgreSQL)",
    description:
      "Portfolio de backend con proyectos en Python, FastAPI, PostgreSQL, Docker y SQLAlchemy.",
    url: siteUrl,
    siteName: "Juan Rubio",
    locale: "es_ES",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <footer className="border-t border-white/5 bg-surface">
          <div className="section-shell flex flex-col gap-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]">
              Juan Rubio
            </p>
            <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.22em]">
              <a href="mailto:juanrrmuel@gmail.com" className="hover:text-white">
                juanrrmuel@gmail.com
              </a>
              <a
                href="https://github.com/juanrubio02"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/juan-rubio-499a2b293/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
