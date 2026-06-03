import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Veniar | Shared Rewards for Local Favorites',
  description:
    'Veniar helps independent restaurants and local businesses reward loyal customers, reach new ones, and grow through a local network that gets stronger as more businesses join.',
};

const STEPS = [
  {
    n: '01',
    title: 'Customers earn Veniar Points.',
    body: 'When a customer visits a participating business, they give their phone number at checkout. Points are added automatically — no app required.',
  },
  {
    n: '02',
    title: 'Customers discover the network.',
    body: 'The Veniar app shows nearby participating businesses, their offers, and where earned points can be redeemed — expanding who each business can reach.',
  },
  {
    n: '03',
    title: 'Merchants see real activity.',
    body: 'The merchant dashboard shows redemptions, repeat visits, and customers who arrived through the network — not just existing regulars.',
  },
];

const BUSINESS_TYPES = [
  { label: 'Restaurants', icon: '🍽' },
  { label: 'Cafes', icon: '☕' },
  { label: 'Bakeries', icon: '🥐' },
  { label: 'Food trucks', icon: '🚚' },
  { label: 'Local retailers', icon: '🛍' },
  { label: 'Neighborhood spots', icon: '📍' },
];

const PRODUCTS = [
  {
    title: 'Veniar Points',
    desc: 'A shared promotional rewards currency that works across every participating business in the network.',
    href: '/veniar',
    accent: 'bg-vn-obi-teal',
  },
  {
    title: 'Veniar Network',
    desc: 'The local loyalty network that connects independent businesses and gives them access to each other\'s customers.',
    href: '/network',
    accent: 'bg-vn-flight-blue',
  },
  {
    title: 'Veniar for Business',
    desc: 'Merchant tools: onboarding, offer controls, customer lookup, redemption tracking, and dashboard reporting.',
    href: '/business',
    accent: 'bg-vn-sunset-gold',
  },
  {
    title: 'Customer App',
    desc: 'One account for earning and redeeming Veniar Points across independent restaurants and local businesses.',
    href: '/customer-app',
    accent: 'bg-vn-obi-teal',
  },
  {
    title: 'Merchant Dashboard',
    desc: 'See points issued, redemptions, repeat visits, network referrals, and offer performance in one place.',
    href: '/merchant-dashboard',
    accent: 'bg-vn-sunset-orange',
  },
  {
    title: 'Offers & Redemptions',
    desc: 'Merchant-controlled offers — bonus points, first-visit rewards, return incentives — redeemable across the network.',
    href: '/business',
    accent: 'bg-vn-flight-blue',
  },
];

const PRICING_PLANS = [
  {
    name: 'Launch',
    badge: 'Founding Merchants',
    desc: 'For early independent businesses joining the first Veniar markets.',
    price: 'Founding pricing',
    note: 'Available during launch period',
    cta: 'Join Veniar',
    href: '/join',
    accent: 'border-vn-obi-teal',
  },
  {
    name: 'Network',
    badge: 'Most Popular',
    desc: 'For businesses that want shared loyalty, merchant offers, and network visibility.',
    price: 'Contact support',
    note: 'Pricing available on request',
    cta: 'Contact us',
    href: `/contact`,
    accent: 'border-vn-sunset-gold',
  },
  {
    name: 'Multi-location',
    badge: 'Operators',
    desc: 'For local restaurant groups and operators with more than one location.',
    price: 'Contact support',
    note: 'Custom pricing available',
    cta: 'Contact us',
    href: `/contact`,
    accent: 'border-vn-sunset-orange',
  },
];

/* Placeholder metric grid — values are illustrative UI only, not real data */
const MOCK_METRICS = [
  { label: 'Points Issued', value: '—', unit: 'this month', color: 'text-vn-sunset-gold' },
  { label: 'Network Referrals', value: '—', unit: 'this month', color: 'text-vn-obi-teal' },
  { label: 'Redemptions', value: '—', unit: 'this month', color: 'text-white' },
  { label: 'Active Offers', value: '—', unit: 'running', color: 'text-vn-sunset-orange' },
];

const MOCK_ACTIVITY = [
  { label: 'New customer from network', positive: true },
  { label: 'Repeat visit', positive: true },
  { label: 'Redemption processed', positive: false },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">
              VENIAR™ — LOCAL REWARDS NETWORK
            </p>
            <h1 className="text-5xl lg:text-[3.6rem] font-black text-vn-ink leading-[1.04] tracking-tight mb-6">
              Shared rewards<br />for local favorites.
            </h1>
            <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
            <p className="text-vn-muted text-lg leading-relaxed max-w-lg mb-10">
              Veniar helps independent restaurants and local businesses reward loyal customers,
              reach new ones, and grow through a local network that gets stronger as more
              businesses join.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="/join"
                className="px-7 py-3.5 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors"
              >
                Join Veniar
              </Link>
              <Link
                href="/login"
                className="px-7 py-3.5 text-sm font-semibold text-vn-ink border border-black/20 rounded hover:bg-black/[0.04] transition-colors"
              >
                Log in
              </Link>
            </div>
            <Link
              href="/network"
              className="text-sm font-semibold text-vn-flight-blue hover:underline underline-offset-4"
            >
              Explore the network →
            </Link>
          </div>

          {/* Dashboard preview — placeholder UI only */}
          <div className="bg-vn-deep-flight rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08]">
              <span className="text-white/60 text-[11px] font-bold tracking-[0.2em] uppercase">
                Veniar for Business
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-vn-obi-teal tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-vn-obi-teal" />
                Preview
              </span>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2">
              {MOCK_METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`px-5 py-5 ${i < 2 ? 'border-b border-white/[0.08]' : ''} ${
                    i % 2 === 0 ? 'border-r border-white/[0.08]' : ''
                  }`}
                >
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.18em] mb-2">
                    {m.label}
                  </p>
                  <p className={`text-2xl font-black leading-none ${m.color}`}>{m.value}</p>
                  <p className="text-white/30 text-[10px] mt-1">{m.unit}</p>
                </div>
              ))}
            </div>

            {/* Activity feed */}
            <div className="px-5 py-4 border-t border-white/[0.08]">
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                Recent activity
              </p>
              {MOCK_ACTIVITY.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-t border-white/[0.05] first:border-0"
                >
                  <span className="text-white/60 text-xs">{a.label}</span>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      a.positive ? 'bg-vn-obi-teal' : 'bg-vn-sunset-orange'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-5 py-3 border-t border-white/[0.05] bg-white/[0.02]">
              <p className="text-white/25 text-[10px] text-center">
                Dashboard preview — placeholder metrics only, not real data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-4 max-w-xl">
            Shop local. Earn points.<br />Redeem anywhere.
          </h2>
          <div className="w-10 h-[3px] bg-vn-sunset-gold mb-12" />
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.08]">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-vn-deep-flight px-8 py-10">
                <span className="text-vn-obi-teal text-[11px] font-black tracking-[0.3em] uppercase block mb-5">
                  {step.n}
                </span>
                <h3 className="text-white text-lg font-bold leading-snug mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              Full explanation of how Veniar works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Built for independent businesses ─────────────────────────────── */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            BUILT FOR
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-2xl">
            Independent businesses of every kind.
          </h2>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {BUSINESS_TYPES.map((b) => (
              <div
                key={b.label}
                className="border border-black/[0.1] rounded-lg px-5 py-6 text-center bg-white"
              >
                <span className="text-3xl block mb-3" role="img" aria-hidden="true">
                  {b.icon}
                </span>
                <p className="text-sm font-semibold text-vn-ink">{b.label}</p>
              </div>
            ))}
          </div>
          <p className="text-vn-muted text-sm mt-8 max-w-xl">
            Veniar is designed for independent, community-anchored businesses — not chains or franchise locations.
          </p>
        </div>
      </section>

      {/* ── Product modules ───────────────────────────────────────────────── */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            THE PLATFORM
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-vn-ink leading-tight tracking-tight mb-4">
            Every part of the network, connected.
          </h2>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group border border-black/[0.1] rounded-lg bg-white p-6 hover:border-vn-flight-blue/40 transition-colors block"
              >
                <div className={`w-8 h-[3px] ${p.accent} mb-5`} />
                <h3 className="text-base font-bold text-vn-ink mb-2 group-hover:text-vn-flight-blue transition-colors">
                  {p.title}
                </h3>
                <p className="text-vn-muted text-sm leading-relaxed">{p.desc}</p>
                <p className="text-vn-flight-blue text-xs font-semibold mt-4">Learn more →</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-block px-5 py-2.5 text-sm font-semibold text-vn-ink border border-black/20 rounded hover:bg-black/[0.04] transition-colors"
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── For customers ─────────────────────────────────────────────────── */}
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
              FOR CUSTOMERS
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-4">
              One account for the independent places you love.
            </h2>
            <div className="w-10 h-[3px] bg-vn-sunset-gold mb-7" />
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
              Earn Veniar Points every time you visit a participating local restaurant, café, or
              business. Your balance follows you across the entire Veniar Network — spend where
              you want, whenever you want.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'No app required to earn at checkout',
                'One account, every participating partner',
                'Points never locked to one business',
                'Free — no fees for customers',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-vn-obi-teal mt-2 shrink-0" />
                  <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/customer-app"
                className="px-6 py-3 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors"
              >
                Learn about the app
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 text-sm font-semibold text-white border border-white/25 rounded hover:bg-white/[0.08] transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Customer wallet mockup — placeholder only */}
          <div className="bg-white/[0.05] border border-white/10 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
              <span className="text-white/50 text-[11px] font-bold tracking-[0.2em] uppercase">Veniar Wallet</span>
              <span className="text-[11px] font-bold text-vn-sunset-gold tracking-widest uppercase">Preview</span>
            </div>
            <div className="px-6 py-8 border-b border-white/[0.08]">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Available balance</p>
              <p className="text-5xl font-black text-vn-sunset-gold leading-none">—</p>
              <p className="text-white/40 text-xs mt-2">Veniar Points</p>
            </div>
            <div className="px-6 py-5">
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Participating businesses nearby</p>
              {['Restaurant partner', 'Local business', 'Nearby partner'].map((b) => (
                <div key={b} className="flex items-center justify-between py-2.5 border-t border-white/[0.05] first:border-0">
                  <span className="text-white/50 text-xs italic">{b}</span>
                  <span className="text-vn-obi-teal text-xs font-semibold">Accepts points</span>
                </div>
              ))}
              <p className="text-white/20 text-[10px] text-center mt-4">
                Wallet preview — placeholder data only, not real account
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── For businesses ────────────────────────────────────────────────── */}
      <section className="bg-vn-ivory border-t border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">
              FOR BUSINESSES
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-vn-ink leading-tight tracking-tight mb-4">
              Loyalty works better when independent businesses are connected.
            </h2>
            <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
            <p className="text-vn-muted text-base leading-relaxed mb-4 max-w-lg">
              Veniar gives independent restaurants and local businesses a complete loyalty program,
              offer controls, and access to a shared customer network — without building it alone.
            </p>
            <p className="text-vn-muted text-base leading-relaxed mb-8 max-w-lg">
              Customers who earn points at another Veniar business can discover and redeem with
              you. New foot traffic from the network, not just returning regulars.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/business"
                className="px-6 py-3 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors"
              >
                Veniar for Business
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 text-sm font-semibold text-vn-ink border border-black/20 rounded hover:bg-black/[0.04] transition-colors"
              >
                View pricing
              </Link>
            </div>
          </div>

          {/* Feature blocks */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Merchant dashboard', sub: 'Points, redemptions, network referrals', color: 'bg-vn-flight-blue', tc: 'text-white', sc: 'text-white/60' },
              { label: 'Offer engine', sub: 'Bonus points, first-visit, return incentives', color: 'bg-vn-deep-flight', tc: 'text-vn-obi-teal', sc: 'text-white/40' },
              { label: 'Network referrals', sub: 'New customers from partner locations', color: 'bg-vn-obi-teal', tc: 'text-vn-deep-flight', sc: 'text-vn-deep-flight/60' },
              { label: 'Settlement ledger', sub: 'Monthly cross-network reporting', color: 'bg-white border border-black/[0.1]', tc: 'text-vn-ink', sc: 'text-vn-muted' },
            ].map((item) => (
              <div key={item.label} className={`${item.color} rounded-lg px-5 py-6`}>
                <div className="w-6 h-[2px] bg-current opacity-30 mb-4" />
                <p className={`text-sm font-bold mb-1 ${item.tc}`}>{item.label}</p>
                <p className={`text-xs leading-relaxed ${item.sc}`}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Network placeholder ───────────────────────────────────────────── */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            THE NETWORK
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-2xl">
            The local rewards network gets stronger as more businesses join.
          </h2>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-base leading-relaxed mb-10 max-w-xl">
            Every business that joins expands what customers can do with their Veniar Points.
            A stronger network means more discovery, more repeat visits, and more foot
            traffic across the whole community.
          </p>
          <div className="border border-black/[0.1] rounded-lg bg-white p-10 text-center max-w-2xl">
            <div className="w-10 h-[3px] bg-vn-obi-teal mx-auto mb-6" />
            <p className="text-vn-ink font-bold text-lg mb-2">Coming soon to your city.</p>
            <p className="text-vn-muted text-sm mb-6">
              Network listings will appear here as merchants join the founding network.
            </p>
            <Link
              href="/join"
              className="inline-block px-6 py-3 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors"
            >
              Join the founding network
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing preview ───────────────────────────────────────────────── */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            PRICING
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-vn-ink leading-tight tracking-tight mb-4">
            Founding merchant pricing.
          </h2>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`border border-black/[0.1] border-t-4 ${plan.accent} rounded-lg bg-white p-7`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-black text-vn-ink">{plan.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-vn-sunset-gold bg-vn-sunset-gold/10 px-2 py-1 rounded">
                    {plan.badge}
                  </span>
                </div>
                <p className="text-vn-muted text-sm leading-relaxed mb-6">{plan.desc}</p>
                <p className="text-vn-ink font-black text-xl mb-0.5">{plan.price}</p>
                <p className="text-vn-muted text-xs mb-6">{plan.note}</p>
                <Link
                  href={plan.href}
                  className="block text-center py-2.5 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-vn-muted text-sm">
            Questions about pricing?{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-vn-flight-blue font-semibold hover:underline underline-offset-4">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      {/* ── Points disclaimer ─────────────────────────────────────────────── */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="border border-black/[0.08] rounded-lg bg-white p-5">
            <p className="text-vn-muted text-xs leading-relaxed">
              <strong className="text-vn-ink font-semibold">Important: </strong>
              Veniar Points are promotional rewards. They are not cash, currency, stored value, or
              transferable money. Rewards are subject to Veniar Rewards Terms and participating
              merchant rules.{' '}
              <Link href="/rewards-terms" className="text-vn-flight-blue hover:underline underline-offset-4">
                Veniar Rewards Terms →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-vn-ink">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 text-center">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            GET STARTED
          </p>
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-2xl mx-auto">
            Bring shared rewards to your local business.
          </h2>
          <div className="w-10 h-[3px] bg-vn-obi-teal mx-auto mb-7" />
          <p className="text-white/55 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Join the founding Veniar network. Applications are reviewed by the Veniar team.
            No long-term contract required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/join"
              className="px-8 py-4 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors"
            >
              Join Veniar
            </Link>
            <Link
              href="/business"
              className="px-8 py-4 text-sm font-semibold text-white border border-white/25 rounded hover:bg-white/[0.08] transition-colors"
            >
              Learn how it works
            </Link>
          </div>
          <p className="text-white/30 text-xs mt-8">
            Veniar is a product of RewardsNow.
          </p>
        </div>
      </section>
    </>
  );
}
