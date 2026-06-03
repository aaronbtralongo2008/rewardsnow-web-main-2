import { useState, useEffect } from 'react';
import { useIsMobile } from './useIsMobile';
import { API } from './config';
import { useTheme } from './ThemeContext';

const ROYAL = '#0B5CAD';

function AdminDashboard() {
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('pending');
  const [pending, setPending] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');
  const [actionType, setActionType] = useState('success');
  const [acting, setActing] = useState(null);
  const [rejectNotes, setRejectNotes] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch(`${API}/customers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.error || !data.token) {
        setError('Invalid credentials');
      } else {
        setToken(data.token);
      }
    } catch {
      setError('Could not connect to server');
    }
  };

  const auth = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const showMsg = (text, type = 'success') => {
    setActionMsg(text);
    setActionType(type);
    setTimeout(() => setActionMsg(''), 4000);
  };

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/business-requests/pending`, { headers: auth });
      const data = await res.json();
      setPending(Array.isArray(data) ? data : []);
    } catch { }
    setLoading(false);
  };

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/businesses`, { headers: auth });
      const data = await res.json();
      setBusinesses(Array.isArray(data) ? data : []);
    } catch { }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!token) return;
    if (tab === 'pending') fetchPending();
    if (tab === 'businesses') fetchBusinesses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tab]);

  const handleApprove = async (id) => {
    if (acting) return;
    setActing(id + '-approve');
    try {
      const res = await fetch(`${API}/business-requests/${id}/approve`, {
        method: 'POST', headers: auth,
        body: JSON.stringify({ reviewerNotes: 'Approved by admin' })
      });
      const data = await res.json();
      if (data.error) { showMsg(`Error: ${data.error}`, 'error'); }
      else { showMsg('Business approved and is now live.'); fetchPending(); }
    } catch { showMsg('Could not connect to server', 'error'); }
    setActing(null);
  };

  const handleReject = async (id) => {
    if (acting) return;
    setActing(id + '-reject');
    try {
      const notes = rejectNotes[id] || 'Does not meet requirements';
      await fetch(`${API}/business-requests/${id}/reject`, {
        method: 'POST', headers: auth,
        body: JSON.stringify({ reviewerNotes: notes })
      });
      showMsg('Business request rejected.');
      fetchPending();
    } catch { showMsg('Error rejecting request.', 'error'); }
    setActing(null);
  };

  const handleSuspend = async (id) => {
    if (!window.confirm('Suspend this business?')) return;
    try {
      await fetch(`${API}/business-requests/${id}/suspend`, {
        method: 'POST', headers: auth, body: JSON.stringify({ reason: 'Suspended by admin' })
      });
      showMsg('Business suspended.');
      fetchBusinesses();
    } catch { showMsg('Error suspending business.', 'error'); }
  };

  const handleTerminate = async (id) => {
    if (!window.confirm('Permanently terminate this business? This cannot be undone.')) return;
    try {
      await fetch(`${API}/business-requests/${id}/terminate`, {
        method: 'POST', headers: auth, body: JSON.stringify({ reason: 'Terminated by admin' })
      });
      showMsg('Business terminated.');
      fetchBusinesses();
    } catch { showMsg('Error terminating business.', 'error'); }
  };

  const openEdit = (biz) => {
    setEditingId(biz.id);
    setEditForm({
      category: biz.category || '',
      tags: biz.tags || '',
      priceRange: biz.priceRange || 0,
      rankScore: biz.rankScore || 0,
      featured: biz.featured || false,
      featuredUntil: biz.featuredUntil ? biz.featuredUntil.substring(0, 10) : '',
    });
  };

  const handleSaveDetails = async (id) => {
    try {
      const res = await fetch(`${API}/businesses/${id}/details`, {
        method: 'PUT',
        headers: auth,
        body: JSON.stringify({
          category: editForm.category || null,
          tags: editForm.tags || null,
          priceRange: parseInt(editForm.priceRange) || null,
        }),
      });
      const data = await res.json();
      if (data.error) showMsg(`Error: ${data.error}`, 'error');
      else { showMsg('Details saved.'); fetchBusinesses(); }
    } catch { showMsg('Error saving details.', 'error'); }
  };

  const handleSaveRank = async (id) => {
    try {
      const res = await fetch(`${API}/businesses/${id}/rank`, {
        method: 'PUT',
        headers: auth,
        body: JSON.stringify({
          rankScore: parseFloat(editForm.rankScore) || 0,
          featured: editForm.featured,
          featuredUntil: editForm.featuredUntil || null,
        }),
      });
      const data = await res.json();
      if (data.error) showMsg(`Error: ${data.error}`, 'error');
      else { showMsg('Ranking saved.'); fetchBusinesses(); }
    } catch { showMsg('Error saving ranking.', 'error'); }
  };

  // Theme-aware values
  const rootBg = isDark ? '#07243A' : '#FFF8EA';
  const cardBg = isDark ? '#0D2E42' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#101820';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const inputBg = isDark ? 'rgba(255,255,255,0.07)' : '#ffffff';
  const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const inputText = isDark ? '#ffffff' : '#101820';
  const skeletonBg = isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0';
  const sidebarBg = isDark ? '#0D2E42' : '#ffffff';
  const navActiveBg = isDark ? 'rgba(11,92,173,0.25)' : 'rgba(11,92,173,0.08)';
  const mobileTabsBg = isDark ? '#0D2E42' : '#ffffff';
  const tableBorder = `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`;

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: '#07243A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ background: '#0D2E42', border: '1px solid rgba(255,255,255,0.1)', width: isMobile ? '100%' : '400px', padding: isMobile ? '40px 24px' : '48px', borderRadius: isMobile ? '0' : '16px', minHeight: isMobile ? '100vh' : 'auto', boxSizing: 'border-box' }}>
          {/* Teal top line on login card */}
          <div style={{ height: '3px', background: '#25B7C8', borderRadius: '2px 2px 0 0', marginBottom: '32px' }} />
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ background: '#F2B84B', color: '#07243A', fontSize: '10px', fontWeight: '700', letterSpacing: '3px', padding: '4px 12px', borderRadius: '20px' }}>ADMIN</span>
            <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '800', margin: '12px 0 4px 0' }}>RewardsNow Admin</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>Restricted access — authorized personnel only</p>
          </div>
          <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email</label>
          <input style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', marginBottom: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="email" value={email}
                 onChange={e => setEmail(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Password</label>
          <input style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', marginBottom: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="password" value={password}
                 onChange={e => setPassword(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          {error && <p style={{ color: '#e03434', fontSize: '13px', background: 'rgba(224,52,52,0.15)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(224,52,52,0.3)', margin: '0 0 14px 0' }}>{error}</p>}
          <button style={{ padding: '14px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' }} onClick={handleLogin}>Sign In</button>
        </div>
      </div>
    );
  }

  const TABS = [
    { key: 'pending', label: 'Pending requests' },
    { key: 'businesses', label: 'All businesses' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: rootBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Teal accent bar */}
      <div style={{ height: '3px', background: '#25B7C8' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#07243A', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#F2B84B', fontSize: '1.2rem', fontWeight: '800' }}>RewardsNow</span>
          <span style={{ background: '#F2B84B', color: '#07243A', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '3px 10px', borderRadius: '20px' }}>ADMIN</span>
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
          <button style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }} onClick={() => setToken(null)}>Sign Out</button>
        </div>
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', background: mobileTabsBg, borderBottom: `1px solid ${borderColor}`, paddingLeft: '0' }}>
          {TABS.map(({ key, label }) => (
            <button key={key} style={{ flex: 1, padding: '12px 8px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', textAlign: 'center', borderBottom: tab === key ? `2px solid ${ROYAL}` : '2px solid transparent', color: tab === key ? ROYAL : mutedColor, fontWeight: tab === key ? '700' : '400' }}
                    onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>
      ) : null}

      <div style={{ display: 'flex', flex: 1, flexDirection: isMobile ? 'column' : 'row' }}>
        {!isMobile && (
          <div style={{ width: '200px', background: sidebarBg, borderRight: `1px solid ${borderColor}`, padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {TABS.map(({ key, label }) => (
              <button key={key}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: 'none', fontSize: '13px', cursor: 'pointer', textAlign: 'left', width: '100%', background: tab === key ? navActiveBg : 'transparent', color: tab === key ? ROYAL : mutedColor, fontWeight: tab === key ? '700' : '400' }}
                      onClick={() => setTab(key)}>
                {label}
              </button>
            ))}
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px' : '28px 32px' }}>
          {actionMsg && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '20px', background: actionType === 'error' ? '#fdeaea' : '#e8f4ed', color: actionType === 'error' ? '#c0392b' : '#2e7d52' }}>
              {actionMsg}
            </div>
          )}

          {tab === 'pending' && (
            <>
              <h2 style={{ color: textColor, fontSize: '1.2rem', fontWeight: '700', margin: '0 0 16px 0' }}>Pending Requests</h2>
              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[1, 2, 3].map(i => <div key={i} style={{ height: '140px', borderRadius: '16px', marginBottom: '12px', background: skeletonBg }} />)}
                </div>
              ) : pending.length === 0 ? (
                <div style={{ background: cardBg, borderRadius: '16px', padding: '48px', textAlign: 'center', border: `1px solid ${borderColor}` }}><p style={{ color: mutedColor, margin: 0 }}>No pending requests — all clear.</p></div>
              ) : (
                pending.map(req => (
                  <div key={req.id} style={{ background: cardBg, borderRadius: '16px', padding: '16px', border: `1px solid ${borderColor}`, marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexDirection: isMobile ? 'column' : 'row' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ color: textColor, fontSize: '1rem', fontWeight: '700', margin: '0 0 4px 0' }}>{req.businessName}</h3>
                        <p style={{ color: mutedColor, fontSize: '12px', margin: '0 0 3px 0' }}>{req.contactEmail} · {req.contactPhone}</p>
                        {req.address && <p style={{ color: mutedColor, fontSize: '12px', margin: '0 0 3px 0' }}>{req.address}</p>}
                        <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                          {req.requestingPaidPartner && <span style={{ background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>Featured Partner</span>}
                          {req.requestingUniqueRewardsPoint && <span style={{ background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>Custom Rewards</span>}
                        </div>
                        <p style={{ color: isDark ? 'rgba(255,255,255,0.3)' : '#aaa', fontSize: '11px', margin: '8px 0 0 0' }}>
                          Submitted: {new Date(req.submittedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </p>
                        <div style={{ marginTop: '12px' }}>
                          <input style={{ padding: '8px 12px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '12px', outline: 'none', width: '100%', boxSizing: 'border-box' }} placeholder="Rejection reason (optional)"
                                 value={rejectNotes[req.id] || ''}
                                 onChange={e => setRejectNotes({ ...rejectNotes, [req.id]: e.target.value })} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0, flexDirection: isMobile ? 'row' : 'column', marginTop: isMobile ? '12px' : '0' }}>
                        <button style={{ padding: '9px 16px', borderRadius: '10px', border: 'none', background: '#2e7d52', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', opacity: acting === req.id + '-approve' ? 0.7 : 1, flex: isMobile ? 1 : 'none' }}
                                onClick={() => handleApprove(req.id)} disabled={!!acting}>
                          {acting === req.id + '-approve' ? 'Approving...' : 'Approve'}
                        </button>
                        <button style={{ padding: '9px 16px', borderRadius: '10px', border: 'none', background: '#c0392b', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', opacity: acting === req.id + '-reject' ? 0.7 : 1, flex: isMobile ? 1 : 'none' }}
                                onClick={() => handleReject(req.id)} disabled={!!acting}>
                          {acting === req.id + '-reject' ? 'Rejecting...' : 'Reject'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {tab === 'businesses' && (
            <>
              <h2 style={{ color: textColor, fontSize: '1.2rem', fontWeight: '700', margin: '0 0 16px 0' }}>All Businesses ({businesses.length})</h2>
              {loading ? (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {[1, 2, 3, 4].map(i => <div key={i} style={{ height: '100px', borderRadius: '14px', background: skeletonBg }} />)}
                </div>
              ) : businesses.length === 0 ? (
                <div style={{ background: cardBg, borderRadius: '16px', padding: '48px', textAlign: 'center', border: `1px solid ${borderColor}` }}><p style={{ color: mutedColor, margin: 0 }}>No businesses yet.</p></div>
              ) : (
                <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                  {businesses.map(biz => (
                    <div key={biz.id} style={{ background: cardBg, borderRadius: '14px', padding: '16px', border: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: ROYAL, color: '#fff', fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{biz.name.charAt(0).toUpperCase()}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: textColor, fontSize: '13px', fontWeight: '700', margin: '0 0 3px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{biz.name}</p>
                          <p style={{ color: isDark ? 'rgba(255,255,255,0.35)' : '#aaa', fontSize: '11px', margin: '0 0 6px 0' }}>{biz.address || 'No address'}</p>
                          <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                            {biz.featured && <span style={{ background: '#F2B84B', color: '#07243A', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>⭐ Featured</span>}
                            {biz.paidPartner && <span style={{ background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>Partner</span>}
                            {biz.uniqueRewardsPoint && <span style={{ background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>Custom Points</span>}
                            {biz.category && <span style={{ background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>{biz.category}</span>}
                            {biz.priceRange > 0 && <span style={{ background: '#f0fdf4', color: '#166534', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>{'$'.repeat(biz.priceRange)}</span>}
                          </div>
                          <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                            <button style={{ padding: '5px 10px', borderRadius: '8px', border: '1.5px solid #e0a020', background: 'transparent', color: '#e0a020', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleSuspend(biz.id)}>Suspend</button>
                            <button style={{ padding: '5px 10px', borderRadius: '8px', border: '1.5px solid #c0392b', background: 'transparent', color: '#c0392b', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleTerminate(biz.id)}>Terminate</button>
                            <button style={{ padding: '5px 10px', borderRadius: '8px', border: `1.5px solid ${ROYAL}`, background: 'transparent', color: ROYAL, fontSize: '11px', fontWeight: '600', cursor: 'pointer' }} onClick={() => editingId === biz.id ? setEditingId(null) : openEdit(biz)}>
                              {editingId === biz.id ? 'Close' : 'Edit'}
                            </button>
                          </div>
                        </div>
                      </div>
                      {editingId === biz.id && (
                        <div style={{ borderTop: tableBorder, marginTop: '12px', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <p style={{ color: mutedColor, fontSize: '11px', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Profile Details</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ color: mutedColor, fontSize: '11px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Category</label>
                                <select style={{ padding: '7px 10px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box' }} value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })}>
                                  <option value="">— None —</option>
                                  <option value="food">Food &amp; Drink</option>
                                  <option value="retail">Retail</option>
                                  <option value="services">Services</option>
                                  <option value="health">Health &amp; Wellness</option>
                                  <option value="entertainment">Entertainment</option>
                                  <option value="travel">Travel</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ color: mutedColor, fontSize: '11px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Price Range</label>
                                <select style={{ padding: '7px 10px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box' }} value={editForm.priceRange} onChange={e => setEditForm({ ...editForm, priceRange: e.target.value })}>
                                  <option value={0}>— None —</option>
                                  <option value={1}>$ (Budget)</option>
                                  <option value={2}>$$ (Moderate)</option>
                                  <option value={3}>$$$ (Expensive)</option>
                                  <option value={4}>$$$$ (Very Expensive)</option>
                                </select>
                              </div>
                            </div>
                            <label style={{ color: mutedColor, fontSize: '11px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Tags (comma-separated)</label>
                            <input style={{ padding: '7px 10px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit', marginBottom: '2px' }} placeholder="e.g. coffee, wifi, vegan" value={editForm.tags} onChange={e => setEditForm({ ...editForm, tags: e.target.value })} />
                            <button style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', background: ROYAL, color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-start' }} onClick={() => handleSaveDetails(biz.id)}>Save Details</button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <p style={{ color: mutedColor, fontSize: '11px', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ranking &amp; Featured</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ color: mutedColor, fontSize: '11px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Rank Score</label>
                                <input style={{ padding: '7px 10px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit', marginBottom: '2px' }} type="number" step="0.1" value={editForm.rankScore} onChange={e => setEditForm({ ...editForm, rankScore: e.target.value })} />
                              </div>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ color: mutedColor, fontSize: '11px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Featured Until</label>
                                <input style={{ padding: '7px 10px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit', marginBottom: '2px' }} type="date" value={editForm.featuredUntil} onChange={e => setEditForm({ ...editForm, featuredUntil: e.target.value })} />
                              </div>
                            </div>
                            <label style={{ color: mutedColor, fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '10px' }}>
                              <input type="checkbox" checked={editForm.featured} onChange={e => setEditForm({ ...editForm, featured: e.target.checked })} />
                              Mark as Featured
                            </label>
                            <button style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', background: ROYAL, color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-start' }} onClick={() => handleSaveRank(biz.id)}>Save Ranking</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
