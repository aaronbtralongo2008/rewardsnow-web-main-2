import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Veniar | The Shared Rewards Network',
  description:
    'Learn how Veniar works — the shared rewards network for independent restaurants and local businesses.',
};

export default function VeniarPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">
            ABOUT VENIAR
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-3xl">
            Veniar is the shared rewards network for local favorites.
          </h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-lg leading-relaxed max-w-xl">
            Independent restaurants and local businesses shouldn&apos;t need to build their own loyalty
            programs from scratch. Veniar gives them one — shared, connected, and stronger every
            time a new business joins.
          </p>
        </div>
      </section>

      {/* What Veniar is */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
              WHAT IT IS
            </p>
            <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight leading-tight">
              A shared loyalty network for independent businesses.
            </h2>
            <div className="w-8 h-[3px] bg-vn-obi-teal mb-6" />
            <p className="text-vn-muted text-base leading-relaxed mb-4">
              Veniar is a product of RewardsNow that connects independent restaurants, cafes,
              bakeries, and local businesses through a shared rewards system.
            </p>
            <p className="text-vn-muted text-base leading-relaxed">
              When a customer earns Veniar Points at one business, they can use them at any other
              participating Veniar business. The more merchants who join, the more valuable the
              network becomes for everyone.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
              WHO IT IS FOR
            </p>
            <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight leading-tight">
              Independent businesses and their customers.
            </h2>
            <div className="w-8 h-[3px] bg-vn-obi-teal mb-6" />
            <div className="space-y-4">
              {[
                { who: 'For merchants', desc: 'Independent restaurants, cafes, bakeries, food trucks, and local retailers who want a loyalty program without building one from scratch.' },
                { who: 'For customers', desc: 'Anyone who regularly visits local independent businesses and wants one account that works across all of them.' },
              ].map((item) => (
                <div key={item.who} className="border-l-2 border-vn-obi-teal pl-5">
                  <p className="font-bold text-vn-ink text-sm mb-1">{item.who}</p>
                  <p className="text-vn-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How points work */}
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            HOW POINTS WORK
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight leading-tight">
            Veniar Points — shared, local, network-native.
          </h2>
          <div className="w-8 h-[3px] bg-vn-sunset-gold mb-10" />
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.08]">
            {[
              { title: 'Earned locally', body: 'Customers earn points at any participating Veniar business. No separate program setup required.' },
              { title: 'Redeemed anywhere', body: 'Points are redeemable at any other participating Veniar business — not locked to a single store.' },
              { title: 'Merchant-controlled', body: 'Each merchant controls point values for their services and can run their own offers through the Veniar platform.' },
            ].map((item) => (
              <div key={item.title} className="bg-vn-deep-flight px-8 py-8">
                <div className="w-6 h-[2px] bg-vn-obi-teal mb-5" />
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-10 border border-white/[0.12] rounded-lg p-6">
            <p className="text-white/40 text-xs leading-relaxed">
              <strong className="text-white/60 font-semibold">Important: </strong>
              Veniar Points are promotional rewards. They are not cash, currency, stored value, or
              transferable money. Rewards are subject to Veniar Rewards Terms and participating
              merchant rules.{' '}
              <Link href="/rewards-terms" className="text-vn-obi-teal hover:underline underline-offset-4">
                Veniar Rewards Terms →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Why shared loyalty */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            WHY SHARED LOYALTY
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight max-w-2xl leading-tight">
            A shared network creates value no single business can build alone.
          </h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-8" />
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
            <div>
              <p className="text-vn-muted text-base leading-relaxed mb-4">
                Traditional loyalty programs only reward customers at the business that issued the
                points. That means every merchant builds a siloed program with no network effect
                and no new customer discovery.
              </p>
              <p className="text-vn-muted text-base leading-relaxed">
                Veniar changes that. Every new business that joins makes the network more useful for
                every customer — which makes it more valuable for every other merchant. It&apos;s a
                compounding loyalty effect that independent businesses couldn&apos;t achieve alone.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Customers discover your business through other Veniar partners.',
                'Existing network customers arrive with a reason to spend.',
                'Your offers reach the whole Veniar customer base.',
                'Settlement happens across the network automatically.',
              ].map((point) => (
                <div key={point} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-vn-obi-teal mt-2 shrink-0" />
                  <p className="text-vn-muted text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-vn-flight-blue">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
              Ready to join the Veniar Network?
            </h2>
            <p className="text-white/60 text-sm">For independent businesses and their customers.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/join" className="px-6 py-3 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors whitespace-nowrap">
              Join Veniar
            </Link>
            <Link href="/login" className="px-6 py-3 text-sm font-semibold text-white border border-white/25 rounded hover:bg-white/[0.1] transition-colors whitespace-nowrap">
              Log in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
