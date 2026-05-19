import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import AnimatedStripes from './AnimatedStripes';
import FadeInSection from './FadeInSection';

const LOGO_HEADER = process.env.PUBLIC_URL + '/logo514.png';
const LOGO_CARD   = process.env.PUBLIC_URL + '/logo514.png';
const LOGO_FOOTER = process.env.PUBLIC_URL + '/logo514.png';

const FEATURES = [
  {
    title: 'Earn on everyday purchases',
    desc: 'Collect RewardsNow™ points when you shop with participating local businesses.',
  },
  {
    title: 'Redeem locally',
    desc: 'Use your points at participating RewardsNow™ independent businesses — not just where you earned them.',
  },
  {
    title: 'Discover nearby businesses',
    desc: 'Find participating restaurants, shops, cafés, and service providers in the app.',
  },
  {
    title: 'Plan your visit',
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
          aria-label="RewardsNow™ — go to home"
        >
          <img src={LOGO_HEADER} alt="RewardsNow™" style={{ height: '36px', width: 'auto', display: 'block' }} />
        </button>

        <nav style={s.navRight} aria-label="Site navigation">
          <button style={s.navBtn} onClick={() => navigate('/signin')}>Sign in</button>
          <button style={s.navBtnPrimary} onClick={() => navigate('/register')}>Get started</button>
        </nav>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section
          style={{ ...s.hero, padding: isMobile ? '72px 24px 64px' : '110px 80px 88px' }}
          aria-label="Hero"
        >
          <FadeInSection delay={0}>
            <p style={s.eyebrow}>LOCAL REWARDS NETWORK</p>

            <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.5rem' : '4.2rem' }}>
              Earn rewards while<br />supporting local businesses.
            </h1>

            <div style={s.goldBar} />

            <p style={{ ...s.heroSub, maxWidth: isMobile ? '100%' : '520px' }}>
              RewardsNow™ helps you earn points when you shop at participating independent
              businesses in your community.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '40px', alignItems: 'center' }}>
              <a href="#download" style={s.ctaPrimary} aria-label="Download the RewardsNow™ app">
                Download App
              </a>
              <button
                style={s.ctaGhost}
                onClick={() => navigate('/business-overview')}
                aria-label="Learn about partnering your business with RewardsNow™"
              >
                For Business Owners
              </button>
            </div>
          </FadeInSection>
        </section>

        {/* ── Hero logo panel ────────────────────────────────────────────── */}
        {!isMobile && (
          <FadeInSection delay={180}>
            <div style={s.heroBadgeRow} aria-hidden="true">
              <div style={s.heroBadgeCard}>
                <img src={LOGO_CARD} alt="RewardsNow™" style={s.heroBadgeImg} />
                <p style={s.heroBadgeSub}>Community rewards, simplified.</p>
              </div>
            </div>
          </FadeInSection>
        )}

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '80px 80px' }}>
          <FadeInSection>
            <div style={s.contentMax}>
              <p style={s.tag}>HOW IT WORKS</p>
              <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.5rem' }}>
                Shop local. Earn points. Redeem anywhere.
              </h2>
              <div style={s.goldLine} />
              <p style={s.body}>
                Buy a slice at your favorite local pizzeria and earn RewardsNow™ points. Later,
                redeem those points for ice cream, coffee, lunch, or other everyday purchases at
                participating RewardsNow™ businesses.
              </p>
              <p style={s.body}>
                Your points aren't tied to one store — they work across every participating business
                in the RewardsNow™ network.
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* ── Features ───────────────────────────────────────────────────── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 24px' : '80px 80px' }}>
          <FadeInSection>
            <div style={s.contentMax}>
              <p style={s.tag}>WHAT YOU GET</p>
              <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.5rem' }}>
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

        {/* ── Directory callout ──────────────────────────────────────────── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '80px 80px' }}>
          <FadeInSection>
          <div style={s.contentMax}>
            <p style={s.tag}>THE DIRECTORY</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.5rem' }}>
              Not sure where to use your points?
            </h2>
            <div style={s.goldLine} />
            <p style={s.body}>
              The RewardsNow™ app includes a directory of participating businesses so you can
              easily find places near you — restaurants, cafés, shops, and local service providers,
              all in one place.
            </p>
          </div>
          </FadeInSection>
        </section>

        {/* ── Footer CTA ─────────────────────────────────────────────────── */}
        <section
          style={{ ...s.ctaFooter, padding: isMobile ? '64px 24px 80px' : '88px 80px 100px', textAlign: 'center' }}
        >
          <FadeInSection>
          <img
            src={LOGO_FOOTER}
            alt="RewardsNow™"
            style={{ ...s.footerLogo, width: isMobile ? '72px' : '88px' }}
          />

          <h2
            style={{
              ...s.h2,
              fontSize: isMobile ? '1.9rem' : '2.4rem',
              marginTop: '24px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Download the free RewardsNow™ app today.
          </h2>

          <p style={{ ...s.body, maxWidth: '480px', margin: '16px auto 36px' }}>
            Start earning points on everyday spending while supporting independent businesses
            in your community.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#download" style={s.ctaPrimary} aria-label="Download the free RewardsNow™ app">
              Download Now
            </a>
          </div>

          <button
            style={s.ctaBiz}
            onClick={() => navigate('/business-overview')}
            aria-label="Learn how to join RewardsNow™ as a business owner"
          >
            Business owner? Learn how to join RewardsNow™.
          </button>
          </FadeInSection>
        </section>
      </main>
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
  heroTitle: { color: 'var(--rn-text)', fontWeight: '900', lineHeight: 1.06, letterSpacing: '-0.03em', margin: '0 0 24px' },
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
  ctaBiz: {
    marginTop: '24px', display: 'inline-block', background: 'none', border: 'none',
    color: 'var(--rn-text-faint)',
    fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: 0,
    fontFamily: 'inherit', textDecoration: 'underline',
    textDecorationColor: 'var(--rn-text-faint)',
    textUnderlineOffset: '3px',
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
  contentMax: { maxWidth: '860px' },

  tag: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 14px', textTransform: 'uppercase' },
  h2: { color: 'var(--rn-text)', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' },
  goldLine: { width: '40px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', borderRadius: '2px', marginBottom: '28px' },
  body: { color: 'var(--rn-text-sub)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px' },

  featureGrid: { display: 'grid', gap: '16px', marginTop: '40px' },
  featureCard: {
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderRadius: '14px', padding: '24px 22px',
  },
  featureTitle: { color: 'var(--rn-text)', fontSize: '15px', fontWeight: '700', margin: '0 0 8px' },
  featureDesc: { color: 'var(--rn-text-muted)', fontSize: '13px', lineHeight: 1.65, margin: 0 },

  footerLogo: { height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto', opacity: 0.92 },
};
