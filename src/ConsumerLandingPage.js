import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';

const features = [
  {
    icon: '★',
    title: 'Earn on everyday purchases',
    desc: 'Collect RewardsNow™ points when you shop with participating local businesses.',
  },
  {
    icon: '↩',
    title: 'Redeem locally',
    desc: 'Use your points at participating RewardsNow™ independent businesses.',
  },
  {
    icon: '📍',
    title: 'Discover nearby businesses',
    desc: 'Find participating restaurants, shops, cafés, and service providers in the app.',
  },
  {
    icon: '🗺',
    title: 'Plan your visit',
    desc: 'View menus, product offerings, maps, and directions from one convenient directory.',
  },
];

export default function ConsumerLandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div style={s.root}>
      <div style={s.orb1} />
      <div style={s.orb2} />
      <div style={s.orb3} />

      <nav style={{ ...s.nav, padding: isMobile ? '0 20px' : '0 64px' }}>
        <span style={s.brand}>RewardsNow™</span>
        <div style={s.navRight}>
          <button style={s.navBtn} onClick={() => navigate('/signin')}>Sign in</button>
          <button style={s.navBtnPrimary} onClick={() => navigate('/register')}>Get started</button>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section style={{ ...s.hero, padding: isMobile ? '80px 20px 64px' : '120px 80px 96px' }}>
          <p style={s.eyebrow}>LOCAL REWARDS</p>
          <h1 style={{ ...s.heroTitle, fontSize: isMobile ? '2.6rem' : '4.2rem' }}>
            Earn rewards while<br />supporting local businesses.
          </h1>
          <div style={s.goldBar} />
          <p style={{ ...s.heroSub, maxWidth: isMobile ? '100%' : '560px' }}>
            RewardsNow™ helps you earn points when you shop at participating independent businesses in your community.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '40px' }}>
            {/* TODO: Replace href="#download" with your App Store and Google Play URLs */}
            <a
              href="#download"
              style={s.ctaPrimaryLink}
              aria-label="Download the RewardsNow app"
            >
              Download App
            </a>
            <button
              style={s.ctaGhost}
              onClick={() => navigate('/business-overview')}
              aria-label="Learn about RewardsNow for business owners"
            >
              For Business Owners
            </button>
          </div>
        </section>

        {/* How it works */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 20px' : '80px 80px' }}>
          <div style={s.contentMax}>
            <p style={s.tag}>HOW IT WORKS</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.4rem' }}>
              Rewards that work across your neighborhood.
            </h2>
            <div style={s.goldLine} />
            <p style={s.body}>
              Buy a slice at your favorite local pizzeria and earn RewardsNow™ points. Later, redeem those
              points for ice cream, coffee, lunch, or other everyday purchases at participating
              RewardsNow™ businesses.
            </p>
            <p style={s.bodySmall}>
              Rewards availability and redemption options may vary by participating business.
            </p>
          </div>
        </section>

        {/* Feature cards */}
        <section style={{ ...s.section, padding: isMobile ? '64px 20px' : '80px 80px' }}>
          <div style={{ maxWidth: '1000px' }}>
            <p style={s.tag}>FEATURES</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.4rem' }}>
              Built around your everyday life.
            </h2>
            <div style={s.goldLine} />
            <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
              {features.map(f => (
                <div key={f.title} style={s.card}>
                  <p style={s.cardIcon} aria-hidden="true">{f.icon}</p>
                  <p style={s.cardTitle}>{f.title}</p>
                  <p style={s.cardDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Directory */}
        <section style={{ ...s.sectionAlt, padding: isMobile ? '64px 20px' : '80px 80px' }}>
          <div style={s.contentMax}>
            <p style={s.tag}>DISCOVERY</p>
            <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.4rem' }}>
              Not sure where to use your points?
            </h2>
            <div style={s.goldLine} />
            <p style={s.body}>
              The RewardsNow™ app includes a directory of participating businesses so you can easily
              find places near you.
            </p>
          </div>
        </section>

        {/* CTA footer */}
        <section
          style={{ ...s.ctaFooter, padding: isMobile ? '72px 20px' : '96px 80px', textAlign: 'center' }}
        >
          <h2 style={{ ...s.h2, fontSize: isMobile ? '1.9rem' : '2.4rem' }}>
            Download the free RewardsNow™ app today.
          </h2>
          <p style={{ ...s.body, maxWidth: '480px', margin: '0 auto 36px' }}>
            Start earning points on everyday spending while supporting independent businesses in your
            community.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {/* TODO: Replace href="#download" with your App Store and Google Play URLs */}
            <a
              href="#download"
              style={s.ctaPrimaryLink}
              aria-label="Download the RewardsNow app"
            >
              Download Now
            </a>
            <button
              style={s.bizLink}
              onClick={() => navigate('/business-overview')}
              aria-label="Learn how to join RewardsNow as a business owner"
            >
              Business owner? Learn how to join RewardsNow™.
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

const s = {
  root: {
    minHeight: '100vh',
    background: '#08011a',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  orb1: {
    position: 'fixed', top: '-120px', left: '-100px',
    width: '600px', height: '600px', borderRadius: '50%',
    background: 'rgba(37, 99, 235, 0.45)', filter: 'blur(120px)',
    zIndex: 0, pointerEvents: 'none',
  },
  orb2: {
    position: 'fixed', bottom: '-100px', right: '-80px',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'rgba(6, 182, 212, 0.22)', filter: 'blur(100px)',
    zIndex: 0, pointerEvents: 'none',
  },
  orb3: {
    position: 'fixed', top: '40%', right: '20%',
    width: '300px', height: '300px', borderRadius: '50%',
    background: 'rgba(217, 70, 239, 0.18)', filter: 'blur(80px)',
    zIndex: 0, pointerEvents: 'none',
  },
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    height: '64px', position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(8,1,26,0.8)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  brand: { color: '#f59e0b', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.01em' },
  navRight: { display: 'flex', gap: '8px' },
  navBtn: {
    padding: '8px 16px', background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
    borderRadius: '8px', fontSize: '13px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  navBtnPrimary: {
    padding: '8px 18px',
    background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)',
    border: 'none', color: '#0f172a', borderRadius: '8px',
    fontSize: '13px', fontWeight: '700', cursor: 'pointer',
    fontFamily: 'inherit', boxShadow: '0 2px 12px rgba(245,158,11,0.35)',
  },
  hero: { position: 'relative', zIndex: 1 },
  eyebrow: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 20px' },
  heroTitle: {
    color: '#fff', fontWeight: '900', lineHeight: 1.04,
    letterSpacing: '-0.04em', margin: '0 0 24px',
  },
  goldBar: {
    width: '56px', height: '3px',
    background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)',
    borderRadius: '2px', marginBottom: '24px',
  },
  heroSub: { color: 'rgba(255,255,255,0.55)', fontSize: '17px', lineHeight: 1.7, margin: 0 },
  ctaPrimaryLink: {
    display: 'inline-block',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)',
    border: 'none', color: '#0f172a', borderRadius: '12px',
    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
    fontFamily: 'inherit', textDecoration: 'none',
  },
  ctaGhost: {
    padding: '14px 28px', background: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff',
    borderRadius: '12px', fontSize: '15px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  section: { position: 'relative', zIndex: 1 },
  sectionAlt: {
    position: 'relative', zIndex: 1,
    background: 'rgba(255,255,255,0.025)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  ctaFooter: { position: 'relative', zIndex: 1 },
  contentMax: { maxWidth: '800px' },
  tag: { color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', margin: '0 0 16px' },
  h2: { color: '#fff', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' },
  goldLine: {
    width: '40px', height: '3px',
    background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)',
    borderRadius: '2px', marginBottom: '28px',
  },
  body: { color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 16px' },
  bodySmall: { color: 'rgba(255,255,255,0.35)', fontSize: '13px', lineHeight: 1.6, margin: 0 },
  grid: { display: 'grid', gap: '16px', marginTop: '40px' },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px', padding: '28px 24px',
  },
  cardIcon: { fontSize: '22px', margin: '0 0 12px' },
  cardTitle: { color: '#fff', fontSize: '15px', fontWeight: '700', margin: '0 0 8px' },
  cardDesc: { color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6, margin: 0 },
  bizLink: {
    background: 'none', border: 'none',
    color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '500',
    cursor: 'pointer', padding: 0, fontFamily: 'inherit',
    textDecoration: 'underline',
  },
};
