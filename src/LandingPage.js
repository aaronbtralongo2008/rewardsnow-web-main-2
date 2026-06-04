import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';

const LOGO_HEADER = process.env.PUBLIC_URL + '/logo514.png';

const STATS = [
  { value: '60%', label: 'of customers are repeat visitors at businesses with loyalty programs' },
  { value: '4.8×', label: 'average ROI reported by loyalty program operators' },
  { value: '25×', label: 'costlier to acquire a new customer than retain an existing one' },
];

const FOR_CUSTOMERS = [
  { tag: 'EARN', title: 'Points on every purchase', desc: 'Shop at any participating Veniar business and earn points automatically — no punch card required.' },
  { tag: 'REDEEM', title: 'Spend anywhere in the network', desc: 'Points earned at the coffee shop work at the restaurant across town. One balance, every partner.' },
  { tag: 'DISCOVER', title: 'Find your next local favorite', desc: 'Browse the Veniar directory by category, distance, and tag to find places worth visiting.' },
];

const FOR_BUSINESS = [
  { tag: 'INFRASTRUCTURE', title: 'Zero software ops', desc: 'We handle the platform. Your staff uses a simple web interface. No POS integration required.' },
  { tag: 'DISCOVERY', title: 'Get in front of new customers', desc: 'Every Veniar customer is a potential first-time visitor to your business.' },
  { tag: 'CONTROL', title: 'Set your own point values', desc: 'You decide how many points purchases earn and what redemptions cost. Adjust anytime.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();

  const s = getStyles(isDark, isMobile);

  return (
    <div style={s.root}>
      {/* ── Teal accent top bar ─────────────────────────────────────────── */}
      <div className="vn-top-bar" style={{ height: '4px', background: '#25B7C8', position: 'sticky', top: 0, zIndex: 101 }} />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <header style={s.nav} aria-label="Main navigation">
        <div style={s.navInner}>
          <button style={s.brandBtn} onClick={() => navigate('/')} aria-label="Veniar home">
            <img src={LOGO_HEADER} alt="Veniar" style={{ height: '34px', width: 'auto', display: 'block' }} />
          </button>
          <nav style={s.navLinks} aria-label="Site links">
            <button className="vn-nav-link" style={s.navLink} onClick={() => navigate('/business-overview')}>For Business</button>
            <button className="vn-nav-link" style={s.navLink} onClick={() => navigate('/signin')}>Sign in</button>
            <button className="vn-btn" style={s.navCta} onClick={() => navigate('/register')}>Join Veniar →</button>
            <button style={s.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">{isDark ? '○' : '●'}</button>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section style={s.hero}>
          <div style={s.heroInner}>
            {/* Left: copy */}
            <div style={s.heroLeft}>
              <p style={s.eyebrow}>LOCAL REWARDS NETWORK</p>
              <h1 className="vn-fade-up" style={s.heroTitle}>
                Shared rewards<br />for local favorites.
              </h1>
              <div className="vn-bar-animate" style={s.goldBar} />
              <p className="vn-fade-up vn-delay-1" style={s.heroSub}>
                Veniar connects independent businesses into one loyalty network.
                Earn points anywhere, spend them everywhere.
              </p>
              <div className="vn-fade-up vn-delay-2" style={s.heroCtas}>
                <button className="vn-btn" style={s.ctaPrimary} onClick={() => navigate('/register')}>
                  Get started free
                </button>
                <button className="vn-btn-ghost" style={s.ctaSecondary} onClick={() => navigate('/business-overview')}>
                  For business owners
                </button>
              </div>
              <div style={s.heroMeta}>
                <span style={s.heroMetaDot} />
                <span style={s.heroMetaText}>No fees for customers · Free to join</span>
              </div>
            </div>

            {/* Right: mock dashboard card */}
            {!isMobile && (
              <div className="vn-fade-up vn-delay-1" style={s.dashPreview}>
                <div style={s.dashHeader}>
                  <span style={s.dashLabel}>VENIAR DASHBOARD</span>
                  <span style={{ ...s.dashLabel, color: '#25B7C8' }}>● LIVE</span>
                </div>
                <div style={s.dashDivider} />

                {/* Balance */}
                <div style={s.dashBalance}>
                  <p style={s.dashBalanceLabel}>VENIAR POINTS</p>
                  <p className="vn-gold-glow" style={s.dashBalanceNum}>2,840</p>
                  <p style={s.dashBalanceSub}>Available across all partners</p>
                </div>

                <div style={s.dashDivider} />

                {/* Stats row */}
                <div style={s.dashStats}>
                  {[
                    { val: '14', label: 'Visits this month' },
                    { val: '6', label: 'Partners nearby' },
                    { val: '+120', label: 'Points this week' },
                  ].map(m => (
                    <div key={m.label} style={s.dashStat}>
                      <p style={s.dashStatVal}>{m.val}</p>
                      <p style={s.dashStatLabel}>{m.label}</p>
                    </div>
                  ))}
                </div>

                <div style={s.dashDivider} />

                {/* Recent activity */}
                <p style={s.dashSectionLabel}>RECENT ACTIVITY</p>
                {[
                  { biz: 'Harbor Coffee Co.', pts: '+80', color: '#2e7d52' },
                  { biz: 'Midtown Sandwich', pts: '+60', color: '#2e7d52' },
                  { biz: 'Pier Street Tacos', pts: '−200', color: '#dc2626' },
                ].map((tx, i) => (
                  <div key={i} style={s.dashTx}>
                    <div style={s.dashTxDot} />
                    <span style={s.dashTxBiz}>{tx.biz}</span>
                    <span style={{ ...s.dashTxPts, color: tx.color }}>{tx.pts} pts</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Stats band ─────────────────────────────────────────────────── */}
        <section style={s.statsBand}>
          <div style={s.statsInner}>
            {STATS.map(st => (
              <div key={st.value} className="vn-stat" style={s.statItem}>
                <p style={s.statValue}>{st.value}</p>
                <p style={s.statLabel}>{st.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section style={s.darkBand}>
          <div style={s.sectionInner}>
            <p style={s.tagOnDark}>HOW IT WORKS</p>
            <h2 className="vn-fade-up" style={s.h2Dark}>Shop local. Earn points. Redeem anywhere.</h2>
            <div style={s.goldLine} />
            <div style={s.stepGrid}>
              {[
                { n: 'VN·01', title: 'Shop at a Veniar partner', desc: 'Give your phone number at checkout at any participating independent business.' },
                { n: 'VN·02', title: 'Points land in your account', desc: 'Veniar Points are added to your balance immediately after every qualifying purchase.' },
                { n: 'VN·03', title: 'Redeem across the network', desc: 'Use your points at any partner — the restaurant, café, shop, or service you choose.' },
              ].map(step => (
                <div key={step.n} className="vn-card" style={s.stepCard}>
                  <span className="vn-teal-glow" style={s.stepN}>{step.n}</span>
                  <p style={s.stepTitle}>{step.title}</p>
                  <p style={s.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Customers ──────────────────────────────────────────────── */}
        <section style={s.lightBand}>
          <div style={s.sectionInner}>
            <p style={s.tag}>FOR CUSTOMERS</p>
            <h2 className="vn-fade-up" style={s.h2}>Every local purchase, rewarded.</h2>
            <div style={s.goldLine} />
            <div style={s.featureGrid}>
              {FOR_CUSTOMERS.map(f => (
                <div key={f.tag} className="vn-card" style={s.featureCard}>
                  <span style={s.featureTag}>{f.tag}</span>
                  <p style={s.featureTitle}>{f.title}</p>
                  <p style={s.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
            <div style={s.featureCta}>
              <button className="vn-btn" style={s.ctaPrimary} onClick={() => navigate('/register')}>
                Create a free account
              </button>
            </div>
          </div>
        </section>

        {/* ── For Business ───────────────────────────────────────────────── */}
        <section style={s.darkBand}>
          <div style={s.sectionInner}>
            <p style={s.tagOnDark}>FOR BUSINESS OWNERS</p>
            <h2 className="vn-fade-up" style={s.h2Dark}>Loyalty that works from day one.</h2>
            <div style={s.goldLine} />
            <div style={s.featureGrid}>
              {FOR_BUSINESS.map(f => (
                <div key={f.tag} className="vn-card" style={s.bizCard}>
                  <span style={s.bizTag}>{f.tag}</span>
                  <p style={s.bizTitle}>{f.title}</p>
                  <p style={s.bizDesc}>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Merchant dashboard mock */}
            <div style={s.merchantMock}>
              <div style={s.merchantMockHeader}>
                <span style={s.dashLabel}>MERCHANT VIEW · Veniar Partner Dashboard</span>
              </div>
              <div style={s.merchantMockBody}>
                {[
                  { label: 'Points Issued Today', val: '1,240', color: '#2e7d52', bg: 'rgba(46,125,82,0.18)' },
                  { label: 'Points Redeemed', val: '680', color: '#dc2626', bg: 'rgba(220,38,38,0.15)' },
                  { label: 'Active Customers', val: '38', color: '#1565C4', bg: 'rgba(21,101,196,0.18)' },
                  { label: 'Network Referrals', val: '12', color: '#F2B84B', bg: 'rgba(242,184,75,0.18)' },
                ].map(m => (
                  <div key={m.label} className="vn-stat" style={{ ...s.merchantStat, background: m.bg }}>
                    <p style={{ ...s.merchantStatVal, color: m.color }}>{m.val}</p>
                    <p style={s.merchantStatLabel}>{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={s.featureCta}>
              <button className="vn-btn" style={s.ctaPrimary} onClick={() => navigate('/business-overview')}>
                Learn how to partner
              </button>
              <button className="vn-btn-ghost" style={s.ctaGhostDark} onClick={() => navigate('/business-register')}>
                Apply now
              </button>
            </div>
          </div>
        </section>

        {/* ── Trust band ─────────────────────────────────────────────────── */}
        <section style={s.lightBand}>
          <div style={{ ...s.sectionInner, textAlign: 'center' }}>
            <p style={s.tag}>NETWORK INFRASTRUCTURE</p>
            <h2 className="vn-fade-up" style={{ ...s.h2, maxWidth: '600px', margin: '0 auto 20px' }}>
              Built on shared infrastructure.<br />Stronger every time a business joins.
            </h2>
            <div style={{ ...s.goldLine, margin: '0 auto 28px' }} />
            <p style={{ ...s.body, maxWidth: '540px', margin: '0 auto 40px' }}>
              When a new business joins Veniar, every existing customer gains a new place to spend their points.
              When a new customer joins, every business gains a potential new visitor.
            </p>
            <div style={s.trustGrid}>
              {[
                { icon: '◈', label: 'Shared point network', sub: 'Points work at every partner, not just one.' },
                { icon: '◎', label: 'Merchant controls', sub: 'Set your own earn and redeem rates anytime.' },
                { icon: '◐', label: 'No POS required', sub: 'Works with any setup via a simple web portal.' },
                { icon: '◉', label: 'Local-first design', sub: 'Built for independent restaurants and retail.' },
              ].map(t => (
                <div key={t.label} className="vn-card" style={s.trustCard}>
                  <span style={s.trustIcon}>{t.icon}</span>
                  <p style={s.trustLabel}>{t.label}</p>
                  <p style={s.trustSub}>{t.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom teal accent ─────────────────────────────────────────── */}
        <div className="vn-top-bar" style={{ height: '4px', background: '#25B7C8' }} />

        {/* ── Footer CTA ─────────────────────────────────────────────────── */}
        <section style={s.ctaBand}>
          <div style={{ ...s.sectionInner, textAlign: 'center' }}>
            <p style={s.tagOnDark}>GET STARTED</p>
            <h2 className="vn-fade-up" style={{ ...s.h2Dark, fontSize: isMobile ? '2rem' : '2.8rem', maxWidth: '560px', margin: '0 auto 20px' }}>
              Start earning rewards at your local favorites.
            </h2>
            <div style={{ ...s.goldLine, margin: '0 auto 28px' }} />
            <p style={{ ...s.bodyOnDark, maxWidth: '440px', margin: '0 auto 36px' }}>
              Free to join for customers. Independent businesses apply to become Veniar partners.
            </p>
            <div style={s.heroCtas}>
              <button className="vn-btn" style={s.ctaPrimary} onClick={() => navigate('/register')}>
                Create free account
              </button>
              <button className="vn-btn-ghost" style={s.ctaGhostDark} onClick={() => navigate('/business-overview')}>
                Partner your business
              </button>
            </div>
          </div>
        </section>

        {/* ── Deep Footer ────────────────────────────────────────────────── */}
        <footer style={s.footer}>
          <div style={s.footerInner}>
            <div style={s.footerTop}>
              {/* Brand column */}
              <div style={s.footerBrand}>
                <img src={LOGO_HEADER} alt="Veniar" style={{ height: '32px', marginBottom: '14px', opacity: 0.9 }} />
                <p style={s.footerTagline}>Shared rewards for local commerce.</p>
                <p style={s.footerMeta}>Veniar is a local rewards network connecting independent businesses and community customers.</p>
              </div>

              {/* Links */}
              {!isMobile && (
                <>
                  <div style={s.footerCol}>
                    <p style={s.footerColHead}>Product</p>
                    <button style={s.footerLink} onClick={() => navigate('/register')}>Join as a customer</button>
                    <button style={s.footerLink} onClick={() => navigate('/signin')}>Sign in</button>
                    <button style={s.footerLink} onClick={() => navigate('/businesses')}>Browse partners</button>
                    <button style={s.footerLink} onClick={() => navigate('/map')}>Partner map</button>
                  </div>
                  <div style={s.footerCol}>
                    <p style={s.footerColHead}>For Business</p>
                    <button style={s.footerLink} onClick={() => navigate('/business-overview')}>Overview</button>
                    <button style={s.footerLink} onClick={() => navigate('/business-register')}>Apply to partner</button>
                    <button style={s.footerLink} onClick={() => navigate('/business-owner')}>Business sign in</button>
                    <button style={s.footerLink} onClick={() => navigate('/employee')}>Staff portal</button>
                  </div>
                  <div style={s.footerCol}>
                    <p style={s.footerColHead}>Company</p>
                    <button style={s.footerLink} onClick={() => {}}>About</button>
                    <button style={s.footerLink} onClick={() => {}}>Contact</button>
                    <button style={s.footerLink} onClick={() => {}}>Terms of Service</button>
                    <button style={s.footerLink} onClick={() => {}}>Privacy Policy</button>
                  </div>
                </>
              )}
            </div>

            <div style={s.footerDivider} />

            <div style={s.footerBottom}>
              <p style={s.footerCopy}>© {new Date().getFullYear()} Veniar. All rights reserved.</p>
              <div style={s.footerBottomRight}>
                <span style={s.footerTeal}>● </span>
                <span style={s.footerMetaSmall}>Veniar Network</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function getStyles(isDark, isMobile) {
  const navBg = '#061A2A';

  return {
    root: {
      minHeight: '100vh',
      background: isDark ? '#061A2A' : '#FFF8EA',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    },

    // Nav
    nav: {
      background: navBg,
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'sticky',
      top: '4px',
      zIndex: 100,
    },
    navInner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px',
      padding: isMobile ? '0 20px' : '0 64px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    brandBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
    navLinks: { display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px' },
    navLink: {
      background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)',
      fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 10px',
      borderRadius: '6px', fontFamily: 'inherit',
      display: isMobile ? 'none' : 'block',
    },
    navCta: {
      padding: '8px 18px', background: '#F2B84B', border: 'none',
      color: '#061A2A', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
      cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
    },
    themeBtn: {
      background: 'none', border: '1px solid rgba(255,255,255,0.2)',
      color: 'rgba(255,255,255,0.6)', borderRadius: '6px', padding: '5px 10px',
      fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit',
    },

    // Hero
    hero: { background: '#061A2A', padding: isMobile ? '72px 24px 64px' : '100px 64px 88px' },
    heroInner: {
      maxWidth: '1200px', margin: '0 auto',
      display: 'flex', alignItems: 'flex-start',
      gap: '64px',
      flexDirection: isMobile ? 'column' : 'row',
    },
    heroLeft: { flex: 1, maxWidth: '520px' },
    eyebrow: {
      color: '#F2B84B', fontSize: '11px', fontWeight: '700',
      letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 20px',
    },
    heroTitle: {
      color: '#fff', fontWeight: '900', fontSize: isMobile ? '2.8rem' : '4.4rem',
      lineHeight: 1.04, letterSpacing: '-0.03em', margin: '0 0 24px',
    },
    goldBar: {
      width: '52px', height: '4px', background: '#F2B84B',
      borderRadius: '2px', marginBottom: '24px',
    },
    heroSub: {
      color: 'rgba(255,255,255,0.55)', fontSize: '17px',
      lineHeight: 1.75, margin: '0 0 36px',
    },
    heroCtas: {
      display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'flex-start',
    },
    ctaPrimary: {
      padding: '14px 28px', background: '#1565C4', border: 'none',
      color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: '700',
      cursor: 'pointer', fontFamily: 'inherit',
    },
    ctaSecondary: {
      padding: '14px 24px', background: '#E86F2E', border: 'none',
      color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: '600',
      cursor: 'pointer', fontFamily: 'inherit',
    },
    heroMeta: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' },
    heroMetaDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#25B7C8', flexShrink: 0 },
    heroMetaText: { color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: '500' },

    // Dashboard mock
    dashPreview: {
      width: '340px', flexShrink: 0,
      background: '#0C2640', borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: '20px',
      boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
    },
    dashHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    dashLabel: { color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em' },
    dashDivider: { height: '1px', background: 'rgba(255,255,255,0.06)', margin: '16px 0' },
    dashBalance: { textAlign: 'center', padding: '8px 0' },
    dashBalanceLabel: { color: '#25B7C8', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em', margin: '0 0 6px' },
    dashBalanceNum: { color: '#F2B84B', fontSize: '3rem', fontWeight: '900', lineHeight: 1, letterSpacing: '-0.04em', margin: '0 0 6px' },
    dashBalanceSub: { color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: 0 },
    dashStats: { display: 'flex', gap: '0', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' },
    dashStat: { flex: 1, padding: '12px 8px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' },
    dashStatVal: { color: '#fff', fontSize: '1.3rem', fontWeight: '800', margin: '0 0 2px', letterSpacing: '-0.02em' },
    dashStatLabel: { color: 'rgba(255,255,255,0.4)', fontSize: '10px', margin: 0, lineHeight: 1.3 },
    dashSectionLabel: { color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: '700', letterSpacing: '0.12em', margin: '0 0 10px' },
    dashTx: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' },
    dashTxDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#25B7C8', flexShrink: 0 },
    dashTxBiz: { flex: 1, color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: '500' },
    dashTxPts: { fontSize: '12px', fontWeight: '700', flexShrink: 0 },

    // Stats band
    statsBand: {
      background: isDark ? '#0C2640' : '#ffffff',
      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    },
    statsInner: {
      maxWidth: '1200px', margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '0',
    },
    statItem: {
      padding: isMobile ? '28px 24px' : '40px 40px',
      borderRight: isMobile ? 'none' : `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      borderBottom: isMobile ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` : 'none',
    },
    statValue: {
      color: '#F2B84B', fontSize: isMobile ? '2.2rem' : '2.8rem', fontWeight: '900',
      letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 8px',
    },
    statLabel: { color: isDark ? 'rgba(255,255,255,0.5)' : '#5F6B73', fontSize: '13px', lineHeight: 1.6, margin: 0 },

    // Section wrappers
    sectionInner: { maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '64px 24px' : '88px 64px' },
    darkBand: { background: '#061A2A' },
    lightBand: { background: isDark ? '#0A1F30' : '#FFF8EA' },
    ctaBand: { background: '#061A2A' },

    // Typography
    tag: { color: '#F2B84B', fontSize: '11px', fontWeight: '700', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 16px' },
    tagOnDark: { color: '#F2B84B', fontSize: '11px', fontWeight: '700', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 16px' },
    h2: { color: isDark ? '#fff' : '#061A2A', fontSize: isMobile ? '2rem' : '2.6rem', fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px' },
    h2Dark: { color: '#fff', fontSize: isMobile ? '2rem' : '2.6rem', fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px' },
    goldLine: { width: '48px', height: '3px', background: '#F2B84B', borderRadius: '2px', marginBottom: '40px' },
    body: { color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73', fontSize: '15px', lineHeight: 1.8, margin: '0 0 16px' },
    bodyOnDark: { color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.8, margin: '0 0 16px' },

    // Step cards
    stepGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '16px', marginTop: '40px',
    },
    stepCard: {
      background: '#0C2640', borderRadius: '14px', padding: '28px 24px',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    stepN: { color: '#25B7C8', fontSize: '11px', fontWeight: '800', letterSpacing: '0.25em', display: 'block', marginBottom: '16px' },
    stepTitle: { color: '#fff', fontSize: '15px', fontWeight: '700', margin: '0 0 8px' },
    stepDesc: { color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.65, margin: 0 },

    // Feature cards
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '16px', marginTop: '40px',
    },
    featureCard: {
      background: isDark ? '#0C2640' : '#ffffff', borderRadius: '14px', padding: '28px 24px',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      borderTop: '3px solid #1565C4',
    },
    featureTag: { color: '#1565C4', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em', display: 'block', marginBottom: '12px' },
    featureTitle: { color: isDark ? '#fff' : '#061A2A', fontSize: '15px', fontWeight: '700', margin: '0 0 8px' },
    featureDesc: { color: isDark ? 'rgba(255,255,255,0.55)' : '#5F6B73', fontSize: '13px', lineHeight: 1.65, margin: 0 },
    featureCta: { marginTop: '32px', display: 'flex', gap: '14px', flexWrap: 'wrap' },

    // Business cards
    bizCard: {
      background: '#0C2640', borderRadius: '14px', padding: '28px 24px',
      border: '1px solid rgba(255,255,255,0.1)',
      borderTop: '3px solid #F2B84B',
    },
    bizTag: { color: '#F2B84B', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em', display: 'block', marginBottom: '12px' },
    bizTitle: { color: '#fff', fontSize: '15px', fontWeight: '700', margin: '0 0 8px' },
    bizDesc: { color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.65, margin: 0 },

    // Merchant mock
    merchantMock: {
      marginTop: '40px', borderRadius: '14px', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    merchantMockHeader: {
      background: '#0C2640', padding: '14px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    merchantMockBody: {
      background: '#071E2E',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      gap: '1px',
    },
    merchantStat: { padding: '20px', textAlign: 'center' },
    merchantStatVal: { fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '900', lineHeight: 1, margin: '0 0 6px', letterSpacing: '-0.03em' },
    merchantStatLabel: { color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: '600', margin: 0 },

    // Trust grid
    trustGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      gap: '14px', marginTop: '40px',
    },
    trustCard: {
      background: isDark ? '#0C2640' : '#ffffff', borderRadius: '12px', padding: '24px 18px',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      textAlign: 'center',
    },
    trustIcon: { color: '#25B7C8', fontSize: '1.6rem', display: 'block', marginBottom: '12px' },
    trustLabel: { color: isDark ? '#fff' : '#061A2A', fontSize: '13px', fontWeight: '700', margin: '0 0 6px' },
    trustSub: { color: isDark ? 'rgba(255,255,255,0.5)' : '#5F6B73', fontSize: '12px', lineHeight: 1.6, margin: 0 },

    ctaGhostDark: {
      padding: '14px 24px', background: 'transparent',
      border: '1.5px solid rgba(255,255,255,0.25)',
      color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: '600',
      cursor: 'pointer', fontFamily: 'inherit',
    },

    // Footer
    footer: { background: '#040F19', borderTop: '1px solid rgba(255,255,255,0.06)' },
    footerInner: { maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '48px 24px 32px' : '72px 64px 40px' },
    footerTop: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
      gap: isMobile ? '32px' : '48px',
      marginBottom: '48px',
    },
    footerBrand: {},
    footerTagline: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '600', margin: '0 0 10px' },
    footerMeta: { color: 'rgba(255,255,255,0.35)', fontSize: '12px', lineHeight: 1.7, margin: 0, maxWidth: '280px' },
    footerCol: { display: 'flex', flexDirection: 'column', gap: '10px' },
    footerColHead: { color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' },
    footerLink: {
      background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)',
      fontSize: '13px', fontWeight: '400', cursor: 'pointer', padding: 0,
      textAlign: 'left', fontFamily: 'inherit', transition: 'color 0.15s',
    },
    footerDivider: { height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '24px' },
    footerBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' },
    footerCopy: { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 },
    footerBottomRight: { display: 'flex', alignItems: 'center', gap: '4px' },
    footerTeal: { color: '#25B7C8', fontSize: '10px' },
    footerMetaSmall: { color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em' },
  };
}
