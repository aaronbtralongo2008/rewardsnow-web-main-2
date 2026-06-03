import { useEffect, useState } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';

const BLUE = '#0B5CAD';

const CATEGORY_LABELS = {
  RESTAURANT: 'Restaurant', CAFE: 'Café', RETAIL: 'Retail', FITNESS: 'Fitness',
  BEAUTY_SPA: 'Beauty & Spa', ENTERTAINMENT: 'Entertainment', GROCERY: 'Grocery',
  HEALTH: 'Health', AUTOMOTIVE: 'Automotive', SERVICES: 'Services', OTHER: 'Other',
};
const PRICE_LABELS = { BUDGET: '$', MODERATE: '$$', PREMIUM: '$$$' };

const scoreColor = n => n >= 80 ? '#16a34a' : n >= 60 ? '#d97706' : BLUE;
const scoreBg   = n => n >= 80 ? '#f0fdf4' : n >= 60 ? '#fffbeb' : 'rgba(11,92,173,0.08)';

export default function BusinessDetail({ business, customer, onBack, onLogout, onRefresh }) {
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [redeeming, setRedeeming] = useState(null);
  const [compatibility, setCompatibility] = useState(null);
  const [aiInsight, setAiInsight] = useState(null);

  useEffect(() => {
    fetch(`${API}/businesses/${business.id}/services`)
      .then(r => r.json())
      .then(d => setServices(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [business.id]);

  useEffect(() => {
    if (!customer?.token) return;
    const h = { Authorization: `Bearer ${customer.token}` };
    fetch(`${API}/businesses/${business.id}`, { headers: h })
      .then(r => r.json())
      .then(d => { if (d?.compatibility) setCompatibility(d.compatibility); })
      .catch(() => {});
    fetch(`${API}/ai/compatibility?businessId=${business.id}`, { headers: h })
      .then(r => r.status === 503 ? null : r.json())
      .then(d => {
        if (!d?.insight) return;
        try { setAiInsight(JSON.parse(d.insight)); } catch {}
      })
      .catch(() => {});
  }, [business.id, customer?.token]);

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
      else { flash(`Redeemed! New balance: ${data.newBalance} pts`); onRefresh?.(); }
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

  const tags = business.tags ? business.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  const rootBg = isDark ? '#07243A' : '#FFF8EA';
  const cardBg = isDark ? '#0D2E42' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#101820';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const inputBg = isDark ? 'rgba(255,255,255,0.07)' : '#ffffff';
  const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const skeletonBg = isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0';
  const tableBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{ minHeight: '100vh', background: rootBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* Teal accent bar */}
      <div style={{ height: '3px', background: '#25B7C8' }} />
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', background: '#07243A', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100, padding: isMobile ? '0 16px' : '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px' }} onClick={onBack}>← Back</button>
          {!isMobile && <span style={{ color: '#F2B84B', fontSize: '15px', fontWeight: '700' }}>RewardsNow</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: '5px 10px',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {isDark ? '○' : '●'}
          </button>
          <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 14px', borderRadius: '6px' }} onClick={onLogout}>Sign out</button>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', boxSizing: 'border-box', padding: isMobile ? '20px 16px' : '40px 24px' }}>
        {/* Business header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '24px', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '12px' : '20px' }}>
          <div style={{ borderRadius: '14px', background: BLUE, color: '#fff', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: isMobile ? '52px' : '64px', height: isMobile ? '52px' : '64px', fontSize: isMobile ? '1.3rem' : '1.6rem' }}>
            {business.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h1 style={{ color: textColor, fontWeight: '700', margin: 0, letterSpacing: '-0.02em', fontSize: isMobile ? '1.2rem' : '1.4rem' }}>{business.name}</h1>
              {business.featured && <span style={{ background: '#F2B84B', color: '#07243A', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>⭐ Featured</span>}
              {business.paidPartner && !business.featured && <span style={{ background: '#F2B84B', color: '#07243A', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>Partner</span>}
            </div>
            {business.address && <p style={{ color: mutedColor, fontSize: '13px', margin: '0 0 10px' }}>{business.address}</p>}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' }}>
              {business.category && (
                <span style={{ background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '6px' }}>{CATEGORY_LABELS[business.category] || business.category}</span>
              )}
              {business.priceRange && (
                <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '6px', letterSpacing: '0.05em' }}>{PRICE_LABELS[business.priceRange] || business.priceRange}</span>
              )}
              <span style={business.uniqueRewardsPoint
                ? { background: isDark ? 'rgba(124,58,237,0.2)' : '#f5f3ff', color: '#7c3aed', border: '1px solid #e9d5ff', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '6px' }
                : { background: 'rgba(11,92,173,0.08)', color: BLUE, fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(11,92,173,0.15)' }
              }>
                {business.uniqueRewardsPoint ? 'Custom rewards' : 'RN Points'}
              </span>
              {(business.latitude || business.address) && (
                <button style={{ background: 'none', border: `1px solid ${borderColor}`, color: mutedColor, fontSize: '12px', fontWeight: '500', cursor: 'pointer', padding: '3px 10px', borderRadius: '6px' }} onClick={openDirections}>Get directions →</button>
              )}
            </div>
            {tags.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {tags.map(tag => (
                  <span key={tag} style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9', color: isDark ? 'rgba(255,255,255,0.7)' : '#475569', fontSize: '11px', fontWeight: '500', padding: '2px 8px', borderRadius: '20px', border: `1px solid ${borderColor}` }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Compatibility score */}
        {compatibility && (
          <div style={{ background: cardBg, border: `1.5px solid ${borderColor}`, borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', padding: '4px 12px', borderRadius: '20px', color: scoreColor(compatibility.score), background: scoreBg(compatibility.score) }}>
                {compatibility.score}% match
              </div>
              <p style={{ color: textColor, fontSize: '13px', fontWeight: '600', margin: 0 }}>How well this fits you</p>
            </div>
            {compatibility.matchReasons?.length > 0 && (
              <ul style={{ margin: '0', padding: '0 0 0 16px' }}>
                {compatibility.matchReasons.map((r, i) => (
                  <li key={i} style={{ color: mutedColor, fontSize: '13px', lineHeight: 1.6, marginBottom: '2px' }}>{r}</li>
                ))}
              </ul>
            )}
            {compatibility.matchedTags?.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                {compatibility.matchedTags.map(t => (
                  <span key={t} style={{ background: 'rgba(11,92,173,0.1)', color: BLUE, fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI insight */}
        {aiInsight?.explanation && (
          <div style={{ background: '#07243A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ color: '#25B7C8', fontSize: '14px' }}>✦</span>
              <span style={{ color: '#e0e7ff', fontSize: '13px', fontWeight: '700' }}>Why this matches you</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.6, margin: '0 0 12px' }}>{aiInsight.explanation}</p>
            {aiInsight.keyFactors?.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {aiInsight.keyFactors.map((f, i) => (
                  <span key={i} style={{ background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(37,183,200,0.25)' }}>{f}</span>
                ))}
              </div>
            )}
            {aiInsight.tip && <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', margin: 0, fontStyle: 'italic' }}>💡 {aiInsight.tip}</p>}
          </div>
        )}

        {/* Flash */}
        {msg && (
          <div style={{ borderRadius: '8px', padding: '12px 16px', fontSize: '13px', fontWeight: '500', marginBottom: '24px', ...(msg.type === 'error' ? { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' } : { background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }) }}>
            {msg.text}
          </div>
        )}

        {/* Services */}
        <div>
          <h2 style={{ color: textColor, fontSize: '15px', fontWeight: '700', margin: '0 0 16px', letterSpacing: '-0.01em' }}>Services &amp; rewards</h2>
          {loading ? (
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {[1, 2, 3].map(i => <div key={i} style={{ height: '160px', borderRadius: '12px', background: skeletonBg }} />)}
            </div>
          ) : services.length === 0 ? (
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '48px 24px', textAlign: 'center' }}>
              <p style={{ color: textColor, fontSize: '15px', fontWeight: '600', margin: '0 0 8px' }}>No services listed yet</p>
              <p style={{ color: mutedColor, fontSize: '13px', lineHeight: 1.6, margin: 0 }}>Check back soon — this business is still setting up their rewards.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {services.map(svc => (
                <div key={svc.id} style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <h3 style={{ color: textColor, fontSize: '14px', fontWeight: '600', margin: 0, flex: 1 }}>{svc.name}</h3>
                    <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px', flexShrink: 0 }}>+{svc.rewardsGrant} pts</span>
                  </div>
                  {svc.description && <p style={{ color: mutedColor, fontSize: '13px', margin: 0, lineHeight: 1.5, flex: 1 }}>{svc.description}</p>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: `1px solid ${tableBorder}`, marginTop: 'auto' }}>
                    <div>
                      <p style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af', fontSize: '11px', fontWeight: '500', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Redeem for</p>
                      <p style={{ color: BLUE, fontSize: '15px', fontWeight: '700', margin: 0 }}>{svc.rewardsCost} pts</p>
                    </div>
                    <button
                      style={{ background: BLUE, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', padding: '8px 16px', opacity: redeeming ? 0.6 : 1, cursor: redeeming ? 'not-allowed' : 'pointer' }}
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
