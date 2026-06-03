import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';

export default function BusinessOverview() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div style={s.root}>
      <nav style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <button style={s.backBtn} onClick={() => navigate('/')}>← Back</button>
        <span style={s.brand}>RewardsNow</span>
        <button style={s.navBtn} onClick={() => navigate('/business-owner')}>Business sign in</button>
      </nav>

      <section style={{ ...s.hero, padding: isMobile ? '72px 24px 56px' : '100px 80px 64px' }}>
        <p style={s.eyebrow}>FOR BUSINESS PARTNERS</p>
        <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.4rem' : '3.8rem' }}>
          RewardsNow - A profit strategy for customer acquisition and retention
        </h1>
        <div style={s.goldBar} />
        <p style={{ ...s.heroSub, maxWidth: '540px' }}>
          RewardsNowtm is YOUR business&apos;s answer to big competitor advertising budgets and how to stop them from poaching your customers
        </p>
        <button style={s.ctaPrimary} onClick={() => navigate('/business-register')}>Apply to partner</button>
      </section>

      <section style={{ ...s.section, padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <div style={s.contentMax}>
          <p style={s.tag}>THE RESEARCH</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>What studies show</h2>
          <div style={s.goldLine} />
          <p style={s.body}>
            Across the market, studies consistently show that businesses with loyalty and rewards programs outperform those without:
          </p>
          <div style={{ ...s.statsGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px', marginTop: '40px' }}>
            {[
              { value: '60%', label: 'of small business customers are repeat customers' },
              { value: '4.8-5.2×', label: 'ROI reported by 90% of loyalty program owners' },
              { value: '25×', label: 'costlier to acquire new customers than retain existing' },
              { value: '$50K-$200K', label: 'average launch cost for a small business loyalty program' },
            ].map(item => (
              <div key={item.value} style={s.stat}>
                <p style={s.statValue}>{item.value}</p>
                <p style={s.statLabel}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...s.sectionAlt, padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <div style={s.contentMax}>
          <p style={s.tag}>THE PROBLEM</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>The loyalty program challenge</h2>
          <div style={s.goldLine} />
          <p style={s.body}>
            Building your own loyalty program costs $50,000–$200,000 to launch. Add software operations, marketing, and customer acquisition, and traditional programs still don't help you find new customers — they only keep existing ones.
          </p>
          <p style={s.body}>
            RewardsNow amplifies the advantages of rewards systems and solves what they don't address: finding new customers and the large implementation losses for small businesses.
          </p>
          <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginTop: '32px' }}>
            {[
              { problem: 'High launch costs', solution: 'We handle infrastructure. Zero software ops for you.' },
              { problem: 'No new customer discovery', solution: 'Our network brings exposure to every partner\'s customer base.' },
              { problem: 'Complex integrations', solution: 'Your staff authenticates transactions via simple web interface.' },
              { problem: 'Isolated loyalty', solution: 'Points work everywhere, making them more valuable to customers.' },
            ].map(p => (
              <div key={p.problem} style={s.problemCard}>
                <p style={s.problem}>✗ {p.problem}</p>
                <p style={s.solution}>✓ {p.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...s.section, padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <div style={s.contentMax}>
          <p style={s.tag}>HOW IT WORKS</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>Simple onboarding</h2>
          <div style={s.goldLine} />
          <p style={s.body}>
            A willing business submits basic information through our partner portal and connects with a RewardsNow team member. You configure which services earn or spend points. Your store managers authenticate customer transactions through our simple interface. That&apos;s it.
          </p>
          <div style={{ ...s.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginTop: '40px' }}>
            {[
              { n: '01', title: 'Submit application', desc: 'Reviewed by the RewardsNow team.' },
              { n: '02', title: 'Configure services', desc: 'Set point values and pricing.' },
              { n: '03', title: 'Start earning', desc: 'Reward your customers immediately.' },
            ].map(step => (
              <div key={step.n} style={s.stepCard}>
                <span style={s.stepNum}>{step.n}</span>
                <p style={s.stepTitle}>{step.title}</p>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...s.ctaFooter, padding: isMobile ? '56px 24px' : '80px 80px', textAlign: 'center' }}>
        <h2 style={{ ...s.h2White, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>Ready to grow your business?</h2>
        <p style={{ ...s.body, color: 'rgba(255,255,255,0.6)', marginBottom: '36px' }}>Our team reviews every application and will contact you by email once approved.</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={s.ctaPrimary} onClick={() => navigate('/business-register')}>Apply now</button>
          <button style={s.ctaGhost} onClick={() => navigate('/business-owner')}>Business sign in</button>
        </div>
      </section>
    </div>
  );
}

const s = {
  root: { minHeight: '100vh', background: '#FFF8EA', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", position: 'relative' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', position: 'sticky', top: 0, zIndex: 100, background: '#07243A', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  backBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  brand: { color: '#F2B84B', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.01em' },
  navBtn: { padding: '7px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  hero: { position: 'relative' },
  eyebrow: { color: '#F2B84B', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 20px' },
  heroTitle: { color: '#101820', fontWeight: '900', lineHeight: 1.06, letterSpacing: '-0.03em', margin: '0 0 24px' },
  goldBar: { width: '56px', height: '3px', background: '#F2B84B', borderRadius: '2px', marginBottom: '24px' },
  heroSub: { color: '#5F6B73', fontSize: '17px', lineHeight: 1.7, margin: '0 0 36px' },
  ctaPrimary: { padding: '14px 28px', background: '#0B5CAD', border: 'none', color: '#ffffff', borderRadius: '6px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' },
  ctaGhost: { padding: '14px 28px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.25)', color: '#ffffff', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  section: { position: 'relative' },
  sectionAlt: { position: 'relative', background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' },
  ctaFooter: { position: 'relative', background: '#07243A' },
  contentMax: { maxWidth: '900px' },
  tag: { color: '#F2B84B', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 14px' },
  h2: { color: '#101820', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' },
  h2White: { color: '#ffffff', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' },
  goldLine: { width: '40px', height: '3px', background: '#F2B84B', borderRadius: '2px', marginBottom: '28px' },
  body: { color: '#5F6B73', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px' },
  statsGrid: { display: 'grid' },
  stat: { background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '22px 18px' },
  statValue: { color: '#0B5CAD', fontWeight: '900', letterSpacing: '-0.03em', margin: '0 0 8px', lineHeight: 1, fontSize: '1.8rem' },
  statLabel: { color: '#5F6B73', fontSize: '12px', lineHeight: 1.5, margin: 0 },
  grid: { display: 'grid' },
  problemCard: { background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '20px' },
  problem: { color: '#dc2626', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' },
  solution: { color: '#5F6B73', fontSize: '13px', lineHeight: 1.6, margin: 0 },
  stepsGrid: { display: 'grid' },
  stepCard: { background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '24px 20px' },
  stepNum: { display: 'inline-block', color: '#25B7C8', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', marginBottom: '12px' },
  stepTitle: { color: '#101820', fontSize: '15px', fontWeight: '700', margin: '0 0 8px' },
  stepDesc: { color: '#5F6B73', fontSize: '13px', lineHeight: 1.6, margin: 0 },
};
