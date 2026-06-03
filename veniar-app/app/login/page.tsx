import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_URL, MERCHANT_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Log in to Veniar | Customer and Merchant Access',
  description: 'Log in to your Veniar customer account or merchant dashboard.',
};

export default function LoginPage() {
  return (
    <>
      <section className="bg-vn-ivory min-h-[calc(100vh-64px)] flex flex-col">
        <div className="max-w-5xl mx-auto w-full px-6 py-20 lg:py-28 flex-1 flex flex-col justify-center">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-vn-obi-teal mb-4">VENIAR</p>
            <h1 className="text-3xl lg:text-4xl font-black text-vn-ink tracking-tight mb-3">Log in to Veniar</h1>
            <p className="text-vn-muted text-base">Choose your account type to continue.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
            <div className="border border-black/[0.1] rounded-lg bg-white p-8 flex flex-col">
              <div className="w-8 h-[3px] bg-vn-obi-teal mb-5" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-muted mb-3">CUSTOMER</p>
              <h2 className="text-xl font-black text-vn-ink mb-3 tracking-tight">Customer account</h2>
              <p className="text-vn-muted text-sm leading-relaxed mb-7 flex-1">Access your Veniar Points balance, visit history, and rewards across all participating businesses.</p>
              <a href={APP_URL} className="block text-center px-5 py-3 text-sm font-bold text-vn-ink bg-vn-sunset-gold rounded hover:bg-[#d9a43f] transition-colors">Log in as customer →</a>
            </div>
            <div className="border border-black/[0.1] rounded-lg bg-white p-8 flex flex-col">
              <div className="w-8 h-[3px] bg-vn-flight-blue mb-5" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-vn-muted mb-3">MERCHANT</p>
              <h2 className="text-xl font-black text-vn-ink mb-3 tracking-tight">Merchant dashboard</h2>
              <p className="text-vn-muted text-sm leading-relaxed mb-7 flex-1">Access your merchant dashboard to manage points, view customers, run offers, and review settlement reports.</p>
              <a href={MERCHANT_URL} className="block text-center px-5 py-3 text-sm font-bold text-white bg-vn-flight-blue rounded hover:bg-[#094d92] transition-colors">Log in as merchant →</a>
            </div>
          </div>
          <div className="text-center mt-10 space-y-2">
            <p className="text-vn-muted text-sm">New to Veniar?{' '}<Link href="/join" className="text-vn-flight-blue font-semibold hover:underline underline-offset-4">Get started →</Link></p>
            <p className="text-vn-muted text-sm">Are you a staff member?{' '}<a href="/employee" className="text-vn-flight-blue font-semibold hover:underline underline-offset-4">Employee portal →</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
