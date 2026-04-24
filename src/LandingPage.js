import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div style={s.root}>
      <div style={s.orb1} />
      <div style={s.orb2} />
      <div style={s.orb3} />

      <nav style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <span style={s.brand}>RewardsNow</span>
        <div style={s.navRight}>
          <button style={s.navBtn} onClick={() => navigate('/signin')}>Sign in</button>
          <button style={s.navBtnPrimary} onClick={() => navigate('/register')}>Get started</button>
        </div>
      </nav>

      <section style={{ ...s.hero, padding: isMobile ? '72px 24px 56px' : '120px 80px 80px' }}>
        <p style={s.eyebrow}>REWARDS, REIMAGINED</p>
        <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.8rem' : '4.6rem' }}>
          One card.<br />Every business.
        </h1>
        <div style={s.goldBar} />
        <p style={{ ...s.heroSub, maxWidth: isMobile ? '100%' : '520px' }}>
          Earn and spend rewards points across a whole network of local businesses — all from one app.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '40px' }}>
          <button style={s.ctaPrimary} onClick={() => navigate('/register')}>Create free account</button>
          <button style={s.ctaGhost} onClick={() => navigate('/signin')}>Sign in</button>
        </div>
        <button style={s.ctaBiz} onClick={() => navigate('/business-overview')}>Own a business? →</button>
      </section>

      <section style={{ ...s.section, padding: isMobile ? '64px 24px' : '80px 80px' }}>
        <div style={s.contentMax}>
          <p style={s.tag}>ABOUT</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.6rem' }}>What is RewardsNow?</h2>
          <div style={s.goldLine} />
          <p style={s.body}>
            RewardsNow is a company that runs software where rewards points are standardized among a large group of different companies. For example, someone could use RewardsNow points to get discounts at Nordstrom or at Dunkin — all from the same app. RewardsNow is also willing to, for a bigger contract, become a long-term partner of a company in order to set up their own rewards system without needing to run their own software operations.
          </p>
          <p style={s.body}>
            RewardsNow seeks to bring convenience to both the customer and the companies they interact with. Customers will be given a map of RewardsNow partners near them, alongside the ability to scroll a list of RewardsNow partners, where companies can pay RewardsNow a larger sum of money to be recommended to users more often.
          </p>
          <p style={s.body}>
            RewardsNow's structure brings a business model that creates a large small business network, where customers are not earned in isolation by each company. This will positively affect every RewardsNow partner in the long term, as other customers will be given exposure to them more accessibly alongside cutting the cost of finding new customers.
          </p>
        </div>
      </section>

      <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 24px' : '80px 80px' }}>
        <div style={s.contentMax}>
          <p style={s.tag}>THE NETWORK</p>
          <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.6rem' }}>Built for growth</h2>
          <div style={s.goldLine} />
          <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
            {[
              { icon: '→', title: 'Discover partners', desc: 'Find every RewardsNow business near you on a live map.' },
              { icon: '🔄', title: 'Shared loyalty', desc: 'Points earned anywhere can be spent everywhere.' },
              { icon: '📊', title: 'Your dashboard', desc: 'Track spending, rewards, and personalized offers.' },
              { icon: '⚡', title: 'Simple setup', desc: 'Join in minutes. No complexity.' },
            ].map(f => (
              <div key={f.title} style={s.feature}>
                <p style={s.featureTitle}>{f.title}</p>
                <p style={s.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...s.ctaFooter, padding: isMobile ? '64px 24px' : '80px 80px', textAlign: 'center' }}>
        <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.4rem' }}>Ready to start earning?</h2>
        <p style={{ ...s.body, marginBottom: '36px' }}>Join free. No credit card required.</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={s.ctaPrimary} onClick={() => navigate('/register')}>Create an account</button>
          <button style={s.ctaGhost} onClick={() => navigate('/signin')}>Sign in</button>
        </div>
        <button style={s.ctaBiz} onClick={() => navigate('/business-overview')}>Looking to partner your business? →</button>
      </section>
    </div>
  );
}

const s = {
  root: { minHeight: '100vh', background: '#08011a', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", position: 'relative', overflow: 'hidden' },
  orb1: { position: 'fixed', top: '-120px', left: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.45)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' },
  orb2: { position: 'fixed', bottom: '-100px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.22)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' },
  orb3: { position: 'fixed', top: '40%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(217, 70, 239, 0.18)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,1,26,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' },
  brand: { color: '#f59e0b', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.01em' },
  navRight: { display: 'flex', gap: '8px' },
  navBtn: { padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  navBtnPrimary: { padding: '8px 18px', background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)', border: 'none', color: '#0f172a', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 2px 12px rgba(245,158,11,0.35)' },
  hero: { position: 'relative', zIndex: 1 },
  eyebrow: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 20px' },
  heroTitle: { color: '#fff', fontWeight: '900', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 24px' },
  goldBar: { width: '56px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', borderRadius: '2px', marginBottom: '24px' },
  heroSub: { color: 'rgba(255,255,255,0.55)', fontSize: '17px', lineHeight: 1.7, margin: 0 },
  ctaPrimary: { padding: '14px 28px', background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)', border: 'none', color: '#0f172a', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 20px rgba(245,158,11,0.4)', fontFamily: 'inherit' },
  ctaGhost: { padding: '14px 28px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  ctaBiz: { marginTop: '20px', display: 'inline-block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  section: { position: 'relative', zIndex: 1 },
  sectionAlt: { position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.025)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  ctaFooter: { position: 'relative', zIndex: 1 },
  contentMax: { maxWidth: '800px' },
  tag: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 16px' },
  h2: { color: '#fff', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' },
  goldLine: { width: '40px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', borderRadius: '2px', marginBottom: '28px' },
  body: { color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px' },
  grid: { display: 'grid', gap: '16px', marginTop: '40px' },
  feature: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' },
  featureTitle: { color: '#fff', fontSize: '14px', fontWeight: '700', margin: '0 0 6px' },
  featureDesc: { color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6, margin: 0 },
};
