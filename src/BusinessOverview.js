import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';

export default function BusinessOverview() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div style={s.root}>
      <div style={s.orb1} />
      <div style={s.orb2} />
      <div style={s.orb3} />

      <nav style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <button style={s.backBtn} onClick={() => navigate('/')}>← Back</button>
        <span style={s.brand}>RewardsNow</span>
        <button style={s.navBtn} onClick={() => navigate('/business-owner')}>Business sign in</button>
      </nav>

      <section style={{ ...s.hero, padding: isMobile ? '72px 24px 56px' : '100px 80px 64px' }}>
        <p style={s.eyebrow}>FOR BUSINESS PARTNERS</p>
        <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.4rem' : '3.8rem' }}>
          Loyalty programs work.<br />RewardsNow makes them affordable.
        </h1>
        <div style={s.goldBar} />
        <p style={{ ...s.heroSub, maxWidth: '540px' }}>
          Research proves it: businesses with loyalty programs outperform the rest. The problem has always been cost and complexity. RewardsNow solves both.
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
            ].map(s => (
              <div key={s.value} style={s.stat}>
                <p style={s.statValue}>{s.value}</p>
                <p style={s.statLabel}>{s.label}</p>
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
          <p style={s.body}}>
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
            A willing business submits basic information through our partner portal and connects with a RewardsNow team member. You configure which services earn or spend points. Your store managers authenticate customer transactions through our simple interface. That's it.
          </p>
          <div style={{ ...s.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginTop: '40px' }}>
            {[
              { n: '01', title: 'Submit application', desc: 'Reviewed within 24–48 hours.' },
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
        <h2 style={{ ...s.h2, fontSize: isMobile ? '1.8rem' : '2.4rem' }}>Ready to grow your business?</h2>
        <p style={{ ...s.body, marginBottom: '36px' }}>Applications reviewed within 24–48 hours.</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={s.ctaPrimary} onClick={() => navigate('/business-register')}>Apply now</button>
          <button style={s.ctaGhost} onClick={() => navigate('/business-owner')}>Business sign in</button>
        </div>
      </section>
    </div>
  );
}

const s = {
  root: { minHeight: '100vh', background: '#08011a', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", position: 'relative', overflow: 'hidden' },
  orb1: { position: 'fixed', top: '-120px', left: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.45)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' },
  orb2: { position: 'fixed', bottom: '-100px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.22)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' },
  orb3: { position: 'fixed', top: '50%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(217, 70, 239, 0.15)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,1,26,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' },
  backBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  brand: { color: '#f59e0b', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.01em' },
  navBtn: { padding: '7px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  hero: { position: 'relative', zIndex: 1 },
  eyebrow: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 20px' },
  heroTitle: { color: '#fff', fontWeight: '900', lineHeight: 1.06, letterSpacing: '-0.03em', margin: '0 0 24px' },
  goldBar: { width: '56px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', borderRadius: '2px', marginBottom: '24px' },
  heroSub: { color: 'rgba(255,255,255,0.55)', fontSize: '17px', lineHeight: 1.7, margin: '0 0 36px' },
  ctaPrimary: { padding: '14px 28px', background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)', border: 'none', color: '#0f172a', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 20px rgba(245,158,11,0.4)', fontFamily: 'inherit' },
  ctaGhost: { padding: '14px 28px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  section: { position: 'relative', zIndex: 1 },
  sectionAlt: { position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.025)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  ctaFooter: { position: 'relative', zIndex: 1 },
  contentMax: { maxWidth: '900px' },
  tag: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 14px' },
  h2: { color: '#fff', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' },
  goldLine: { width: '40px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', borderRadius: '2px', marginBottom: '28px' },
  body: { color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px' },
  statsGrid: { display: 'grid' },
  stat: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '22px 18px' },
  statValue: { color: '#f59e0b', fontWeight: '900', letterSpacing: '-0.03em', margin: '0 0 8px', lineHeight: 1, fontSize: '1.8rem' },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.5, margin: 0 },
  grid: { display: 'grid' },
  problemCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' },
  problem: { color: '#f87171', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' },
  solution: { color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.6, margin: 0 },
  stepsGrid: { display: 'grid' },
  stepCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '24px 20px' },
  stepNum: { display: 'inline-block', color: '#f59e0b', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', marginBottom: '12px' },
  stepTitle: { color: '#fff', fontSize: '15px', fontWeight: '700', margin: '0 0 8px' },
  stepDesc: { color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.6, margin: 0 },
};
