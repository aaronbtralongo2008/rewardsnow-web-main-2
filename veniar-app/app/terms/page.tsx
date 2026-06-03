import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms of Service | Veniar',
  description: 'Veniar Terms of Service.',
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-4">LEGAL</p>
          <h1 className="text-3xl lg:text-4xl font-black text-vn-ink tracking-tight mb-3">Terms of Service</h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-5" />
          <p className="text-vn-muted text-sm">Effective date: January 1, 2026. Last updated: January 1, 2026.</p>
        </div>
      </section>
      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
          <div className="space-y-10 text-vn-muted leading-relaxed text-sm">
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">1. Agreement to Terms</h2><p>These Terms of Service govern your use of the Veniar platform, operated by RewardsNow, Inc. By accessing or using the Service, you agree to be bound by these Terms.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">2. Description of Service</h2><p>Veniar is a shared loyalty rewards platform operated by RewardsNow, Inc. that connects participating independent businesses with their customers. Customers may earn and redeem Veniar Points at participating Merchant locations.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">3. Customer Accounts</h2><p>Customers may create a Veniar account by providing a valid phone number at a participating Merchant location or through the Veniar application. You must be at least 13 years of age to create a Veniar customer account.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">4. Merchant Accounts</h2><p>Merchants who apply to join the Veniar Network and are approved by RewardsNow may access merchant tools subject to the Veniar Merchant Agreement.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">5. Veniar Points</h2><p>Veniar Points are promotional rewards issued by participating Merchants. Veniar Points are not cash, currency, stored value, or transferable money. They are subject to the <Link href="/rewards-terms" className="text-vn-flight-blue hover:underline underline-offset-4">Veniar Rewards Terms</Link> and participating Merchant rules.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">6. Prohibited Uses</h2><p>You agree not to use the Service for any unlawful purpose, manipulate the points system, create fraudulent accounts, or interfere with the operation of the Service.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">7. Intellectual Property</h2><p>The Veniar name, logo, and all content on the Veniar platform are owned by RewardsNow, Inc. or its licensors.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">8. Disclaimer of Warranties</h2><p>THE SERVICE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. REWARDSNOW DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">9. Limitation of Liability</h2><p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, REWARDSNOW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">10. Governing Law</h2><p>These Terms shall be governed by the laws of the State of Delaware.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">11. Contact</h2><p>For questions, contact us at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-vn-flight-blue hover:underline underline-offset-4">{SUPPORT_EMAIL}</a>.</p></div>
          </div>
        </div>
      </section>
      <section className="bg-vn-ivory">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap gap-6 text-sm">
          <Link href="/privacy" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Privacy Policy</Link>
          <Link href="/merchant-agreement" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Merchant Agreement</Link>
          <Link href="/rewards-terms" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Rewards Terms</Link>
        </div>
      </section>
    </>
  );
}
