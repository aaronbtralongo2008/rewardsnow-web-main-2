import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Veniar Pricing | Plans for Independent Businesses',
  description: 'Simple, transparent pricing for independent restaurants and local businesses joining the Veniar Network.',
};

const PLANS = [
  {
    name: 'Launch',
    tagline: 'Start earning loyalty activity.',
    price: 'Contact us',
    accent: 'border-vn-obi-teal',
    accentText: 'text-vn-obi-teal',
    features: ['Full merchant dashboard', 'Points issuance and redemption', 'Employee portal access', 'Customer lookup', 'Basic reporting', 'Network enrollment', 'Veniar team onboarding'],
    cta: 'Apply for Launch',
    href: '/join',
  },
  {
    name: 'Network',
    tagline: 'Full network visibility and offers.',
    price: 'Contact us',
    accent: 'border-vn-flight-blue',
    accentText: 'text-vn-flight-blue',
    featured: true,
    features: ['Everything in Launch', 'Offer management tools', 'Bonus point events', 'Network referral tracking', 'Monthly settlement reports', 'Priority support', 'Multi-staff access'],
    cta: 'Apply for Network',
    href: '/join',
  },
  {
    name: 'Multi-location',
    tagline: 'For operators with multiple locations.',
    price: 'Contact us',
    accent: 'border-vn-sunset-gold',
    accentText: 'text-vn-sunset-gold',
    features: ['Everything in Network', 'Consolidated dashboard', 'Per-location reporting', 'Shared customer base across locations', 'Centralized offer management', 'Dedicated account support', 'Custom point configurations'],
    cta: 'Talk to sales',
    href: '/contact',
  },
];

const FAQ = [
  { q: 'Is there a long-term contract?', a: 'No long-term contract is required during the founding network period. Veniar operates on a monthly basis.' },
  { q: 'Are there setup fees?', a: 'There are no setup fees for founding network members. Onboarding is handled by the Veniar team.' },
  { q: "What's included in the founding network offer?", a: 'Founding network merchants get priority onboarding, locked-in founding pricing, and direct access to the Veniar team during setup.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes. You can move between plans at any time. Contact the Veniar support team to adjust your plan.' },
  { q: 'How does billing work for multi-location?', a: 'Multi-location operators are billed at the account level, not per location. Pricing is based on the number of active locations.' },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">PRICING</p>
          <h1 className="text-4xl lg:text-5xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-2xl">Simple pricing for independent businesses.</h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-lg leading-relaxed max-w-xl">Veniar is in its founding network phase. Pricing is by application during this period — early partners get locked-in founding rates.</p>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`border-t-4 ${plan.accent} border border-black/[0.1] rounded-lg bg-white p-7 flex flex-col ${'featured' in plan && plan.featured ? 'ring-1 ring-vn-flight-blue/30' : ''}`}>
                {'featured' in plan && plan.featured && (<span className="inline-block text-[10px] font-bold tracking-widest uppercase text-vn-flight-blue bg-vn-flight-blue/[0.08] border border-vn-flight-blue/20 rounded px-2 py-0.5 mb-4 self-start">Most popular</span>)}
                <h2 className={`text-xl font-black mb-1 ${plan.accentText}`}>{plan.name}</h2>
                <p className="text-vn-muted text-sm mb-5">{plan.tagline}</p>
                <p className="text-vn-ink font-black text-2xl mb-1">{plan.price}</p>
                <p className="text-vn-muted text-xs mb-7">Pricing by application during founding phase.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-vn-obi-teal mt-1.5 shrink-0" />
                      <span className="text-vn-muted text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="block text-center px-5 py-3 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors">{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">FAQ</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-12 tracking-tight">Pricing questions.</h2>
          <div className="divide-y divide-black/[0.08]">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="font-bold text-vn-ink mb-2">{item.q}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Join the founding Veniar network.</h2>
            <p className="text-white/60 text-sm">Questions? <a href={`mailto:${SUPPORT_EMAIL}`} className="text-white hover:underline underline-offset-4">{SUPPORT_EMAIL}</a></p>
          </div>
          <Link href="/join" className="shrink-0 px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors whitespace-nowrap">Apply now</Link>
        </div>
      </section>
    </>
  );
}
