import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms of Service | Veniar',
  description: 'Veniar Terms of Service — read our terms before using the Veniar platform.',
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-vn-ivory border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-4">
            LEGAL
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-vn-ink tracking-tight mb-3">
            Terms of Service
          </h1>
          <div className="w-10 h-[3px] bg-vn-obi-teal mb-5" />
          <p className="text-vn-muted text-sm">
            Effective date: January 1, 2026. Last updated: January 1, 2026.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20 prose prose-sm max-w-none">
          <div className="space-y-10 text-vn-muted leading-relaxed text-sm">

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">1. Agreement to Terms</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your use of the Veniar platform, including
                the Veniar website at veniar.com, the Veniar customer application, and all
                associated services (collectively, the &quot;Service&quot;). The Service is operated by
                RewardsNow, Inc. (&quot;RewardsNow,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              </p>
              <p className="mt-3">
                By accessing or using the Service, you agree to be bound by these Terms. If you
                do not agree to these Terms, do not use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">2. Description of Service</h2>
              <p>
                Veniar is a shared loyalty rewards platform operated by RewardsNow, Inc. that
                connects participating independent businesses (&quot;Merchants&quot;) with their customers.
                Customers may earn and redeem Veniar Points at participating Merchant locations.
                Merchants access merchant tools, reporting, and offers through the Veniar
                merchant dashboard and employee portal.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">3. Customer Accounts</h2>
              <p>
                Customers may create a Veniar account by providing a valid phone number at a
                participating Merchant location or through the Veniar application. You are
                responsible for maintaining the security of your account. You must notify us
                immediately of any unauthorized use of your account.
              </p>
              <p className="mt-3">
                You must be at least 13 years of age to create a Veniar customer account.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">4. Merchant Accounts</h2>
              <p>
                Merchants who apply to join the Veniar Network and are approved by RewardsNow
                may access merchant tools subject to the Veniar Merchant Agreement. Merchant
                access is conditional on ongoing compliance with the Merchant Agreement and
                these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">5. Veniar Points</h2>
              <p>
                Veniar Points are promotional rewards issued by participating Merchants through
                the Veniar platform. Veniar Points are not cash, currency, stored value, or
                transferable money. They have no monetary value and cannot be exchanged for cash.
                Veniar Points are subject to the{' '}
                <Link href="/rewards-terms" className="text-vn-flight-blue hover:underline underline-offset-4">
                  Veniar Rewards Terms
                </Link>
                {' '}and participating Merchant rules.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">6. Prohibited Uses</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Use the Service for any unlawful purpose or in violation of any regulations</li>
                <li>Attempt to manipulate, hack, or circumvent the points system</li>
                <li>Create false or fraudulent accounts</li>
                <li>Resell, transfer, or commercially exploit your Veniar account</li>
                <li>Interfere with the operation of the Service or any other user&apos;s access</li>
                <li>Collect or harvest user data from the Service without authorization</li>
              </ul>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">7. Intellectual Property</h2>
              <p>
                The Veniar name, logo, and all content on the Veniar platform are owned by
                RewardsNow, Inc. or its licensors. Nothing in these Terms grants you any right
                to use RewardsNow&apos;s trademarks, trade names, service marks, or logos without
                prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">8. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
                KIND, EXPRESS OR IMPLIED. REWARDSNOW DOES NOT WARRANT THAT THE SERVICE WILL BE
                UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">9. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, REWARDSNOW SHALL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM
                YOUR USE OF, OR INABILITY TO USE, THE SERVICE.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">10. Modifications to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify users of material
                changes by posting the updated Terms on this page with a new effective date.
                Continued use of the Service after changes constitutes acceptance of the
                updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">11. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of the State of Delaware, without
                regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-vn-ink font-black text-lg mb-3 tracking-tight">12. Contact</h2>
              <p>
                For questions about these Terms, contact us at{' '}
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
          <Link href="/privacy" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Privacy Policy</Link>
          <Link href="/merchant-agreement" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Merchant Agreement</Link>
          <Link href="/rewards-terms" className="text-vn-flight-blue hover:underline underline-offset-4 font-semibold">Rewards Terms</Link>
        </div>
      </section>
    </>
  );
}
