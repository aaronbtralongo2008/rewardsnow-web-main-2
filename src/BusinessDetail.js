import { useEffect, useState } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';

const BLUE = '#2040C8';

export default function BusinessDetail({ business, customer, onBack, onLogout, onRefresh }) {
  const isMobile = useIsMobile();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [redeeming, setRedeeming] = useState(null);

  useEffect(() => {
    fetch(`${API}/businesses/${business.id}/services`)
        .then(r => r.json())
        .then(d => setServices(Array.isArray(d) ? d : []))
        .catch(console.error)
        .finally(() => setLoading(false));
  }, [business.id]);

  const flash = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleRedeem = async service => {
    if (redeeming) return;
    setRedeeming(service.id);
    try {
      const res = await fetch(`${API}/ledger/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${customer.token}`,
          'Idempotency-Key': `redeem-${service.id}-${Date.now()}`,
        },
        body: JSON.stringify({
          businessId: business.id,
          rnTransacted: service.rewardsCost,
          description: `Redeemed: ${service.name} at ${business.name}`,
        }),
      });
      const data = await res.json();
      if (data.error) flash(data.error, 'error');
      else {
        flash(`Redeemed! New balance: ${data.newBalance} pts`);
        onRefresh?.();
      }
    } catch {
      flash('Could not connect. Try again.', 'error');
    } finally {
      setRedeeming(null);
    }
  };

  const openDirections = () => {
    const dest = business.latitude && business.longitude
        ? `${business.latitude},${business.longitude}`
        : encodeURIComponent(business.address || '');
    if (dest) window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank');
  };

  return (
      <div style={s.root}>
        <nav style={{ ...s.nav, padding: isMobile ? '0 16px' : '0 40px' }}>
          <div style={s.navLeft}>
            <button style={s.backBtn} onClick={onBack}>← Back</button>
            {!isMobile && <span style={s.navBrand}>RewardsNow</span>}
          </div>
          <button style={s.navLogout} onClick={onLogout}>Sign out</button>
        </nav>

        <div style={{ ...s.body, padding: isMobile ? '20px 16px' : '40px 24px' }}>
          {/* Business header */}
          <div style={{ ...s.bizHeader, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '12px' : '20px' }}>
            <div style={{ ...s.avatar, width: isMobile ? '52px' : '64px', height: isMobile ? '52px' : '64px', fontSize: isMobile ? '1.3rem' : '1.6rem' }}>
              {business.name.charAt(0).toUpperCase()}
            </div>
            <div style={s.bizInfo}>
              <div style={s.bizNameRow}>
                <h1 style={{ ...s.bizName, fontSize: isMobile ? '1.2rem' : '1.4rem' }}>{business.name}</h1>
                {business.paidPartner && <span style={s.featuredTag}>Featured</span>}
              </div>
              {business.address && <p style={s.bizAddr}>{business.address}</p>}
              <div style={s.bizMeta}>
              <span style={{ ...s.typeTag, ...(business.uniqueRewardsPoint ? s.typeTagCustom : {}) }}>
                {business.uniqueRewardsPoint ? 'Custom rewards program' : 'RewardsNow points'}
              </span>
                {(business.latitude || business.address) && (
                    <button style={s.directionsBtn} onClick={openDirections}>Get directions →</button>
                )}
              </div>
            </div>
          </div>

          {/* Flash message */}
          {msg && (
              <div style={{ ...s.flash, ...(msg.type === 'error' ? s.flashError : s.flashSuccess) }}>
                {msg.text}
              </div>
          )}

          {/* Services */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Services & rewards</h2>
            {loading ? (
                <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                  {[1, 2, 3].map(i => <div key={i} style={s.skeleton} />)}
                </div>
            ) : services.length === 0 ? (
                <div style={s.empty}>
                  <p style={s.emptyTitle}>No services listed yet</p>
                  <p style={s.emptySub}>Check back soon — this business is still setting up their rewards.</p>
                </div>
            ) : (
                <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                  {services.map(svc => (
                      <div key={svc.id} style={s.card}>
                        <div style={s.cardTop}>
                          <h3 style={s.svcName}>{svc.name}</h3>
                          <span style={s.earnPill}>+{svc.rewardsGrant} pts</span>
                        </div>
                        {svc.description && <p style={s.svcDesc}>{svc.description}</p>}
                        <div style={s.cardBottom}>
                          <div>
                            <p style={s.redeemLabel}>Redeem for</p>
                            <p style={s.redeemCost}>{svc.rewardsCost} pts</p>
                          </div>
                          <button
                              style={{ ...s.redeemBtn, opacity: redeeming ? 0.6 : 1, cursor: redeeming ? 'not-allowed' : 'pointer' }}
                              onClick={() => handleRedeem(svc)}
                              disabled={!!redeeming}
                          >
                            {redeeming === svc.id ? 'Redeeming…' : 'Redeem'}
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}

const s = {
  root: { minHeight: '100vh', background: 'var(--rn-bg)', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', background: 'var(--rn-nav-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--rn-nav-border)', position: 'sticky', top: 0, zIndex: 100 },
  navLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  backBtn: { background: 'none', border: '1px solid var(--rn-outline-btn-border)', color: 'var(--rn-outline-btn-color)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px' },
  navBrand: { color: 'var(--rn-text)', fontSize: '15px', fontWeight: '700' },
  navLogout: { background: 'none', border: '1px solid var(--rn-outline-btn-border)', color: 'var(--rn-outline-btn-color)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 14px', borderRadius: '6px' },
  body: { maxWidth: '900px', margin: '0 auto', boxSizing: 'border-box' },
  bizHeader: { display: 'flex', alignItems: 'flex-start', marginBottom: '32px' },
  avatar: { borderRadius: '14px', background: '#0a0f1e', color: '#fff', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  bizInfo: { flex: 1, minWidth: '200px' },
  bizNameRow: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' },
  bizName: { color: '#0a0a0a', fontWeight: '700', margin: 0, letterSpacing: '-0.02em' },
  featuredTag: { background: '#fffbeb', color: '#92400e', fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px', border: '1px solid #fde68a' },
  bizAddr: { color: '#9ca3af', fontSize: '13px', margin: '0 0 12px' },
  bizMeta: { display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' },
  typeTag: { background: '#eff6ff', color: BLUE, fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '6px' },
  typeTagCustom: { background: '#f5f3ff', color: '#7c3aed' },
  directionsBtn: { background: 'none', border: '1px solid #e5e7eb', color: '#374151', fontSize: '12px', fontWeight: '500', cursor: 'pointer', padding: '4px 10px', borderRadius: '6px' },
  flash: { borderRadius: '8px', padding: '12px 16px', fontSize: '13px', fontWeight: '500', marginBottom: '24px' },
  flashSuccess: { background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' },
  flashError: { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' },
  section: {},
  sectionTitle: { color: 'var(--rn-text)', fontSize: '15px', fontWeight: '700', margin: '0 0 16px', letterSpacing: '-0.01em' },
  grid: { display: 'grid', gap: '14px' },
  skeleton: { height: '160px', borderRadius: '12px', background: 'linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' },
  svcName: { color: '#0a0a0a', fontSize: '14px', fontWeight: '600', margin: 0, flex: 1 },
  earnPill: { background: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px', flexShrink: 0 },
  svcDesc: { color: '#6b7280', fontSize: '13px', margin: 0, lineHeight: 1.5, flex: 1 },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f0f0f0', marginTop: 'auto' },
  redeemLabel: { color: '#9ca3af', fontSize: '11px', fontWeight: '500', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  redeemCost: { color: BLUE, fontSize: '15px', fontWeight: '700', margin: 0 },
  redeemBtn: { background: BLUE, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', padding: '8px 16px' },
  empty: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '48px 24px', textAlign: 'center' },
  emptyTitle: { color: '#374151', fontSize: '15px', fontWeight: '600', margin: '0 0 8px' },
  emptySub: { color: '#9ca3af', fontSize: '13px', lineHeight: 1.6, margin: 0 },
};