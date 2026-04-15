import { useEffect, useState } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';

const BLUE = '#2040C8';

export default function Home({ customer, onLogout, onNavigate, refreshKey }) {
  const isMobile = useIsMobile();
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
  }, [customer.customerId, customer.token, refreshKey]);

  return (
      <div style={s.root}>
        <nav style={{ ...s.nav, padding: isMobile ? '0 16px' : '0 40px' }}>
          <span style={s.navBrand}>RewardsNow</span>
          <div style={s.navRight}>
            <button style={s.navLink} onClick={() => onNavigate('/businesses')}>Partners</button>
            <button style={s.navLink} onClick={() => onNavigate('/map')}>Map</button>
            <button style={s.navLogout} onClick={onLogout}>Sign out</button>
          </div>
        </nav>

        <div style={{ ...s.body, padding: isMobile ? '20px 16px' : '40px 24px' }}>
          {/* Balance hero */}
          <div style={{ ...s.hero, padding: isMobile ? '24px' : '36px' }}>
            <div style={s.heroLeft}>
              <p style={s.heroGreeting}>Good to see you, {customer.username}.</p>
              <div style={s.balanceRow}>
              <span style={{ ...s.balanceNum, fontSize: isMobile ? '2.6rem' : '3.5rem' }}>
                {loading ? '—' : balance.toLocaleString()}
              </span>
                <span style={s.balancePts}>pts</span>
              </div>
              <p style={s.balanceSub}>Available to spend at any partner</p>
              <div style={{ ...s.heroActions, flexWrap: 'wrap' }}>
                <button style={{ ...s.actionPrimary, flex: isMobile ? '1' : 'none' }} onClick={() => onNavigate('/businesses')}>
                  Browse partners
                </button>
                <button style={{ ...s.actionSecondary, flex: isMobile ? '1' : 'none' }} onClick={() => onNavigate('/map')}>
                  View map
                </button>
              </div>
            </div>
          </div>

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
                  <p style={s.emptySub}>Visit any RewardsNow partner and give them your phone number at checkout to start earning points.</p>
                </div>
            ) : (
                <div style={s.txList}>
                  {history.map(tx => (
                      <div key={tx.id} style={s.tx}>
                        <div style={{ ...s.txDot, background: tx.rnTransacted > 0 ? '#dcfce7' : '#fee2e2' }}>
                    <span style={{ color: tx.rnTransacted > 0 ? '#16a34a' : '#dc2626', fontSize: '14px', fontWeight: '700' }}>
                      {tx.rnTransacted > 0 ? '+' : '−'}
                    </span>
                        </div>
                        <div style={s.txMeta}>
                          <p style={s.txDesc}>{tx.description}</p>
                          <p style={s.txDate}>
                            {tx.dateTransacted
                                ? new Date(tx.dateTransacted).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
                                : '—'}
                          </p>
                        </div>
                        <span style={{ ...s.txAmt, color: tx.rnTransacted > 0 ? '#16a34a' : '#dc2626' }}>
                    {tx.rnTransacted > 0 ? '+' : ''}{tx.rnTransacted} pts
                  </span>
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
  root: { minHeight: '100vh', background: '#f9fafb', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', background: '#fff', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 100 },
  navBrand: { color: '#0a0a0a', fontSize: '15px', fontWeight: '700' },
  navRight: { display: 'flex', alignItems: 'center', gap: '4px' },
  navLink: { background: 'none', border: 'none', color: '#6b7280', fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: '6px 8px', borderRadius: '6px' },
  navLogout: { background: 'none', border: '1px solid #e5e7eb', color: '#374151', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px' },
  body: { maxWidth: '720px', margin: '0 auto', boxSizing: 'border-box' },
  hero: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', marginBottom: '32px' },
  heroLeft: {},
  heroGreeting: { color: '#6b7280', fontSize: '14px', margin: '0 0 12px', fontWeight: '500' },
  balanceRow: { display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' },
  balanceNum: { color: '#0a0a0a', fontWeight: '800', lineHeight: 1, letterSpacing: '-0.04em' },
  balancePts: { color: '#9ca3af', fontSize: '16px', fontWeight: '600' },
  balanceSub: { color: '#9ca3af', fontSize: '13px', margin: '0 0 28px' },
  heroActions: { display: 'flex', gap: '10px' },
  actionPrimary: { padding: '9px 20px', background: BLUE, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  actionSecondary: { padding: '9px 20px', background: 'transparent', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  section: {},
  sectionTitle: { color: '#0a0a0a', fontSize: '15px', fontWeight: '700', margin: '0 0 16px', letterSpacing: '-0.01em' },
  skeletons: { display: 'flex', flexDirection: 'column', gap: '8px' },
  skeleton: { height: '64px', borderRadius: '10px', background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' },
  empty: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '40px 24px', textAlign: 'center' },
  emptyTitle: { color: '#374151', fontSize: '15px', fontWeight: '600', margin: '0 0 8px' },
  emptySub: { color: '#9ca3af', fontSize: '13px', lineHeight: 1.6, margin: 0, maxWidth: '340px', display: 'inline-block' },
  txList: { display: 'flex', flexDirection: 'column', gap: '2px' },
  tx: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: '#fff', borderRadius: '10px', border: '1px solid #f0f0f0' },
  txDot: { width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  txMeta: { flex: 1, minWidth: 0 },
  txDesc: { color: '#111', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  txDate: { color: '#9ca3af', fontSize: '12px', margin: 0 },
  txAmt: { fontSize: '14px', fontWeight: '700', flexShrink: 0 },
};