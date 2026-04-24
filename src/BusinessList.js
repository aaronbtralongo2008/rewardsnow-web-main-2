import { useEffect, useState, useCallback } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';

const BLUE = '#2563eb';

export default function BusinessList({ customer, onLogout, onSelectBusiness, onNavigate }) {
  const isMobile = useIsMobile();
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch(`${API}/businesses`);
      const data = await res.json();
      setBusinesses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleSearch = async e => {
    const q = e.target.value;
    setSearch(q);
    if (!q) { fetchAll(); return; }
    if (q.length < 2) return;
    setSearching(true);
    try {
      const res = await fetch(`${API}/businesses/search?name=${encodeURIComponent(q)}`);
      const data = await res.json();
      setBusinesses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  return (
      <div style={s.root}>
        <div style={s.orb1} />
        <div style={s.orb2} />

        <nav style={{ ...s.nav, padding: isMobile ? '0 16px' : '0 40px' }}>
          <button style={s.navBrand} onClick={() => onNavigate('/home')}>RewardsNow</button>
          <div style={s.navRight}>
            <button style={s.navLink} onClick={() => onNavigate('/home')}>Home</button>
            <button style={s.navLink} onClick={() => onNavigate('/map')}>Map</button>
            <button style={s.navLogout} onClick={onLogout}>Sign out</button>
          </div>
        </nav>

        <div style={{ ...s.body, padding: isMobile ? '20px 16px' : '40px 24px' }}>
          <div style={s.header}>
            <div>
              <h1 style={{ ...s.title, fontSize: isMobile ? '1.3rem' : '1.5rem' }}>Partner businesses</h1>
              <p style={s.subtitle}>Earn points at every location below</p>
            </div>
          </div>

          <div style={s.searchWrap}>
            <span style={s.searchIcon}>⌕</span>
            <input
                style={s.searchInput}
                type="text"
                placeholder="Search businesses…"
                value={search}
                onChange={handleSearch}
                autoComplete="off"
            />
            {searching && <span style={s.searchSpinner}>Searching…</span>}
            {search && !searching && (
                <button style={s.clearBtn} onClick={() => { setSearch(''); fetchAll(); }}>Clear</button>
            )}
          </div>

          {loading ? (
              <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={s.skeleton} />)}
              </div>
          ) : businesses.length === 0 ? (
              <div style={s.empty}>
                <p style={s.emptyTitle}>No businesses found</p>
                {search && <button style={s.emptyAction} onClick={() => { setSearch(''); fetchAll(); }}>Clear search</button>}
              </div>
          ) : (
              <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {businesses.map(biz => (
                    <div key={biz.id} style={s.card} onClick={() => onSelectBusiness(biz)}>
                      <div style={s.cardHeader}>
                        <div style={s.avatar}>{biz.name.charAt(0).toUpperCase()}</div>
                        {biz.paidPartner && <span style={s.featuredTag}>Featured</span>}
                      </div>
                      <h3 style={{ ...s.bizName, fontSize: isMobile ? '14px' : '15px' }}>{biz.name}</h3>
                      <p style={s.bizAddr}>{biz.address || 'Address not listed'}</p>
                      <div style={s.cardFooter}>
                        <span style={{ ...s.typeTag, ...(biz.uniqueRewardsPoint ? s.typeTagCustom : {}) }}>
                          {biz.uniqueRewardsPoint ? 'Custom' : 'RN Points'}
                        </span>
                        <span style={s.arrow}>→</span>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
}

const s = {
  root: { minHeight: '100vh', background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 100%)', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", position: 'relative', overflow: 'hidden' },
  orb1: { position: 'fixed', top: '-80px', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.3)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' },
  orb2: { position: 'fixed', bottom: '-60px', left: '15%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.2)' },
  navBrand: { color: '#f59e0b', fontSize: '15px', fontWeight: '800', letterSpacing: '-0.01em', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  navRight: { display: 'flex', alignItems: 'center', gap: '4px' },
  navLink: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: '6px 8px', borderRadius: '6px', fontFamily: 'inherit' },
  navLogout: { background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontFamily: 'inherit' },
  body: { maxWidth: '1100px', margin: '0 auto', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' },
  title: { color: '#fff', fontWeight: '800', margin: '0 0 4px', letterSpacing: '-0.02em' },
  subtitle: { color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center', background: '#fff', border: 'none', borderRadius: '10px', padding: '0 14px', marginBottom: '20px', gap: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' },
  searchIcon: { color: '#60a5fa', fontSize: '18px', lineHeight: 1 },
  searchInput: { flex: 1, border: 'none', outline: 'none', padding: '11px 0', fontSize: '14px', color: '#0f172a', background: 'transparent' },
  searchSpinner: { color: '#9ca3af', fontSize: '12px', whiteSpace: 'nowrap' },
  clearBtn: { background: 'none', border: 'none', color: '#9ca3af', fontSize: '12px', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', fontFamily: 'inherit' },
  grid: { display: 'grid', gap: '12px' },
  skeleton: { height: '180px', borderRadius: '12px', background: 'linear-gradient(90deg, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.07) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' },
  card: { background: '#fff', border: 'none', borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.15s', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  avatar: { width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #1e40af, #2563eb)', color: '#fff', fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  featuredTag: { background: '#fffbeb', color: '#92400e', fontSize: '10px', fontWeight: '600', padding: '3px 6px', borderRadius: '6px', border: '1px solid #fde68a' },
  bizName: { color: '#0f172a', fontWeight: '700', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  bizAddr: { color: '#9ca3af', fontSize: '12px', margin: '0 0 12px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  typeTag: { background: '#eff6ff', color: BLUE, fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px' },
  typeTagCustom: { background: '#fef3c7', color: '#b45309' },
  arrow: { color: '#60a5fa', fontSize: '14px' },
  empty: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '60px 24px', textAlign: 'center' },
  emptyTitle: { color: '#fff', fontSize: '15px', fontWeight: '600', margin: '0 0 12px' },
  emptyAction: { background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '8px 16px', borderRadius: '8px', fontFamily: 'inherit' },
};
