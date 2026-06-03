import type { Metadata } from 'next';
import { SUPPORT_EMAIL, COMPANY_SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact Veniar | Get in Touch',
  description:
    'Contact Veniar support for product, merchant, and customer questions. Contact RewardsNow for partnerships and press.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-5">
            CONTACT
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-vn-ink leading-tight tracking-tight mb-4 max-w-2xl">
            Get in touch.
          </h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-7" />
          <p className="text-vn-muted text-lg leading-relaxed max-w-xl">
            For product, merchant, or customer questions — reach Veniar support. For
            partnerships, press, and company inquiries — contact RewardsNow directly.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="bg-rn-cloud border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-20 lg:py-24">
          <div className="grid md:grid-cols-2 gap-4">

            {/* Veniar support */}
            <div className="border border-black/[0.1] rounded-lg bg-white p-8">
              <div className="w-8 h-[3px] bg-vn-obi-teal mb-5" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-muted mb-3">
                VENIAR SUPPORT
              </p>
              <h2 className="text-xl font-black text-vn-ink mb-3 tracking-tight">
                Product, merchant, and customer questions.
              </h2>
              <p className="text-vn-muted text-sm leading-relaxed mb-6">
                For questions about the Veniar product, your merchant account, customer support,
                onboarding, pricing, and general product inquiries.
              </p>
              <div className="border-t border-black/[0.06] pt-5 space-y-3">
                <div>
                  <p className="text-vn-muted text-xs font-bold uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="text-vn-flight-blue font-bold text-sm hover:underline underline-offset-4"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-vn-muted text-xs font-bold uppercase tracking-widest mb-1">
                    Merchant applications
                  </p>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}?subject=Merchant%20Application%20%E2%80%94%20Veniar`}
                    className="text-vn-flight-blue text-sm hover:underline underline-offset-4"
                  >
                    Apply via email →
                  </a>
                </div>
              </div>
            </div>

            {/* RewardsNow */}
            <div className="border border-black/[0.1] rounded-lg bg-white p-8">
              <div className="w-8 h-[3px] bg-vn-sunset-gold mb-5" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-muted mb-3">
                REWARDSNOW
              </p>
              <h2 className="text-xl font-black text-vn-ink mb-3 tracking-tight">
                Partnerships, press, and company inquiries.
              </h2>
              <p className="text-vn-muted text-sm leading-relaxed mb-6">
                For partnership opportunities, co-branding inquiries, press, investor relations,
                and company-level questions. Veniar is a product of RewardsNow, Inc.
              </p>
              <div className="border-t border-black/[0.06] pt-5 space-y-3">
                <div>
                  <p className="text-vn-muted text-xs font-bold uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${COMPANY_SUPPORT_EMAIL}`}
                    className="text-vn-flight-blue font-bold text-sm hover:underline underline-offset-4"
                  >
                    {COMPANY_SUPPORT_EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-vn-muted text-xs font-bold uppercase tracking-widest mb-1">
                    Company
                  </p>
                  <p className="text-vn-muted text-sm">RewardsNow, Inc.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What to include */}
      <section className="bg-vn-ivory">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-sunset-gold mb-5">
            HELPFUL TIPS
          </p>
          <h2 className="text-2xl font-black text-vn-ink mb-8 tracking-tight">
            What to include in your message.
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                who: 'Merchant applications',
                items: ['Business name', 'Business type (restaurant, cafe, etc.)', 'Location / city', 'Contact name', 'Current loyalty setup (if any)'],
              },
              {
                who: 'Customer questions',
                items: ['Phone number on your account', 'The business location you visited', 'Description of the issue', 'Date of the transaction (if relevant)'],
              },
              {
                who: 'Partnership inquiries',
                items: ['Organization name', 'Type of partnership interest', 'Number of businesses in your network', 'Your role / contact info'],
              },
            ].map((section) => (
              <div key={section.who} className="border border-black/[0.1] rounded-lg bg-white p-5">
                <h3 className="font-bold text-vn-ink text-sm mb-3">{section.who}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-vn-obi-teal mt-1.5 shrink-0" />
                      <span className="text-vn-muted text-xs leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
