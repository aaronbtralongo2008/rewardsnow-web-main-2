import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Veniar Works | Shared Loyalty for Independent Businesses',
  description: 'See how Veniar connects independent businesses and customers through a shared rewards network.',
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">HOW IT WORKS</p>
          <h1 className="text-4xl lg:text-5xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-3xl">One shared network. Every independent business.</h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-lg leading-relaxed max-w-xl">Veniar is a shared loyalty network for independent businesses. Customers earn points at any partner and spend them at any other. Merchants get reporting, offers, and visibility — without building a program from scratch.</p>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">FOR CUSTOMERS</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">Earn everywhere. Redeem anywhere.</h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n: '01', title: 'Give your phone number', desc: 'At any Veniar partner checkout, give your phone number. If it\'s your first visit, your account is created automatically. No app required.' },
              { n: '02', title: 'Earn Veniar Points', desc: 'The staff member processes your transaction and points are added to your account instantly. Points work across the whole network.' },
              { n: '03', title: 'Redeem at any partner', desc: 'Use your accumulated Veniar Points at any participating business — not just where you earned them. Points travel with your account.' },
            ].map((step) => (
              <div key={step.n} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <span className="text-vn-obi-teal text-[11px] font-black tracking-[0.3em] uppercase block mb-4">{step.n}</span>
                <h3 className="font-bold text-vn-ink mb-2 leading-snug">{step.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-vn-deep-flight">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">FOR MERCHANTS</p>
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight">A loyalty program, without building one.</h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-10" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
            {[
              { title: 'Apply and onboard', desc: 'Submit your application. The Veniar team handles setup — profile, services, point values, and staff access.' },
              { title: 'Staff process transactions', desc: 'Your team uses the browser-based employee portal to look up customers and issue points. No hardware needed.' },
              { title: 'Customers earn and return', desc: 'Points are visible to customers immediately. Network customers arrive with accumulated points ready to spend.' },
              { title: 'You see it all', desc: 'The merchant dashboard shows points issued, redemptions, repeat visits, and customers driven by the network.' },
            ].map((item) => (
              <div key={item.title} className="bg-vn-deep-flight px-8 py-8">
                <div className="w-6 h-[2px] bg-vn-obi-teal mb-5" />
                <h3 className="text-white font-bold mb-2 leading-snug">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">NETWORK SETTLEMENT</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight max-w-2xl">Points that cross merchant boundaries are tracked automatically.</h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-8" />
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
            <div>
              <p className="text-vn-muted text-base leading-relaxed mb-4">When a customer earns points at Merchant A and redeems them at Merchant B, that transaction is tracked per merchant. Veniar handles the accounting across the network.</p>
              <p className="text-vn-muted text-base leading-relaxed">Each month, every merchant receives a settlement report showing their net points position.</p>
            </div>
            <div className="space-y-4">
              {['No manual tracking between merchants.', 'Monthly reports show net issuances and redemptions.', 'Network activity is separated from direct customer activity.', 'Settlement handled by Veniar — no merchant coordination needed.'].map((point) => (
                <div key={point} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-vn-obi-teal mt-2 shrink-0" />
                  <p className="text-vn-muted text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="border border-black/[0.1] rounded-lg bg-white p-5">
            <p className="text-vn-muted text-xs leading-relaxed"><strong className="text-vn-ink font-semibold">Important: </strong>Veniar Points are promotional rewards. They are not cash, currency, stored value, or transferable money. Rewards are subject to Veniar Rewards Terms and participating merchant rules.{' '}<Link href="/rewards-terms" className="text-vn-flight-blue hover:underline underline-offset-4">Veniar Rewards Terms →</Link></p>
          </div>
        </div>
      </section>
      <section className="bg-vn-flight-blue">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Ready to join?</h2>
            <p className="text-white/60 text-sm">For businesses and customers.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/join" className="px-6 py-3 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors whitespace-nowrap">Join Veniar</Link>
            <Link href="/login" className="px-6 py-3 text-sm font-semibold text-white border border-white/25 rounded hover:bg-white/[0.1] transition-colors whitespace-nowrap">Log in</Link>
          </div>
        </div>
      </section>
    </>
  );
}
