import Link from 'next/link';
import { COMPANY_URL, SUPPORT_EMAIL, COMPANY_SUPPORT_EMAIL } from '@/lib/config';

const COL = {
  Products: [
    { label: 'Veniar', href: '/veniar' },
    { label: 'Veniar for Business', href: '/business' },
    { label: 'Veniar Network', href: '/network' },
    { label: 'Merchant Dashboard', href: '/merchant-dashboard' },
    { label: 'Customer App', href: '/customer-app' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Join Veniar', href: '/join' },
    { label: 'Log in to Veniar', href: '/login' },
  ],
  'For Businesses': [
    { label: 'Independent restaurants', href: '/business' },
    { label: 'Cafes', href: '/business' },
    { label: 'Bakeries', href: '/business' },
    { label: 'Food trucks', href: '/business' },
    { label: 'Local retailers', href: '/business' },
    { label: 'Multi-location operators', href: '/business' },
    { label: 'Chambers of commerce', href: '/join' },
    { label: 'Restaurant associations', href: '/join' },
  ],
  Resources: [
    { label: 'Support', href: '/support' },
    { label: 'Merchant guide', href: '/support' },
    { label: 'Customer guide', href: '/support' },
    { label: 'Rewards guide', href: '/rewards-terms' },
    { label: 'Network guide', href: '/network' },
    { label: 'FAQs', href: '/support' },
    { label: 'Contact support', href: '/contact' },
    { label: 'How it works', href: '/how-it-works' },
  ],
  Company: [
    { label: 'RewardsNow', href: COMPANY_URL, external: true },
    { label: 'About RewardsNow', href: `${COMPANY_URL}/mission`, external: true },
    { label: 'Mission', href: `${COMPANY_URL}/mission`, external: true },
    { label: 'Trust', href: `${COMPANY_URL}/trust`, external: true },
    { label: 'Partners', href: `${COMPANY_URL}/partners`, external: true },
    { label: 'Company site', href: COMPANY_URL, external: true },
  ],
  Legal: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
    { label: 'Merchant agreement', href: '/merchant-agreement' },
    { label: 'Rewards terms', href: '/rewards-terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-vn-ink text-white">
      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">
          {Object.entries(COL).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-obi-teal mb-5">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    {'external' in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/55 hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-white/55 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support block */}
        <div className="border-t border-white/10 pt-10 grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-sunset-gold mb-2">
              Veniar support
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-white font-semibold text-sm hover:text-vn-obi-teal transition-colors"
            >
              {SUPPORT_EMAIL}
            </a>
            <p className="text-white/40 text-xs mt-1">
              Product, merchant, and customer questions
            </p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-sunset-gold mb-2">
              Company &amp; partnership questions
            </p>
            <a
              href={`mailto:${COMPANY_SUPPORT_EMAIL}`}
              className="text-white font-semibold text-sm hover:text-vn-obi-teal transition-colors"
            >
              {COMPANY_SUPPORT_EMAIL}
            </a>
            <p className="text-white/40 text-xs mt-1">
              RewardsNow partnerships and press
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-black text-base tracking-tight">Veniar</p>
            <p className="text-white/40 text-xs mt-0.5">
              Veniar is a product of RewardsNow.
            </p>
          </div>
          <p className="text-white/30 text-xs">
            &copy; 2026 RewardsNow, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
