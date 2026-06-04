import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';

export default function BusinessOverview() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();

  const s = getStyles(isDark);

  return (
    <div style={s.root}>
      {/* ── Teal accent line ───────────────────────────────────────────── */}
      <div className="vn-top-bar" style={{ height: '4px', background: '#25B7C8', position: 'sticky', top: 0, zIndex: 101 }} />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <button style={s.backBtn} onClick={() => navigate('/')}>← Back</button>
        <span style={s.brand}>Veniar</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={s.navBtn} onClick={() => navigate('/business-owner')}>Business sign in</button>
          <button onClick={toggleTheme} style={s.themeToggle}>
            {isDark ? '○ Light' : '● Dark'}
          </button>
        </div>
      </nav>

      {/* ── Hero — always deep flight dark band ────────────────────────── */}
      <section style={{ background: '#061A2A', padding: isMobile ? '72px 24px 56px' : '100px 80px 64px' }}>
        <p style={s.eyebrow}>FOR BUSINESS PARTNERS</p>
        <h1 className="vn-fade-up" style={{ ...s.heroTitle, fontSize: isMobile ? '2.4rem' : '3.8rem' }}>
          Veniar — Shared loyalty that brings new customers to your door.
        </h1>
        <div style={s.goldBar} />
        <p style={{ ...s.heroSub, maxWidth: '540px' }}>
          Independent restaurants and local businesses shouldn&apos;t need to build their own loyalty programs from scratch. Veniar gives them one — shared, connected, and stronger every time a new business joins.
        </p>
        <button className="vn-btn" style={s.ctaPrimary} onClick={() => navigate('/business-register')}>Apply to partner</button>
      </section>

      <main>
        {/* ── Research / Stats — theme-aware section ─────────────────────── */}
        <section style={{ ...s.section, padding: isMobile ? '56px 24px' : '80px 80px' }}>
          <div style={s.contentMax}>
            <p style={s.tag}>THE RESEARCH</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>What studies show</h2>
            <div style={s.goldLine} />
            <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', marginBottom: '28px' }} />
            <p style={s.body}>
              Across the market, studies consistently show that businesses with loyalty and rewards programs outperform those without:
            </p>
            <div
              style={{
                ...s.statsGrid,
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                gap: '12px',
                marginTop: '40px',
              }}
            >
              {[
                { value: '60%', label: 'of small business customers are repeat customers' },
                { value: '4.8-5.2×', label: 'ROI reported by 90% of loyalty program owners' },
                { value: '25×', label: 'costlier to acquire new customers than retain existing' },
                { value: '$50K-$200K', label: 'average launch cost for a small business loyalty program' },
              ].map(item => (
                <div key={item.value} className="vn-stat vn-card" style={s.stat}>
                  <p style={s.statValue}>{item.value}</p>
                  <p style={s.statLabel}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Problem — alt theme section ────────────────────────────────── */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '56px 24px' : '80px 80px' }}>
          <div style={s.contentMax}>
            <p style={s.tag}>THE PROBLEM</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>The loyalty program challenge</h2>
            <div style={s.goldLine} />
            <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', marginBottom: '28px' }} />
            <p style={s.body}>
              Building your own loyalty program costs $50,000–$200,000 to launch. Add software operations, marketing, and customer acquisition, and traditional programs still don't help you find new customers — they only keep existing ones.
            </p>
            <p style={s.body}>
              Veniar amplifies the advantages of rewards systems and solves what they don't address: finding new customers and the large implementation losses for small businesses.
            </p>
            <div
              style={{
                ...s.grid,
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '14px',
                marginTop: '32px',
              }}
            >
              {[
                { problem: 'High launch costs', solution: 'We handle infrastructure. Zero software ops for you.' },
                { problem: 'No new customer discovery', solution: "Our network brings exposure to every partner's customer base." },
                { problem: 'Complex integrations', solution: 'Your staff authenticates transactions via simple web interface.' },
                { problem: 'Isolated loyalty', solution: 'Points work everywhere, making them more valuable to customers.' },
              ].map(p => (
                <div key={p.problem} className="vn-card" style={s.problemCard}>
                  <p style={s.problem}>&#x2717; {p.problem}</p>
                  <p style={s.solution}>&#x2713; {p.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works — always dark band (Super Flight vibe) ────────── */}
        <section style={{ background: '#061A2A', padding: isMobile ? '56px 24px' : '80px 80px' }}>
          <div style={s.contentMax}>
            <p style={s.tagOnDark}>HOW IT WORKS</p>
            <h2 style={{ ...s.h2OnDark, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>Simple onboarding</h2>
            <div style={s.goldLine} />

            {/* Step indicators */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '36px' }}>
              {[
                { n: 'VN·01', label: 'Submit application' },
                { n: 'VN·02', label: 'Configure services' },
                { n: 'VN·03', label: 'Start earning' },
              ].map(step => (
                <div key={step.n} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span className="vn-teal-glow" style={s.stepIndicator}>{step.n}</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.4 }}>{step.label}</span>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '28px' }} />

            <p style={s.bodyOnDark}>
              A willing business submits basic information through our partner portal and connects with a Veniar team member. You configure which services earn or spend points. Your store managers authenticate customer transactions through our simple interface. That&apos;s it.
            </p>

            <div
              style={{
                ...s.stepsGrid,
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '16px',
                marginTop: '40px',
              }}
            >
              {[
                { n: '01', title: 'Submit application', desc: 'Reviewed by the Veniar team.' },
                { n: '02', title: 'Configure services', desc: 'Set point values and pricing.' },
                { n: '03', title: 'Start earning', desc: 'Reward your customers immediately.' },
              ].map(step => (
                <div key={step.n} className="vn-card" style={s.stepCard}>
                  <span style={s.stepNum}>{step.n}</span>
                  <p style={s.stepTitle}>{step.title}</p>
                  <p style={s.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom teal accent bar ─────────────────────────────────────── */}
        <div className="vn-top-bar" style={{ height: '4px', background: '#25B7C8' }} />

        {/* ── Footer CTA ─────────────────────────────────────────────────── */}
        <section
          style={{
            background: '#061A2A',
            padding: isMobile ? '56px 24px' : '80px 80px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ ...s.h2OnDark, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>Ready to grow your business?</h2>
          <p style={{ ...s.bodyOnDark, marginBottom: '36px' }}>
            Our team reviews every application and will contact you by email once approved.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="vn-btn" style={s.ctaPrimary} onClick={() => navigate('/business-register')}>Apply now</button>
            <button className="vn-btn vn-btn-ghost" style={s.ctaGhost} onClick={() => navigate('/business-owner')}>Business sign in</button>
          </div>
        </section>
      </main>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
function getStyles(isDark) {
  return {
    root: {
      minHeight: '100vh',
      background: isDark ? '#061A2A' : '#FFF8EA',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: 'relative',
    },

    // Nav — always dark (brand identity in both modes)
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px',
      position: 'sticky',
      top: '3px',
      zIndex: 100,
      background: '#061A2A',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'rgba(255,255,255,0.55)',
      fontSize: '13px',
      cursor: 'pointer',
      padding: 0,
      fontFamily: 'inherit',
    },
    brand: {
      color: '#F2B84B',
      fontSize: '16px',
      fontWeight: '800',
      letterSpacing: '-0.01em',
    },
    navBtn: {
      padding: '7px 14px',
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.2)',
      color: '#fff',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      fontFamily: 'inherit',
    },
    themeToggle: {
      padding: '5px 12px',
      background: 'none',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'rgba(255,255,255,0.7)',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '600',
      cursor: 'pointer',
      fontFamily: 'inherit',
      letterSpacing: '0.05em',
    },

    // Hero — always #07243A deep flight
    eyebrow: {
      color: '#F2B84B',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.22em',
      margin: '0 0 20px',
      textTransform: 'uppercase',
    },
    heroTitle: {
      color: '#ffffff',
      fontWeight: '900',
      lineHeight: 1.06,
      letterSpacing: '-0.03em',
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
      color: 'rgba(255,255,255,0.55)',
      fontSize: '17px',
      lineHeight: 1.7,
      margin: '0 0 36px',
    },

    // CTA buttons
    ctaPrimary: {
      padding: '14px 28px',
      background: '#1565C4',
      border: 'none',
      color: '#ffffff',
      borderRadius: '6px',
      fontSize: '15px',
      fontWeight: '700',
      cursor: 'pointer',
      fontFamily: 'inherit',
    },
    ctaGhost: {
      padding: '14px 28px',
      background: 'transparent',
      border: '1.5px solid rgba(255,255,255,0.25)',
      color: '#ffffff',
      borderRadius: '6px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      fontFamily: 'inherit',
    },

    // Theme-aware sections
    section: {
      background: isDark ? '#061A2A' : '#FFF8EA',
      position: 'relative',
    },
    sectionAlt: {
      background: isDark ? '#0A2030' : '#F7F1E3',
      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      position: 'relative',
    },
    contentMax: { maxWidth: '900px' },

    // Eyebrow tags
    tag: {
      color: '#F2B84B',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.22em',
      margin: '0 0 14px',
      textTransform: 'uppercase',
    },
    tagOnDark: {
      color: '#F2B84B',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.22em',
      margin: '0 0 14px',
      textTransform: 'uppercase',
    },

    // Headings
    h2: {
      color: isDark ? '#ffffff' : '#061A2A',
      fontWeight: '900',
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      margin: '0 0 20px',
    },
    h2OnDark: {
      color: '#ffffff',
      fontWeight: '900',
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      margin: '0 0 20px',
    },

    // Gold accent bar under headings
    goldLine: {
      width: '48px',
      height: '3px',
      background: '#F2B84B',
      borderRadius: '2px',
      marginBottom: '28px',
    },

    // Body text
    body: {
      color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73',
      fontSize: '16px',
      lineHeight: 1.8,
      margin: '0 0 20px',
    },
    bodyOnDark: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: '16px',
      lineHeight: 1.8,
      margin: '0 0 20px',
    },

    // Stats — dashboard-style metric cards
    statsGrid: { display: 'grid' },
    stat: {
      background: isDark ? '#0C2640' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      borderLeft: '3px solid #0B5CAD',
      borderRadius: '8px',
      padding: '22px 18px',
    },
    statValue: {
      color: isDark ? '#F2B84B' : '#1565C4',
      fontWeight: '900',
      letterSpacing: '-0.03em',
      margin: '0 0 8px',
      lineHeight: 1,
      fontSize: '1.8rem',
    },
    statLabel: {
      color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73',
      fontSize: '12px',
      lineHeight: 1.5,
      margin: 0,
    },

    // Problem / solution cards
    grid: { display: 'grid' },
    problemCard: {
      background: isDark ? '#0C2640' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      borderLeft: '3px solid #0B5CAD',
      borderRadius: '8px',
      padding: '20px',
    },
    problem: {
      color: '#dc2626',
      fontSize: '13px',
      fontWeight: '700',
      margin: '0 0 8px',
    },
    solution: {
      color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73',
      fontSize: '13px',
      lineHeight: 1.6,
      margin: 0,
    },

    // Step cards — in the dark band section
    stepsGrid: { display: 'grid' },
    stepCard: {
      background: '#0C2640',
      border: '1px solid rgba(255,255,255,0.1)',
      borderLeft: '3px solid #0B5CAD',
      borderRadius: '8px',
      padding: '24px 20px',
    },
    stepNum: {
      display: 'inline-block',
      color: '#25B7C8',
      fontSize: '11px',
      fontWeight: '800',
      letterSpacing: '0.3em',
      marginBottom: '12px',
    },
    stepTitle: {
      color: '#ffffff',
      fontSize: '15px',
      fontWeight: '700',
      margin: '0 0 8px',
    },
    stepDesc: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: '13px',
      lineHeight: 1.6,
      margin: 0,
    },

    // Step indicators in teal (VN·01 etc)
    stepIndicator: {
      color: '#25B7C8',
      fontSize: '11px',
      fontWeight: '800',
      letterSpacing: '0.3em',
    },
  };
}
