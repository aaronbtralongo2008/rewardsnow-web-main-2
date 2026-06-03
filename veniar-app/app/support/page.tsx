import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Veniar Support | Help for Merchants and Customers',
  description: 'Get help with Veniar. Resources for merchants, customers, and anyone getting started with the Veniar Network.',
};

const MERCHANT_GUIDES = [
  { title: 'Getting started as a merchant', desc: 'What happens after you apply, onboarding steps, and how to prepare your team.' },
  { title: 'Managing your merchant dashboard', desc: 'How to view points activity, run reports, and read your monthly settlement.' },
  { title: 'Running offers and promotions', desc: 'Create bonus point events, first-visit rewards, and return incentives from the dashboard.' },
  { title: 'Staff and employee portal access', desc: 'How to add staff members and what the employee portal allows them to do.' },
  { title: 'Understanding network settlement', desc: 'How cross-merchant points activity is tracked and reported monthly.' },
  { title: 'Updating your business profile', desc: 'Edit your services, point values, and business information from the dashboard.' },
];

const CUSTOMER_GUIDES = [
  { title: 'How to start earning Veniar Points', desc: 'Give your phone number at any Veniar counter — no download required.' },
  { title: 'Redeeming your points', desc: 'How to redeem Veniar Points at checkout at any participating partner.' },
  { title: "Checking your balance", desc: "View your points balance, visit history, and where you've earned and spent." },
  { title: 'Lost account access', desc: 'How to recover access to your Veniar customer account.' },
  { title: 'Finding Veniar partners near you', desc: 'Browse and discover participating businesses through the Veniar app.' },
];

const FAQ = [
  { q: 'How do I apply to become a Veniar merchant?', a: 'Email us at support@veniar.com or use the "Apply to join" button. Applications are reviewed within 24–48 hours.' },
  { q: 'How long does merchant onboarding take?', a: 'Most businesses are configured and active within a few days. The Veniar team handles your setup.' },
  { q: "I'm a customer and I can't find my account.", a: "Email support@veniar.com with the phone number associated with your account. We'll locate it for you." },
  { q: 'Can I update my point values after onboarding?', a: 'Yes. Point values can be updated from your merchant dashboard or by contacting support.' },
  { q: 'What if I have a question about billing?', a: "Email support@veniar.com with your business name. We'll connect you with the right team member." },
];

export default function SupportPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">SUPPORT</p>
          <h1 className="text-4xl lg:text-5xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-2xl">Veniar support.</h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-lg leading-relaxed max-w-xl mb-8">Help for merchants, customers, and anyone getting started with Veniar.</p>
          <div className="inline-flex items-center gap-3 border border-black/[0.1] rounded-lg bg-white px-5 py-4">
            <div>
              <p className="text-xs font-bold text-vn-muted uppercase tracking-widest mb-0.5">Contact support</p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-vn-flight-blue font-bold text-sm hover:underline underline-offset-4">{SUPPORT_EMAIL}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">MERCHANT GUIDE</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">Help for business owners.</h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MERCHANT_GUIDES.map((g) => (
              <div key={g.title} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <div className="w-8 h-[3px] bg-vn-flight-blue mb-4" />
                <h3 className="font-bold text-vn-ink mb-2 text-sm">{g.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a href={`mailto:${SUPPORT_EMAIL}?subject=Merchant%20Support%20Question`} className="inline-block text-sm font-semibold text-vn-flight-blue hover:underline underline-offset-4">Can’t find what you need? Email merchant support →</a>
          </div>
        </div>
      </section>
      <section className="bg-vn-ivory border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">CUSTOMER GUIDE</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-4 tracking-tight">Help for customers.</h2>
          <div className="w-8 h-[3px] bg-vn-obi-teal mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CUSTOMER_GUIDES.map((g) => (
              <div key={g.title} className="border border-black/[0.1] rounded-lg bg-white p-6">
                <div className="w-8 h-[3px] bg-vn-obi-teal mb-4" />
                <h3 className="font-bold text-vn-ink mb-2 text-sm">{g.title}</h3>
                <p className="text-vn-muted text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">FAQ</p>
          <h2 className="text-2xl lg:text-3xl font-black text-vn-ink mb-12 tracking-tight">Common questions.</h2>
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
      <section className="bg-vn-ivory">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-black/[0.1] rounded-lg bg-white p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-vn-obi-teal mb-3">Veniar support</p>
              <p className="text-vn-muted text-sm leading-relaxed mb-4">Product, merchant, and customer questions.</p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-vn-flight-blue font-bold text-sm hover:underline underline-offset-4">{SUPPORT_EMAIL}</a>
            </div>
            <div className="border border-black/[0.1] rounded-lg bg-white p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-vn-obi-teal mb-3">Still need help?</p>
              <p className="text-vn-muted text-sm leading-relaxed mb-4">Use the contact page and we’ll route your question to the right team.</p>
              <Link href="/contact" className="text-vn-flight-blue font-bold text-sm hover:underline underline-offset-4">Go to contact →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
