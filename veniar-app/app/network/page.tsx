import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Veniar Network | The Shared Local Rewards Network',
  description:
    'Every business that joins Veniar makes the network more valuable for every other merchant and every customer.',
};

const HOW_NETWORK_WORKS = [
  {
    n: '01',
    title: 'Businesses join',
    desc: 'Independent restaurants, cafes, bakeries, and local retailers apply to join. Each approved merchant becomes a Veniar Network partner.',
  },
  {
    n: '02',
    title: 'Customers earn',
    desc: 'Any customer can earn Veniar Points at any partner location. One account, every merchant — no separate sign-ups.',
  },
  {
    n: '03',
    title: 'Points travel',
    desc: 'Points earned at one business are redeemable at any other Veniar partner. The network removes the single-store lock-in.',
  },
  {
    n: '04',
    title: 'Network settles',
    desc: 'Points issued and redeemed across the network are tracked per merchant and settled monthly. No manual tracking required.',
  },
];

const NETWORK_EFFECTS = [
  {
    title: 'Discovery',
    desc: 'Customers browsing the Veniar app see every network merchant near them. New businesses get visibility to an existing customer base from day one.',
  },
  {
    title: 'Retention',
    desc: 'Customers with Veniar Points have a reason to return — to any network partner. The whole network benefits from every earned point.',
  },
  {
    title: 'Settlement',
    desc: 'Redemptions across merchant boundaries are tracked automatically. Monthly reporting gives every merchant a clear picture of cross-network activity.',
  },
  {
    title: 'Growth',
    desc: 'Every new merchant that joins adds value to every existing merchant. Network value compounds as the number of partners grows.',
  },
];

export default function NetworkPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">
            VENIAR NETWORK
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-3xl">
            The local loyalty network grows stronger with every new business.
          </h1>
          <div className="w-10 h-[3px] bg-vn-sunset-gold mb-7" />
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
            Veniar connects independent businesses into a shared rewards network. When a customer
            earns points at one partner, they can spend them at any other — creating a loyalty loop
            that no single business could build alone.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/join" className="px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors">
              Join the network
            </Link>
            <Link href="/business" className="px-7 py-3.5 text-sm font-semibold text-white border border-white/25 rounded hover:bg-white/[0.08] transition-colors">
              For merchants
            </Link>
          </div>
        </div>
      </section>

      {/* How the network works */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            HOW IT WORKS
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">
            One network. Every independent business.
          </h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_NETWORK_WORKS.map((step) => (
              <div key={step.n} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <span className="text-vn-obi-teal text-[11px] font-black tracking-[0.3em] uppercase block mb-4">
                  {step.n}
                </span>
                <h3 className="font-bold text-vn-ink mb-2 leading-snug">{step.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network effects */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            NETWORK EFFECTS
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight max-w-2xl">
            What every merchant gains from being part of the network.
          </h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 gap-4">
            {NETWORK_EFFECTS.map((item) => (
              <div key={item.title} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <div className="w-8 h-[3px] bg-vn-obi-teal mb-5" />
                <h3 className="font-bold text-vn-ink mb-2">{item.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network directory — placeholder */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            NETWORK DIRECTORY
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">
            Veniar partner locations.
          </h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-10" />

          {/* Placeholder state */}
          <div className="border border-black/[0.1] rounded-lg bg-white p-12 text-center max-w-2xl">
            <div className="w-10 h-[3px] bg-vn-obi-teal mx-auto mb-6" />
            <h3 className="font-bold text-vn-ink mb-3 text-lg">Network listings coming soon.</h3>
            <p className="text-vn-muted text-sm leading-relaxed mb-6">
              The Veniar Network is in its founding phase. Partner business listings will be
              published here as the network grows. If you&apos;re looking for a specific location,
              contact our support team.
            </p>
            <Link
              href="/join"
              className="inline-block px-6 py-3 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors"
            >
              Become a founding partner
            </Link>
          </div>
        </div>
      </section>

      {/* For businesses CTA */}
      <section className="bg-vn-flight-blue">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
              Add your business to the Veniar Network.
            </h2>
            <p className="text-white/60 text-sm">
              Independent restaurants, cafes, bakeries, food trucks, and local retailers.
            </p>
          </div>
          <Link
            href="/join"
            className="shrink-0 px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors whitespace-nowrap"
          >
            Apply now
          </Link>
        </div>
      </section>
    </>
  );
}
