import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import AnimatedStripes from './AnimatedStripes';
import FadeInSection from './FadeInSection';

const LOGO = process.env.PUBLIC_URL + '/logo514.png';

const HOW_IT_WORKS = [
  { num: '01', title: 'Create a free account', desc: 'Sign up in under a minute with your name and email address.' },
  { num: '02', title: 'Earn Veniar Points locally', desc: 'Give your phone number at checkout at any participating Veniar business.' },
  { num: '03', title: 'Redeem across the network', desc: 'Spend your points at any Veniar partner — not just where you earned them.' },
];

const FEATURES = [
  { title: 'Earn on every local visit', desc: 'Collect Veniar Points when you visit participating restaurants, cafés, and local businesses.' },
  { title: 'Redeem across the network', desc: 'Your points work at every Veniar partner — one balance, the entire local network.' },
  { title: 'Discover nearby businesses', desc: 'Find participating restaurants, shops, cafés, and service providers near you.' },
  { title: 'Plan your next visit', desc: 'View menus, product offerings, maps, and directions from one convenient directory.' },
];

const MOCK_TXS = [
  { name: 'Café Rosso',    pts: '+80 pts',   pos: true  },
  { name: 'Harbor Pizza',  pts: '+120 pts',  pos: true  },
  { name: 'Redeem reward', pts: '−200 pts',  pos: false },
];

function DashboardMock() {
  return (
    <div className="vn-dash-card" style={s.dashCard}>
      {/* Header band — always deep navy, represents product UI */}
      <div style={s.dashHeader}>
        <span style={s.dashHeaderLabel}>VENIAR DASHBOARD</span>
        <span style={s.dashBadge}>
          <span className="vn-dot-pulse" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#F2B84B', marginRight: '5px', verticalAlign: 'middle' }} />
          Active
        </span>
      </div>

      <div style={s.dashBody}>
        {/* Balance */}
        <p style={s.dashLabel}>YOUR POINTS</p>
        <p style={s.dashBalance}>1,240</p>
        <p style={s.dashBalanceSub}>Available to redeem at any Veniar partner</p>

        {/* Network indicator */}
        <div style={s.dashNetRow}>
          <span style={s.dashNetDot} className="vn-dot-pulse" />
          <span style={s.dashNetText}>3 partners nearby</span>
        </div>

        <div style={s.dashDivider} />

        {/* Transactions */}
        <p style={s.dashTxTitle}>RECENT ACTIVITY</p>
        {MOCK_TXS.map((tx, i) => (
          <div key={i} style={s.dashTx}>
            <div style={{ ...s.dashTxDot, background: tx.pos ? 'rgba(37,183,200,0.12)' : 'rgba(232,111,46,0.12)' }}>
              <span style={{ color: tx.pos ? '#25B7C8' : '#E86F2E', fontSize: '11px', fontWeight: '800', lineHeight: 1 }}>
                {tx.pos ? '+' : '−'}
              </span>
            </div>
            <span style={s.dashTxName}>{tx.name}</span>
            <span style={{ ...s.dashTxPts, color: tx.pos ? '#25B7C8' : '#E86F2E' }}>{tx.pts}</span>
          </div>
        ))}

        <div style={s.dashFooter}>
          <span style={s.dashFooterLink}>View all activity →</span>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div style={s.root}>
      <AnimatedStripes count={isMobile ? 3 : 5} />

      {/* ── Navigation ────────────────────────────────────────────────── */}
      <header style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <button style={s.brandBtn} onClick={() => navigate('/')} aria-label="Veniar — home">
          <img src={LOGO} alt="Veniar" style={{ height: '36px', width: 'auto', display: 'block' }} />
        </button>

        <nav style={s.navRight} aria-label="Site navigation">
          {!isMobile && (
            <button className="vn-nav-btn" style={s.navBtn} onClick={() => navigate('/business-overview')}>
              For Businesses
            </button>
          )}
          <button className="vn-nav-btn" style={s.navBtn} onClick={() => navigate('/signin')}>
            Sign in
          </button>
          <button className="vn-cta-primary" style={s.navBtnPrimary} onClick={() => navigate('/register')}>
            Join Veniar
          </button>
        </nav>
      </header>

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          style={{ ...s.hero, padding: isMobile ? '80px 24px 72px' : '108px 80px 88px' }}
          aria-label="Hero"
        >
          <div style={{
            ...s.heroInner,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0' : '72px',
            alignItems: isMobile ? 'flex-start' : 'center',
          }}>
            <div style={s.heroLeft}>
              <FadeInSection delay={0}>
                <p style={s.eyebrow}>VENIAR™ — LOCAL REWARDS NETWORK</p>
                <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.75rem' : '4.4rem' }}>
                  Shared rewards<br />for local favorites.
                </h1>
                <div style={s.goldBar} />
                <p style={{ ...s.heroSub, maxWidth: isMobile ? '100%' : '500px' }}>
                  Earn Veniar Points when you visit participating restaurants, cafés, and local businesses. Redeem them anywhere in the Veniar Network.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '40px', alignItems: 'center' }}>
                  <button className="vn-cta-primary" style={s.ctaPrimary} onClick={() => navigate('/register')}>
                    Join Veniar
                  </button>
                  <button className="vn-cta-ghost" style={s.ctaGhost} onClick={() => navigate('/business-overview')}>
                    For Businesses
                  </button>
                </div>
              </FadeInSection>
            </div>

            {!isMobile && (
              <div style={s.heroRight}>
                <DashboardMock />
              </div>
            )}
          </div>
        </section>

        {/* ── Teal route accent ─────────────────────────────────────────── */}
        <div style={s.routeAccent} aria-hidden="true">
          <div className="vn-route-line" style={s.routeLine} />
          <div className="vn-dot-pulse" style={s.routeDot} />
          <div className="vn-route-line" style={{ ...s.routeLine, animationDelay: '0.2s' }} />
        </div>

        {/* ── How it works ──────────────────────────────────────────────── */}
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
                  <FadeInSection key={step.num} delay={i * 90}>
                    <div className="vn-card" style={s.stepCard}>
                      <span style={s.stepNum}>{step.num}</span>
                      <p style={s.stepTitle}>{step.title}</p>
                      <p style={s.stepDesc}>{step.desc}</p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
              <p style={{ ...s.body, marginTop: '32px' }}>
                Your Veniar Points aren't tied to one store — they work across every participating business in the Veniar Network.
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* ── Features ──────────────────────────────────────────────────── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 24px' : '88px 80px' }}>
          <FadeInSection>
            <div style={s.contentMax}>
              <p style={s.tag}>WHAT YOU GET</p>
              <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.6rem' }}>Everything in one app.</h2>
              <div style={s.goldLine} />
              <div style={{ ...s.featureGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                {FEATURES.map((f, i) => (
                  <FadeInSection key={f.title} delay={i * 90}>
                    <div className="vn-card" style={s.featureCard}>
                      <div style={s.featureIconBar} />
                      <p style={s.featureTitle}>{f.title}</p>
                      <p style={s.featureDesc}>{f.desc}</p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* ── Business dark band ────────────────────────────────────────── */}
        <section style={{ ...s.darkBand, padding: isMobile ? '72px 24px' : '96px 80px' }}>
          <FadeInSection>
            <div style={s.contentMax}>
              <p style={s.darkTag}>VENIAR FOR BUSINESS</p>
              <h2 style={{ ...s.darkH2, fontSize: isMobile ? '1.9rem' : '2.6rem' }}>
                Loyalty works better when<br />local businesses are connected.
              </h2>
              <div style={s.darkLine} />
              <p style={s.darkBody}>
                Veniar gives independent restaurants and local businesses a complete loyalty program, merchant dashboard, and access to a shared customer network — without the cost or complexity of building it alone.
              </p>
              <p style={s.darkBody}>
                Customers who earn points at another Veniar business can redeem them with you. New foot traffic from the network, not just returning regulars.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <button
                  className="vn-cta-primary"
                  style={s.darkCta}
                  onClick={() => navigate('/business-overview')}
                >
                  Learn about Veniar for Business
                </button>
                <button
                  className="vn-cta-ghost"
                  style={s.darkGhost}
                  onClick={() => navigate('/business-register')}
                >
                  Apply to partner →
                </button>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* ── Join CTA ──────────────────────────────────────────────────── */}
        <section
          style={{ ...s.ctaSection, padding: isMobile ? '72px 24px 88px' : '96px 80px 112px', textAlign: 'center' }}
        >
          <FadeInSection>
            <img src={LOGO} alt="Veniar" style={{ ...s.ctaLogo, width: isMobile ? '64px' : '80px' }} />
            <h2 style={{
              ...s.h2,
              fontSize: isMobile ? '2rem' : '2.6rem',
              marginTop: '28px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Join the Veniar network today.
            </h2>
            <p style={{ ...s.body, maxWidth: '480px', margin: '16px auto 40px' }}>
              Start earning Veniar Points on everyday spending while supporting independent businesses in your community.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="vn-cta-primary" style={s.ctaPrimary} onClick={() => navigate('/register')}>
                Create free account
              </button>
              <button className="vn-cta-ghost" style={s.ctaGhost} onClick={() => navigate('/signin')}>
                Sign in
              </button>
            </div>
          </FadeInSection>
        </section>
      </main>

      {/* ── Site Footer ───────────────────────────────────────────────── */}
      <footer style={s.footer}>
        {/* Top multi-column section */}
        <div style={{
          ...s.footerTop,
          padding: isMobile ? '48px 24px 40px' : '56px 80px 48px',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '40px' : '0',
        }}>
          <div style={s.footerBrandCol}>
            <img src={LOGO} alt="Veniar" style={s.footerLogoImg} />
            <p style={s.footerBrandName}>Veniar</p>
            <p style={s.footerBrandSub}>Shared rewards for local favorites.</p>
            <p style={s.footerCredit}>A product of RewardsNow.</p>
          </div>

          <div style={{
            ...s.footerLinkCols,
            gap: isMobile ? '40px' : '64px',
            marginLeft: isMobile ? '0' : 'auto',
          }}>
            <div>
              <p style={s.footerColTitle}>PRODUCT</p>
              <button className="vn-footer-link" style={s.footerLink} onClick={() => navigate('/')}>Home</button>
              <button className="vn-footer-link" style={s.footerLink} onClick={() => navigate('/business-overview')}>For Businesses</button>
              <button className="vn-footer-link" style={s.footerLink} onClick={() => navigate('/register')}>Join Veniar</button>
              <button className="vn-footer-link" style={s.footerLink} onClick={() => navigate('/signin')}>Sign In</button>
            </div>
            <div>
              <p style={s.footerColTitle}>LEGAL</p>
              <button className="vn-footer-link" style={s.footerLink} onClick={() => navigate('/terms')}>Terms of Service</button>
              <button className="vn-footer-link" style={s.footerLink} onClick={() => navigate('/privacy')}>Privacy Policy</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          ...s.footerBottom,
          padding: isMobile ? '16px 24px 20px' : '16px 80px 20px',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '4px' : '0',
        }}>
          <p style={s.footerCopy}>© 2026 RewardsNow, Inc. All rights reserved.</p>
          <p style={s.footerCopy}>Veniar is a product of RewardsNow.</p>
        </div>
      </footer>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const BLUE = '#0B5CAD';
const NAVY = '#07243A';
const GOLD = '#F2B84B';
const TEAL = '#25B7C8';

const s = {
  root: {
    minHeight: '100vh',
    background: 'var(--rn-bg)',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },

  // ── Nav
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    height: '64px', position: 'sticky', top: 0, zIndex: 100,
    background: 'var(--rn-nav-bg)',
    borderBottom: '1px solid var(--rn-nav-border)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
  },
  brandBtn: {
    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    display: 'flex', alignItems: 'center', lineHeight: 0,
  },
  navRight: { display: 'flex', gap: '8px', alignItems: 'center' },
  navBtn: {
    padding: '8px 16px', background: 'transparent',
    border: '1px solid var(--rn-nav-btn-border)',
    color: 'var(--rn-nav-btn-color)',
    borderRadius: '8px', fontSize: '13px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  navBtnPrimary: {
    padding: '8px 18px',
    background: BLUE,
    border: 'none', color: '#FFFFFF', borderRadius: '8px',
    fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
  },

  // ── Hero
  hero: { position: 'relative', zIndex: 1 },
  heroInner: { display: 'flex', maxWidth: '1180px' },
  heroLeft: { flex: 1, minWidth: 0 },
  heroRight: { flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: '8px' },
  eyebrow: {
    color: GOLD, fontSize: '11px', fontWeight: '700',
    letterSpacing: '4px', margin: '0 0 20px', textTransform: 'uppercase',
  },
  heroTitle: {
    color: 'var(--rn-text)', fontWeight: '900',
    lineHeight: 1.04, letterSpacing: '-0.035em', margin: '0 0 24px',
  },
  goldBar: { width: '48px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '24px' },
  heroSub: { color: 'var(--rn-text-sub)', fontSize: '17px', lineHeight: 1.75, margin: 0 },
  ctaPrimary: {
    display: 'inline-block', padding: '14px 30px',
    background: BLUE, border: 'none', color: '#FFFFFF',
    borderRadius: '10px', fontSize: '15px', fontWeight: '700',
    cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', lineHeight: 1,
  },
  ctaGhost: {
    padding: '14px 26px', background: 'transparent',
    border: '1.5px solid var(--rn-ghost-border)',
    color: 'var(--rn-ghost-color)',
    borderRadius: '10px', fontSize: '15px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1,
  },

  // ── Mock Dashboard
  dashCard: {
    width: '340px',
    background: '#FFFFFF',
    border: '1px solid rgba(16,24,32,0.10)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(16,24,32,0.14)',
  },
  dashHeader: {
    background: NAVY,
    padding: '14px 18px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  dashHeaderLabel: {
    color: 'rgba(245,240,232,0.55)', fontSize: '10px',
    fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase',
  },
  dashBadge: {
    color: GOLD, fontSize: '11px', fontWeight: '700',
    display: 'flex', alignItems: 'center',
  },
  dashBody: { padding: '18px 18px 14px' },
  dashLabel: {
    color: '#5F6B73', fontSize: '9px', fontWeight: '700',
    letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 5px',
  },
  dashBalance: {
    color: '#101820', fontSize: '2.6rem', fontWeight: '900',
    letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 3px',
  },
  dashBalanceSub: {
    color: '#5F6B73', fontSize: '11px', lineHeight: 1.4, margin: '0 0 10px',
  },
  dashNetRow: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' },
  dashNetDot: {
    display: 'inline-block', width: '7px', height: '7px',
    borderRadius: '50%', background: TEAL, flexShrink: 0,
  },
  dashNetText: { color: TEAL, fontSize: '11px', fontWeight: '600' },
  dashDivider: { height: '1px', background: 'rgba(16,24,32,0.08)', marginBottom: '12px' },
  dashTxTitle: {
    color: '#5F6B73', fontSize: '9px', fontWeight: '700',
    letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px',
  },
  dashTx: {
    display: 'flex', alignItems: 'center', gap: '9px',
    padding: '6px 0',
  },
  dashTxDot: {
    width: '24px', height: '24px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  dashTxName: { flex: 1, color: '#101820', fontSize: '12px', fontWeight: '500' },
  dashTxPts: { fontSize: '12px', fontWeight: '700' },
  dashFooter: {
    marginTop: '10px', paddingTop: '10px',
    borderTop: '1px solid rgba(16,24,32,0.07)',
  },
  dashFooterLink: {
    color: BLUE, fontSize: '11px', fontWeight: '600', cursor: 'pointer',
  },

  // ── Route accent
  routeAccent: {
    display: 'flex', alignItems: 'center',
    padding: '0 80px', position: 'relative', zIndex: 1,
    overflow: 'hidden',
  },
  routeLine: { flex: 1, height: '2px', background: TEAL, display: 'block' },
  routeDot: {
    width: '8px', height: '8px', borderRadius: '50%',
    background: TEAL, margin: '0 6px', flexShrink: 0,
  },

  // ── Sections
  section: { position: 'relative', zIndex: 1 },
  sectionAlt: {
    position: 'relative', zIndex: 1,
    background: 'var(--rn-section-alt)',
    borderTop: '1px solid var(--rn-section-border)',
    borderBottom: '1px solid var(--rn-section-border)',
  },
  ctaSection: { position: 'relative', zIndex: 1 },
  contentMax: { maxWidth: '880px' },

  tag: { color: GOLD, fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 14px', textTransform: 'uppercase' },
  h2: { color: 'var(--rn-text)', fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px' },
  goldLine: { width: '36px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '36px' },
  body: { color: 'var(--rn-text-sub)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px' },

  // ── Step cards
  stepsGrid: { display: 'grid', gap: '14px', marginBottom: '8px' },
  stepCard: {
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderRadius: '14px', padding: '26px 22px',
  },
  stepNum: {
    color: GOLD, fontSize: '10px', fontWeight: '800',
    letterSpacing: '3px', display: 'block', marginBottom: '14px',
  },
  stepTitle: { color: 'var(--rn-text)', fontSize: '15px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.01em' },
  stepDesc: { color: 'var(--rn-text-muted)', fontSize: '13px', lineHeight: 1.65, margin: 0 },

  // ── Feature cards
  featureGrid: { display: 'grid', gap: '14px', marginTop: '40px' },
  featureCard: {
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderRadius: '14px', padding: '24px 22px',
  },
  featureIconBar: {
    width: '28px', height: '3px', background: TEAL,
    borderRadius: '2px', marginBottom: '14px',
  },
  featureTitle: { color: 'var(--rn-text)', fontSize: '15px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.01em' },
  featureDesc: { color: 'var(--rn-text-muted)', fontSize: '13px', lineHeight: 1.65, margin: 0 },

  // ── Business dark band
  darkBand: {
    background: 'var(--rn-dark-band)',
    position: 'relative', zIndex: 1,
  },
  darkTag: {
    color: GOLD, fontSize: '11px', fontWeight: '700',
    letterSpacing: '4px', margin: '0 0 14px', textTransform: 'uppercase',
  },
  darkH2: {
    color: '#F5F0E8', fontWeight: '900',
    lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px',
  },
  darkLine: { width: '36px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '28px' },
  darkBody: { color: 'rgba(245,240,232,0.62)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px' },
  darkCta: {
    padding: '14px 28px', background: BLUE,
    border: 'none', color: '#FFFFFF', borderRadius: '10px',
    fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
  },
  darkGhost: {
    padding: '14px 26px', background: 'transparent',
    border: '1.5px solid rgba(245,240,232,0.28)',
    color: '#F5F0E8', borderRadius: '10px',
    fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },

  // ── Join CTA
  ctaLogo: { height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' },

  // ── Footer
  footer: { background: NAVY, position: 'relative', zIndex: 1 },
  footerTop: {
    display: 'flex',
    borderBottom: '1px solid rgba(245,240,232,0.09)',
  },
  footerBrandCol: { maxWidth: '260px' },
  footerLogoImg: { height: '36px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '12px', opacity: 0.85 },
  footerBrandName: {
    color: '#F5F0E8', fontSize: '15px', fontWeight: '800',
    margin: '0 0 4px', letterSpacing: '-0.02em',
  },
  footerBrandSub: { color: 'rgba(245,240,232,0.50)', fontSize: '13px', margin: '0 0 10px', lineHeight: 1.5 },
  footerCredit: { color: 'rgba(245,240,232,0.30)', fontSize: '11px', margin: 0 },
  footerLinkCols: { display: 'flex', flexWrap: 'wrap' },
  footerColTitle: {
    color: 'rgba(245,240,232,0.35)', fontSize: '10px',
    fontWeight: '700', letterSpacing: '2px', margin: '0 0 12px', textTransform: 'uppercase',
  },
  footerLink: {
    display: 'block', background: 'none', border: 'none',
    color: 'rgba(245,240,232,0.52)', fontSize: '13px', fontWeight: '500',
    cursor: 'pointer', fontFamily: 'inherit',
    padding: '4px 0', textAlign: 'left',
  },
  footerBottom: {
    display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
    borderTop: '1px solid rgba(245,240,232,0.07)',
  },
  footerCopy: { color: 'rgba(245,240,232,0.25)', fontSize: '11px', margin: 0 },
};
