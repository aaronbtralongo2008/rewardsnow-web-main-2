import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Veniar Products | Shared Loyalty, Rewards, and Merchant Tools',
  description:
    'Explore Veniar, Veniar for Business, the Veniar Network, the merchant dashboard, and the customer app.',
};

const PRODUCTS = [
  {
    symbol: 'V·',
    title: 'Veniar',
    desc: 'The shared rewards network for independent restaurants and local businesses. One account, every partner.',
    cta: 'Learn about Veniar',
    href: '/veniar',
    accent: 'bg-vn-obi-teal',
  },
  {
    symbol: 'B·',
    title: 'Veniar for Business',
    desc: 'Merchant onboarding, offer controls, customer lookup, and real reporting for independent operators.',
    cta: 'For merchants',
    href: '/business',
    accent: 'bg-vn-flight-blue',
  },
  {
    symbol: 'N·',
    title: 'Veniar Network',
    desc: 'The local loyalty network that connects businesses so customers can earn and redeem across partners.',
    cta: 'Explore the network',
    href: '/network',
    accent: 'bg-vn-sunset-gold',
  },
  {
    symbol: 'D·',
    title: 'Merchant Dashboard',
    desc: 'Points issued, redemptions, repeat visits, network referrals, offer performance — in one place.',
    cta: 'See the dashboard',
    href: '/merchant-dashboard',
    accent: 'bg-vn-sunset-orange',
  },
  {
    symbol: 'A·',
    title: 'Customer App',
    desc: 'One rewards account for earning and redeeming Veniar Points at independent businesses near you.',
    cta: 'Get the app',
    href: '/customer-app',
    accent: 'bg-vn-obi-teal',
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">THE PLATFORM</p>
          <h1 className="text-4xl lg:text-5xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-3xl">Products built for local loyalty.</h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-lg leading-relaxed max-w-xl">Veniar brings rewards, discovery, and merchant tools into one shared local network. Every product connects to the others.</p>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="flex flex-col gap-4">
            {PRODUCTS.map((p, i) => (
              <Link key={p.title} href={p.href} className="group grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center border border-black/[0.1] rounded-lg bg-white p-7 hover:border-vn-flight-blue/40 transition-colors">
                <div className="flex items-center gap-5">
                  <span className="text-vn-muted/40 text-2xl font-black w-6 text-center">{String(i + 1).padStart(2, '0')}</span>
                  <div className={`w-1 h-14 rounded-full ${p.accent}`} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-vn-muted mb-2">{p.symbol} Veniar product</p>
                  <h2 className="text-xl font-black text-vn-ink mb-2 group-hover:text-vn-flight-blue transition-colors">{p.title}</h2>
                  <p className="text-vn-muted text-sm leading-relaxed max-w-lg">{p.desc}</p>
                </div>
                <div className="shrink-0">
                  <span className="inline-block px-5 py-2.5 text-sm font-bold text-white bg-vn-flight-blue rounded group-hover:bg-[#094d92] transition-colors whitespace-nowrap">{p.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Ready to join the network?</h2>
          <div className="w-10 h-[3px] bg-vn-obi-teal mx-auto mb-7" />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/join" className="px-7 py-3.5 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors">Join Veniar</Link>
            <Link href="/login" className="px-7 py-3.5 text-sm font-semibold text-white border border-white/25 rounded hover:bg-white/[0.08] transition-colors">Log in</Link>
          </div>
        </div>
      </section>
    </>
  );
}
