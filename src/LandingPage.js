import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import AnimatedStripes from './AnimatedStripes';
import FadeInSection from './FadeInSection';

const LOGO_HEADER = process.env.PUBLIC_URL + '/logo514.png';
const LOGO_FOOTER = process.env.PUBLIC_URL + '/logo514.png';

const HOW_IT_WORKS = [
  { num: '01', title: 'Create a free account', desc: 'Sign up in under a minute with your name and email address.' },
  { num: '02', title: 'Earn Veniar Points locally', desc: 'Give your phone number at checkout at any participating Veniar business.' },
  { num: '03', title: 'Redeem across the network', desc: 'Spend your points at any Veniar partner — not just where you earned them.' },
];

const FEATURES = [
  {
    title: 'Earn on every local visit',
    desc: 'Collect Veniar Points when you visit participating restaurants, cafés, and local businesses.',
  },
  {
    title: 'Redeem across the network',
    desc: 'Your points work at every Veniar partner — one balance, the entire local network.',
  },
  {
    title: 'Discover nearby businesses',
    desc: 'Find participating restaurants, shops, cafés, and service providers near you.',
  },
  {
    title: 'Plan your next visit',
    desc: 'View menus, product offerings, maps, and directions from one convenient directory.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div style={s.root}>
      <div style={s.orb1} aria-hidden="true" />
      <div style={s.orb2} aria-hidden="true" />
      <div style={s.orb3} aria-hidden="true" />
      <AnimatedStripes count={7} />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <header style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <button
          style={s.brandBtn}
          onClick={() => navigate('/')}
          aria-label="Veniar — go to home"
        >
          <img src={LOGO_HEADER} alt="Veniar" style={{ height: '36px', width: 'auto', display: 'block' }} />
        </button>

        <nav style={s.navRight} aria-label="Site navigation">
          {!isMobile && (
            <button style={s.navBtn} onClick={() => navigate('/business-overview')}>For Businesses</button>
          )}
          <button style={s.navBtn} onClick={() => navigate('/signin')}>Sign in</button>
          <button style={s.navBtnPrimary} onClick={() => navigate('/register')}>Get started</button>
        </nav>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section
          style={{ ...s.hero, padding: isMobile ? '84px 24px 72px' : '120px 80px 96px' }}
          aria-label="Hero"
        >
          <FadeInSection delay={0}>
            <p style={s.eyebrow}>VENIAR™ — LOCAL REWARDS NETWORK</p>

            <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.8rem' : '4.6rem' }}>
              Shared rewards<br />for local favorites.
            </h1>

            <div style={s.goldBar} />

            <p style={{ ...s.heroSub, maxWidth: isMobile ? '100%' : '540px' }}>
              Earn Veniar Points when you visit participating restaurants, cafés, and local
              businesses. Redeem them anywhere in the Veniar Network.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '44px', alignItems: 'center' }}>
              <a href="#download" style={s.ctaPrimary} aria-label="Download the Veniar app">
                Get the app
              </a>
              <button
                style={s.ctaGhost}
                onClick={() => navigate('/business-overview')}
                aria-label="Learn about Veniar for Business"
              >
                For Businesses
              </button>
            </div>
          </FadeInSection>
        </section>

        {/* ── Hero badge ─────────────────────────────────────────────────── */}
        {!isMobile && (
          <FadeInSection delay={180}>
            <div style={s.heroBadgeRow} aria-hidden="true">
              <div style={s.heroBadgeCard}>
                <img src={LOGO_FOOTER} alt="Veniar" style={s.heroBadgeImg} />
                <p style={s.heroBadgeSub}>Local rewards. Every visit.</p>
              </div>
            </div>
          </FadeInSection>
        )}

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '88px 80px' }}>
          <FadeInSection>
            <div style={s.contentMax}>
              <p style={s.tag}>HOW IT WORKS</p>
              <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.6rem' }}>
                Shop local. Earn points.<br />Redeem anywhere.
              </h2>
              <div style={s.goldLine} />
              <div style={{ ...s.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr' }}>
                {HOW_IT_WORKS.map((step, i) => (
                  <FadeInSection key={step.num} delay={i * 80}>
                    <div style={s.stepCard}>
                      <span style={s.stepNum}>{step.num}</span>
                      <p style={s.stepTitle}>{step.title}</p>
                      <p style={s.stepDesc}>{step.desc}</p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
              <p style={{ ...s.body, marginTop: '32px' }}>
                Your Veniar Points aren't tied to one store — they work across every participating
                business in the Veniar Network.
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* ── Features ───────────────────────────────────────────────────── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 24px' : '88px 80px' }}>
          <FadeInSection>
            <div style={s.contentMax}>
              <p style={s.tag}>WHAT YOU GET</p>
              <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.6rem' }}>
                Everything in one app.
              </h2>
              <div style={s.goldLine} />
              <div style={{ ...s.featureGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                {FEATURES.map((f, i) => (
                  <FadeInSection key={f.title} delay={i * 80} style={s.featureCard}>
                    <p style={s.featureTitle}>{f.title}</p>
                    <p style={s.featureDesc}>{f.desc}</p>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* ── For Business Owners ────────────────────────────────────────── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '88px 80px' }}>
          <FadeInSection>
            <div style={s.contentMax}>
              <p style={s.tag}>VENIAR FOR BUSINESS</p>
              <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.6rem' }}>
                Loyalty works better when<br />local businesses are connected.
              </h2>
              <div style={s.goldLine} />
              <p style={s.body}>
                Veniar gives independent restaurants and local businesses a complete loyalty program,
                merchant dashboard, and access to a shared customer network — without the cost or
                complexity of building it alone.
              </p>
              <p style={s.body}>
                Customers who earn points at another Veniar business can redeem them with you.
                New foot traffic from the network, not just returning regulars.
              </p>
              <button style={s.bizCta} onClick={() => navigate('/business-overview')}>
                Learn about Veniar for Business →
              </button>
            </div>
          </FadeInSection>
        </section>

        {/* ── Download CTA ───────────────────────────────────────────────── */}
        <section
          id="download"
          style={{ ...s.ctaFooter, padding: isMobile ? '72px 24px 88px' : '96px 80px 112px', textAlign: 'center' }}
        >
          <FadeInSection>
            <img
              src={LOGO_FOOTER}
              alt="Veniar"
              style={{ ...s.footerLogo, width: isMobile ? '72px' : '88px' }}
            />

            <h2
              style={{
                ...s.h2,
                fontSize: isMobile ? '2rem' : '2.6rem',
                marginTop: '28px',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Download the free Veniar app today.
            </h2>

            <p style={{ ...s.body, maxWidth: '480px', margin: '16px auto 40px' }}>
              Start earning Veniar Points on everyday spending while supporting independent
              businesses in your community.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
              <a href="#download" style={s.ctaPrimary} aria-label="Download the Veniar app">
                Download Now
              </a>
              <button style={s.ctaGhost} onClick={() => navigate('/register')}>
                Create free account
              </button>
            </div>
          </FadeInSection>
        </section>
      </main>

      {/* ── Site Footer ────────────────────────────────────────────────── */}
      <footer style={{ ...s.siteFooter, padding: isMobile ? '28px 24px' : '28px 80px' }}>
        <div style={{ ...s.footerInner, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : '0' }}>
          <div style={s.footerLeft}>
            <p style={s.footerBrand}>Veniar</p>
            <p style={s.footerCredit}>Veniar is a product of RewardsNow.</p>
          </div>
          <nav
            style={{ ...s.footerLinks, flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}
            aria-label="Footer navigation"
          >
            <button style={s.footerLink} onClick={() => navigate('/business-overview')}>For Businesses</button>
            <button style={s.footerLink} onClick={() => navigate('/signin')}>Sign In</button>
            <button style={s.footerLink} onClick={() => navigate('/terms')}>Terms</button>
            <button style={s.footerLink} onClick={() => navigate('/privacy')}>Privacy</button>
          </nav>
        </div>
        <p style={{ ...s.footerCopy, textAlign: isMobile ? 'left' : 'right', marginTop: '12px' }}>
          © 2026 RewardsNow, Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// ── Styles — colors use CSS custom properties set by ThemeContext ───────────
const s = {
  root: {
    minHeight: '100vh',
    background: 'var(--rn-bg)',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },

  orb1: { position: 'fixed', top: '-120px', left: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'var(--rn-orb1)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' },
  orb2: { position: 'fixed', bottom: '-100px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--rn-orb2)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' },
  orb3: { position: 'fixed', top: '40%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--rn-orb3)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' },

  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    height: '64px', position: 'sticky', top: 0, zIndex: 100,
    background: 'var(--rn-nav-bg)',
    borderBottom: '1px solid var(--rn-nav-border)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
  },
  brandBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', lineHeight: 0 },
  navRight: { display: 'flex', gap: '8px', alignItems: 'center' },
  navBtn: {
    padding: '8px 16px', background: 'transparent',
    border: '1px solid var(--rn-nav-btn-border)',
    color: 'var(--rn-nav-btn-color)',
    borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  navBtnPrimary: {
    padding: '8px 18px',
    background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)',
    border: 'none', color: '#0f172a', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
    cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 2px 12px rgba(245,158,11,0.35)',
  },

  hero: { position: 'relative', zIndex: 1 },
  eyebrow: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 20px', textTransform: 'uppercase' },
  heroTitle: { color: 'var(--rn-text)', fontWeight: '900', lineHeight: 1.05, letterSpacing: '-0.035em', margin: '0 0 24px' },
  goldBar: { width: '56px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', borderRadius: '2px', marginBottom: '24px' },
  heroSub: { color: 'var(--rn-text-sub)', fontSize: '17px', lineHeight: 1.75, margin: '0 0 4px' },

  ctaPrimary: {
    display: 'inline-block', padding: '14px 32px',
    background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)',
    border: 'none', color: '#0f172a', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
    cursor: 'pointer', boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
    fontFamily: 'inherit', textDecoration: 'none', lineHeight: 1,
  },
  ctaGhost: {
    padding: '14px 28px', background: 'transparent',
    border: '1.5px solid var(--rn-ghost-border)',
    color: 'var(--rn-ghost-color)',
    borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1,
  },

  heroBadgeRow: { position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'flex-start', padding: '0 80px 64px' },
  heroBadgeCard: {
    display: 'flex', alignItems: 'center', gap: '16px',
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderRadius: '16px', padding: '18px 24px',
  },
  heroBadgeImg: { width: '48px', height: '48px', objectFit: 'contain' },
  heroBadgeSub: { color: 'var(--rn-text-muted)', fontSize: '12px', margin: 0 },

  section: { position: 'relative', zIndex: 1 },
  sectionAlt: {
    position: 'relative', zIndex: 1,
    background: 'var(--rn-section-alt)',
    borderTop: '1px solid var(--rn-section-border)',
    borderBottom: '1px solid var(--rn-section-border)',
  },
  ctaFooter: { position: 'relative', zIndex: 1 },
  contentMax: { maxWidth: '880px' },

  tag: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 14px', textTransform: 'uppercase' },
  h2: { color: 'var(--rn-text)', fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px' },
  goldLine: { width: '40px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', borderRadius: '2px', marginBottom: '36px' },
  body: { color: 'var(--rn-text-sub)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px' },

  stepsGrid: { display: 'grid', gap: '16px', marginBottom: '8px' },
  stepCard: {
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderRadius: '14px', padding: '28px 24px',
  },
  stepNum: { color: '#f59e0b', fontSize: '11px', fontWeight: '800', letterSpacing: '3px', display: 'block', marginBottom: '12px' },
  stepTitle: { color: 'var(--rn-text)', fontSize: '16px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.01em' },
  stepDesc: { color: 'var(--rn-text-muted)', fontSize: '14px', lineHeight: 1.65, margin: 0 },

  featureGrid: { display: 'grid', gap: '16px', marginTop: '40px' },
  featureCard: {
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderRadius: '14px', padding: '26px 22px',
  },
  featureTitle: { color: 'var(--rn-text)', fontSize: '15px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.01em' },
  featureDesc: { color: 'var(--rn-text-muted)', fontSize: '13px', lineHeight: 1.65, margin: 0 },

  bizCta: {
    marginTop: '12px', display: 'inline-flex', alignItems: 'center',
    padding: '13px 24px', borderRadius: '10px',
    border: '1.5px solid var(--rn-ghost-border)',
    background: 'transparent',
    color: 'var(--rn-ghost-color)',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },

  footerLogo: { height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto', opacity: 0.92 },

  siteFooter: {
    position: 'relative', zIndex: 1,
    borderTop: '1px solid var(--rn-section-border)',
    background: 'var(--rn-section-alt)',
  },
  footerInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  footerLeft: {},
  footerBrand: { color: 'var(--rn-text)', fontSize: '14px', fontWeight: '800', margin: '0 0 4px', letterSpacing: '-0.01em' },
  footerCredit: { color: 'var(--rn-text-muted)', fontSize: '12px', margin: 0, lineHeight: 1.5 },
  footerLinks: { display: 'flex', gap: '4px', alignItems: 'center' },
  footerLink: {
    background: 'none', border: 'none', color: 'var(--rn-text-sub)',
    fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit',
    padding: '4px 8px', borderRadius: '6px',
  },
  footerCopy: { color: 'var(--rn-text-faint)', fontSize: '11px', margin: 0 },
};
