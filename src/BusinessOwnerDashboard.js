import { useState, useEffect } from 'react';
import { useIsMobile } from './useIsMobile';
import { API } from './config';

const ROYAL = '#7c3aed';

function BusinessOwnerDashboard() {
  const isMobile = useIsMobile();
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!token || !account) return;
    if (tab === 'employees') fetchEmployees();
    if (tab === 'services') fetchServices();
    if (tab === 'stats') fetchStats();
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

  const Skeleton = ({ h = 72 }) => (
      <div style={{ height: h, borderRadius: 12, marginBottom: 12, background: 'linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
  );

  if (!token) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
          {!isMobile && (
              <div style={s.loginLeft}>
                <div style={s.loginOrb1} />
                <div style={s.loginOrb2} />
                <div style={s.loginOrb3} />
                <div style={s.loginLeftContent}>
                  <div style={s.loginBrandBadge}>REWARDSNOW</div>
                  <div style={s.loginGoldLine} />
                  <h1 style={s.loginHeadline}>Run your business.<br />Reward your customers.</h1>
                  <p style={s.loginDesc}>Manage employees, services, and analytics from your business portal.</p>
                </div>
              </div>
          )}
          <div style={{ ...s.loginRight, width: isMobile ? '100%' : '480px', flex: isMobile ? 1 : 'none', padding: isMobile ? '48px 24px' : '80px 64px', boxSizing: 'border-box' }}>
            {isMobile && <div style={s.mobileLoginBrand}>RewardsNow</div>}
            <span style={s.loginPortalTag}>BUSINESS PORTAL</span>
            <h2 style={s.loginTitle}>Owner Dashboard</h2>
            <p style={s.loginSub}>Sign in with your business account</p>
            <label style={s.loginLabel}>Email</label>
            <input style={s.loginInput} type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <label style={s.loginLabel}>Password</label>
            <input style={s.loginInput} type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            {error && <p style={s.loginError}>{error}</p>}
            <button style={s.loginBtn} onClick={handleLogin}>Sign In</button>
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
      <div style={s.container}>
        <div style={s.topBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={s.logo}>RewardsNow</span>
            {!isMobile && <span style={s.portalBadge}>BUSINESS</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {!isMobile && <span style={s.userName}>{account?.username}</span>}
            <button style={s.logoutBtn} onClick={() => { setToken(null); setAccount(null); }}>Sign Out</button>
          </div>
        </div>

        {isMobile && (
            <div style={s.mobileTabs}>
              {TABS.map(({ key, label }) => (
                  <button key={key} style={{ ...s.mobileTab, borderBottom: tab === key ? `2px solid ${ROYAL}` : '2px solid transparent', color: tab === key ? ROYAL : '#888', fontWeight: tab === key ? '700' : '400' }}
                          onClick={() => setTab(key)}>
                    {label}
                  </button>
              ))}
            </div>
        )}

        <div style={{ ...s.body, flexDirection: isMobile ? 'column' : 'row' }}>
          {!isMobile && (
              <div style={s.sidebar}>
                {TABS.map(({ key, label }) => (
                    <button key={key}
                            style={{ ...s.navBtn, background: tab === key ? '#f0f4ff' : 'transparent', color: tab === key ? ROYAL : '#555', fontWeight: tab === key ? '700' : '400' }}
                            onClick={() => setTab(key)}>
                      {label}
                    </button>
                ))}
              </div>
          )}

          <div style={{ ...s.content, padding: isMobile ? '16px' : '28px 32px' }}>
            {msg && (
                <div style={{ ...s.banner, background: msgType === 'error' ? '#fdeaea' : '#e8f4ed', color: msgType === 'error' ? '#c0392b' : '#2e7d52' }}>
                  {msg}
                </div>
            )}

            {tab === 'overview' && (
                <>
                  <h2 style={s.pageTitle}>Overview</h2>
                  <div style={{ ...s.statusCard, flexDirection: isMobile ? 'column' : 'row' }}>
                    <div style={s.statusLeft}>
                      <div style={s.bizInitial}>{account?.username?.charAt(0).toUpperCase()}</div>
                      <div>
                        <p style={s.statusName}>{account?.username}</p>
                        <p style={s.statusEmail}>{account?.email}</p>
                      </div>
                    </div>
                    <div style={{ padding: '7px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: isApproved ? '#e8f4ed' : '#fff8e1', color: isApproved ? '#2e7d52' : '#e0a020', alignSelf: isMobile ? 'flex-start' : 'center' }}>
                      {isApproved ? 'Active' : 'Pending Approval'}
                    </div>
                  </div>
                  {!isApproved ? (
                      <div style={s.pendingNote}>
                        <p style={s.pendingTitle}>Your application is under review</p>
                        <p style={s.pendingSub}>Our team typically responds within 24-48 hours.</p>
                      </div>
                  ) : (
                      <div style={{ ...s.quickGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                        {[
                          { label: 'Analytics', sub: 'View points activity', key: 'stats' },
                          { label: 'Employees', sub: 'Manage staff', key: 'employees' },
                          { label: 'Services', sub: 'Manage menu', key: 'services' },
                        ].map(item => (
                            <div key={item.key} style={s.quickCard} onClick={() => setTab(item.key)}>
                              <p style={s.quickLabel}>{item.label}</p>
                              <p style={s.quickSub}>{item.sub}</p>
                            </div>
                        ))}
                      </div>
                  )}
                </>
            )}

            {tab === 'stats' && (
                <>
                  <h2 style={s.pageTitle}>Analytics</h2>
                  {loading ? (
                      <div style={{ ...s.statsGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} h={110} />)}
                      </div>
                  ) : !stats ? (
                      <div style={s.empty}><p>No data yet.</p></div>
                  ) : (
                      <div style={{ ...s.statsGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                        {[
                          { label: 'Points Issued Today', value: stats.pointsIssuedToday ?? 0, color: '#2e7d52', bg: '#e8f4ed' },
                          { label: 'Points Redeemed Today', value: stats.pointsRedeemedToday ?? 0, color: '#c0392b', bg: '#fdeaea' },
                          { label: 'Points This Month', value: stats.pointsIssuedThisMonth ?? 0, color: ROYAL, bg: '#f0f4ff' },
                          { label: 'Total Customers', value: stats.totalCustomers ?? 0, color: '#7a5500', bg: '#fff8e1' },
                        ].map(stat => (
                            <div key={stat.label} style={{ ...s.statCard, background: stat.bg }}>
                              <p style={{ ...s.statValue, color: stat.color, fontSize: isMobile ? '1.6rem' : '2.2rem' }}>{stat.value.toLocaleString()}</p>
                              <p style={s.statLabel}>{stat.label}</p>
                            </div>
                        ))}
                      </div>
                  )}
                </>
            )}

            {tab === 'employees' && (
                <>
                  <div style={s.tabHeader}>
                    <h2 style={s.pageTitle}>Employees</h2>
                    {isApproved && (
                        <button style={s.addBtn} onClick={() => setShowEmpForm(!showEmpForm)}>
                          {showEmpForm ? 'Cancel' : '+ Add'}
                        </button>
                    )}
                  </div>
                  {showEmpForm && (
                      <div style={s.formCard}>
                        <h3 style={s.formTitle}>New Employee</h3>
                        <div style={s.formRow}>
                          <div style={s.formHalf}>
                            <label style={s.label}>First name</label>
                            <input style={s.input} autoComplete="given-name" value={empForm.firstName} onChange={e => setEmpForm({ ...empForm, firstName: e.target.value })} />
                          </div>
                          <div style={s.formHalf}>
                            <label style={s.label}>Last name</label>
                            <input style={s.input} autoComplete="family-name" value={empForm.lastName} onChange={e => setEmpForm({ ...empForm, lastName: e.target.value })} />
                          </div>
                        </div>
                        <label style={s.label}>Email</label>
                        <input style={s.input} type="email" autoComplete="off" value={empForm.email} onChange={e => setEmpForm({ ...empForm, email: e.target.value })} />
                        <label style={s.label}>Temporary password</label>
                        <input style={s.input} type="password" autoComplete="new-password" value={empForm.password} onChange={e => setEmpForm({ ...empForm, password: e.target.value })} />
                        <label style={s.label}>Role</label>
                        <select style={s.input} value={empForm.role} onChange={e => setEmpForm({ ...empForm, role: e.target.value })}>
                          <option value="STAFF">Staff</option>
                          <option value="MANAGER">Manager</option>
                        </select>
                        <button style={{ ...s.btn, opacity: saving ? 0.7 : 1 }} onClick={handleAddEmployee} disabled={saving}>
                          {saving ? 'Adding...' : 'Add Employee'}
                        </button>
                      </div>
                  )}
                  {loading ? [1, 2, 3].map(i => <Skeleton key={i} h={80} />) : employees.length === 0 ? (
                      <div style={s.empty}><p>No employees yet.</p></div>
                  ) : (
                      <div style={s.empList}>
                        {employees.map(emp => (
                            <div key={emp.id} style={s.empCard}>
                              <div style={s.empAvatar}>{emp.firstName?.charAt(0)?.toUpperCase()}</div>
                              <div style={s.empInfo}>
                                <p style={s.empName}>{emp.firstName} {emp.lastName}</p>
                                <p style={s.empEmail}>{emp.email}</p>
                                <span style={{ ...s.roleBadge, background: emp.role === 'MANAGER' ? '#f0e8ff' : '#f0f4ff', color: emp.role === 'MANAGER' ? '#6b21a8' : ROYAL }}>
                                  {emp.role}
                                </span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                                <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', background: emp.active ? '#e8f4ed' : '#fdeaea', color: emp.active ? '#2e7d52' : '#c0392b' }}>
                                  {emp.active ? 'Active' : 'Inactive'}
                                </span>
                                {emp.active && (
                                    <button style={s.deactivateBtn} onClick={() => handleDeactivate(emp.id)}>Deactivate</button>
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
                  <div style={s.tabHeader}>
                    <h2 style={s.pageTitle}>Services</h2>
                    {isApproved && (
                        <button style={s.addBtn} onClick={() => { setEditingSvc(null); setSvcForm({ name: '', description: '', rewardsCost: '', rewardsGrant: '' }); setShowSvcForm(!showSvcForm); }}>
                          {showSvcForm ? 'Cancel' : '+ Add'}
                        </button>
                    )}
                  </div>
                  {showSvcForm && (
                      <div style={s.formCard}>
                        <h3 style={s.formTitle}>{editingSvc ? 'Edit Service' : 'New Service'}</h3>
                        <label style={s.label}>Service name</label>
                        <input style={s.input} placeholder="Large Latte" value={svcForm.name} onChange={e => setSvcForm({ ...svcForm, name: e.target.value })} />
                        <label style={s.label}>Description</label>
                        <input style={s.input} placeholder="16oz latte any flavor" value={svcForm.description} onChange={e => setSvcForm({ ...svcForm, description: e.target.value })} />
                        <div style={s.formRow}>
                          <div style={s.formHalf}>
                            <label style={s.label}>Points earned</label>
                            <input style={s.input} type="number" min="0" value={svcForm.rewardsGrant} onChange={e => setSvcForm({ ...svcForm, rewardsGrant: e.target.value })} />
                          </div>
                          <div style={s.formHalf}>
                            <label style={s.label}>Points to redeem</label>
                            <input style={s.input} type="number" min="0" value={svcForm.rewardsCost} onChange={e => setSvcForm({ ...svcForm, rewardsCost: e.target.value })} />
                          </div>
                        </div>
                        <button style={{ ...s.btn, opacity: saving ? 0.7 : 1 }} onClick={handleSaveService} disabled={saving}>
                          {saving ? 'Saving...' : editingSvc ? 'Save Changes' : 'Add Service'}
                        </button>
                      </div>
                  )}
                  {!isApproved && <div style={s.pendingNote}><p style={s.pendingTitle}>Business approval required before adding services.</p></div>}
                  {loading ? (
                      <div style={{ ...s.svcGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                        {[1, 2, 3].map(i => <Skeleton key={i} h={140} />)}
                      </div>
                  ) : services.length === 0 ? (
                      <div style={s.empty}><p>No services yet. Add your first menu item above.</p></div>
                  ) : (
                      <div style={{ ...s.svcGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                        {services.map(svc => (
                            <div key={svc.id} style={s.svcCard}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                                <h3 style={s.svcName}>{svc.name}</h3>
                                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                  <button style={s.editBtn} onClick={() => handleEditService(svc)}>Edit</button>
                                  <button style={s.deleteBtn} onClick={() => handleDeleteService(svc.id)}>Delete</button>
                                </div>
                              </div>
                              <p style={s.svcDesc}>{svc.description}</p>
                              <div style={s.svcFooter}>
                                <span style={s.earnPill}>+{svc.rewardsGrant} pts earned</span>
                                <span style={s.redeemPill}>{svc.rewardsCost} pts to redeem</span>
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

const s = {
  loginLeft: { flex: 1, background: '#08011a', display: 'flex', alignItems: 'center', padding: '80px', position: 'relative', overflow: 'hidden' },
  loginOrb1: { position: 'absolute', top: '-100px', left: '-80px', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.55)', filter: 'blur(110px)', zIndex: 1, pointerEvents: 'none' },
  loginOrb2: { position: 'absolute', bottom: '-80px', right: '-40px', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.3)', filter: 'blur(90px)', zIndex: 1, pointerEvents: 'none' },
  loginOrb3: { position: 'absolute', top: '48%', right: '22%', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(217, 70, 239, 0.25)', filter: 'blur(70px)', zIndex: 1, pointerEvents: 'none' },
  loginLeftContent: { position: 'relative', zIndex: 2 },
  loginBrandBadge: { color: '#22d3ee', fontSize: '12px', fontWeight: '700', letterSpacing: '4px', marginBottom: '20px' },
  loginGoldLine: { width: '56px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', marginBottom: '32px', borderRadius: '2px' },
  loginHeadline: { color: '#fff', fontSize: '3.2rem', fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px 0', maxWidth: '440px' },
  loginDesc: { color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '360px' },
  loginRight: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#faf8ff' },
  mobileLoginBrand: { color: '#7c3aed', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.01em', marginBottom: '32px' },
  loginPortalTag: { display: 'inline-block', background: '#ede8fa', color: '#7c3aed', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '5px 12px', borderRadius: '20px', marginBottom: '20px' },
  loginTitle: { color: '#0f172a', fontSize: '2rem', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.03em' },
  loginSub: { color: '#64748b', fontSize: '1rem', margin: '0 0 36px 0' },
  loginLabel: { color: '#7c3aed', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' },
  loginInput: { padding: '14px 16px', borderRadius: '10px', border: '2px solid #ede8fa', background: '#fff', color: '#0f172a', fontSize: '15px', marginBottom: '20px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  loginBtn: { padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', width: '100%', boxShadow: '0 4px 24px rgba(124, 58, 237, 0.45)' },
  loginError: { color: '#dc2626', fontSize: '13px', background: '#fef2f2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fecaca', margin: '0 0 14px 0' },
  label: { color: '#374151', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', background: '#fff', color: '#0f172a', fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  btn: { padding: '12px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  error: { color: '#dc2626', fontSize: '13px', background: '#fef2f2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fecaca', margin: '0 0 14px 0' },
  container: { minHeight: '100vh', background: '#faf8ff', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#fff', borderBottom: '1px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 },
  logo: { color: ROYAL, fontSize: '1.2rem', fontWeight: '800' },
  portalBadge: { background: ROYAL, color: '#fff', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '3px 10px', borderRadius: '20px' },
  logoutBtn: { padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #e0e0e0', background: 'transparent', color: '#666', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  userName: { color: '#555', fontSize: '13px', fontWeight: '600' },
  mobileTabs: { display: 'flex', background: '#fff', borderBottom: '1px solid #eee', overflowX: 'auto', flexShrink: 0 },
  mobileTab: { flexShrink: 0, padding: '12px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' },
  body: { display: 'flex', flex: 1 },
  sidebar: { width: '190px', background: '#fff', borderRight: '1px solid #eee', padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 },
  navBtn: { padding: '10px 14px', borderRadius: '10px', border: 'none', fontSize: '13px', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.15s' },
  content: { flex: 1, overflowY: 'auto', minWidth: 0 },
  banner: { padding: '12px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '20px' },
  pageTitle: { color: '#111', fontSize: '1.2rem', fontWeight: '700', margin: 0 },
  tabHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  addBtn: { padding: '9px 16px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', flexShrink: 0 },
  empty: { background: '#fff', borderRadius: '16px', padding: '40px 24px', textAlign: 'center', border: '1px solid #eee', color: '#888' },
  statusCard: { background: '#fff', borderRadius: '16px', padding: '18px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '12px' },
  statusLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  bizInitial: { width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff', fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statusName: { color: '#111', fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' },
  statusEmail: { color: '#888', fontSize: '12px', margin: 0 },
  pendingNote: { background: '#fff8e1', borderRadius: '14px', padding: '16px 18px', border: '1px solid #ffe082', marginBottom: '16px' },
  pendingTitle: { color: '#7a5500', fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' },
  pendingSub: { color: '#7a5500', fontSize: '12px', margin: 0, lineHeight: 1.6 },
  quickGrid: { display: 'grid', gap: '12px' },
  quickCard: { background: '#fff', borderRadius: '14px', padding: '18px', border: '1px solid #eee', cursor: 'pointer' },
  quickLabel: { color: ROYAL, fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' },
  quickSub: { color: '#888', fontSize: '12px', margin: 0 },
  statsGrid: { display: 'grid', gap: '12px' },
  statCard: { borderRadius: '14px', padding: '18px', border: '1px solid #eee' },
  statValue: { fontWeight: '800', margin: '0 0 6px 0', lineHeight: 1 },
  statLabel: { color: '#555', fontSize: '12px', fontWeight: '600', margin: 0 },
  formCard: { background: '#f8f9ff', borderRadius: '14px', padding: '18px', border: '1.5px solid #e8ecff', marginBottom: '16px' },
  formTitle: { color: ROYAL, fontSize: '14px', fontWeight: '700', margin: '0 0 14px 0' },
  formRow: { display: 'flex', gap: '12px' },
  formHalf: { flex: 1, display: 'flex', flexDirection: 'column' },
  empList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  empCard: { background: '#fff', borderRadius: '14px', padding: '14px 16px', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '12px' },
  empAvatar: { width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff', fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  empInfo: { flex: 1, minWidth: '80px' },
  empName: { color: '#111', fontSize: '13px', fontWeight: '700', margin: '0 0 2px 0' },
  empEmail: { color: '#888', fontSize: '11px', margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  roleBadge: { fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' },
  deactivateBtn: { padding: '5px 10px', borderRadius: '8px', border: '1.5px solid #ffd0d0', background: 'transparent', color: '#c0392b', fontSize: '11px', fontWeight: '600', cursor: 'pointer' },
  svcGrid: { display: 'grid', gap: '12px' },
  svcCard: { background: '#fff', borderRadius: '14px', padding: '16px', border: '1px solid #eee' },
  svcName: { color: '#111', fontSize: '14px', fontWeight: '700', margin: 0, wordBreak: 'break-word' },
  svcDesc: { color: '#888', fontSize: '12px', margin: '0 0 12px 0', lineHeight: 1.5 },
  svcFooter: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  earnPill: { background: '#e8f4ed', color: '#2e7d52', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' },
  redeemPill: { background: '#f0f4ff', color: ROYAL, fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' },
  editBtn: { padding: '5px 10px', borderRadius: '8px', border: `1.5px solid ${ROYAL}`, background: 'transparent', color: ROYAL, fontSize: '11px', fontWeight: '600', cursor: 'pointer' },
  deleteBtn: { padding: '5px 10px', borderRadius: '8px', border: '1.5px solid #ffd0d0', background: 'transparent', color: '#c0392b', fontSize: '11px', fontWeight: '600', cursor: 'pointer' },
};

export default BusinessOwnerDashboard;