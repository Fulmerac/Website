"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="relative z-20 bg-black text-white">
      <div className="wrap flex h-18 items-center justify-between gap-6 sm:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="text-[0.95rem] text-silver transition-colors hover:text-white aria-[current=page]:text-white"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/join" variant="light" className="min-h-10 px-5 text-sm">
            Apply to Join Our Team
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="-mr-2 flex size-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        className={cn("border-t border-white/10 md:hidden", open ? "block" : "hidden")}
      >
        <ul className="wrap flex flex-col py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block py-3 text-lg">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <ButtonLink href="/join" variant="light" className="w-full">
              Apply to Join Our Team
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
