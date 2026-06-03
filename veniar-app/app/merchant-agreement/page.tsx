import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Merchant Agreement | Veniar',
  description: 'Veniar Merchant Agreement — terms for businesses participating in the Veniar Network.',
};

export default function MerchantAgreementPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-4">
            LEGAL
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-vn-ink tracking-tight mb-3">
            Merchant Agreement
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
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">1. Agreement Overview</h2>
              <p>
                This Merchant Agreement (&quot;Agreement&quot;) governs the relationship between
                RewardsNow, Inc. (&quot;RewardsNow&quot;) and any business (&quot;Merchant&quot;) approved to
                participate in the Veniar Network. By completing onboarding and accessing the
                Veniar merchant tools, the Merchant agrees to be bound by this Agreement.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">2. Veniar Network Participation</h2>
              <p>
                Approved Merchants are enrolled in the Veniar Network and may issue and accept
                Veniar Points for customer transactions. Network participation is subject to
                ongoing compliance with this Agreement and the Veniar Terms of Service.
              </p>
              <p className="mt-3">
                RewardsNow reserves the right to approve or deny merchant applications at its
                discretion and to suspend or terminate a Merchant&apos;s network participation for
                violations of this Agreement.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">3. Merchant Obligations</h2>
              <p>Merchants agree to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Operate the Veniar employee portal honestly and in accordance with configured point values</li>
                <li>Not manipulate point issuances or redemptions for fraudulent purposes</li>
                <li>Maintain the confidentiality of merchant dashboard credentials</li>
                <li>Accept valid Veniar Point redemptions from customers in accordance with their configured values</li>
                <li>Maintain accurate business profile information in the dashboard</li>
                <li>Notify RewardsNow promptly of any suspected fraud or account misuse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">4. Points Issuance and Redemption</h2>
              <p>
                Merchants issue Veniar Points to customers through the employee portal at the
                point values configured during onboarding. Merchants may update point values
                through the dashboard. Point value changes take effect for future transactions
                only.
              </p>
              <p className="mt-3">
                Merchants are required to honor valid Veniar Point redemptions from customers,
                including points earned at other network partners, in accordance with their
                configured redemption rates.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">5. Network Settlement</h2>
              <p>
                Veniar tracks points issued and redeemed by each Merchant, including cross-network
                redemptions (points earned at one Merchant and redeemed at another). Monthly
                settlement reports are provided to each Merchant. Settlement terms, if applicable,
                are specified in the Merchant&apos;s onboarding documentation.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">6. Fees and Billing</h2>
              <p>
                Fees for Veniar Network participation are as specified in the Merchant&apos;s
                onboarding documentation and may be updated by RewardsNow with 30 days&apos;
                written notice. No fees are payable until the Merchant has been notified of
                applicable pricing and has confirmed participation.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">7. Merchant Data</h2>
              <p>
                Merchants retain ownership of their business data, including customer transaction
                records and point activity data accessible through the dashboard. RewardsNow
                may use aggregate, anonymized data from merchant activity to operate and improve
                the Veniar platform.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">8. Term and Termination</h2>
              <p>
                This Agreement is effective upon merchant onboarding and continues month-to-month
                unless terminated. Either party may terminate this Agreement with 30 days&apos;
                written notice. RewardsNow may terminate immediately for breach of this
                Agreement, fraud, or violation of law.
              </p>
              <p className="mt-3">
                Upon termination, Merchant access to the dashboard and employee portal will
                be disabled. Accumulated customer points data will be retained per the
                Veniar Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">9. Limitation of Liability</h2>
              <p>
                REWARDSNOW&apos;S LIABILITY TO ANY MERCHANT SHALL NOT EXCEED THE FEES PAID BY
                THE MERCHANT TO REWARDSNOW IN THE THREE MONTHS PRECEDING THE CLAIM.
                REWARDSNOW SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
                DAMAGES.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">10. Modifications</h2>
              <p>
                RewardsNow may modify this Agreement at any time with 14 days&apos; written notice
                to the Merchant. Continued participation in the Veniar Network after the
                effective date of modifications constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">11. Governing Law</h2>
              <p>
                This Agreement shall be governed by the laws of the State of Delaware.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">12. Contact</h2>
              <p>
                For questions about this Agreement, contact us at{' '}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-vn-flight-blue hover:underline underline-offset-4"
                >
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Legal nav */}
      <section className="bg-vn-ivory">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap gap-6 text-sm">
          <Link href="/terms" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Terms of Service</Link>
          <Link href="/privacy" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Privacy Policy</Link>
          <Link href="/rewards-terms" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Rewards Terms</Link>
        </div>
      </section>
    </>
  );
}
