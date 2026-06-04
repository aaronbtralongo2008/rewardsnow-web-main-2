import { useEffect, useState, useCallback } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';

const CATEGORY_LABELS = {
  food: 'Food & Drink',
  retail: 'Retail',
  services: 'Services',
  health: 'Health & Wellness',
  entertainment: 'Entertainment',
  travel: 'Travel',
  other: 'Other',
};

const PRICE_SYMBOLS = ['', '$', '$$', '$$$', '$$$$'];

export default function BusinessList({ customer, onLogout, onSelectBusiness, onNavigate }) {
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [aiSummary, setAiSummary] = useState('');

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
    if (aiMode) return;
    if (!q) { fetchAll(); setAiSummary(''); return; }
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

  const handleAiSearch = async () => {
    if (!search.trim()) return;
    setSearching(true);
    setAiSummary('');
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (customer?.token) headers['Authorization'] = `Bearer ${customer.token}`;
      const res = await fetch(`${API}/ai/search`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: search }),
      });
      if (res.status === 503) { setSearching(false); return; }
      const data = await res.json();
      if (!data?.result) { setSearching(false); return; }
      let parsed;
      try { parsed = JSON.parse(data.result); } catch { setSearching(false); return; }
      const { rankedIds, summary } = parsed;
      if (summary) setAiSummary(summary);
      if (Array.isArray(rankedIds) && rankedIds.length > 0) {
        const allRes = await fetch(`${API}/businesses`);
        const all = await allRes.json();
        if (Array.isArray(all)) {
          const idOrder = rankedIds.map(String);
          const ordered = [...all].sort((a, b) => {
            const ai = idOrder.indexOf(String(a.id));
            const bi = idOrder.indexOf(String(b.id));
            if (ai === -1 && bi === -1) return 0;
            if (ai === -1) return 1;
            if (bi === -1) return -1;
            return ai - bi;
          });
          setBusinesses(ordered);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearch('');
    setAiSummary('');
    fetchAll();
  };

  const toggleAiMode = () => {
    setAiMode(m => !m);
    setSearch('');
    setAiSummary('');
    fetchAll();
  };

  const s = getStyles(isDark);

  return (
    <div style={s.root}>
      {/* 3px teal accent bar */}
      <div className="vn-top-bar" style={{ height: '4px', background: '#25B7C8' }} />

      <nav style={{ ...s.nav, padding: isMobile ? '0 16px' : '0 40px' }}>
        <button style={s.navBrand} onClick={() => onNavigate('/home')}>Veniar</button>
        <div style={s.navRight}>
          <button style={s.navLink} onClick={() => onNavigate('/home')}>Home</button>
          <button style={s.navLink} onClick={() => onNavigate('/map')}>Map</button>
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
          <button style={s.navLogout} onClick={onLogout}>Sign out</button>
        </div>
      </nav>

      <div style={{ ...s.body, padding: isMobile ? '20px 16px' : '40px 24px' }}>
        <div style={s.header}>
          <div>
            <h1 className="vn-fade-up" style={{ ...s.title, fontSize: isMobile ? '1.3rem' : '1.5rem' }}>Partner businesses</h1>
            <p style={s.subtitle}>
              {aiSummary || 'Earn points at every location below'}
            </p>
          </div>
        </div>

        {/* Horizontal accent line */}
        <div style={s.accentLine} />

        <div style={s.searchWrap}>
          <span style={s.searchIcon}>⌕</span>
          <input
            style={s.searchInput}
            type="text"
            placeholder={aiMode ? "Describe what you're looking for…" : 'Search businesses…'}
            value={search}
            onChange={handleSearch}
            onKeyDown={e => aiMode && e.key === 'Enter' && handleAiSearch()}
            autoComplete="off"
          />
          {searching && (
            <span style={s.searchSpinner}>{aiMode ? 'AI searching…' : 'Searching…'}</span>
          )}
          {aiMode && !searching && search && (
            <button style={s.aiSearchBtn} onClick={handleAiSearch}>Search</button>
          )}
          {search && !searching && (
            <button style={s.clearBtn} onClick={clearSearch}>Clear</button>
          )}
          <button
            style={{ ...s.aiToggleBtn, ...(aiMode ? s.aiToggleBtnActive : {}) }}
            onClick={toggleAiMode}
            title="Toggle AI natural language search"
          >
            AI
          </button>
        </div>

        {loading ? (
          <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={s.skeleton} />)}
          </div>
        ) : businesses.length === 0 ? (
          <div style={s.empty}>
            <p style={s.emptyTitle}>No businesses found</p>
            {search && (
              <button style={s.emptyAction} onClick={clearSearch}>Clear search</button>
            )}
          </div>
        ) : (
          <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {businesses.map(biz => (
              <BizCard
                key={biz.id}
                biz={biz}
                isMobile={isMobile}
                s={s}
                onSelectBusiness={onSelectBusiness}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BizCard({ biz, isMobile, s, onSelectBusiness }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="vn-card"
      style={{
        ...s.card,
        ...(biz.featured ? s.cardFeatured : {}),
        borderColor: hovered
          ? '#25B7C8'
          : biz.featured
          ? '#F2B84B'
          : s.card.borderColor,
      }}
      onClick={() => onSelectBusiness(biz)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.cardHeader}>
        <div style={s.avatar}>{biz.name.charAt(0).toUpperCase()}</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          {biz.featured
            ? <span style={s.featuredTag}>⭐ Featured</span>
            : biz.paidPartner
            ? <span style={s.featuredTag}>Featured</span>
            : null}
          {biz.priceRange > 0 && (
            <span style={s.priceTag}>{PRICE_SYMBOLS[biz.priceRange] || ''}</span>
          )}
        </div>
      </div>
      <h3 style={{ ...s.bizName, fontSize: isMobile ? '14px' : '15px' }}>{biz.name}</h3>
      <p style={s.bizAddr}>{biz.address || 'Address not listed'}</p>
      <div style={s.cardFooter}>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', flex: 1 }}>
          {biz.category && (
            <span style={s.categoryTag}>{CATEGORY_LABELS[biz.category] || biz.category}</span>
          )}
          <span style={{ ...s.typeTag, ...(biz.uniqueRewardsPoint ? s.typeTagCustom : {}) }}>
            {biz.uniqueRewardsPoint ? 'Custom' : 'RN Points'}
          </span>
        </div>
        <span style={s.arrow}>→</span>
      </div>
      {biz.tags && (
        <div style={s.tagsRow}>
          {biz.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3).map(t => (
            <span key={t} style={s.tagChip}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function getStyles(isDark) {
  return {
    root: {
      minHeight: '100vh',
      background: isDark ? '#061A2A' : '#FFF8EA',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: 'relative',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '60px',
      background: '#061A2A',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    navBrand: {
      color: '#F2B84B',
      fontSize: '15px',
      fontWeight: '800',
      letterSpacing: '-0.01em',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      fontFamily: 'inherit',
    },
    navRight: { display: 'flex', alignItems: 'center', gap: '4px' },
    navLink: {
      background: 'none',
      border: 'none',
      color: 'rgba(255,255,255,0.65)',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: '6px',
      fontFamily: 'inherit',
    },
    navLogout: {
      background: 'none',
      border: '1px solid rgba(255,255,255,0.2)',
      color: '#fff',
      fontSize: '13px',
      fontWeight: '500',
      cursor: 'pointer',
      padding: '6px 12px',
      borderRadius: '6px',
      fontFamily: 'inherit',
    },
    body: { maxWidth: '1100px', margin: '0 auto', boxSizing: 'border-box' },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: '12px',
    },
    title: {
      color: isDark ? '#ffffff' : '#061A2A',
      fontWeight: '800',
      margin: '0 0 4px',
      letterSpacing: '-0.02em',
    },
    subtitle: {
      color: isDark ? 'rgba(255,255,255,0.55)' : '#5F6B73',
      fontSize: '14px',
      margin: 0,
    },
    accentLine: {
      height: '1px',
      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
      margin: '0 0 20px',
    },
    searchWrap: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: isDark ? 'rgba(255,255,255,0.07)' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
      borderRadius: '10px',
      padding: '0 14px',
      marginBottom: '20px',
      gap: '8px',
    },
    searchIcon: { color: '#1565C4', fontSize: '18px', lineHeight: 1 },
    searchInput: {
      flex: 1,
      border: 'none',
      outline: 'none',
      padding: '11px 0',
      fontSize: '14px',
      color: isDark ? '#ffffff' : '#101820',
      background: 'transparent',
    },
    searchSpinner: {
      color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af',
      fontSize: '12px',
      whiteSpace: 'nowrap',
    },
    clearBtn: {
      background: 'none',
      border: 'none',
      color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af',
      fontSize: '12px',
      cursor: 'pointer',
      padding: '4px 8px',
      borderRadius: '4px',
      fontFamily: 'inherit',
    },
    aiSearchBtn: {
      background: '#25B7C8',
      border: 'none',
      color: '#fff',
      fontSize: '12px',
      fontWeight: '700',
      cursor: 'pointer',
      padding: '5px 10px',
      borderRadius: '6px',
      fontFamily: 'inherit',
      whiteSpace: 'nowrap',
    },
    aiToggleBtn: {
      background: 'none',
      border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.2)' : '#d1d5db'}`,
      color: isDark ? 'rgba(255,255,255,0.45)' : '#9ca3af',
      fontSize: '11px',
      fontWeight: '700',
      cursor: 'pointer',
      padding: '4px 8px',
      borderRadius: '6px',
      fontFamily: 'inherit',
      letterSpacing: '0.05em',
      flexShrink: 0,
    },
    aiToggleBtnActive: {
      background: '#25B7C8',
      border: '1.5px solid #25B7C8',
      color: '#fff',
    },
    grid: { display: 'grid', gap: '12px' },
    skeleton: {
      height: '180px',
      borderRadius: '8px',
      background: isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0',
    },
    card: {
      background: isDark ? '#0C2640' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
      borderRadius: '8px',
      padding: '16px',
      cursor: 'pointer',
      transition: 'border-color 0.15s',
      boxShadow: 'none',
    },
    cardFeatured: {
      border: '2px solid #F2B84B',
      borderColor: '#F2B84B',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: '#1565C4',
      color: '#fff',
      fontSize: '1.1rem',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    featuredTag: {
      background: '#F2B84B',
      color: '#061A2A',
      fontSize: '10px',
      fontWeight: '700',
      padding: '3px 6px',
      borderRadius: '6px',
    },
    priceTag: {
      background: isDark ? 'rgba(255,255,255,0.08)' : '#f0fdf4',
      color: isDark ? 'rgba(255,255,255,0.6)' : '#166534',
      fontSize: '11px',
      fontWeight: '700',
      padding: '2px 6px',
      borderRadius: '6px',
    },
    bizName: {
      color: isDark ? '#ffffff' : '#101820',
      fontWeight: '700',
      margin: '0 0 4px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    bizAddr: {
      color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af',
      fontSize: '12px',
      margin: '0 0 12px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    typeTag: {
      background: 'rgba(37,183,200,0.15)',
      color: '#25B7C8',
      border: '1px solid rgba(37,183,200,0.25)',
      fontSize: '11px',
      fontWeight: '600',
      padding: '3px 8px',
      borderRadius: '6px',
    },
    typeTagCustom: {
      background: isDark ? 'rgba(242,184,75,0.15)' : '#fef3c7',
      color: isDark ? '#F2B84B' : '#b45309',
      border: isDark ? '1px solid rgba(242,184,75,0.25)' : '1px solid #fcd34d',
    },
    categoryTag: {
      background: 'rgba(37,183,200,0.15)',
      color: '#25B7C8',
      border: '1px solid rgba(37,183,200,0.25)',
      fontSize: '11px',
      fontWeight: '600',
      padding: '3px 8px',
      borderRadius: '6px',
    },
    tagsRow: { display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' },
    tagChip: {
      background: isDark ? 'rgba(255,255,255,0.07)' : '#f1f5f9',
      color: isDark ? 'rgba(255,255,255,0.5)' : '#475569',
      fontSize: '10px',
      padding: '2px 6px',
      borderRadius: '4px',
    },
    arrow: { color: '#1565C4', fontSize: '14px' },
    empty: {
      background: isDark ? '#0C2640' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      borderRadius: '12px',
      padding: '60px 24px',
      textAlign: 'center',
    },
    emptyTitle: {
      color: isDark ? '#ffffff' : '#061A2A',
      fontSize: '15px',
      fontWeight: '600',
      margin: '0 0 12px',
    },
    emptyAction: {
      background: 'none',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
      color: isDark ? '#fff' : '#061A2A',
      fontSize: '13px',
      fontWeight: '500',
      cursor: 'pointer',
      padding: '8px 16px',
      borderRadius: '8px',
      fontFamily: 'inherit',
    },
  };
}
