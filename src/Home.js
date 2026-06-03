import { useEffect, useState } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';

export default function Home({ customer, onLogout, onNavigate, refreshKey }) {
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(customer.rnBalance ?? 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${customer.token}` };
    Promise.all([
      fetch(`${API}/ledger/${customer.customerId}/history`, { headers }),
      fetch(`${API}/customers/${customer.customerId}/balance`, { headers }),
    ])
      .then(([hRes, bRes]) => Promise.all([hRes.json(), bRes.json()]))
      .then(([hData, bData]) => {
        setHistory(Array.isArray(hData) ? hData : []);
        setBalance(bData.rnBalance ?? customer.rnBalance ?? 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer.customerId, customer.token, refreshKey]);

  const s = getStyles(isDark);

  return (
    <div style={s.root}>
      {/* 3px teal accent bar */}
      <div style={{ height: '3px', background: '#25B7C8' }} />

      <nav style={{ ...s.nav, padding: isMobile ? '0 16px' : '0 40px' }}>
        <button style={s.navBrand} onClick={() => onNavigate('/home')}>Veniar</button>
        <div style={s.navRight}>
          <button style={s.navLink} onClick={() => onNavigate('/businesses')}>Partners</button>
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
        {/* Balance hero */}
        <div style={{ ...s.hero, padding: isMobile ? '28px 24px' : '40px 44px' }}>
          <p style={s.heroGreeting}>Good to see you, {customer.username}.</p>
          <p style={s.pointsLabel}>VENIAR POINTS</p>
          <div style={s.balanceRow}>
            <span style={{ ...s.balanceNum, fontSize: isMobile ? '3rem' : '4rem' }}>
              {loading ? '—' : balance.toLocaleString()}
            </span>
            <span style={s.balancePts}>pts</span>
          </div>
          <p style={s.balanceSub}>Available to spend at any partner</p>
          <div style={{ ...s.heroActions, flexWrap: 'wrap' }}>
            <button
              style={{ ...s.actionPrimary, flex: isMobile ? '1' : 'none' }}
              onClick={() => onNavigate('/businesses')}
            >
              Browse partners
            </button>
            <button
              style={{ ...s.actionSecondary, flex: isMobile ? '1' : 'none' }}
              onClick={() => onNavigate('/map')}
            >
              View map
            </button>
          </div>
        </div>

        {/* Horizontal accent line */}
        <div style={s.accentLine} />

        {/* Transaction history */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Recent transactions</h2>
          {loading ? (
            <div style={s.skeletons}>
              {[1, 2, 3, 4].map(i => <div key={i} style={s.skeleton} />)}
            </div>
          ) : history.length === 0 ? (
            <div style={s.empty}>
              <p style={s.emptyTitle}>No transactions yet</p>
              <p style={s.emptySub}>
                Visit any Veniar partner and give them your phone number at checkout to start earning points.
              </p>
            </div>
          ) : (
            <div style={s.txList}>
              {history.map((tx, idx) => (
                <TxRow key={tx.id} tx={tx} idx={idx} s={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TxRow({ tx, idx, s }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...s.tx,
        borderColor: hovered ? '#25B7C8' : s.tx.borderColor,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.txIndex}>{idx + 1}</div>
      <div style={{ ...s.txDot, background: tx.rnTransacted > 0 ? '#dcfce7' : '#fee2e2' }}>
        <span style={{ color: tx.rnTransacted > 0 ? '#16a34a' : '#dc2626', fontSize: '14px', fontWeight: '700' }}>
          {tx.rnTransacted > 0 ? '+' : '−'}
        </span>
      </div>
      <div style={s.txMeta}>
        <p style={s.txDesc}>{tx.description}</p>
        <p style={s.txDate}>
          {tx.dateTransacted
            ? new Date(tx.dateTransacted).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })
            : '—'}
        </p>
      </div>
      <span style={{ ...s.txAmt, color: tx.rnTransacted > 0 ? '#16a34a' : '#dc2626' }}>
        {tx.rnTransacted > 0 ? '+' : ''}{tx.rnTransacted} pts
      </span>
    </div>
  );
}

function getStyles(isDark) {
  return {
    root: {
      minHeight: '100vh',
      background: isDark ? '#07243A' : '#FFF8EA',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: 'relative',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '60px',
      background: '#07243A',
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
    body: { maxWidth: '720px', margin: '0 auto', boxSizing: 'border-box' },
    hero: {
      background: '#0B5CAD',
      borderRadius: '20px',
      marginBottom: '0',
      boxShadow: 'none',
    },
    heroGreeting: {
      color: 'rgba(255,255,255,0.55)',
      fontSize: '14px',
      margin: '0 0 8px',
      fontWeight: '500',
    },
    pointsLabel: {
      color: '#25B7C8',
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      margin: '0 0 4px',
      textTransform: 'uppercase',
    },
    balanceRow: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '8px',
      marginBottom: '6px',
    },
    balanceNum: {
      color: '#F2B84B',
      fontWeight: '800',
      lineHeight: 1,
      letterSpacing: '-0.04em',
    },
    balancePts: { color: '#F2B84B', fontSize: '16px', fontWeight: '600' },
    balanceSub: {
      color: 'rgba(255,255,255,0.55)',
      fontSize: '13px',
      margin: '0 0 28px',
    },
    heroActions: { display: 'flex', gap: '10px' },
    actionPrimary: {
      padding: '11px 22px',
      background: '#0B5CAD',
      color: '#ffffff',
      border: '1.5px solid rgba(255,255,255,0.25)',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: 'none',
      fontFamily: 'inherit',
    },
    actionSecondary: {
      padding: '11px 22px',
      background: 'transparent',
      color: '#fff',
      border: '1.5px solid rgba(255,255,255,0.25)',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      fontFamily: 'inherit',
    },
    accentLine: {
      height: '1px',
      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
      margin: '32px 0 24px',
    },
    section: {},
    sectionTitle: {
      color: isDark ? '#ffffff' : '#07243A',
      fontSize: '15px',
      fontWeight: '700',
      margin: '0 0 16px',
      letterSpacing: '-0.01em',
    },
    skeletons: { display: 'flex', flexDirection: 'column', gap: '8px' },
    skeleton: {
      height: '64px',
      borderRadius: '10px',
      background: isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0',
    },
    empty: {
      background: isDark ? '#0D2E42' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      borderRadius: '12px',
      padding: '40px 24px',
      textAlign: 'center',
    },
    emptyTitle: {
      color: isDark ? '#ffffff' : '#07243A',
      fontSize: '15px',
      fontWeight: '600',
      margin: '0 0 8px',
    },
    emptySub: {
      color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73',
      fontSize: '13px',
      lineHeight: 1.6,
      margin: 0,
      maxWidth: '340px',
      display: 'inline-block',
    },
    txList: { display: 'flex', flexDirection: 'column', gap: '2px' },
    tx: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '14px 16px',
      background: isDark ? '#0D2E42' : '#ffffff',
      borderRadius: '8px',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
      boxShadow: 'none',
      transition: 'border-color 0.15s',
    },
    txIndex: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'rgba(37,183,200,0.15)',
      color: '#25B7C8',
      fontSize: '10px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    txDot: {
      width: '34px',
      height: '34px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    txMeta: { flex: 1, minWidth: 0 },
    txDesc: {
      color: isDark ? '#ffffff' : '#101820',
      fontSize: '14px',
      fontWeight: '500',
      margin: '0 0 2px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    txDate: {
      color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af',
      fontSize: '12px',
      margin: 0,
    },
    txAmt: { fontSize: '14px', fontWeight: '700', flexShrink: 0 },
  };
}
