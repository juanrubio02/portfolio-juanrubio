import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";

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
        <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
          <div className="section-shell flex items-center justify-between py-3 sm:py-4">
            <Link href="/" className="font-mono text-base font-bold uppercase tracking-tight text-white sm:text-lg">
              Juan Rubio
            </Link>
            <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-wide text-slate-400 md:flex">
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
              <Link href="/projects" className="hover:text-white">
                Proyectos
              </Link>
              <a href="/#experience" className="hover:text-white">
                Experiencia
              </a>
              <a href="/#stack" className="hover:text-white">
                Tecnologias
              </a>
              <a href="/#contact" className="hover:text-white">
                Contacto
              </a>
            </nav>
            <div className="hidden rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-1 font-label text-[9px] font-bold uppercase tracking-[0.18em] text-secondary sm:inline-flex sm:px-3 sm:text-xs sm:tracking-[0.24em]">
              Desarrollador backend (Python)
            </div>
          </div>
        </header>
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
