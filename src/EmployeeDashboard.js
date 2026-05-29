import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { API } from './config';
import AnimatedStripes from './AnimatedStripes';

const ROYAL = '#2563eb';
const LOGO = process.env.PUBLIC_URL + '/logo514.png';

function EmployeeDashboard() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [services, setServices] = useState([]);
  const [isUniquePoints, setIsUniquePoints] = useState(false);

  const [phone, setPhone] = useState('');
  const [customer, setCustomer] = useState(null);
  const [customerError, setCustomerError] = useState('');
  const [customerUniqueBalance, setCustomerUniqueBalance] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [mode, setMode] = useState('issue');
  const [step, setStep] = useState('lookup');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/employees/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.error || !data.token) {
        setError('Invalid credentials or account deactivated');
        setLoading(false);
        return;
      }
      setToken(data.token);
      setEmployee(data);
      const [svcRes, bizRes] = await Promise.all([
        fetch(`${API}/businesses/${data.businessId}/services`),
        fetch(`${API}/businesses/${data.businessId}`)
      ]);
      const svcData = await svcRes.json();
      const bizData = await bizRes.json();
      setServices(Array.isArray(svcData) ? svcData : []);
      setIsUniquePoints(bizData.uniqueRewardsPoint === true);
    } catch {
      setError('Could not connect to server');
    }
    setLoading(false);
  };

  const handleLookup = async () => {
    setCustomerError('');
    setCustomer(null);
    setCustomerUniqueBalance(null);
    if (!phone.trim()) { setCustomerError('Enter a phone number'); return; }
    setLoading(true);
    try {
      const res = await fetch(
          `${API}/customers/lookup?phone=${phone.replace(/\D/g, '')}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.error || res.status === 404) {
        setCustomerError('No customer found with that phone number.');
      } else {
        setCustomer(data);
        if (isUniquePoints) {
          try {
            const balRes = await fetch(
                `${API}/unique-points/balance?businessId=${employee.businessId}&customerId=${data.id}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (balRes.ok) {
              const balData = await balRes.json();
              setCustomerUniqueBalance(balData.balance);
            }
          } catch { }
        }
        setStep('menu');
        setSelectedServices([]);
      }
    } catch {
      setCustomerError('Could not connect to server');
    }
    setLoading(false);
  };

  const toggleService = (svc) => {
    setSelectedServices(prev =>
        prev.find(s => s.id === svc.id) ? prev.filter(s => s.id !== svc.id) : [...prev, svc]
    );
  };

  const totalPoints = selectedServices.reduce((sum, s) =>
      sum + (mode === 'issue' ? s.rewardsGrant : s.rewardsCost), 0);

  const handleIssue = async () => {
    if (selectedServices.length === 0 || submitting) return;
    setSubmitting(true);
    setResult(null);
    try {
      const description = selectedServices.map(s => s.name).join(', ');
      const res = await fetch(`${API}/ledger/employee/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ customerId: customer.id, amount: totalPoints, description: `Purchase: ${description}` })
      });
      const data = await res.json();
      if (data.error) { setResult({ success: false, message: data.error }); }
      else {
        setResult({ success: true, message: `${totalPoints} points issued to ${customer.firstName}!`, newBalance: data.newBalance, items: selectedServices.map(s => s.name) });
        setStep('success');
      }
    } catch { setResult({ success: false, message: 'Could not connect to server' }); }
    setSubmitting(false);
  };

  const handleRedeem = async () => {
    if (selectedServices.length === 0 || submitting) return;
    setSubmitting(true);
    setResult(null);
    try {
      const description = selectedServices.map(s => s.name).join(', ');
      const url = isUniquePoints ? `${API}/unique-points/redeem` : `${API}/ledger/redeem`;
      const body = isUniquePoints
          ? { businessId: employee.businessId, customerId: customer.id, amount: totalPoints, name: description }
          : { businessId: employee.businessId, customerId: customer.id, rnTransacted: totalPoints, description };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Idempotency-Key': `emp-redeem-${customer.id}-${Date.now()}` },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.error) { setResult({ success: false, message: data.error }); }
      else {
        setResult({ success: true, message: `${totalPoints} points redeemed for ${customer.firstName}!`, newBalance: isUniquePoints ? (customerUniqueBalance - totalPoints) : data.newBalance, items: selectedServices.map(s => s.name) });
        setStep('success');
      }
    } catch { setResult({ success: false, message: 'Could not connect to server' }); }
    setSubmitting(false);
  };

  const resetFlow = () => {
    setPhone(''); setCustomer(null); setSelectedServices([]);
    setStep('lookup'); setResult(null); setCustomerError('');
    setCustomerUniqueBalance(null); setMode('issue');
  };

  if (!token) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
          {!isMobile && (
              <div style={st.loginLeft}>
                <div style={st.loginOrb1} />
                <div style={st.loginOrb2} />
                <div style={st.loginOrb3} />
                <AnimatedStripes count={4} />
                <div style={st.loginLeftContent}>
                  <img src={LOGO} alt="RewardsNow" style={{ ...st.loginLogoImg, cursor: 'pointer' }} onClick={() => navigate('/business-overview')} />
                  <div style={st.loginGoldLine} />
                  <h1 style={st.loginHeadline}>Built for<br />your team.</h1>
                  <p style={st.loginDesc}>Look up customers and manage reward transactions in seconds.</p>
                </div>
              </div>
          )}
          <div style={{ ...st.loginRight, width: isMobile ? '100%' : '480px', flex: isMobile ? 1 : 'none', padding: isMobile ? '48px 24px' : '80px 64px', boxSizing: 'border-box' }}>
            {isMobile && <img src={LOGO} alt="RewardsNow" style={{ ...st.mobileLoginLogoImg, cursor: 'pointer' }} onClick={() => navigate('/business-overview')} />}
            <span style={st.loginPortalTag}>EMPLOYEE PORTAL</span>
            <h2 style={st.loginTitle}>Staff Login</h2>
            <p style={st.loginSub}>Sign in to issue customer points</p>
            <label style={st.loginLabel}>Email</label>
            <input style={st.loginInput} type="email" autoComplete="email" placeholder="yourname@yourbusiness.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <p style={st.loginEmailHint}>Use the work email your manager set up for you — not your personal email.</p>
            <label style={st.loginLabel}>Password</label>
            <input style={st.loginInput} type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            {error && <p style={st.loginError}>{error}</p>}
            <button style={{ ...st.loginBtn, opacity: loading ? 0.7 : 1 }} onClick={handleLogin} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div style={st.loginDivider} />
            <p style={st.loginBizNote}>Are you a business owner?</p>
            <button style={st.loginBizBtn} onClick={() => navigate('/business-owner')}>
              Go to Business Owner Portal
            </button>
          </div>
        </div>
    );
  }

  return (
      <div style={st.container}>
        <div style={st.topBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={st.logo} onClick={() => navigate('/')}>RewardsNow</button>
            <span style={st.empBadge}>{employee?.role}</span>
            {isUniquePoints && !isMobile && <span style={st.uniqueBadge}>Custom Points</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!isMobile && <span style={st.empName}>{employee?.firstName}</span>}
            <button style={st.logoutBtn} onClick={() => { setToken(null); setEmployee(null); resetFlow(); }}>Sign Out</button>
          </div>
        </div>

        <div style={{ ...st.body, padding: isMobile ? '16px' : '32px 16px' }}>

          {step === 'lookup' && (
              <div style={st.stepContainer}>
                <div style={st.stepHeader}>
                  <span style={st.stepNum}>1</span>
                  <div>
                    <h2 style={st.stepTitle}>Find Customer</h2>
                    <p style={st.stepSub}>Enter the customer's phone number</p>
                  </div>
                </div>
                <div style={st.lookupCard}>
                  <label style={st.label}>Customer phone number</label>
                  <div style={st.lookupRow}>
                    <input
                        style={{ ...st.input, fontSize: isMobile ? '1rem' : '1.1rem', letterSpacing: '2px', marginBottom: 0, flex: 1 }}
                        type="tel" placeholder="5551234567" value={phone}
                        onChange={e => setPhone(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLookup()}
                        autoComplete="tel"
                    />
                    <button style={{ ...st.lookupBtn, opacity: loading ? 0.7 : 1 }} onClick={handleLookup} disabled={loading}>
                      {loading ? '...' : 'Find →'}
                    </button>
                  </div>
                  {customerError && <p style={st.inlineError}>{customerError}</p>}
                  <p style={st.lookupHint}>No account? Ask the customer to sign up on RewardsNow first.</p>
                </div>
              </div>
          )}

          {step === 'menu' && customer && (
              <div style={st.stepContainer}>
                <div style={st.customerBanner}>
                  <div style={st.customerAvatar}>{customer.firstName?.charAt(0)?.toUpperCase()}</div>
                  <div style={st.customerInfo}>
                    <p style={st.customerName}>{customer.firstName} {customer.lastName}</p>
                    {isUniquePoints ? (
                        <p style={st.customerBalance}>{customerUniqueBalance ?? '...'} custom · {customer.rnBalance} RN pts</p>
                    ) : (
                        <p style={st.customerBalance}>{customer.rnBalance} RN pts balance</p>
                    )}
                  </div>
                  <button style={st.changeCustomerBtn} onClick={resetFlow}>Change</button>
                </div>

                <div style={st.modeToggle}>
                  <button style={{ ...st.modeBtn, background: mode === 'issue' ? ROYAL : 'transparent', color: mode === 'issue' ? '#fff' : ROYAL }}
                          onClick={() => { setMode('issue'); setSelectedServices([]); }}>
                    Issue Points
                  </button>
                  <button style={{ ...st.modeBtn, background: mode === 'redeem' ? '#2e7d52' : 'transparent', color: mode === 'redeem' ? '#fff' : '#2e7d52', borderColor: '#2e7d52' }}
                          onClick={() => { setMode('redeem'); setSelectedServices([]); }}>
                    Redeem Points
                  </button>
                </div>

                <div style={st.stepHeader}>
                  <span style={{ ...st.stepNum, background: mode === 'redeem' ? '#2e7d52' : ROYAL }}>2</span>
                  <div>
                    <h2 style={st.stepTitle}>{mode === 'issue' ? 'Select Purchase' : 'Select Redemption'}</h2>
                    <p style={st.stepSub}>{mode === 'issue' ? 'Tap what the customer ordered' : 'Tap what to redeem'}</p>
                  </div>
                </div>

                {services.length === 0 ? (
                    <div style={st.emptyMenu}><p>No services configured. Ask your manager to add menu items.</p></div>
                ) : (
                    <div style={{ ...st.menuGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                      {services.map(svc => {
                        const selected = !!selectedServices.find(s => s.id === svc.id);
                        const pts = mode === 'issue' ? svc.rewardsGrant : svc.rewardsCost;
                        return (
                            <div key={svc.id}
                                 style={{ ...st.menuItem, border: selected ? `2.5px solid ${mode === 'redeem' ? '#2e7d52' : ROYAL}` : '2px solid var(--rn-portal-border)', background: selected ? (mode === 'redeem' ? '#e8f4ed' : '#f0f4ff') : 'var(--rn-portal-surface)', transform: selected ? 'scale(1.02)' : 'scale(1)' }}
                                 onClick={() => toggleService(svc)}>
                              {selected && <div style={{ ...st.checkMark, color: mode === 'redeem' ? '#2e7d52' : ROYAL }}>✓</div>}
                              <p style={st.menuItemName}>{svc.name}</p>
                              <p style={st.menuItemDesc}>{svc.description}</p>
                              <span style={{ ...st.earnBadge, background: mode === 'redeem' ? '#fdeaea' : '#e8f4ed', color: mode === 'redeem' ? '#c0392b' : '#2e7d52' }}>
                                {mode === 'issue' ? '+' : '-'}{pts} pts
                              </span>
                            </div>
                        );
                      })}
                    </div>
                )}

                {selectedServices.length > 0 && (
                    <div style={{ ...st.orderSummary, background: mode === 'redeem' ? '#2e7d52' : ROYAL }}>
                      <div style={st.orderLeft}>
                        <p style={st.orderLabel}>{mode === 'issue' ? 'Selected' : 'Redeeming'}:</p>
                        <p style={st.orderItems}>{selectedServices.map(s => s.name).join(', ')}</p>
                      </div>
                      <div style={st.orderRight}>
                        <p style={st.orderPoints}>{mode === 'issue' ? '+' : '-'}{totalPoints} pts</p>
                        <button style={st.confirmBtn} onClick={() => setStep('confirm')}>
                          {mode === 'issue' ? 'Issue →' : 'Redeem →'}
                        </button>
                      </div>
                    </div>
                )}
              </div>
          )}

          {step === 'confirm' && (
              <div style={st.stepContainer}>
                <div style={st.stepHeader}>
                  <span style={{ ...st.stepNum, background: mode === 'redeem' ? '#2e7d52' : ROYAL }}>3</span>
                  <div>
                    <h2 style={st.stepTitle}>Confirm Transaction</h2>
                    <p style={st.stepSub}>Review before {mode === 'issue' ? 'issuing' : 'redeeming'}</p>
                  </div>
                </div>
                <div style={st.confirmCard}>
                  <div style={st.confirmSection}>
                    <p style={st.confirmLabel}>Customer</p>
                    <p style={st.confirmValue}>{customer?.firstName} {customer?.lastName}</p>
                  </div>
                  <div style={st.confirmSection}>
                    <p style={st.confirmLabel}>Type</p>
                    <p style={{ ...st.confirmValue, color: mode === 'redeem' ? '#2e7d52' : ROYAL }}>
                      {mode === 'issue' ? 'Issue Points' : 'Redeem Points'}
                    </p>
                  </div>
                  <div style={st.confirmDivider} />
                  <div style={st.confirmSection}>
                    <p style={st.confirmLabel}>Items</p>
                    {selectedServices.map(s => (
                        <div key={s.id} style={st.confirmItem}>
                          <span style={st.confirmItemName}>{s.name}</span>
                          <span style={{ ...st.confirmItemPts, color: mode === 'redeem' ? '#c0392b' : '#2e7d52' }}>
                            {mode === 'issue' ? '+' : '-'}{mode === 'issue' ? s.rewardsGrant : s.rewardsCost} pts
                          </span>
                        </div>
                    ))}
                  </div>
                  <div style={st.confirmDivider} />
                  <div style={st.confirmTotal}>
                    <p style={st.confirmTotalLabel}>Total</p>
                    <p style={{ ...st.confirmTotalPts, color: mode === 'redeem' ? '#c0392b' : ROYAL }}>
                      {mode === 'issue' ? '+' : '-'}{totalPoints} pts
                    </p>
                  </div>
                  {result && !result.success && <p style={st.inlineError}>{result.message}</p>}
                  <div style={st.confirmActions}>
                    <button style={st.backBtn} onClick={() => { setResult(null); setStep('menu'); }}>← Back</button>
                    <button style={{ ...st.issueBtn, background: mode === 'redeem' ? '#2e7d52' : ROYAL, opacity: submitting ? 0.7 : 1 }}
                            onClick={mode === 'issue' ? handleIssue : handleRedeem} disabled={submitting}>
                      {submitting ? 'Processing...' : mode === 'issue' ? `Issue ${totalPoints} pts` : `Redeem ${totalPoints} pts`}
                    </button>
                  </div>
                </div>
              </div>
          )}

          {step === 'success' && result && (
              <div style={st.stepContainer}>
                <div style={st.successCard}>
                  <div style={{ ...st.successIcon, background: mode === 'redeem' ? '#fdeaea' : '#e8f4ed', color: mode === 'redeem' ? '#c0392b' : '#2e7d52' }}>✓</div>
                  <h2 style={st.successTitle}>{mode === 'issue' ? 'Points Issued!' : 'Points Redeemed!'}</h2>
                  <p style={st.successMsg}>{result.message}</p>
                  {result.newBalance !== undefined && (
                      <div style={st.newBalanceCard}>
                        <p style={st.newBalanceLabel}>{customer?.firstName}'s new balance</p>
                        <p style={st.newBalanceAmount}>{result.newBalance.toLocaleString()}</p>
                        <p style={st.newBalanceSub}>points</p>
                      </div>
                  )}
                  {result.items?.length > 0 && (
                      <div style={st.successItems}>
                        <p style={st.successItemsLabel}>Items:</p>
                        {result.items.map((item, i) => <p key={i} style={st.successItem}>· {item}</p>)}
                      </div>
                  )}
                  <button style={st.newTransactionBtn} onClick={resetFlow}>New Transaction</button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}

const st = {
  loginLeft: { flex: 1, background: 'var(--rn-bg)', display: 'flex', alignItems: 'center', padding: '80px', position: 'relative', overflow: 'hidden' },
  loginOrb1: { position: 'absolute', top: '-100px', left: '-80px', width: '520px', height: '520px', borderRadius: '50%', background: 'var(--rn-orb1)', filter: 'blur(110px)', zIndex: 1, pointerEvents: 'none' },
  loginOrb2: { position: 'absolute', bottom: '-80px', right: '-40px', width: '420px', height: '420px', borderRadius: '50%', background: 'var(--rn-emp-orb2)', filter: 'blur(90px)', zIndex: 1, pointerEvents: 'none' },
  loginOrb3: { position: 'absolute', top: '48%', right: '22%', width: '260px', height: '260px', borderRadius: '50%', background: 'var(--rn-orb3)', filter: 'blur(70px)', zIndex: 1, pointerEvents: 'none' },
  loginLeftContent: { position: 'relative', zIndex: 2 },
  loginBrandBadge: { color: '#f59e0b', fontSize: '12px', fontWeight: '700', letterSpacing: '4px', marginBottom: '20px' },
  loginGoldLine: { width: '56px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', marginBottom: '32px', borderRadius: '2px' },
  loginHeadline: { color: 'var(--rn-text)', fontSize: '3.2rem', fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px 0', maxWidth: '440px' },
  loginDesc: { color: 'var(--rn-text-sub)', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '360px' },
  loginRight: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--rn-form-bg)' },
  mobileLoginBrand: { color: '#2563eb', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.01em', marginBottom: '32px' },
  loginPortalTag: { display: 'inline-block', background: 'var(--rn-input-bg)', color: '#60a5fa', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '5px 12px', borderRadius: '20px', marginBottom: '20px', border: '1px solid var(--rn-input-border)' },
  loginTitle: { color: 'var(--rn-form-text)', fontSize: '2rem', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.03em' },
  loginSub: { color: 'var(--rn-form-sub)', fontSize: '1rem', margin: '0 0 36px 0' },
  loginLabel: { color: '#b45309', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' },
  loginInput: { padding: '14px 16px', borderRadius: '10px', border: '2px solid var(--rn-input-border)', background: 'var(--rn-input-bg)', color: 'var(--rn-input-color)', fontSize: '15px', marginBottom: '6px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  loginEmailHint: { color: 'var(--rn-form-sub)', fontSize: '11px', margin: '0 0 16px', lineHeight: 1.5 },
  loginBtn: { padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', width: '100%', boxShadow: '0 4px 24px rgba(37, 99, 235, 0.45)' },
  loginError: { color: '#dc2626', fontSize: '13px', background: '#fef2f2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fecaca', margin: '0 0 14px 0' },
  loginLogoImg: { height: '48px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '20px' },
  mobileLoginLogoImg: { height: '40px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '28px' },
  loginDivider: { height: '1px', background: 'var(--rn-divider)', margin: '24px 0 16px' },
  loginBizNote: { color: 'var(--rn-form-sub)', fontSize: '13px', margin: '0 0 10px', textAlign: 'center' },
  loginBizBtn: { width: '100%', padding: '13px 16px', borderRadius: '12px', border: `1.5px solid ${ROYAL}`, background: 'var(--rn-outline-btn-bg)', color: ROYAL, fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxSizing: 'border-box', fontFamily: 'inherit' },
  label: { color: 'var(--rn-portal-text-sub)', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--rn-portal-input-border)', background: 'var(--rn-portal-input-bg)', color: 'var(--rn-portal-input-color)', fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  primaryBtn: { padding: '12px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  error: { color: '#dc2626', fontSize: '13px', background: '#fef2f2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fecaca', margin: '0 0 14px 0' },
  container: { minHeight: '100vh', background: 'var(--rn-portal-bg)', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--rn-portal-topbar)', borderBottom: '1px solid var(--rn-portal-border)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 },
  logo: { color: ROYAL, fontSize: '1.2rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  empBadge: { background: '#e8f4ed', color: '#2e7d52', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '3px 10px', borderRadius: '20px' },
  uniqueBadge: { background: '#f0e8ff', color: '#6b21a8', fontSize: '10px', fontWeight: '700', letterSpacing: '1px', padding: '3px 10px', borderRadius: '20px' },
  empName: { color: 'var(--rn-portal-text-sub)', fontSize: '13px', fontWeight: '600' },
  logoutBtn: { padding: '7px 14px', borderRadius: '8px', border: '1.5px solid var(--rn-portal-border)', background: 'transparent', color: 'var(--rn-portal-text-sub)', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  body: { flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', boxSizing: 'border-box' },
  stepContainer: { width: '100%', maxWidth: '680px' },
  stepHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' },
  stepNum: { width: '32px', height: '32px', borderRadius: '50%', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepTitle: { color: 'var(--rn-portal-text)', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 2px 0' },
  stepSub: { color: 'var(--rn-portal-text-muted)', fontSize: '13px', margin: 0 },
  lookupCard: { background: 'var(--rn-portal-surface)', borderRadius: '16px', padding: '20px', border: '1px solid var(--rn-portal-border)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  lookupRow: { display: 'flex', gap: '10px', alignItems: 'center' },
  lookupBtn: { padding: '13px 16px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 },
  lookupHint: { color: 'var(--rn-portal-text-muted)', fontSize: '12px', marginTop: '12px', lineHeight: 1.5 },
  inlineError: { color: '#e03434', fontSize: '13px', marginTop: '8px', marginBottom: 0 },
  customerBanner: { background: 'var(--rn-portal-surface)', borderRadius: '14px', padding: '14px 16px', border: '1px solid var(--rn-portal-border)', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' },
  customerAvatar: { width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e40af, #2563eb)', color: '#fff', fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  customerInfo: { flex: 1, minWidth: '100px' },
  customerName: { color: 'var(--rn-portal-text)', fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' },
  customerBalance: { color: 'var(--rn-portal-text-muted)', fontSize: '12px', margin: 0 },
  changeCustomerBtn: { padding: '7px 12px', borderRadius: '8px', border: '1.5px solid var(--rn-portal-border)', background: 'transparent', color: 'var(--rn-portal-text-sub)', fontSize: '12px', fontWeight: '600', cursor: 'pointer', flexShrink: 0 },
  modeToggle: { display: 'flex', gap: '8px', marginBottom: '20px' },
  modeBtn: { padding: '10px 16px', borderRadius: '10px', border: `1.5px solid ${ROYAL}`, fontSize: '13px', fontWeight: '700', cursor: 'pointer', flex: 1 },
  emptyMenu: { background: 'var(--rn-portal-surface)', borderRadius: '14px', padding: '32px', textAlign: 'center', border: '1px solid var(--rn-portal-border)', color: 'var(--rn-portal-text-sub)', fontSize: '14px' },
  menuGrid: { display: 'grid', gap: '10px', marginBottom: '16px' },
  menuItem: { borderRadius: '14px', padding: '14px', cursor: 'pointer', transition: 'all 0.15s', position: 'relative' },
  checkMark: { position: 'absolute', top: '10px', right: '12px', fontSize: '14px', fontWeight: '800' },
  menuItemName: { color: 'var(--rn-portal-text)', fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0', paddingRight: '20px' },
  menuItemDesc: { color: 'var(--rn-portal-text-muted)', fontSize: '11px', margin: '0 0 10px 0', lineHeight: 1.4 },
  earnBadge: { fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', display: 'inline-block' },
  orderSummary: { borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' },
  orderLeft: { flex: 1, minWidth: '120px' },
  orderLabel: { color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontWeight: '600', margin: '0 0 3px 0', textTransform: 'uppercase', letterSpacing: '1px' },
  orderItems: { color: '#fff', fontSize: '13px', fontWeight: '600', margin: 0 },
  orderRight: { display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 },
  orderPoints: { color: '#fff', fontSize: '1.2rem', fontWeight: '800', margin: 0 },
  confirmBtn: { padding: '9px 16px', borderRadius: '10px', border: 'none', background: '#fff', color: ROYAL, fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' },
  confirmCard: { background: 'var(--rn-portal-surface)', borderRadius: '16px', padding: '20px', border: '1px solid var(--rn-portal-border)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  confirmSection: { marginBottom: '4px' },
  confirmLabel: { color: 'var(--rn-portal-text-muted)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px 0' },
  confirmValue: { color: 'var(--rn-portal-text)', fontSize: '1rem', fontWeight: '700', margin: '0 0 14px 0' },
  confirmDivider: { height: '1px', background: 'var(--rn-portal-border)', margin: '14px 0' },
  confirmItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  confirmItemName: { color: 'var(--rn-portal-text-sub)', fontSize: '14px', fontWeight: '600' },
  confirmItemPts: { fontSize: '14px', fontWeight: '700' },
  confirmTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  confirmTotalLabel: { color: 'var(--rn-portal-text)', fontSize: '14px', fontWeight: '700', margin: 0 },
  confirmTotalPts: { fontSize: '1.6rem', fontWeight: '800', margin: 0 },
  confirmActions: { display: 'flex', gap: '10px', marginTop: '20px' },
  backBtn: { padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--rn-portal-border)', background: 'transparent', color: 'var(--rn-portal-text-sub)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', flex: 1 },
  issueBtn: { padding: '12px 14px', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', flex: 2 },
  successCard: { background: 'var(--rn-portal-surface)', borderRadius: '20px', padding: '36px 24px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid var(--rn-portal-border)' },
  successIcon: { width: '60px', height: '60px', borderRadius: '50%', fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' },
  successTitle: { color: 'var(--rn-portal-text)', fontSize: '1.5rem', fontWeight: '800', margin: '0 0 8px 0' },
  successMsg: { color: 'var(--rn-portal-text-sub)', fontSize: '14px', margin: '0 0 20px 0' },
  newBalanceCard: { background: 'linear-gradient(135deg, #152a9e, #1e35b5)', borderRadius: '14px', padding: '20px', marginBottom: '18px' },
  newBalanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 4px 0' },
  newBalanceAmount: { color: '#fff', fontSize: '2.6rem', fontWeight: '800', margin: 0, lineHeight: 1 },
  newBalanceSub: { color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', margin: '4px 0 0 0' },
  successItems: { margin: '0 0 24px 0', textAlign: 'left' },
  successItemsLabel: { color: 'var(--rn-portal-text-muted)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' },
  successItem: { color: 'var(--rn-portal-text-sub)', fontSize: '13px', margin: '0 0 3px 0' },
  newTransactionBtn: { padding: '13px 28px', borderRadius: '12px', border: 'none', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer' },
};

export default EmployeeDashboard;