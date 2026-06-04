import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';
import AnimatedStripes from './AnimatedStripes';
import FadeInSection from './FadeInSection';

const LOGO = process.env.PUBLIC_URL + '/logo514.png';

// Wraps every occurrence of "Veniar" in <em> for italic rendering
function vn(text) {
  const parts = text.split('Veniar');
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <em>Veniar</em>}
        </span>
      ))}
    </>
  );
}

const HOW_IT_WORKS = [
  { n: 'VN·01', title: 'Create a free account', desc: 'Sign up in under a minute with your name and email. No card required.' },
  { n: 'VN·02', title: 'Earn Veniar Points locally', desc: 'Give your phone number at checkout at any participating Veniar business.' },
  { n: 'VN·03', title: 'Redeem across the network', desc: 'Spend your points at any Veniar partner — not just where you earned them.' },
];

const FOR_CUSTOMERS = [
  { tag: 'EARN', title: 'Earn on every local visit', desc: 'Collect Veniar Points when you visit participating restaurants, cafés, and local businesses.' },
  { tag: 'REDEEM', title: 'Spend anywhere in the network', desc: 'Your points work at every Veniar partner — one balance, the entire local network.' },
  { tag: 'DISCOVER', title: 'Find your next local favorite', desc: 'Browse the Veniar directory by category, distance, and offering to find places worth visiting.' },
  { tag: 'TRACK', title: 'Track your rewards in real time', desc: 'View your Veniar Points balance, recent activity, and available offers in one place.' },
];

const FOR_BUSINESS = [
  { tag: 'LOYALTY', title: 'Complete loyalty infrastructure', desc: 'Full rewards program without the complexity of building your own. No POS integration required.' },
  { tag: 'NETWORK', title: 'Shared customer network', desc: 'Customers who earn elsewhere can redeem with you — new foot traffic, not just returning regulars.' },
  { tag: 'DASHBOARD', title: 'Merchant control panel', desc: 'Track visits, points issued, redemptions, and staff actions from one control panel.' },
];

const TRUST = [
  { n: '01', label: 'Network-wide redemption', desc: 'Points earned anywhere in the Veniar network can be redeemed at any partner.' },
  { n: '02', label: 'Merchant controls', desc: 'Issue rewards, set point values, manage active offers, and monitor staff.' },
  { n: '03', label: 'No lock-in', desc: 'Simple monthly pricing. Cancel anytime. Your customer data stays yours.' },
  { n: '04', label: 'Local-first', desc: 'Built for independent restaurants, cafés, and neighborhood businesses.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={s.root}>
      <AnimatedStripes count={isMobile ? 2 : 4} />

      {/* ── Sticky header: teal bar + nav together ── */}
      <div style={s.stickyHeader}>
        <div className="vn-top-bar" style={s.topBar} />
        <header style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
          <button style={s.brandBtn} onClick={() => navigate('/')} aria-label="Veniar home">
            <img src={LOGO} alt="Veniar" style={s.brandLogo} />
          </button>
          <nav style={s.navRight} aria-label="Site navigation">
            {!isMobile && (
              <button className="vn-nav-link" style={s.navLink} onClick={() => navigate('/business-overview')}>
                For Businesses
              </button>
            )}
            <button className="vn-btn-ghost" style={s.navBtn} onClick={() => navigate('/signin')}>Sign in</button>
            <button className="vn-btn" style={s.navBtnPrimary} onClick={() => navigate('/register')}>
              Join <em>Veniar</em>
            </button>
            <button style={s.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? 'LIGHT' : 'DARK'}
            </button>
          </nav>
        </header>
      </div>

      <main>
        {/* ── Hero ── */}
        <section style={{ ...s.hero, padding: isMobile ? '72px 24px 80px' : '112px 64px 96px' }}>
          <div style={{ maxWidth: '680px' }}>
            <FadeInSection delay={0}>
              <p style={s.eyebrow}>LOCAL REWARDS NETWORK</p>
              <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.8rem' : '4.6rem' }}>
                Shared rewards<br />for local favorites.
              </h1>
              <div className="vn-bar-animate" style={s.goldBar} />
              <p style={{ ...s.heroSub, maxWidth: isMobile ? '100%' : '500px' }}>
                Earn <em>Veniar</em> Points when you visit participating restaurants, cafés, and local
                businesses. Redeem them anywhere in the <em>Veniar</em> Network.
              </p>
              <div style={s.heroCtas}>
                <button className="vn-btn" style={s.ctaPrimary} onClick={() => navigate('/register')}>
                  Get started free
                </button>
                <button className="vn-btn-ghost" style={s.ctaGhost} onClick={() => navigate('/business-overview')}>
                  For businesses
                </button>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 24px' : '96px 64px' }}>
          <FadeInSection>
            <p style={s.sectionTag}>HOW IT WORKS</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.8rem', maxWidth: '560px' }}>
              Shop local. Earn points.<br />Redeem anywhere.
            </h2>
            <div className="vn-bar-animate" style={{ ...s.goldLine, marginBottom: '52px' }} />
          </FadeInSection>
          <div style={{ ...s.threeGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <FadeInSection key={step.n} delay={i * 110}>
                <div className="vn-card" style={s.stepCard}>
                  <span className="vn-teal-glow" style={s.stepNum}>{step.n}</span>
                  <p style={s.stepTitle}>{vn(step.title)}</p>
                  <p style={s.stepDesc}>{vn(step.desc)}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* ── For Customers ── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '96px 64px' }}>
          <FadeInSection>
            <p style={s.sectionTag}>FOR CUSTOMERS</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.6rem', maxWidth: '480px' }}>
              Everything in one account.
            </h2>
            <div className="vn-bar-animate" style={{ ...s.goldLine, marginBottom: '52px' }} />
          </FadeInSection>
          <div style={{ ...s.twoGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
            {FOR_CUSTOMERS.map((f, i) => (
              <FadeInSection key={f.tag} delay={i * 80}>
                <div className="vn-card" style={s.featureCard}>
                  <p style={s.featureTag}>{f.tag}</p>
                  <p style={s.featureTitle}>{vn(f.title)}</p>
                  <p style={s.featureDesc}>{vn(f.desc)}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* ── For Business Owners ── */}
        <section style={{ ...s.sectionDark, padding: isMobile ? '64px 24px' : '96px 64px' }}>
          <FadeInSection>
            <p style={{ ...s.sectionTag, color: '#F2B84B' }}>FOR BUSINESS OWNERS</p>
            <h2 style={{ ...s.h2, color: '#ffffff', fontSize: isMobile ? '2rem' : '2.6rem', maxWidth: '580px' }}>
              Loyalty works better when<br />local businesses are connected.
            </h2>
            <div className="vn-bar-animate" style={s.goldLine} />
            <p style={{ ...s.body, color: 'rgba(255,255,255,0.58)', maxWidth: '560px', marginBottom: '52px' }}>
              <em>Veniar</em> gives independent restaurants and local businesses a complete loyalty
              program, merchant dashboard, and access to a shared customer network — without the
              cost or complexity of building it alone.
            </p>
          </FadeInSection>
          <div style={{ ...s.threeGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr' }}>
            {FOR_BUSINESS.map((f, i) => (
              <FadeInSection key={f.tag} delay={i * 90}>
                <div className="vn-card" style={s.bizCard}>
                  <p style={{ ...s.featureTag, color: '#F2B84B', borderTopColor: '#F2B84B' }}>{f.tag}</p>
                  <p style={{ ...s.featureTitle, color: '#ffffff' }}>{vn(f.title)}</p>
                  <p style={{ ...s.featureDesc, color: 'rgba(255,255,255,0.54)' }}>{vn(f.desc)}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection delay={200}>
            <button className="vn-btn" style={s.bizCta} onClick={() => navigate('/business-overview')}>
              Learn about <em>Veniar</em> for Business →
            </button>
          </FadeInSection>
        </section>

        {/* ── Trust / Network ── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 24px' : '96px 64px' }}>
          <FadeInSection>
            <p style={s.sectionTag}>NETWORK INFRASTRUCTURE</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.6rem', maxWidth: '480px' }}>
              Built to last. Built for trust.
            </h2>
            <div className="vn-bar-animate" style={{ ...s.goldLine, marginBottom: '52px' }} />
          </FadeInSection>
          <div style={{ ...s.fourGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr' }}>
            {TRUST.map((t, i) => (
              <FadeInSection key={t.label} delay={i * 75}>
                <div className="vn-card" style={s.trustCard}>
                  <p className="vn-teal-glow" style={s.trustNum}>{t.n}</p>
                  <p style={s.trustLabel}>{vn(t.label)}</p>
                  <p style={s.trustDesc}>{vn(t.desc)}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ ...s.section, padding: isMobile ? '72px 24px' : '100px 64px', textAlign: 'center' }}>
          <FadeInSection>
            <p style={s.eyebrow}>GET STARTED</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.8rem', margin: '0 auto 16px', maxWidth: '540px' }}>
              Join the <em>Veniar</em> rewards network.
            </h2>
            <div className="vn-bar-animate" style={{ ...s.goldLine, margin: '0 auto 32px' }} />
            <p style={{ ...s.body, maxWidth: '460px', margin: '0 auto 40px' }}>
              Free to join. No credit card required. Start earning <em>Veniar</em> Points at your
              favorite local businesses.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="vn-btn" style={s.ctaPrimary} onClick={() => navigate('/register')}>
                Create free account
              </button>
              <button className="vn-btn-ghost" style={s.ctaGhost} onClick={() => navigate('/signin')}>
                Sign in
              </button>
            </div>
          </FadeInSection>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{ ...s.footer, padding: isMobile ? '48px 24px 32px' : '64px 64px 36px' }}>
        <div style={{ ...s.footerTop, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '0' }}>
          <div style={s.footerBrand}>
            <p style={s.footerBrandName}><em>Veniar</em></p>
            <p style={s.footerBrandTagline}>Shared rewards for local favorites.</p>
          </div>
          <div style={{ ...s.footerCols, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '32px' : '72px' }}>
            <div style={s.footerCol}>
              <p style={s.footerColHead}>Product</p>
              <button style={s.footerLink} onClick={() => navigate('/register')}>Get started</button>
              <button style={s.footerLink} onClick={() => navigate('/signin')}>Sign in</button>
              <button style={s.footerLink} onClick={() => navigate('/business-overview')}>For businesses</button>
            </div>
            <div style={s.footerCol}>
              <p style={s.footerColHead}>Company</p>
              <button style={s.footerLink} onClick={() => navigate('/terms')}>Terms of Service</button>
              <button style={s.footerLink} onClick={() => navigate('/privacy')}>Privacy Policy</button>
            </div>
          </div>
        </div>
        <div style={s.footerBottom}>
          <p style={s.footerCopy}>© {new Date().getFullYear()} <em>Veniar</em>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// ── Styles — colors via CSS custom properties from ThemeContext ──────────────
const s = {
  root: {
    minHeight: '100vh',
    background: 'var(--rn-bg)',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflowX: 'hidden',
  },

  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  topBar: {
    height: '4px',
    background: '#25B7C8',
    flexShrink: 0,
  },

  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    background: 'var(--rn-nav-bg)',
    borderBottom: '1px solid var(--rn-nav-border)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
  },
  brandBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    lineHeight: 0,
  },
  brandLogo: { height: '34px', width: 'auto', display: 'block' },
  navRight: { display: 'flex', gap: '8px', alignItems: 'center' },
  navLink: {
    padding: '8px 14px',
    background: 'transparent',
    border: 'none',
    color: 'var(--rn-nav-btn-color)',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
  },
  navBtn: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid var(--rn-nav-btn-border)',
    color: 'var(--rn-nav-btn-color)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  navBtnPrimary: {
    padding: '8px 18px',
    background: '#1565C4',
    border: 'none',
    color: '#ffffff',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  themeBtn: {
    background: 'none',
    border: '1px solid var(--rn-nav-btn-border)',
    color: 'var(--rn-nav-btn-color)',
    borderRadius: '6px',
    padding: '5px 10px',
    fontSize: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.06em',
  },

  hero: { position: 'relative', zIndex: 1 },
  eyebrow: {
    color: '#F2B84B',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '4px',
    margin: '0 0 20px',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: 'var(--rn-text)',
    fontWeight: '900',
    lineHeight: 1.05,
    letterSpacing: '-0.035em',
    margin: '0 0 24px',
  },
  goldBar: {
    width: '56px',
    height: '3px',
    background: '#F2B84B',
    borderRadius: '2px',
    marginBottom: '24px',
  },
  heroSub: {
    color: 'var(--rn-text-sub)',
    fontSize: '17px',
    lineHeight: 1.75,
    margin: '0 0 4px',
  },
  heroCtas: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    marginTop: '40px',
    alignItems: 'center',
  },
  ctaPrimary: {
    display: 'inline-block',
    padding: '14px 32px',
    background: '#1565C4',
    border: 'none',
    color: '#ffffff',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'none',
    lineHeight: 1,
  },
  ctaGhost: {
    padding: '14px 28px',
    background: 'transparent',
    border: '1.5px solid var(--rn-ghost-border)',
    color: 'var(--rn-ghost-color)',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    lineHeight: 1,
  },

  // ── Sections ──
  section: { position: 'relative', zIndex: 1 },
  sectionAlt: {
    position: 'relative',
    zIndex: 1,
    background: 'var(--rn-section-alt)',
    borderTop: '1px solid var(--rn-section-border)',
    borderBottom: '1px solid var(--rn-section-border)',
  },
  sectionDark: {
    position: 'relative',
    zIndex: 1,
    background: '#07243A',
  },

  sectionTag: {
    color: '#F2B84B',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    margin: '0 0 16px',
  },
  h2: {
    color: 'var(--rn-text)',
    fontWeight: '900',
    lineHeight: 1.08,
    letterSpacing: '-0.03em',
    margin: '0 0 20px',
  },
  goldLine: {
    width: '40px',
    height: '3px',
    background: '#F2B84B',
    borderRadius: '2px',
  },
  body: {
    color: 'var(--rn-text-sub)',
    fontSize: '16px',
    lineHeight: 1.8,
    margin: '0 0 20px',
  },

  // ── Grids ──
  threeGrid: { display: 'grid', gap: '16px' },
  twoGrid:   { display: 'grid', gap: '16px' },
  fourGrid:  { display: 'grid', gap: '14px' },

  // ── Step cards ──
  stepCard: {
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderRadius: '14px',
    padding: '28px 24px',
    height: '100%',
  },
  stepNum: {
    color: '#25B7C8',
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '3px',
    display: 'block',
    marginBottom: '14px',
  },
  stepTitle: {
    color: 'var(--rn-text)',
    fontSize: '16px',
    fontWeight: '700',
    margin: '0 0 10px',
    letterSpacing: '-0.01em',
  },
  stepDesc: {
    color: 'var(--rn-text-muted)',
    fontSize: '14px',
    lineHeight: 1.65,
    margin: 0,
  },

  // ── Feature cards (customer section) ──
  featureCard: {
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderTop: '3px solid #1565C4',
    borderRadius: '12px',
    padding: '24px 20px',
    height: '100%',
  },
  featureTag: {
    color: '#1565C4',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: '0 0 10px',
  },
  featureTitle: {
    color: 'var(--rn-text)',
    fontSize: '15px',
    fontWeight: '700',
    margin: '0 0 8px',
    letterSpacing: '-0.01em',
  },
  featureDesc: {
    color: 'var(--rn-text-muted)',
    fontSize: '13px',
    lineHeight: 1.65,
    margin: 0,
  },

  // ── Biz cards (dark section) ──
  bizCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderTop: '3px solid #F2B84B',
    borderRadius: '12px',
    padding: '24px 20px',
    height: '100%',
  },

  bizCta: {
    marginTop: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '14px 26px',
    borderRadius: '10px',
    border: '1.5px solid rgba(255,255,255,0.22)',
    background: 'transparent',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
  },

  // ── Trust cards ──
  trustCard: {
    background: 'var(--rn-card-bg)',
    border: '1px solid var(--rn-card-border)',
    borderRadius: '12px',
    padding: '22px 18px',
    height: '100%',
  },
  trustNum: {
    color: '#25B7C8',
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '2px',
    margin: '0 0 12px',
    display: 'block',
  },
  trustLabel: {
    color: 'var(--rn-text)',
    fontSize: '14px',
    fontWeight: '700',
    margin: '0 0 8px',
    letterSpacing: '-0.01em',
  },
  trustDesc: {
    color: 'var(--rn-text-muted)',
    fontSize: '13px',
    lineHeight: 1.6,
    margin: 0,
  },

  // ── Footer (always dark) ──
  footer: {
    background: '#07243A',
    position: 'relative',
    zIndex: 1,
    borderTop: '1px solid rgba(255,255,255,0.07)',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '40px',
  },
  footerBrand: {},
  footerBrandName: {
    color: '#F2B84B',
    fontSize: '1.1rem',
    fontWeight: '900',
    fontStyle: 'normal',
    margin: '0 0 8px',
    letterSpacing: '-0.02em',
  },
  footerBrandTagline: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '13px',
    margin: 0,
    lineHeight: 1.5,
    maxWidth: '220px',
  },
  footerCols: { display: 'flex' },
  footerCol: { display: 'flex', flexDirection: 'column', gap: '10px' },
  footerColHead: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: '0 0 4px',
  },
  footerLink: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.55)',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: '2px 0',
    textAlign: 'left',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.07)',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerCopy: {
    color: 'rgba(255,255,255,0.28)',
    fontSize: '12px',
    margin: 0,
  },
};
