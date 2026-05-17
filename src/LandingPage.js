import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';

// ── Logo paths (update these if you move or rename the files) ──────────────
const LOGO_HEADER = process.env.PUBLIC_URL + '/logo512.png'; // top navigation
const LOGO_CARD   = process.env.PUBLIC_URL + '/logo192.png'; // hero badge card
const LOGO_FOOTER = process.env.PUBLIC_URL + '/logo512.png'; // footer CTA section

// ── Feature cards ──────────────────────────────────────────────────────────
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
      {/* Decorative background orbs — purely visual */}
      <div style={s.orb1} aria-hidden="true" />
      <div style={s.orb2} aria-hidden="true" />
      <div style={s.orb3} aria-hidden="true" />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <header style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <button
          style={s.brandBtn}
          onClick={() => navigate('/')}
          aria-label="RewardsNow™ — go to home"
        >
          <img
            src={LOGO_HEADER}
            alt="RewardsNow™"
            style={{ height: '36px', width: 'auto', display: 'block' }}
          />
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
          <p style={s.eyebrow}>LOCAL REWARDS NETWORK</p>

          <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.5rem' : '4.2rem' }}>
            Earn rewards while<br />supporting local businesses.
          </h1>

          <div style={s.goldBar} />

          <p style={{ ...s.heroSub, maxWidth: isMobile ? '100%' : '520px' }}>
            RewardsNow™ helps you earn points when you shop at participating independent
            businesses in your community.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '40px' }}>
            {/* TODO: replace href="#download" with your App Store / Google Play links */}
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
        </section>

        {/* ── Hero logo panel ────────────────────────────────────────────── */}
        {!isMobile && (
          <div style={s.heroBadgeRow} aria-hidden="true">
            <div style={s.heroBadgeCard}>
              <img src={LOGO_CARD} alt="RewardsNow™" style={s.heroBadgeImg} />
              <p style={s.heroBadgeSub}>Community rewards, simplified.</p>
            </div>
          </div>
        )}

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '80px 80px' }}>
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
        </section>

        {/* ── Features ───────────────────────────────────────────────────── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 24px' : '80px 80px' }}>
          <div style={s.contentMax}>
            <p style={s.tag}>WHAT YOU GET</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.5rem' }}>
              Everything in one app.
            </h2>
            <div style={s.goldLine} />
            <div
              style={{
                ...s.featureGrid,
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              }}
            >
              {FEATURES.map(f => (
                <div key={f.title} style={s.featureCard}>
                  <p style={s.featureTitle}>{f.title}</p>
                  <p style={s.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Directory callout ──────────────────────────────────────────── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '80px 80px' }}>
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
        </section>

        {/* ── Footer CTA ─────────────────────────────────────────────────── */}
        <section
          style={{
            ...s.ctaFooter,
            padding: isMobile ? '64px 24px 80px' : '88px 80px 100px',
            textAlign: 'center',
          }}
        >
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

          <p
            style={{
              ...s.body,
              maxWidth: '480px',
              margin: '16px auto 36px',
            }}
          >
            Start earning points on everyday spending while supporting independent businesses
            in your community.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* TODO: replace href="#download" with your App Store / Google Play links */}
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
        </section>
      </main>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const s = {
  root: {
    minHeight: '100vh',
    background: '#08011a',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },

  // Decorative glow orbs
  orb1: { position: 'fixed', top: '-120px', left: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.45)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' },
  orb2: { position: 'fixed', bottom: '-100px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.22)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' },
  orb3: { position: 'fixed', top: '40%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(217, 70, 239, 0.15)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' },

  // Nav / header
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(8,1,26,0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  brandBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    lineHeight: 0, // prevents phantom baseline space that shifts the logo image
  },
  navRight: { display: 'flex', gap: '8px', alignItems: 'center' },
  navBtn: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  navBtnPrimary: {
    padding: '8px 18px',
    background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)',
    border: 'none',
    color: '#0f172a',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 2px 12px rgba(245,158,11,0.35)',
  },

  // Hero
  hero: { position: 'relative', zIndex: 1 },
  eyebrow: {
    color: '#f59e0b',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '4px',
    margin: '0 0 20px',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#fff',
    fontWeight: '900',
    lineHeight: 1.06,
    letterSpacing: '-0.03em',
    margin: '0 0 24px',
  },
  goldBar: {
    width: '56px',
    height: '3px',
    background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)',
    borderRadius: '2px',
    marginBottom: '24px',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '17px',
    lineHeight: 1.75,
    margin: '0 0 4px',
  },

  // CTA buttons  (also applied to <a> tags — needs textDecoration + display)
  ctaPrimary: {
    display: 'inline-block',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)',
    border: 'none',
    color: '#0f172a',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
    fontFamily: 'inherit',
    textDecoration: 'none',
    lineHeight: 1,
  },
  ctaGhost: {
    padding: '14px 28px',
    background: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.25)',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  ctaBiz: {
    marginTop: '24px',
    display: 'inline-block',
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.45)',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'inherit',
    textDecoration: 'underline',
    textDecorationColor: 'rgba(255,255,255,0.2)',
    textUnderlineOffset: '3px',
  },

  // Hero badge / logo panel (desktop only)
  heroBadgeRow: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 80px 64px',
  },
  heroBadgeCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: '16px',
    padding: '18px 24px',
  },
  heroBadgeImg: { width: '48px', height: '48px', objectFit: 'contain' },
  heroBadgeLabel: {
    color: '#f59e0b',
    fontWeight: '800',
    fontSize: '15px',
    margin: '0 0 2px',
    letterSpacing: '-0.01em',
  },
  heroBadgeSub: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '12px',
    margin: 0,
  },

  // Sections
  section: { position: 'relative', zIndex: 1 },
  sectionAlt: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255,255,255,0.025)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  ctaFooter: { position: 'relative', zIndex: 1 },
  contentMax: { maxWidth: '860px' },

  tag: {
    color: '#f59e0b',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '4px',
    margin: '0 0 14px',
    textTransform: 'uppercase',
  },
  h2: {
    color: '#fff',
    fontWeight: '900',
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    margin: '0 0 20px',
  },
  goldLine: {
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)',
    borderRadius: '2px',
    marginBottom: '28px',
  },
  body: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '16px',
    lineHeight: 1.8,
    margin: '0 0 20px',
  },

  // Feature cards
  featureGrid: { display: 'grid', gap: '16px', marginTop: '40px' },
  featureCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '24px 22px',
  },
  featureTitle: {
    color: '#fff',
    fontSize: '15px',
    fontWeight: '700',
    margin: '0 0 8px',
  },
  featureDesc: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '13px',
    lineHeight: 1.65,
    margin: 0,
  },

  // Footer logo
  footerLogo: {
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto',
    opacity: 0.92,
  },
};
