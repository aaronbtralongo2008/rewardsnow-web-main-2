'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/veniar', label: 'Veniar' },
  { href: '/business', label: 'For Business' },
  { href: '/network', label: 'Network' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/support', label: 'Support' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-vn-ivory border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <Link
          href="/"
          className="text-vn-flight-blue font-black text-[1.15rem] tracking-tight leading-none"
          aria-label="Veniar — home"
        >
          Veniar
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname.startsWith(l.href)
                  ? 'text-vn-flight-blue bg-vn-flight-blue/[0.08]'
                  : 'text-vn-muted hover:text-vn-ink hover:bg-black/[0.04]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-vn-ink border border-black/20 rounded hover:bg-black/[0.04] transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/join"
            className="px-4 py-2 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors"
          >
            Join Veniar
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 -mr-1 rounded text-vn-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-vn-ivory border-t border-black/[0.08]">
          <nav className="px-4 py-3 flex flex-col gap-0.5" aria-label="Mobile navigation">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2.5 px-3 rounded text-sm font-medium text-vn-ink hover:bg-black/[0.04]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-black/[0.08] flex flex-col gap-2">
            <Link
              href="/login"
              className="py-2.5 text-center text-sm font-semibold text-vn-ink border border-black/20 rounded"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/join"
              className="py-2.5 text-center text-sm font-bold text-white bg-vn-flight-blue rounded"
              onClick={() => setOpen(false)}
            >
              Join Veniar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
