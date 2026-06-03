import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { API } from './config';
import { useTheme } from './ThemeContext';

const ROYAL = '#0B5CAD';

function BusinessOwnerDashboard() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [token, setToken] = useState(null);
  const [account, setAccount] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('overview');
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [saving, setSaving] = useState(false);

  const [empForm, setEmpForm] = useState({ email: '', password: '', firstName: '', lastName: '', role: 'STAFF' });
  const [showEmpForm, setShowEmpForm] = useState(false);
  const [svcForm, setSvcForm] = useState({ name: '', description: '', rewardsCost: '', rewardsGrant: '' });
  const [showSvcForm, setShowSvcForm] = useState(false);
  const [editingSvc, setEditingSvc] = useState(null);

  const showMsg = (text, type = 'success') => {
    setMsg(text); setMsgType(type);
    setTimeout(() => setMsg(''), 4000);
  };

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch(`${API}/business-accounts/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.error || !data.token) { setError('Invalid credentials'); return; }
      setToken(data.token);
      const meRes = await fetch(`${API}/business-accounts/me`, {
        headers: { 'Authorization': `Bearer ${data.token}` }
      });
      const meData = await meRes.json();
      setAccount(meData);
    } catch { setError('Could not connect to server'); }
  };

  const auth = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/employees`, { headers: auth });
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch { }
    setLoading(false);
  };

  const fetchServices = async () => {
    if (!account?.businessId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/businesses/${account.businessId}/services`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch { }
    setLoading(false);
  };

  const fetchStats = async () => {
    if (!account?.businessId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/businesses/${account.businessId}/stats`, { headers: auth });
      setStats(await res.json());
    } catch { }
    setLoading(false);
  };

  useEffect(() => {
    if (!token || !account) return;
    if (tab === 'employees') fetchEmployees();
    if (tab === 'services') fetchServices();
    if (tab === 'stats') fetchStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, account, tab]);

  const handleAddEmployee = async () => {
    if (saving) return;
    if (!empForm.firstName || !empForm.lastName || !empForm.email || !empForm.password) {
      showMsg('Fill in all employee fields', 'error'); return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/employees`, {
        method: 'POST', headers: auth, body: JSON.stringify(empForm)
      });
      const data = await res.json();
      if (data.error) { showMsg(`Error: ${data.error}`, 'error'); return; }
      showMsg('Employee added.');
      setShowEmpForm(false);
      setEmpForm({ email: '', password: '', firstName: '', lastName: '', role: 'STAFF' });
      fetchEmployees();
    } catch { showMsg('Could not add employee.', 'error'); }
    setSaving(false);
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm('Deactivate this employee?')) return;
    try {
      await fetch(`${API}/employees/${id}`, { method: 'DELETE', headers: auth });
      showMsg('Employee deactivated.');
      fetchEmployees();
    } catch { showMsg('Error deactivating employee.', 'error'); }
  };

  const handleSaveService = async () => {
    if (saving) return;
    if (!account?.businessId) { showMsg('Business not approved yet.', 'error'); return; }
    if (!svcForm.name) { showMsg('Service name is required', 'error'); return; }
    setSaving(true);
    try {
      const payload = { name: svcForm.name, description: svcForm.description, rewardsCost: parseInt(svcForm.rewardsCost) || 0, rewardsGrant: parseInt(svcForm.rewardsGrant) || 0 };
      const url = editingSvc
          ? `${API}/businesses/${account.businessId}/services/${editingSvc}`
          : `${API}/businesses/${account.businessId}/services`;
      const res = await fetch(url, { method: editingSvc ? 'PUT' : 'POST', headers: auth, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.error) { showMsg(`Error: ${data.error}`, 'error'); return; }
      showMsg(editingSvc ? 'Service updated.' : 'Service added.');
      setShowSvcForm(false); setEditingSvc(null);
      setSvcForm({ name: '', description: '', rewardsCost: '', rewardsGrant: '' });
      fetchServices();
    } catch { showMsg('Could not save service.', 'error'); }
    setSaving(false);
  };

  const handleEditService = (svc) => {
    setEditingSvc(svc.id);
    setSvcForm({ name: svc.name, description: svc.description, rewardsCost: svc.rewardsCost, rewardsGrant: svc.rewardsGrant });
    setShowSvcForm(true);
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await fetch(`${API}/businesses/${account.businessId}/services/${id}`, { method: 'DELETE', headers: auth });
      showMsg('Service deleted.');
      fetchServices();
    } catch { showMsg('Could not delete service.', 'error'); }
  };

  // Theme-aware values
  const rootBg = isDark ? '#07243A' : '#FFF8EA';
  const cardBg = isDark ? '#0D2E42' : '#ffffff';
  const altSection = isDark ? 'rgba(255,255,255,0.04)' : '#F7F1E3';
  const textColor = isDark ? '#ffffff' : '#101820';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const inputBg = isDark ? 'rgba(255,255,255,0.07)' : '#ffffff';
  const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const inputText = isDark ? '#ffffff' : '#101820';
  const skeletonBg = isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0';
  const sidebarBg = isDark ? '#0D2E42' : '#ffffff';
  const navActiveBg = isDark ? 'rgba(11,92,173,0.25)' : '#eff6ff';
  const mobileTabsBg = isDark ? '#0D2E42' : '#ffffff';
  const tableBorder = `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`;

  const Skeleton = ({ h = 72 }) => (
    <div style={{ height: h, borderRadius: 12, marginBottom: 12, background: skeletonBg }} />
  );

  if (!token) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: '#07243A' }}>
        {!isMobile && (
          <div style={{ flex: 1, background: '#07243A', display: 'flex', alignItems: 'center', padding: '80px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ color: '#F2B84B', fontSize: '12px', fontWeight: '700', letterSpacing: '4px', marginBottom: '20px' }}>REWARDSNOW</div>
              <div style={{ width: '56px', height: '3px', background: '#F2B84B', marginBottom: '32px', borderRadius: '2px' }} />
              <h1 style={{ color: '#fff', fontSize: '3.2rem', fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px 0', maxWidth: '440px' }}>Run your business.<br />Reward your customers.</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '360px' }}>Manage employees, services, and analytics from your business portal.</p>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0D2E42', width: isMobile ? '100%' : '480px', flex: isMobile ? 1 : 'none', padding: isMobile ? '48px 24px' : '80px 64px', boxSizing: 'border-box' }}>
          {/* Teal top line on login card */}
          <div style={{ height: '3px', background: '#25B7C8', borderRadius: '2px 2px 0 0', marginBottom: '32px' }} />
          {isMobile && <div style={{ color: '#F2B84B', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.01em', marginBottom: '32px' }}>RewardsNow</div>}
          <span style={{ display: 'inline-block', background: 'rgba(11,92,173,0.3)', color: '#F2B84B', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '5px 12px', borderRadius: '20px', marginBottom: '20px' }}>BUSINESS PORTAL</span>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.03em' }}>Owner Dashboard</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', margin: '0 0 36px 0' }}>Sign in with your business account</p>
          <label style={{ color: '#F2B84B', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' }}>Email</label>
          <input style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#ffffff', fontSize: '15px', marginBottom: '20px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          <label style={{ color: '#F2B84B', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' }}>Password</label>
          <input style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#ffffff', fontSize: '15px', marginBottom: '20px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          {error && <p style={{ color: '#e03434', fontSize: '13px', background: 'rgba(224,52,52,0.15)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(224,52,52,0.3)', margin: '0 0 14px 0' }}>{error}</p>}
          <button style={{ padding: '16px', borderRadius: '12px', border: 'none', background: ROYAL, color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', width: '100%' }} onClick={handleLogin}>Sign In</button>
        </div>
      </div>
    );
  }

  const isApproved = account?.hasBusiness && account?.businessId;
  const TABS = [
    { key: 'overview', label: 'Overview' },
    { key: 'stats', label: 'Analytics' },
    { key: 'employees', label: 'Employees' },
    { key: 'services', label: 'Services' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: rootBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Teal accent bar */}
      <div style={{ height: '3px', background: '#25B7C8' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#07243A', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button style={{ color: '#F2B84B', fontSize: '1.2rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }} onClick={() => navigate('/')}>RewardsNow</button>
          {!isMobile && <span style={{ background: ROYAL, color: '#fff', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '3px 10px', borderRadius: '20px' }}>BUSINESS</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!isMobile && <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600' }}>{account?.username}</span>}
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
          <button style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }} onClick={() => { setToken(null); setAccount(null); }}>Sign Out</button>
        </div>
      </div>

      {isMobile && (
        <div style={{ display: 'flex', background: mobileTabsBg, borderBottom: `1px solid ${borderColor}`, overflowX: 'auto', flexShrink: 0 }}>
          {TABS.map(({ key, label }) => (
            <button key={key} style={{ flexShrink: 0, padding: '12px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', borderBottom: tab === key ? `2px solid ${ROYAL}` : '2px solid transparent', color: tab === key ? ROYAL : mutedColor, fontWeight: tab === key ? '700' : '400' }}
                    onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flex: 1, flexDirection: isMobile ? 'column' : 'row' }}>
        {!isMobile && (
          <div style={{ width: '190px', background: sidebarBg, borderRight: `1px solid ${borderColor}`, padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
            {TABS.map(({ key, label }) => (
              <button key={key}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: 'none', fontSize: '13px', cursor: 'pointer', textAlign: 'left', width: '100%', background: tab === key ? navActiveBg : 'transparent', color: tab === key ? ROYAL : mutedColor, fontWeight: tab === key ? '700' : '400' }}
                      onClick={() => setTab(key)}>
                {label}
              </button>
            ))}
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', minWidth: 0, padding: isMobile ? '16px' : '28px 32px' }}>
          {msg && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '20px', background: msgType === 'error' ? '#fdeaea' : '#e8f4ed', color: msgType === 'error' ? '#c0392b' : '#2e7d52' }}>
              {msg}
            </div>
          )}

          {tab === 'overview' && (
            <>
              <h2 style={{ color: textColor, fontSize: '1.2rem', fontWeight: '700', margin: '0 0 16px 0' }}>Overview</h2>
              <div style={{ background: cardBg, borderRadius: '16px', padding: '18px', border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '12px', flexDirection: isMobile ? 'column' : 'row' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: ROYAL, color: '#fff', fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{account?.username?.charAt(0).toUpperCase()}</div>
                  <div>
                    <p style={{ color: textColor, fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' }}>{account?.username}</p>
                    <p style={{ color: mutedColor, fontSize: '12px', margin: 0 }}>{account?.email}</p>
                  </div>
                </div>
                <div style={{ padding: '7px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: isApproved ? '#e8f4ed' : '#fff8e1', color: isApproved ? '#2e7d52' : '#e0a020', alignSelf: isMobile ? 'flex-start' : 'center' }}>
                  {isApproved ? 'Active' : 'Pending Approval'}
                </div>
              </div>
              {!isApproved ? (
                <div style={{ background: isDark ? 'rgba(255,248,225,0.08)' : '#fff8e1', borderRadius: '14px', padding: '16px 18px', border: `1px solid ${isDark ? 'rgba(255,224,130,0.2)' : '#ffe082'}`, marginBottom: '16px' }}>
                  <p style={{ color: isDark ? '#F2B84B' : '#7a5500', fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' }}>Your application is under review</p>
                  <p style={{ color: isDark ? 'rgba(242,184,75,0.7)' : '#7a5500', fontSize: '12px', margin: 0, lineHeight: 1.6 }}>Our team will contact you by email once approved.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                  {[
                    { label: 'Analytics', sub: 'View points activity', key: 'stats' },
                    { label: 'Employees', sub: 'Manage staff', key: 'employees' },
                    { label: 'Services', sub: 'Manage menu', key: 'services' },
                  ].map(item => (
                    <div key={item.key} style={{ background: cardBg, borderRadius: '14px', padding: '18px', border: `1px solid ${borderColor}`, cursor: 'pointer' }} onClick={() => setTab(item.key)}>
                      <p style={{ color: ROYAL, fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>{item.label}</p>
                      <p style={{ color: mutedColor, fontSize: '12px', margin: 0 }}>{item.sub}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'stats' && (
            <>
              <h2 style={{ color: textColor, fontSize: '1.2rem', fontWeight: '700', margin: '0 0 16px 0' }}>Analytics</h2>
              {loading ? (
                <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} h={110} />)}
                </div>
              ) : !stats ? (
                <div style={{ background: cardBg, borderRadius: '16px', padding: '40px 24px', textAlign: 'center', border: `1px solid ${borderColor}`, color: mutedColor }}><p>No data yet.</p></div>
              ) : (
                <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                  {[
                    { label: 'Points Issued Today', value: stats.pointsIssuedToday ?? 0, color: '#2e7d52', bg: isDark ? 'rgba(46,125,82,0.15)' : '#e8f4ed' },
                    { label: 'Points Redeemed Today', value: stats.pointsRedeemedToday ?? 0, color: '#c0392b', bg: isDark ? 'rgba(192,57,43,0.15)' : '#fdeaea' },
                    { label: 'Points This Month', value: stats.pointsIssuedThisMonth ?? 0, color: ROYAL, bg: isDark ? 'rgba(11,92,173,0.2)' : '#eff6ff' },
                    { label: 'Total Customers', value: stats.totalCustomers ?? 0, color: isDark ? '#F2B84B' : '#7a5500', bg: isDark ? 'rgba(242,184,75,0.12)' : '#fff8e1' },
                  ].map(stat => (
                    <div key={stat.label} style={{ borderRadius: '14px', padding: '18px', border: `1px solid ${borderColor}`, background: stat.bg }}>
                      <p style={{ fontWeight: '800', margin: '0 0 6px 0', lineHeight: 1, color: stat.color, fontSize: isMobile ? '1.6rem' : '2.2rem' }}>{stat.value.toLocaleString()}</p>
                      <p style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', margin: 0 }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'employees' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ color: textColor, fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Employees</h2>
                {isApproved && (
                  <button style={{ padding: '9px 16px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowEmpForm(!showEmpForm)}>
                    {showEmpForm ? 'Cancel' : '+ Add'}
                  </button>
                )}
              </div>
              {showEmpForm && (
                <div style={{ background: isDark ? 'rgba(11,92,173,0.12)' : '#f0f4ff', borderRadius: '14px', padding: '18px', border: `1.5px solid rgba(11,92,173,0.2)`, marginBottom: '16px' }}>
                  <h3 style={{ color: ROYAL, fontSize: '14px', fontWeight: '700', margin: '0 0 14px 0' }}>New Employee</h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>First name</label>
                      <input style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} autoComplete="given-name" value={empForm.firstName} onChange={e => setEmpForm({ ...empForm, firstName: e.target.value })} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Last name</label>
                      <input style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} autoComplete="family-name" value={empForm.lastName} onChange={e => setEmpForm({ ...empForm, lastName: e.target.value })} />
                    </div>
                  </div>
                  <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email</label>
                  <input style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="email" autoComplete="off" value={empForm.email} onChange={e => setEmpForm({ ...empForm, email: e.target.value })} />
                  <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Temporary password</label>
                  <input style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="password" autoComplete="new-password" value={empForm.password} onChange={e => setEmpForm({ ...empForm, password: e.target.value })} />
                  <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Role</label>
                  <select style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} value={empForm.role} onChange={e => setEmpForm({ ...empForm, role: e.target.value })}>
                    <option value="STAFF">Staff</option>
                    <option value="MANAGER">Manager</option>
                  </select>
                  <button style={{ padding: '12px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: saving ? 0.7 : 1 }} onClick={handleAddEmployee} disabled={saving}>
                    {saving ? 'Adding...' : 'Add Employee'}
                  </button>
                </div>
              )}
              {loading ? [1, 2, 3].map(i => <Skeleton key={i} h={80} />) : employees.length === 0 ? (
                <div style={{ background: cardBg, borderRadius: '16px', padding: '40px 24px', textAlign: 'center', border: `1px solid ${borderColor}`, color: mutedColor }}><p>No employees yet.</p></div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {employees.map(emp => (
                    <div key={emp.id} style={{ background: cardBg, borderRadius: '14px', padding: '14px 16px', border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: ROYAL, color: '#fff', fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{emp.firstName?.charAt(0)?.toUpperCase()}</div>
                      <div style={{ flex: 1, minWidth: '80px' }}>
                        <p style={{ color: textColor, fontSize: '13px', fontWeight: '700', margin: '0 0 2px 0' }}>{emp.firstName} {emp.lastName}</p>
                        <p style={{ color: mutedColor, fontSize: '11px', margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.email}</p>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', background: emp.role === 'MANAGER' ? (isDark ? 'rgba(37,183,200,0.2)' : '#dbeafe') : (isDark ? 'rgba(11,92,173,0.2)' : '#eff6ff'), color: emp.role === 'MANAGER' ? '#25B7C8' : ROYAL }}>
                          {emp.role}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', background: emp.active ? '#e8f4ed' : '#fdeaea', color: emp.active ? '#2e7d52' : '#c0392b' }}>
                          {emp.active ? 'Active' : 'Inactive'}
                        </span>
                        {emp.active && (
                          <button style={{ padding: '5px 10px', borderRadius: '8px', border: '1.5px solid #ffd0d0', background: 'transparent', color: '#c0392b', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleDeactivate(emp.id)}>Deactivate</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'services' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ color: textColor, fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Services</h2>
                {isApproved && (
                  <button style={{ padding: '9px 16px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', flexShrink: 0 }} onClick={() => { setEditingSvc(null); setSvcForm({ name: '', description: '', rewardsCost: '', rewardsGrant: '' }); setShowSvcForm(!showSvcForm); }}>
                    {showSvcForm ? 'Cancel' : '+ Add'}
                  </button>
                )}
              </div>
              {showSvcForm && (
                <div style={{ background: isDark ? 'rgba(11,92,173,0.12)' : '#f0f4ff', borderRadius: '14px', padding: '18px', border: `1.5px solid rgba(11,92,173,0.2)`, marginBottom: '16px' }}>
                  <h3 style={{ color: ROYAL, fontSize: '14px', fontWeight: '700', margin: '0 0 14px 0' }}>{editingSvc ? 'Edit Service' : 'New Service'}</h3>
                  <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Service name</label>
                  <input style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} placeholder="Large Latte" value={svcForm.name} onChange={e => setSvcForm({ ...svcForm, name: e.target.value })} />
                  <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Description</label>
                  <input style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} placeholder="16oz latte any flavor" value={svcForm.description} onChange={e => setSvcForm({ ...svcForm, description: e.target.value })} />
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Points earned</label>
                      <input style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="number" min="0" value={svcForm.rewardsGrant} onChange={e => setSvcForm({ ...svcForm, rewardsGrant: e.target.value })} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Points to redeem</label>
                      <input style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="number" min="0" value={svcForm.rewardsCost} onChange={e => setSvcForm({ ...svcForm, rewardsCost: e.target.value })} />
                    </div>
                  </div>
                  <button style={{ padding: '12px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: saving ? 0.7 : 1 }} onClick={handleSaveService} disabled={saving}>
                    {saving ? 'Saving...' : editingSvc ? 'Save Changes' : 'Add Service'}
                  </button>
                </div>
              )}
              {!isApproved && (
                <div style={{ background: isDark ? 'rgba(255,248,225,0.08)' : '#fff8e1', borderRadius: '14px', padding: '16px 18px', border: `1px solid ${isDark ? 'rgba(255,224,130,0.2)' : '#ffe082'}`, marginBottom: '16px' }}>
                  <p style={{ color: isDark ? '#F2B84B' : '#7a5500', fontSize: '13px', fontWeight: '700', margin: 0 }}>Business approval required before adding services.</p>
                </div>
              )}
              {loading ? (
                <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                  {[1, 2, 3].map(i => <Skeleton key={i} h={140} />)}
                </div>
              ) : services.length === 0 ? (
                <div style={{ background: cardBg, borderRadius: '16px', padding: '40px 24px', textAlign: 'center', border: `1px solid ${borderColor}`, color: mutedColor }}><p>No services yet. Add your first menu item above.</p></div>
              ) : (
                <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                  {services.map(svc => (
                    <div key={svc.id} style={{ background: cardBg, borderRadius: '14px', padding: '16px', border: `1px solid ${borderColor}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                        <h3 style={{ color: textColor, fontSize: '14px', fontWeight: '700', margin: 0, wordBreak: 'break-word' }}>{svc.name}</h3>
                        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                          <button style={{ padding: '5px 10px', borderRadius: '8px', border: `1.5px solid ${ROYAL}`, background: 'transparent', color: ROYAL, fontSize: '11px', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleEditService(svc)}>Edit</button>
                          <button style={{ padding: '5px 10px', borderRadius: '8px', border: '1.5px solid #ffd0d0', background: 'transparent', color: '#c0392b', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleDeleteService(svc.id)}>Delete</button>
                        </div>
                      </div>
                      <p style={{ color: mutedColor, fontSize: '12px', margin: '0 0 12px 0', lineHeight: 1.5 }}>{svc.description}</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: tableBorder, paddingTop: '10px' }}>
                        <span style={{ background: '#e8f4ed', color: '#2e7d52', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>+{svc.rewardsGrant} pts earned</span>
                        <span style={{ background: isDark ? 'rgba(11,92,173,0.2)' : '#eff6ff', color: ROYAL, fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>{svc.rewardsCost} pts to redeem</span>
                      </div>
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

export default BusinessOwnerDashboard;
