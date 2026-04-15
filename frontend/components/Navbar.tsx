"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Proyectos" },
  { href: "/#experience", label: "Experiencia" },
  { href: "/#stack", label: "Tecnologías" },
  { href: "/#contact", label: "Contacto" }
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = isOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((currentState) => !currentState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
      <div className="relative">
        <div className="section-shell flex min-h-16 items-center justify-between gap-4 py-3 sm:min-h-20 sm:py-4">
          <Link
            href="/"
            className="font-mono text-base font-bold uppercase tracking-tight text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:text-lg"
          >
            Juan Rubio
          </Link>

          <nav className="hidden flex-1 items-center justify-end gap-8 text-sm font-medium uppercase tracking-wide text-slate-400 sm:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-1 py-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            onClick={toggleMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-surface-low text-white transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:hidden"
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`absolute left-0 top-full w-full border-t border-white/10 bg-surface shadow-2xl shadow-black/30 transition-all duration-200 ease-out sm:hidden ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          <nav className="section-shell flex flex-col items-center gap-4 py-4 text-sm font-medium uppercase tracking-wide text-slate-300">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="w-full rounded-xl px-4 py-3 text-center transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
