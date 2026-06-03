import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Merchant Dashboard | Veniar for Business',
  description: 'See how the Veniar merchant dashboard gives independent businesses real reporting on loyalty activity, offers, and network performance.',
};

const DASHBOARD_MODULES = [
  { title: 'Points activity', desc: 'Points issued, redeemed, and net balance by day, week, or month. Filter by staff member or service type.', tag: 'Reporting' },
  { title: 'Customer list', desc: 'Every customer who has transacted at your location. See visit count, total points earned, and last visit date.', tag: 'Customers' },
  { title: 'Offer management', desc: 'Create, activate, pause, and edit bonus point events. Control start and end dates and points multipliers.', tag: 'Offers' },
  { title: 'Staff access', desc: 'Add staff email addresses to give them access to the employee portal. No owner credentials shared.', tag: 'Team' },
  { title: 'Network referrals', desc: 'Customers who visited your location after first earning points at another Veniar partner — network-driven traffic.', tag: 'Network' },
  { title: 'Monthly settlement', desc: 'Points issued and redeemed across the network, broken down by period. Settlement reports are generated monthly.', tag: 'Settlement' },
];

const METRICS = [
  { label: 'Points issued', value: '—', note: 'This month' },
  { label: 'Redemptions', value: '—', note: 'This month' },
  { label: 'Repeat visits', value: '—', note: 'Last 30 days' },
  { label: 'Network referrals', value: '—', note: 'This month' },
];

export default function MerchantDashboardPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">MERCHANT DASHBOARD</p>
          <h1 className="text-4xl lg:text-5xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-3xl">See how loyalty turns into measurable local activity.</h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-lg leading-relaxed max-w-xl mb-10">The Veniar merchant dashboard gives independent business owners a clear view of points activity, offers, customer behavior, and network performance.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/join" className="px-7 py-3.5 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors">Get started</Link>
            <Link href="/business" className="px-7 py-3.5 text-sm font-semibold text-vn-ink border border-black/[0.15] rounded hover:bg-black/[0.04] transition-colors">Learn about Veniar for Business</Link>
          </div>
        </div>
      </section>
      <section className="bg-vn-deep-flight border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-6">DASHBOARD PREVIEW</p>
          <div className="border border-white/[0.12] rounded-xl overflow-hidden max-w-4xl">
            <div className="bg-white/[0.06] border-b border-white/[0.08] px-5 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/[0.15]" />
                <div className="w-3 h-3 rounded-full bg-white/[0.15]" />
                <div className="w-3 h-3 rounded-full bg-white/[0.15]" />
              </div>
              <div className="flex-1 h-5 bg-white/[0.06] rounded" />
            </div>
            <div className="bg-vn-deep-flight p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {METRICS.map((m) => (
                  <div key={m.label} className="bg-white/[0.06] border border-white/[0.08] rounded-lg p-4">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">{m.label}</p>
                    <p className="text-white text-2xl font-black mb-0.5">{m.value}</p>
                    <p className="text-white/30 text-[10px]">{m.note}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
                  {['Customer', 'Points issued', 'Redemptions', 'Last visit'].map((h) => (
                    <p key={h} className="text-white/35 text-[10px] font-bold uppercase tracking-widest">{h}</p>
                  ))}
                </div>
                {[1, 2, 3].map((row) => (
                  <div key={row} className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-white/[0.04]">
                    <div className="h-3.5 bg-white/[0.08] rounded w-24" />
                    <div className="h-3.5 bg-white/[0.08] rounded w-12" />
                    <div className="h-3.5 bg-white/[0.08] rounded w-10" />
                    <div className="h-3.5 bg-white/[0.08] rounded w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-white/30 text-xs mt-4">Dashboard preview — placeholder UI only. Actual data shown after onboarding.</p>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">WHAT’S INCLUDED</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">Every tool for running your loyalty program.</h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DASHBOARD_MODULES.map((m) => (
              <div key={m.title} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-vn-obi-teal border border-vn-obi-teal/30 rounded px-2 py-0.5 mb-4">{m.tag}</span>
                <h3 className="font-bold text-vn-ink mb-2">{m.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-vn-flight-blue">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Ready to see your loyalty data?</h2>
            <p className="text-white/60 text-sm">Join Veniar and get access to the merchant dashboard from day one.</p>
          </div>
          <Link href="/join" className="shrink-0 px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors whitespace-nowrap">Join Veniar</Link>
        </div>
      </section>
    </>
  );
}
