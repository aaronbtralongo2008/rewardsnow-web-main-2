import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL, COMPANY_SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Join Veniar | Apply for Merchants, Customers, and Partners',
  description: 'Join the Veniar Network as a merchant, create a customer account, or contact RewardsNow about partnerships.',
};

export default function JoinPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">JOIN VENIAR</p>
          <h1 className="text-4xl lg:text-5xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-2xl">Get started with Veniar.</h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-lg leading-relaxed max-w-xl">Whether you’re a merchant looking to join the network, a customer creating an account, or an organization interested in a partnership — start here.</p>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-20 lg:py-24">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-black/[0.1] rounded-lg bg-white p-7 flex flex-col">
              <div className="w-8 h-[3px] bg-vn-flight-blue mb-5" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-muted mb-3">FOR BUSINESSES</p>
              <h2 className="text-xl font-black text-vn-ink mb-3 tracking-tight leading-tight">I’m a merchant.</h2>
              <p className="text-vn-muted text-sm leading-relaxed mb-6 flex-1">Apply to join the Veniar Network as an independent restaurant, cafe, bakery, food truck, or local retailer. Applications are reviewed within 24–48 hours.</p>
              <ul className="space-y-2 mb-8">
                {['Shared loyalty network enrollment', 'Merchant dashboard access', 'Employee portal for staff', 'Offer and points management'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-vn-flight-blue mt-1.5 shrink-0" /><span className="text-vn-muted text-xs leading-relaxed">{item}</span></li>
                ))}
              </ul>
              <a href={`mailto:${SUPPORT_EMAIL}?subject=Merchant%20Application%20%E2%80%94%20Veniar&body=Business%20name%3A%0ABusiness%20type%3A%0ALocation%3A%0AContact%20name%3A%0A`} className="block text-center px-5 py-3 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors">Apply to join →</a>
              <p className="text-vn-muted text-xs mt-3 text-center">We’ll reply within 24–48 hours.</p>
            </div>
            <div className="border border-black/[0.1] rounded-lg bg-white p-7 flex flex-col">
              <div className="w-8 h-[3px] bg-vn-obi-teal mb-5" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-muted mb-3">FOR CUSTOMERS</p>
              <h2 className="text-xl font-black text-vn-ink mb-3 tracking-tight leading-tight">I’m a customer.</h2>
              <p className="text-vn-muted text-sm leading-relaxed mb-6 flex-1">Create a free Veniar account and start earning points at any participating business. No app download required — just give your phone number at checkout.</p>
              <ul className="space-y-2 mb-8">
                {['One account for every Veniar partner', 'Earn and redeem across businesses', 'Free — no fees, ever', 'No app required at checkout'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-vn-obi-teal mt-1.5 shrink-0" /><span className="text-vn-muted text-xs leading-relaxed">{item}</span></li>
                ))}
              </ul>
              <Link href="/login" className="block text-center px-5 py-3 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors">Create account →</Link>
              <p className="text-vn-muted text-xs mt-3 text-center">Free for all customers.</p>
            </div>
            <div className="border border-black/[0.1] rounded-lg bg-white p-7 flex flex-col">
              <div className="w-8 h-[3px] bg-vn-sunset-gold mb-5" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-muted mb-3">FOR PARTNERS</p>
              <h2 className="text-xl font-black text-vn-ink mb-3 tracking-tight leading-tight">I’m a partner.</h2>
              <p className="text-vn-muted text-sm leading-relaxed mb-6 flex-1">Chambers of commerce, restaurant associations, business improvement districts, and other organizations interested in bringing Veniar to their network.</p>
              <ul className="space-y-2 mb-8">
                {['Network-level deployment', 'Co-branded configurations available', 'Dedicated onboarding support', 'Custom reporting'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-vn-sunset-gold mt-1.5 shrink-0" /><span className="text-vn-muted text-xs leading-relaxed">{item}</span></li>
                ))}
              </ul>
              <a href={`mailto:${COMPANY_SUPPORT_EMAIL}?subject=Partnership%20Inquiry%20%E2%80%94%20Veniar`} className="block text-center px-5 py-3 text-sm font-bold text-vn-ink border border-black/[0.15] rounded hover:bg-black/[0.04] transition-colors">Contact RewardsNow →</a>
              <p className="text-vn-muted text-xs mt-3 text-center">Company &amp; partnership inquiries.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-vn-ivory">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-vn-muted text-sm">Already have a Veniar account?{' '}<Link href="/login" className="text-vn-flight-blue font-semibold hover:underline underline-offset-4">Log in →</Link></p>
        </div>
      </section>
    </>
  );
}
