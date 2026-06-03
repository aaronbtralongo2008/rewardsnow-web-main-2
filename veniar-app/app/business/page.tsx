import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Veniar for Business | Shared Loyalty for Independent Businesses',
  description: 'Veniar helps independent businesses reward customers, manage offers, and participate in a local rewards network.',
};

const BENEFITS = [
  { title: 'Shared customer network', desc: 'Your business is discoverable by every customer in the Veniar Network — not just your existing regulars.' },
  { title: 'Merchant-controlled offers', desc: 'Run bonus point events, first-visit rewards, or return incentives directly from your dashboard.' },
  { title: 'Real reporting', desc: 'See points issued, redemptions, repeat visits, and customers who arrived from the network.' },
  { title: 'Simple staff tools', desc: 'Staff process customer transactions through a browser-based employee portal — no hardware required.' },
  { title: 'Network settlement', desc: 'Points issued and redeemed across the network are tracked and reported monthly.' },
  { title: 'No technical setup', desc: 'Onboarding is handled by the Veniar team. Most businesses are up and running within days.' },
];

const STEPS = [
  { n: '01', title: 'Submit your application', desc: 'Apply via the Veniar join page. Applications are reviewed within 24–48 hours.' },
  { n: '02', title: 'Configure your services', desc: 'Set up your business profile, services, menu items, and point values with the Veniar team.' },
  { n: '03', title: 'Connect your staff', desc: 'Direct your team to the Veniar employee portal. No owner credentials needed.' },
  { n: '04', title: 'Start earning activity', desc: 'Customers begin earning and redeeming points. You see it all in the merchant dashboard.' },
];

const FAQ = [
  { q: 'Do customers need to download an app?', a: 'No. Customers can give their phone number at checkout. The Veniar app is available for customers who want wallet and discovery features.' },
  { q: 'Can I set my own point values?', a: 'Yes. Point values for your services and menu items are configured with your Veniar setup and can be updated from your dashboard.' },
  { q: 'What if a customer redeems points they earned elsewhere?', a: 'The Veniar Network handles settlement across merchants. Redemptions and issuances are tracked and reported monthly.' },
  { q: 'Do I need special hardware?', a: 'No. The employee portal is browser-based and works on any device with an internet connection.' },
  { q: 'Is there a long-term contract?', a: 'No long-term contract is required during the founding network period. See pricing or contact support for details.' },
];

export default function BusinessPage() {
  return (
    <>
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">VENIAR FOR BUSINESS</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-3xl">Loyalty works better when independent businesses are connected.</h1>
          <div className="w-10 h-[3px] bg-vn-sunset-gold mb-7" />
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">Veniar gives merchants a rewards program, offer tools, and visibility into network-driven customer activity — without building any of it from scratch.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/join" className="px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors">Join the founding network</Link>
            <Link href="/pricing" className="px-7 py-3.5 text-sm font-semibold text-white border border-white/25 rounded hover:bg-white/[0.08] transition-colors">View pricing</Link>
          </div>
        </div>
      </section>
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">MERCHANT BENEFITS</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">Everything your loyalty program needs.</h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <div className="w-8 h-[3px] bg-vn-obi-teal mb-5" />
                <h3 className="font-bold text-vn-ink mb-2">{b.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">GETTING STARTED</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">Up and running in days, not months.</h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step) => (
              <div key={step.n} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <span className="text-vn-obi-teal text-[11px] font-black tracking-[0.3em] uppercase block mb-4">{step.n}</span>
                <h3 className="font-bold text-vn-ink mb-2 leading-snug">{step.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">FAQ</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-12 tracking-tight">Common merchant questions.</h2>
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
      <section className="bg-vn-flight-blue">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Join the founding Veniar network.</h2>
            <p className="text-white/60 text-sm">Questions? Email{' '}<a href={`mailto:${SUPPORT_EMAIL}`} className="text-white hover:underline underline-offset-4">{SUPPORT_EMAIL}</a></p>
          </div>
          <Link href="/join" className="shrink-0 px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors whitespace-nowrap">Apply now</Link>
        </div>
      </section>
    </>
  );
}
