import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Rewards Terms | Veniar Points',
  description:
    'Veniar Rewards Terms — rules governing Veniar Points, how they are earned, redeemed, and the limitations that apply.',
};

export default function RewardsTermsPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-4">
            LEGAL
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-vn-ink tracking-tight mb-3">
            Veniar Rewards Terms
          </h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-5" />
          <p className="text-vn-muted text-sm">
            Effective date: January 1, 2026. Last updated: January 1, 2026.
          </p>

          {/* Key disclaimer callout */}
          <div className="mt-8 border border-vn-obi-teal/30 bg-vn-obi-teal/[0.04] rounded-lg p-5 max-w-2xl">
            <p className="text-vn-ink text-sm leading-relaxed">
              <strong className="font-bold">Important: </strong>
              Veniar Points are promotional rewards. They are not cash, currency, stored value,
              or transferable money. Veniar Points have no monetary value and cannot be
              exchanged for cash.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
          <div className="space-y-10 text-vn-muted leading-relaxed text-sm">

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">1. What Are Veniar Points</h2>
              <p>
                Veniar Points are promotional rewards issued by participating Merchants
                (&quot;Partners&quot;) through the Veniar platform, operated by RewardsNow, Inc.
                Veniar Points are not cash, currency, stored value, cryptocurrency, or
                transferable money. They have no monetary value and cannot be exchanged for
                cash at any time.
              </p>
              <p className="mt-3">
                Veniar Points are a feature of the Veniar loyalty program. They may be earned
                and redeemed only in accordance with these Rewards Terms.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">2. Earning Veniar Points</h2>
              <p>
                Customers may earn Veniar Points at any participating Veniar Partner location
                by providing their registered phone number at the point of transaction. Points
                are issued at the rate configured by the individual Partner for that transaction
                type.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Point earn rates are set by each Partner and may vary by service or product type.</li>
                <li>Partners may run limited-time bonus point promotions at their discretion.</li>
                <li>Points are credited to your account at the time of the transaction.</li>
                <li>Earning rates are subject to change by Partners at any time.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">3. Redeeming Veniar Points</h2>
              <p>
                Veniar Points may be redeemed at any participating Veniar Partner location,
                including Partners where the Points were not originally earned. Redemption
                rates are set by each Partner and may differ from earn rates.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Redemption requires the customer to provide their registered phone number at checkout.</li>
                <li>A minimum point balance may be required by some Partners for redemption.</li>
                <li>Redeemed points are immediately deducted from your account balance.</li>
                <li>Redemptions cannot be reversed once confirmed.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">4. Point Expiration</h2>
              <p>
                Veniar Points expire after 12 months of account inactivity. An account is
                considered active if any earning or redemption transaction has occurred within
                the prior 12 months. RewardsNow reserves the right to adjust the expiration
                period with 30 days&apos; notice to affected account holders.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">5. Account Limitations</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Veniar Points are non-transferable and may not be sold, gifted, or assigned to another account.</li>
                <li>Points may only be earned and redeemed by the registered account holder.</li>
                <li>One account per phone number is permitted.</li>
                <li>RewardsNow reserves the right to limit point accumulations on individual accounts.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">6. Program Modifications and Termination</h2>
              <p>
                RewardsNow reserves the right to modify, suspend, or terminate the Veniar
                Points program, or any aspect of it, at any time with reasonable notice where
                practicable. RewardsNow may cancel accumulated points upon program termination.
              </p>
              <p className="mt-3">
                Individual Partners may leave the Veniar Network at any time. Points earned at
                a Partner that has left the network may still be redeemable at other active
                network Partners, subject to these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">7. Fraud and Abuse</h2>
              <p>
                Any fraudulent, abusive, or unauthorized use of Veniar Points — including
                manipulation of point balances, fraudulent transactions, or account
                misrepresentation — may result in immediate account suspension, forfeiture of
                all accumulated Points, and permanent removal from the Veniar program.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">8. No Cash Value</h2>
              <p>
                Veniar Points are not redeemable for cash under any circumstances. They are
                not a stored-value product, prepaid card, or financial instrument of any kind.
                Veniar Points are subject to no regulatory requirements applicable to
                monetary instruments.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">9. Governing Terms</h2>
              <p>
                These Rewards Terms are incorporated into and subject to the{' '}
                <Link href="/terms" className="text-vn-flight-blue hover:underline underline-offset-4">
                  Veniar Terms of Service
                </Link>
                . In the event of a conflict, the Terms of Service govern. Participation in the
                Veniar Points program constitutes acceptance of these Rewards Terms.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">10. Contact</h2>
              <p>
                For questions about Veniar Points or these Rewards Terms, contact us at{' '}
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
          <Link href="/merchant-agreement" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Merchant Agreement</Link>
        </div>
      </section>
    </>
  );
}
