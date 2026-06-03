import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Veniar for Business | Shared Loyalty for Independent Businesses',
  description:
    'Veniar helps independent businesses reward customers, manage offers, and participate in a local rewards network — without building a program from scratch.',
};

const BENEFITS = [
  { title: 'Shared customer network', desc: 'Your business is discoverable by every customer in the Veniar Network — not just your existing regulars.' },
  { title: 'Merchant-controlled offers', desc: 'Run bonus point events, first-visit rewards, or return incentives directly from your dashboard.' },
  { title: 'Real reporting', desc: 'See points issued, redemptions, repeat visits, and customers who arrived from the network.' },
  { title: 'Simple staff tools', desc: 'Staff process customer transactions through a browser-based employee portal — no hardware required.' },
  { title: 'Network settlement', desc: 'Points issued and redeemed across the network are tracked and reported monthly.' },
  { title: 'No technical setup', desc: 'Onboarding is handled by the Veniar team. Most businesses are up and running within days.' },
];

const OFFER_TYPES = [
  {
    title: 'Bonus point events',
    desc: 'Set a time window where customers earn extra points per transaction. Useful for slow periods, new menu launches, or seasonal pushes.',
    accent: 'bg-vn-obi-teal',
  },
  {
    title: 'First-visit rewards',
    desc: 'Give new customers a point bonus on their first visit to your location. Encourages network customers to try your business.',
    accent: 'bg-vn-flight-blue',
  },
  {
    title: 'Return incentives',
    desc: 'Reward customers who return within a set window — designed to build visit frequency without discounting.',
    accent: 'bg-vn-sunset-gold',
  },
  {
    title: 'Custom point values',
    desc: 'Configure point earn and redemption rates per service or menu item. Adjust from your dashboard at any time.',
    accent: 'bg-vn-sunset-orange',
  },
];

const REPORTING_FEATURES = [
  { title: 'Points issued', desc: 'Total points earned at your location by period, staff member, or service type.' },
  { title: 'Redemptions', desc: 'Points redeemed at your location, including redemptions from customers who earned elsewhere.' },
  { title: 'Repeat visits', desc: 'Customers who returned within a defined window after their first visit.' },
  { title: 'Network arrivals', desc: 'Customers who first visited your location after earning points at another Veniar partner.' },
  { title: 'Monthly settlement', desc: 'Cross-network point activity reconciled monthly, with a clear summary for your records.' },
  { title: 'Active offers', desc: 'Performance of your running promotions — bonus events, first-visit rewards, and return incentives.' },
];

const FRAUD_FEATURES = [
  { title: 'Account-level controls', desc: 'Points are tied to registered phone numbers. One account per number — no duplication.' },
  { title: 'Transaction audit log', desc: 'Every point issuance and redemption is logged against a customer account and timestamp.' },
  { title: 'Staff portal separation', desc: 'Staff access is limited to the employee portal. No access to merchant settings or point configurations.' },
  { title: 'Network-level oversight', desc: 'RewardsNow monitors the network for unusual activity patterns. Accounts flagged for abuse are reviewed.' },
];

const STEPS = [
  { n: '01', title: 'Submit your application', desc: 'Apply via the Veniar join page. Applications are reviewed by the Veniar team.' },
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
      {/* Hero */}
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">
            VENIAR FOR BUSINESS
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-3xl">
            Loyalty works better when independent businesses are connected.
          </h1>
          <div className="w-10 h-[3px] bg-vn-sunset-gold mb-7" />
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
            Veniar gives merchants a rewards program, offer tools, and visibility into
            network-driven customer activity — without building any of it from scratch.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/join" className="px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors">
              Join the founding network
            </Link>
            <Link href="/pricing" className="px-7 py-3.5 text-sm font-semibold text-white border border-white/25 rounded hover:bg-white/[0.08] transition-colors">
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            MERCHANT BENEFITS
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">
            Everything your loyalty program needs.
          </h2>
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

      {/* Customer acquisition */}
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
                CUSTOMER ACQUISITION
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight leading-tight">
                The network sends you customers you didn&apos;t have to find.
              </h2>
              <div className="w-8 h-[3px] bg-vn-obi-teal mb-6" />
              <p className="text-white/60 text-base leading-relaxed mb-4">
                Every customer in the Veniar Network has a reason to visit your business — they
                can earn points there and spend them anywhere. When a new business joins, it
                becomes a destination for the whole existing network.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Your merchant dashboard shows customers who arrived from the network — people
                who had points from another partner and chose to visit you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-lg overflow-hidden">
              {[
                { label: 'Network arrivals', sub: 'this month' },
                { label: 'Repeat visits', sub: 'this month' },
                { label: 'Points issued', sub: 'this month' },
                { label: 'Points redeemed', sub: 'this month' },
              ].map((stat) => (
                <div key={stat.label} className="bg-vn-deep-flight p-6">
                  <p className="text-3xl font-black text-vn-sunset-gold leading-none mb-2">—</p>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-0.5">{stat.label}</p>
                  <p className="text-white/30 text-xs">{stat.sub}</p>
                </div>
              ))}
              <p className="col-span-2 text-white/20 text-[10px] px-6 py-3">
                Placeholder display — your live data appears in the merchant dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer controls */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            OFFER CONTROLS
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">
            Run promotions without a marketing team.
          </h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-4" />
          <p className="text-vn-muted text-base leading-relaxed max-w-2xl mb-12">
            Veniar gives merchants offer tools built directly into the dashboard. Set up and
            end promotions without any technical work.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFER_TYPES.map((offer) => (
              <div key={offer.title} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <div className={`w-8 h-[3px] ${offer.accent} mb-5`} />
                <h3 className="font-bold text-vn-ink mb-2 leading-snug">{offer.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repeat visits */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
                REPEAT VISITS
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight leading-tight">
                Turn first-time visitors into regulars.
              </h2>
              <div className="w-8 h-[3px] bg-vn-obi-teal mb-6" />
              <p className="text-vn-muted text-base leading-relaxed mb-4">
                A customer who earns points at your location has a balance they can spend. That
                balance is a reason to return — whether they spend at your business or another
                Veniar partner.
              </p>
              <p className="text-vn-muted text-base leading-relaxed">
                Return incentives let you reward customers who come back within a defined window.
                Veniar tracks the timing automatically — no manual follow-up needed.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { step: '01', title: 'Customer visits and earns', desc: 'Points credited at the time of transaction — no app required.' },
                { step: '02', title: 'Balance grows across the network', desc: 'Every visit at any partner adds to a single account.' },
                { step: '03', title: 'Return incentive triggers', desc: 'If you have a return offer running, it applies automatically when they come back.' },
                { step: '04', title: 'Dashboard shows the pattern', desc: 'Repeat visit data appears in your merchant reporting, by period.' },
              ].map((item) => (
                <div key={item.step} className="border border-black/[0.1] rounded-lg bg-white p-5 flex gap-5">
                  <span className="text-vn-obi-teal text-[11px] font-black tracking-[0.3em] uppercase shrink-0 mt-0.5">{item.step}</span>
                  <div>
                    <h3 className="font-bold text-vn-ink text-sm mb-1">{item.title}</h3>
                    <p className="text-vn-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            REPORTING
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">
            Know what&apos;s happening in your business.
          </h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-4" />
          <p className="text-vn-muted text-base leading-relaxed max-w-2xl mb-12">
            The merchant dashboard gives you a clear view of loyalty activity — what&apos;s being
            earned, what&apos;s being redeemed, who&apos;s returning, and how the network is delivering
            customers to your door.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REPORTING_FEATURES.map((f) => (
              <div key={f.title} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <div className="w-8 h-[3px] bg-vn-flight-blue mb-4" />
                <h3 className="font-bold text-vn-ink mb-2 text-sm">{f.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/merchant-dashboard" className="inline-block text-sm font-semibold text-vn-flight-blue hover:underline underline-offset-4">
              View the full merchant dashboard →
            </Link>
          </div>
        </div>
      </section>

      {/* Fraud and abuse controls */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
                INTEGRITY
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight leading-tight">
                A network everyone can trust.
              </h2>
              <div className="w-8 h-[3px] bg-vn-obi-teal mb-6" />
              <p className="text-vn-muted text-base leading-relaxed mb-4">
                Veniar Points only work when the network is honest. RewardsNow enforces account
                controls and monitors for abuse across every participating merchant.
              </p>
              <p className="text-vn-muted text-base leading-relaxed">
                Fraudulent activity — including manipulation of balances or misrepresentation of
                transactions — results in account suspension and forfeiture of accumulated points
                under the Veniar Rewards Terms.
              </p>
              <div className="mt-6">
                <Link href="/rewards-terms" className="text-sm font-semibold text-vn-flight-blue hover:underline underline-offset-4">
                  View Rewards Terms →
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FRAUD_FEATURES.map((f) => (
                <div key={f.title} className="border border-black/[0.1] rounded-lg bg-white p-5">
                  <div className="w-6 h-[2px] bg-vn-obi-teal mb-4" />
                  <h3 className="font-bold text-vn-ink text-sm mb-2">{f.title}</h3>
                  <p className="text-vn-muted text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How onboarding works */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            GETTING STARTED
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">
            Up and running in days, not months.
          </h2>
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

      {/* FAQ */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            FAQ
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-12 tracking-tight">
            Common merchant questions.
          </h2>
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

      {/* CTA */}
      <section className="bg-vn-flight-blue">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
              Join the founding Veniar network.
            </h2>
            <p className="text-white/60 text-sm">
              Questions? Email{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-white hover:underline underline-offset-4">{SUPPORT_EMAIL}</a>
            </p>
          </div>
          <Link href="/join" className="shrink-0 px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors whitespace-nowrap">
            Apply now
          </Link>
        </div>
      </section>
    </>
  );
}
