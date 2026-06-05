import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import FadeInSection from './FadeInSection';

const EMPLOYEE_PORTAL_URL = process.env.REACT_APP_EMPLOYEE_PORTAL_URL || '/employee';
const EMPLOYEE_ROUTE = '/employee';

const WORKFLOW = [
  { n: '01', title: 'Submit business information', desc: 'Share basic details about your business so the team can review fit and next steps.' },
  { n: '02', title: 'Configure rewards and offers', desc: 'Set eligible offers, reward rules, and redemption options for your business.' },
  { n: '03', title: 'Use merchant tools', desc: 'Track redemptions, repeat visits, customer activity, referrals, and active offers.' },
  { n: '04', title: 'Participate in the network', desc: 'Become discoverable to customers using Veniar to find local businesses.' },
];

export default function BusinessOverview() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={s.root}>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <button style={s.backBtn} onClick={() => navigate('/')}>← Back</button>

        <button style={s.brandBtn} onClick={() => navigate('/')}>
          <span style={{fontStyle:'italic', fontWeight:800, fontSize:'1.4rem', color:'#1692A2', letterSpacing:'-0.03em'}}>Veniar</span>
        </button>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {!isMobile && (
            <button style={s.empNavLink} onClick={() => navigate(EMPLOYEE_ROUTE)}>
              Employee Portal
            </button>
          )}
          <button style={s.navBtn} onClick={() => navigate('/business-owner')}>Business sign in</button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ ...s.hero, padding: isMobile ? '72px 24px 56px' : '100px 80px 64px' }}>
        <FadeInSection>
        <p style={s.eyebrow}>FOR INDEPENDENT BUSINESSES</p>
        <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.4rem' : '3.8rem' }}>
          Shared rewards for customer retention and local discovery.
        </h1>
        <div style={s.goldBar} />
        <p style={{ ...s.heroSub, maxWidth: '560px' }}>
          <em>Veniar</em> gives independent businesses access to shared rewards, merchant-controlled offers, customer discovery, and reporting tools without requiring every business to build its own loyalty system from scratch.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button style={s.ctaPrimary} onClick={() => navigate('/business-register')}>Apply to join</button>
          <button style={s.ctaGhost} onClick={() => navigate('/business-owner')}>Business sign in</button>
        </div>
        <p style={{ color: 'rgba(255,248,234,0.50)', fontSize: '14px', marginTop: '20px', marginBottom: 0 }}>Built for restaurants, cafés, shops, and local service businesses.</p>
        </FadeInSection>
      </section>

      {/* ── Research stats ─────────────────────────────────────────────── */}
      <section style={{ ...s.section, padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <FadeInSection><div style={s.contentMax}>
          <p style={s.tag}>THE RESEARCH</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>What studies show</h2>
          <div style={s.goldLine} />
          <p style={s.body}>
            Across the market, studies consistently show that businesses with loyalty and rewards programs outperform those without:
          </p>
          <div style={{ ...s.statsGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px', marginTop: '40px' }}>
            {[
              { value: '60%', label: 'of small business customers are repeat customers' },
              { value: '4.8–5.2×', label: 'ROI reported by 90% of loyalty program owners' },
              { value: '25×', label: 'costlier to acquire new customers than retain existing ones' },
              { value: '$50K–$200K', label: 'average launch cost for a small-business loyalty program' },
            ].map(item => (
              <div key={item.value} style={s.stat}>
                <p style={s.statValue}>{item.value}</p>
                <p style={s.statLabel}>{item.label}</p>
              </div>
            ))}
          </div>
        </div></FadeInSection>
      </section>

      {/* ── The problem ────────────────────────────────────────────────── */}
      <section style={{ ...s.sectionAlt, padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <FadeInSection><div style={s.contentMax}>
          <p style={s.tag}>THE PROBLEM</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>The loyalty program challenge</h2>
          <div style={s.goldLine} />
          <p style={s.body}>
            Building your own loyalty program costs $50,000–$200,000 to launch. Add software operations, marketing, and customer acquisition, and traditional programs still don't help you find new customers — they only keep existing ones.
          </p>
          <p style={s.body}>
            Veniar removes those barriers — we handle the infrastructure, bring a shared customer network, and give your staff a simple interface to manage everything.
          </p>
          <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginTop: '32px' }}>
            {[
              { problem: 'High launch costs', solution: 'We handle infrastructure. Zero software ops on your end.' },
              { problem: 'No new customer discovery', solution: 'Our shared network exposes your business to every partner\'s customer base.' },
              { problem: 'Complex integrations', solution: 'Staff manage transactions through a simple, browser-based interface.' },
              { problem: 'Isolated loyalty silos', solution: 'Points work across every participating business, making them more valuable to customers.' },
            ].map(p => (
              <div key={p.problem} style={s.problemCard}>
                <p style={s.problem}>✗ {p.problem}</p>
                <p style={s.solution}>✓ {p.solution}</p>
              </div>
            ))}
          </div>
        </div></FadeInSection>
      </section>

      {/* ── How Veniar works for your business ───────────────────────────── */}
      <section style={{ ...s.section, padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <FadeInSection><div style={s.contentMax}>
          <p style={s.tag}>HOW IT WORKS</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>How Veniar works for your business</h2>
          <div style={s.goldLine} />
          <p style={s.body}>
            Veniar gives local businesses a simple workflow for managing customer rewards. Owners control the business account, configure services and reward options, and give employees access to the tools they need to help customers earn and redeem points.
          </p>
          <div style={{ ...s.workflowGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px', marginTop: '40px' }}>
            {WORKFLOW.map((step, i) => (
              <FadeInSection key={step.n} delay={i * 80} style={s.workflowCard}>
                <span style={s.workflowNum}>{step.n}</span>
                <p style={s.workflowTitle}>{step.title}</p>
                <p style={s.workflowDesc}>{step.desc}</p>
              </FadeInSection>
            ))}
          </div>

          {/* Employee portal callout inside workflow section */}
          <div style={{ ...s.empCallout, marginTop: '32px' }}>
            <div>
              <p style={s.empCalloutTitle}>Your employees need a separate sign-in</p>
              <p style={s.empCalloutDesc}>
                Staff use the Veniar employee portal — not the owner dashboard — to process customer transactions and reward redemptions.
              </p>
            </div>
            <button style={s.empCalloutBtn} onClick={() => navigate(EMPLOYEE_ROUTE)}>
              Send employees here →
            </button>
          </div>
        </div></FadeInSection>
      </section>

      {/* ── Simple onboarding ──────────────────────────────────────────── */}
      <section style={{ ...s.sectionAlt, padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <FadeInSection><div style={s.contentMax}>
          <p style={s.tag}>GETTING STARTED</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>Up and running in days, not months</h2>
          <div style={s.goldLine} />
          <p style={s.body}>
            Submit your application, connect with a Veniar team member, configure your services, and direct your staff to the employee portal. That's it.
          </p>
          <div style={{ ...s.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginTop: '40px' }}>
            {[
              { n: '01', title: 'Submit application', desc: 'Reviewed within 24–48 hours. No technical setup required.' },
              { n: '02', title: 'Configure your rewards', desc: 'Set point values for your services and menu items.' },
              { n: '03', title: 'Start rewarding', desc: 'Your customers earn and redeem points immediately.' },
            ].map(step => (
              <div key={step.n} style={s.stepCard}>
                <span style={s.stepNum}>{step.n}</span>
                <p style={s.stepTitle}>{step.title}</p>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div></FadeInSection>
      </section>

      {/* ── Employee portal CTA ────────────────────────────────────────── */}
      <section style={{ ...s.section, padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <div style={{ ...s.empSection, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '28px' : '48px' }}>
          <div style={{ flex: 1 }}>
            <p style={s.tag}>FOR YOUR STAFF</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.2rem' }}>Need employees to access Veniar?</h2>
            <div style={s.goldLine} />
            <p style={s.body}>
              Employees can use the Veniar employee portal to help customers earn and redeem rewards during day-to-day business operations. Share this link with your team — no owner credentials needed.
            </p>
            <button style={s.empBigBtn} onClick={() => navigate(EMPLOYEE_ROUTE)}>
              Open Employee Portal
            </button>
            <p style={s.empLinkNote}>{EMPLOYEE_PORTAL_URL}</p>
          </div>
          <div style={s.empBadgeBox}>
            <p style={s.empBadgeLabel}>Staff sign-in URL</p>
            <p style={s.empBadgeUrl}>{EMPLOYEE_PORTAL_URL}</p>
            <p style={s.empBadgeHint}>Copy and share with your employees</p>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ─────────────────────────────────────────────────── */}
      <section style={{ ...s.ctaFooter, padding: isMobile ? '56px 24px' : '80px 80px', textAlign: 'center' }}>
        <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>Ready to grow your business?</h2>
        <p style={{ ...s.body, marginBottom: '36px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
          Applications are reviewed within 24–48 hours. No long-term contract required.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <button style={s.ctaPrimary} onClick={() => navigate('/business-register')}>Apply now</button>
          <button style={s.ctaGhost} onClick={() => navigate('/business-owner')}>Business sign in</button>
        </div>
        <button style={s.footerEmpLink} onClick={() => navigate(EMPLOYEE_ROUTE)}>
          Employee portal
        </button>
      </section>
    </div>
  );
}

const s = {
  root: { minHeight: '100vh', background: 'var(--vn-bg, #FFF8EA)', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", position: 'relative', overflow: 'hidden' },

  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', position: 'sticky', top: 0, zIndex: 100, background: 'var(--vn-nav-bg, rgba(255,248,234,0.97))', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--vn-nav-border, rgba(16,24,32,0.08))' },
  backBtn: { background: 'none', border: 'none', color: 'var(--vn-text-sub)', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  brandBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', lineHeight: 0 },
  empNavLink: { padding: '7px 14px', background: 'rgba(242,184,75,0.12)', border: '1px solid rgba(242,184,75,0.28)', color: '#F2B84B', borderRadius: '8px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'inherit' },
  navBtn: { padding: '7px 14px', background: 'transparent', border: '1px solid var(--vn-card-border, rgba(16,24,32,0.18))', color: 'var(--vn-text)', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },

  hero: { position: 'relative', zIndex: 1 },
  eyebrow: { color: '#F2B84B', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 20px', textTransform: 'uppercase' },
  heroTitle: { color: 'var(--vn-text)', fontWeight: '900', lineHeight: 1.06, letterSpacing: '-0.03em', margin: '0 0 24px' },
  goldBar: { width: '48px', height: '3px', background: '#F2B84B', borderRadius: '2px', marginBottom: '24px' },
  heroSub: { color: 'var(--vn-text-sub)', fontSize: '17px', lineHeight: 1.7, margin: '0 0 36px' },
  ctaPrimary: { padding: '14px 28px', background: '#0E96CD', border: 'none', color: '#FFFFFF', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' },
  ctaGhost: { padding: '14px 28px', background: 'transparent', border: '1.5px solid var(--vn-card-border, rgba(16,24,32,0.18))', color: 'var(--vn-text)', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },

  section: { position: 'relative', zIndex: 1 },
  sectionAlt: { position: 'relative', zIndex: 1, background: 'var(--vn-panel, #F7E8CF)' },
  ctaFooter: { position: 'relative', zIndex: 1 },
  contentMax: { maxWidth: '900px' },

  tag: { color: '#F2B84B', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 14px', textTransform: 'uppercase' },
  h2: { color: 'var(--vn-text)', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' },
  goldLine: { width: '36px', height: '3px', background: '#F2B84B', borderRadius: '2px', marginBottom: '28px' },
  body: { color: 'var(--vn-text-sub)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px' },

  statsGrid: { display: 'grid' },
  stat: { background: 'var(--vn-card, #FFFFFF)', borderRadius: '14px', padding: '22px 18px' },
  statValue: { color: '#F2B84B', fontWeight: '900', letterSpacing: '-0.03em', margin: '0 0 8px', lineHeight: 1, fontSize: '1.8rem' },
  statLabel: { color: 'var(--vn-text-sub)', fontSize: '12px', lineHeight: 1.5, margin: 0 },

  grid: { display: 'grid' },
  problemCard: { background: 'var(--vn-card, #FFFFFF)', borderRadius: '12px', padding: '20px' },
  problem: { color: '#f87171', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' },
  solution: { color: 'var(--vn-text-sub)', fontSize: '13px', lineHeight: 1.6, margin: 0 },

  workflowGrid: { display: 'grid' },
  workflowCard: { background: 'var(--vn-card, #FFFFFF)', borderRadius: '16px', padding: '28px 24px' },
  workflowNum: { display: 'inline-block', color: '#F2B84B', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', marginBottom: '14px', background: 'rgba(242,184,75,0.12)', padding: '4px 10px', borderRadius: '20px' },
  workflowTitle: { color: 'var(--vn-text)', fontSize: '16px', fontWeight: '800', margin: '0 0 10px', letterSpacing: '-0.01em' },
  workflowDesc: { color: 'var(--vn-text-sub)', fontSize: '14px', lineHeight: 1.7, margin: 0 },

  empCallout: { background: 'rgba(242,184,75,0.08)', border: '1px solid rgba(242,184,75,0.22)', borderRadius: '16px', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' },
  empCalloutTitle: { color: 'var(--vn-text)', fontSize: '14px', fontWeight: '700', margin: '0 0 6px' },
  empCalloutDesc: { color: 'var(--vn-text-sub)', fontSize: '13px', lineHeight: 1.6, margin: 0, maxWidth: '480px' },
  empCalloutBtn: { padding: '12px 22px', background: '#0E96CD', border: 'none', color: '#FFFFFF', borderRadius: '10px', fontSize: '14px', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer', fontFamily: 'inherit' },

  stepsGrid: { display: 'grid' },
  stepCard: { background: 'var(--vn-card, #FFFFFF)', borderRadius: '14px', padding: '24px 20px' },
  stepNum: { display: 'inline-block', color: '#F2B84B', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', marginBottom: '12px' },
  stepTitle: { color: 'var(--vn-text)', fontSize: '15px', fontWeight: '700', margin: '0 0 8px' },
  stepDesc: { color: 'var(--vn-text-sub)', fontSize: '13px', lineHeight: 1.6, margin: 0 },

  empSection: { display: 'flex', alignItems: 'flex-start', position: 'relative', zIndex: 1, maxWidth: '900px' },
  empBigBtn: { display: 'inline-block', padding: '15px 32px', background: '#0E96CD', border: 'none', color: '#FFFFFF', borderRadius: '10px', fontSize: '15px', fontWeight: '700', marginBottom: '10px', cursor: 'pointer', fontFamily: 'inherit' },
  empLinkNote: { color: 'var(--vn-text-sub)', fontSize: '12px', margin: 0 },
  empBadgeBox: { background: 'var(--vn-card, #FFFFFF)', borderRadius: '16px', padding: '24px 28px', minWidth: '240px', flexShrink: 0 },
  empBadgeLabel: { color: '#F2B84B', fontSize: '10px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 10px' },
  empBadgeUrl: { color: 'var(--vn-text)', fontSize: '14px', fontWeight: '700', margin: '0 0 8px', wordBreak: 'break-all' },
  empBadgeHint: { color: 'var(--vn-text-sub)', fontSize: '12px', margin: 0 },

  footerEmpLink: { display: 'inline-block', marginTop: '24px', background: 'none', border: 'none', color: 'var(--vn-text-sub)', fontSize: '13px', textDecoration: 'underline', textDecorationColor: 'var(--vn-text-sub)', textUnderlineOffset: '3px', cursor: 'pointer', fontFamily: 'inherit', padding: 0 },
};
