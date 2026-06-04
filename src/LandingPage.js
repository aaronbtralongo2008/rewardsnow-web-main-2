import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';
import AnimatedStripes from './AnimatedStripes';
import FadeInSection from './FadeInSection';

const LOGO = process.env.PUBLIC_URL + '/logo514.png';

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

const DASH_TXS = [
  { name: 'Café Soleil', pts: '+120 pts', up: true, time: 'Today' },
  { name: 'The Grain Market', pts: '+80 pts', up: true, time: 'Yesterday' },
  { name: 'Blue Plate Kitchen', pts: '−200 pts', up: false, time: '3 days ago' },
];

const MERCHANT_STATS = [
  { v: '1,240', l: 'Points issued today' },
  { v: '28', l: 'Customer visits' },
  { v: '4', l: 'Redemptions' },
  { v: '94%', l: 'Return rate' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={s.root}>
      <AnimatedStripes count={isMobile ? 2 : 4} />

      {/* ── Teal top accent bar ── */}
      <div className="vn-top-bar" style={s.topBar} />

      {/* ── Navigation ── */}
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
          <button className="vn-btn" style={s.navBtnPrimary} onClick={() => navigate('/register')}>Join Veniar</button>
          <button style={s.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? 'LIGHT' : 'DARK'}
          </button>
        </nav>
      </header>

      <main>
        {/* ── Hero ── */}
        <section style={{ ...s.hero, padding: isMobile ? '72px 24px 64px' : '100px 64px 80px' }}>
          <div style={{ ...s.heroInner, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '48px' : '40px' }}>
            <div style={{ ...s.heroLeft, maxWidth: isMobile ? '100%' : '520px' }}>
              <FadeInSection delay={0}>
                <p style={s.eyebrow}>LOCAL REWARDS NETWORK</p>
                <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.8rem' : '4.4rem' }}>
                  Shared rewards<br />for local favorites.
                </h1>
                <div className="vn-bar-animate" style={s.goldBar} />
                <p style={{ ...s.heroSub, maxWidth: isMobile ? '100%' : '440px' }}>
                  Earn Veniar Points when you visit participating restaurants, cafés, and local businesses.
                  Redeem them anywhere in the Veniar Network.
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

            {!isMobile && (
              <FadeInSection delay={180} style={s.heroRight}>
                <div style={s.dashCard}>
                  <div style={s.dashHeader}>
                    <div>
                      <p style={s.dashLabel}>VENIAR POINTS</p>
                      <p className="vn-gold-glow" style={s.dashBalance}>2,840</p>
                    </div>
                    <div style={s.dashBadge}>ACTIVE</div>
                  </div>
                  <div style={s.dashDivider} />
                  <div style={s.dashStats}>
                    {[{ n: '14', l: 'Visits' }, { n: '3', l: 'Partners' }, { n: '580', l: 'Redeemed' }].map(st => (
                      <div key={st.l} style={s.dashStat}>
                        <p style={s.dashStatNum}>{st.n}</p>
                        <p style={s.dashStatLbl}>{st.l}</p>
                      </div>
                    ))}
                  </div>
                  <div style={s.dashDivider} />
                  <p style={s.dashActivityLabel}>RECENT ACTIVITY</p>
                  {DASH_TXS.map((tx, i) => (
                    <div key={i} className="vn-row" style={s.dashTx}>
                      <div>
                        <p style={s.dashTxName}>{tx.name}</p>
                        <p style={s.dashTxTime}>{tx.time}</p>
                      </div>
                      <p style={{ ...s.dashTxPts, color: tx.up ? '#25B7C8' : '#F2B84B' }}>{tx.pts}</p>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            )}
          </div>
        </section>

        {/* ── Stats band ── */}
        <FadeInSection>
          <div style={{ ...s.statsBand, padding: isMobile ? '36px 24px' : '44px 64px' }}>
            <div style={{ ...s.statsRow, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '28px' : '0' }}>
              {[
                { value: '60%', label: 'Repeat visit rate among Veniar customers' },
                { value: '4.8×', label: 'Higher lifetime value vs. non-loyalty customers' },
                { value: '25×', label: 'Return on investment for partner merchants' },
              ].map((st, i) => (
                <div key={i} style={{
                  ...s.statItem,
                  borderLeft: i > 0 && !isMobile ? '1px solid rgba(255,255,255,0.12)' : 'none',
                  paddingLeft: i > 0 && !isMobile ? '52px' : '0',
                }}>
                  <p style={s.statValue}>{st.value}</p>
                  <p style={s.statLabel}>{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* ── How it works ── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '96px 64px' }}>
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
                  <p style={s.stepTitle}>{step.title}</p>
                  <p style={s.stepDesc}>{step.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* ── For Customers ── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 24px' : '96px 64px' }}>
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
                  <p style={s.featureTitle}>{f.title}</p>
                  <p style={s.featureDesc}>{f.desc}</p>
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
              Veniar gives independent restaurants and local businesses a complete loyalty program,
              merchant dashboard, and access to a shared customer network — without the cost or
              complexity of building it alone.
            </p>
          </FadeInSection>
          <div style={{ ...s.threeGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr' }}>
            {FOR_BUSINESS.map((f, i) => (
              <FadeInSection key={f.tag} delay={i * 90}>
                <div className="vn-card" style={s.bizCard}>
                  <p style={{ ...s.featureTag, color: '#F2B84B', borderTopColor: '#F2B84B' }}>{f.tag}</p>
                  <p style={{ ...s.featureTitle, color: '#ffffff' }}>{f.title}</p>
                  <p style={{ ...s.featureDesc, color: 'rgba(255,255,255,0.54)' }}>{f.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Merchant mock dashboard */}
          <FadeInSection delay={200}>
            <div style={{ ...s.merchantMock, marginTop: isMobile ? '48px' : '64px' }}>
              <p style={s.merchantMockLabel}>MERCHANT VIEW — VENIAR DASHBOARD</p>
              <div style={{ ...s.fourGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr' }}>
                {MERCHANT_STATS.map((m, i) => (
                  <div key={i} className="vn-stat" style={s.merchantStat}>
                    <p style={s.merchantStatNum}>{m.v}</p>
                    <p style={s.merchantStatLbl}>{m.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={280}>
            <button className="vn-btn" style={s.bizCta} onClick={() => navigate('/business-overview')}>
              Learn about Veniar for Business →
            </button>
          </FadeInSection>
        </section>

        {/* ── Trust / Network ── */}
        <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '96px 64px' }}>
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
                  <p style={s.trustLabel}>{t.label}</p>
                  <p style={s.trustDesc}>{t.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '72px 24px' : '100px 64px', textAlign: 'center' }}>
          <FadeInSection>
            <p style={s.eyebrow}>GET STARTED</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.8rem', margin: '0 auto 16px', maxWidth: '540px' }}>
              Join the Veniar rewards network.
            </h2>
            <div className="vn-bar-animate" style={{ ...s.goldLine, margin: '0 auto 32px' }} />
            <p style={{ ...s.body, maxWidth: '460px', margin: '0 auto 40px' }}>
              Free to join. No credit card required. Start earning Veniar Points at your favorite
              local businesses.
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
            <p style={s.footerBrandName}>Veniar</p>
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
          <p style={s.footerCopy}>© {new Date().getFullYear()} Veniar. All rights reserved.</p>
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

  topBar: {
    height: '4px',
    background: '#25B7C8',
    position: 'relative',
    zIndex: 10,
    flexShrink: 0,
  },

  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
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
  heroInner: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroLeft: { flex: '0 0 auto' },
  heroRight: { flex: 1, display: 'flex', justifyContent: 'flex-end' },

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

  // ── Mock dashboard card (always dark for visual contrast) ──
  dashCard: {
    background: '#07243A',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '28px 24px',
    width: '320px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
    position: 'relative',
    zIndex: 1,
  },
  dashHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  dashLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: '0 0 6px',
  },
  dashBalance: {
    color: '#F2B84B',
    fontSize: '2.6rem',
    fontWeight: '900',
    letterSpacing: '-0.03em',
    lineHeight: 1,
    margin: 0,
  },
  dashBadge: {
    background: 'rgba(37,183,200,0.15)',
    border: '1px solid rgba(37,183,200,0.3)',
    color: '#25B7C8',
    fontSize: '9px',
    fontWeight: '800',
    letterSpacing: '2px',
    padding: '5px 10px',
    borderRadius: '6px',
    marginTop: '4px',
  },
  dashDivider: {
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    margin: '16px 0',
  },
  dashStats: {
    display: 'flex',
    gap: '0',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  dashStat: { flex: 1 },
  dashStatNum: {
    color: '#ffffff',
    fontSize: '1.4rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    margin: '0 0 3px',
  },
  dashStatLbl: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    margin: 0,
  },
  dashActivityLabel: {
    color: 'rgba(255,255,255,0.38)',
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: '0 0 12px',
  },
  dashTx: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '9px 8px',
    borderRadius: '8px',
    cursor: 'default',
  },
  dashTxName: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: '13px',
    fontWeight: '600',
    margin: '0 0 2px',
  },
  dashTxTime: {
    color: 'rgba(255,255,255,0.38)',
    fontSize: '11px',
    margin: 0,
  },
  dashTxPts: {
    fontSize: '13px',
    fontWeight: '700',
  },

  // ── Stats band (always dark) ──
  statsBand: {
    background: '#07243A',
    position: 'relative',
    zIndex: 1,
  },
  statsRow: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  statItem: { flex: 1, paddingRight: '52px' },
  statValue: {
    color: '#F2B84B',
    fontSize: '2.4rem',
    fontWeight: '900',
    letterSpacing: '-0.04em',
    margin: '0 0 6px',
    lineHeight: 1,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '13px',
    lineHeight: 1.5,
    margin: 0,
    maxWidth: '200px',
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

  // ── Merchant mock panel ──
  merchantMock: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    padding: '28px 24px',
  },
  merchantMockLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: '0 0 20px',
  },
  merchantStat: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '18px 16px',
    textAlign: 'center',
  },
  merchantStatNum: {
    color: '#25B7C8',
    fontSize: '1.6rem',
    fontWeight: '900',
    letterSpacing: '-0.03em',
    margin: '0 0 4px',
    lineHeight: 1,
  },
  merchantStatLbl: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '11px',
    lineHeight: 1.4,
    margin: 0,
  },

  bizCta: {
    marginTop: '36px',
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
