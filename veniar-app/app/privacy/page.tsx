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
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-4">
            LEGAL
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-vn-ink tracking-tight mb-3">
            Privacy Policy
          </h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-5" />
          <p className="text-vn-muted text-sm">
            Effective date: January 1, 2026. Last updated: January 1, 2026.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
          <div className="space-y-10 text-vn-muted leading-relaxed text-sm">

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">1. Introduction</h2>
              <p>
                RewardsNow, Inc. (&quot;RewardsNow,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Veniar platform.
                This Privacy Policy describes how we collect, use, share, and protect information
                about users of the Veniar service (&quot;Service&quot;), including customers and merchants.
              </p>
              <p className="mt-3">
                By using the Service, you consent to the collection and use of information as
                described in this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">2. Information We Collect</h2>

              <h3 className="text-vn-ink font-bold text-sm mb-2 mt-5">Customer information</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Phone number (used to identify your account at checkout)</li>
                <li>Email address (if provided for account notifications)</li>
                <li>Transaction data — points earned, redeemed, and visit history</li>
                <li>Device and usage data when using the Veniar app</li>
              </ul>

              <h3 className="text-vn-ink font-bold text-sm mb-2 mt-5">Merchant information</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Business name, address, and contact information</li>
                <li>Account credentials for dashboard and employee portal access</li>
                <li>Transaction records — points issued and redeemed by your customers</li>
                <li>Offer and promotion configuration data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">3. How We Use Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Operate and maintain the Veniar rewards platform</li>
                <li>Process points issuances and redemptions</li>
                <li>Provide merchants with reporting on loyalty activity</li>
                <li>Send service communications related to your account</li>
                <li>Improve the Veniar product and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">4. Information Sharing</h2>
              <p>
                We do not sell your personal information to third parties. We may share
                information in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>
                  <strong className="text-vn-ink">With participating merchants:</strong> Customer
                  phone number, points balance, and visit history are shared with Merchants at
                  point of transaction to operate the rewards program.
                </li>
                <li>
                  <strong className="text-vn-ink">Service providers:</strong> We work with
                  third-party providers who assist in operating our infrastructure. They are
                  bound by confidentiality obligations.
                </li>
                <li>
                  <strong className="text-vn-ink">Legal requirements:</strong> We may disclose
                  information if required by law or in response to valid legal process.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">5. Data Retention</h2>
              <p>
                We retain customer account data for as long as your account is active or as
                needed to provide the Service. Transaction records are retained for at least
                24 months for merchant settlement purposes. You may request deletion of your
                account by contacting support.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">6. Security</h2>
              <p>
                We implement technical and organizational measures to protect your information
                against unauthorized access, loss, and misuse. No method of transmission or
                storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">7. Your Rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, or
                delete personal information we hold about you. To exercise these rights, contact
                us at the email address below.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">8. Children</h2>
              <p>
                The Service is not directed to children under 13. We do not knowingly collect
                personal information from children under 13. If we become aware that a child
                under 13 has provided us personal information, we will delete it.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify users of material
                changes by updating the effective date above. Continued use of the Service
                constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">10. Contact</h2>
              <p>
                For privacy questions, contact us at{' '}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-vn-flight-blue hover:underline underline-offset-4"
                >
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
              <p className="mt-2">
                RewardsNow, Inc. is the data controller for information collected through the
                Veniar platform.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Legal nav */}
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
