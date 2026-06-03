import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Veniar Customer App | One Rewards Account for Local Favorites',
  description:
    'The Veniar app gives customers one rewards account that works across every participating independent restaurant and local business.',
};

const APP_FEATURES = [
  {
    title: 'One account, every partner',
    desc: 'Earn Veniar Points at any participating business. No separate sign-up for each location.',
  },
  {
    title: 'Points balance',
    desc: 'See your current Veniar Points balance and a full history of where you earned and redeemed.',
  },
  {
    title: 'Business discovery',
    desc: 'Find Veniar partner businesses near you. Every merchant in the network is discoverable in the app.',
  },
  {
    title: 'Offer alerts',
    desc: 'Get notified when a business you visit is running a bonus point event or special offer.',
  },
  {
    title: 'Redeem at checkout',
    desc: 'Give your phone number at any Veniar counter. Your account is looked up instantly — no app required for basic redemptions.',
  },
  {
    title: 'Visit history',
    desc: 'A full log of your visits across every Veniar partner location, with points earned and redeemed per visit.',
  },
];

export default function CustomerAppPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">
            VENIAR APP
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-3xl">
            One rewards account for the independent places you love.
          </h1>
          <div className="w-10 h-[3px] bg-vn-sunset-gold mb-7" />
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
            Veniar gives customers a single loyalty account that works across every participating
            independent restaurant, cafe, bakery, and local business — no separate programs,
            no separate cards.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors"
            >
              Create your account
            </Link>
          </div>
        </div>
      </section>

      {/* No-app note */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-14 lg:py-16">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
                NO APP REQUIRED
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight leading-tight">
                Just give your phone number at checkout.
              </h2>
              <div className="w-8 h-[3px] bg-vn-obi-teal mb-6" />
              <p className="text-vn-muted text-base leading-relaxed mb-4">
                You don&apos;t need to download anything to earn and redeem Veniar Points. At any
                participating business, give your phone number at checkout — the staff handles
                the rest.
              </p>
              <p className="text-vn-muted text-base leading-relaxed">
                The Veniar app is available for customers who want to see their balance, browse
                nearby partners, and track their visit history.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
                HOW CUSTOMERS START
              </p>
              <div className="space-y-4">
                {[
                  { n: '01', title: 'Visit any Veniar partner', desc: 'No sign-up needed in advance. The first time you give your number, your account is created.' },
                  { n: '02', title: 'Give your phone number', desc: 'The staff looks you up and adds points to your account at checkout.' },
                  { n: '03', title: 'Points are yours to spend', desc: 'Use them at the same business or any other Veniar partner location.' },
                ].map((step) => (
                  <div key={step.n} className="border border-black/[0.1] rounded-lg bg-white p-5">
                    <span className="text-vn-obi-teal text-[10px] font-black tracking-[0.3em] uppercase block mb-2">
                      {step.n}
                    </span>
                    <h3 className="font-bold text-vn-ink text-sm mb-1">{step.title}</h3>
                    <p className="text-vn-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App features */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            APP FEATURES
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">
            Everything in one rewards account.
          </h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {APP_FEATURES.map((f) => (
              <div key={f.title} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <div className="w-8 h-[3px] bg-vn-obi-teal mb-5" />
                <h3 className="font-bold text-vn-ink mb-2">{f.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points disclaimer */}
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="border border-black/[0.08] rounded-lg p-5">
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

      {/* CTA */}
      <section className="bg-vn-flight-blue">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
              Start earning Veniar Points.
            </h2>
            <p className="text-white/60 text-sm">
              Create your free account and use it at every Veniar partner.
            </p>
          </div>
          <Link
            href="/login"
            className="shrink-0 px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors whitespace-nowrap"
          >
            Create account
          </Link>
        </div>
      </section>
    </>
  );
}
