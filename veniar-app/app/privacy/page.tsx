import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy | Veniar',
  description: 'Veniar Privacy Policy — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-4">LEGAL</p>
          <h1 className="text-3xl lg:text-4xl font-black text-vn-ink tracking-tight mb-3">Privacy Policy</h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-5" />
          <p className="text-vn-muted text-sm">Effective date: January 1, 2026. Last updated: January 1, 2026.</p>
        </div>
      </section>
      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
          <div className="space-y-10 text-vn-muted leading-relaxed text-sm">
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">1. Introduction</h2><p>RewardsNow, Inc. operates the Veniar platform. This Privacy Policy describes how we collect, use, share, and protect information about users of the Veniar service.</p></div>
            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">2. Information We Collect</h2>
              <h3 className="text-vn-ink font-bold text-sm mb-2 mt-4">Customer information</h3>
              <ul className="list-disc pl-5 space-y-1.5"><li>Phone number (used to identify your account at checkout)</li><li>Email address (if provided)</li><li>Transaction data — points earned, redeemed, and visit history</li><li>Device and usage data when using the Veniar app</li></ul>
              <h3 className="text-vn-ink font-bold text-sm mb-2 mt-4">Merchant information</h3>
              <ul className="list-disc pl-5 space-y-1.5"><li>Business name, address, and contact information</li><li>Account credentials for dashboard access</li><li>Transaction records</li></ul>
            </div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">3. How We Use Information</h2><p>We use collected information to operate the Veniar rewards platform, process points transactions, provide merchant reporting, send service communications, and improve the product.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">4. Information Sharing</h2><p>We do not sell your personal information. Customer phone number, points balance, and visit history are shared with Merchants at point of transaction to operate the rewards program. We may share with service providers under confidentiality obligations.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">5. Data Retention</h2><p>We retain customer account data for as long as your account is active. Transaction records are retained for at least 24 months for merchant settlement purposes. You may request deletion by contacting support.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">6. Security</h2><p>We implement technical and organizational measures to protect your information. No method of transmission or storage is completely secure.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">7. Children</h2><p>The Service is not directed to children under 13. We do not knowingly collect personal information from children under 13.</p></div>
            <div><h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">8. Contact</h2><p>For privacy questions, contact us at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-vn-flight-blue hover:underline underline-offset-4">{SUPPORT_EMAIL}</a>.</p></div>
          </div>
        </div>
      </section>
      <section className="bg-vn-ivory">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap gap-6 text-sm">
          <Link href="/terms" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Terms of Service</Link>
          <Link href="/merchant-agreement" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Merchant Agreement</Link>
          <Link href="/rewards-terms" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Rewards Terms</Link>
        </div>
      </section>
    </>
  );
}
