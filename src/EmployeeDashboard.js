import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { API } from './config';
import { useTheme } from './ThemeContext';

const ROYAL = '#0B5CAD';
const LOGO = process.env.PUBLIC_URL + '/logo514.png';

function EmployeeDashboard() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
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

  // Theme-aware values
  const rootBg = isDark ? '#07243A' : '#FFF8EA';
  const cardBg = isDark ? '#0D2E42' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#101820';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const inputBg = isDark ? 'rgba(255,255,255,0.07)' : '#ffffff';
  const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const inputText = isDark ? '#ffffff' : '#101820';

  if (!token) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: '#07243A' }}>
        {!isMobile && (
          <div style={{ flex: 1, background: '#07243A', display: 'flex', alignItems: 'center', padding: '80px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <img src={LOGO} alt="RewardsNow" style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '20px' }} />
              <div style={{ width: '56px', height: '3px', background: '#F2B84B', marginBottom: '32px', borderRadius: '2px' }} />
              <h1 style={{ color: '#fff', fontSize: '3.2rem', fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px 0', maxWidth: '440px' }}>Built for<br />your team.</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '360px' }}>Look up customers and manage reward transactions in seconds.</p>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0D2E42', width: isMobile ? '100%' : '480px', flex: isMobile ? 1 : 'none', padding: isMobile ? '48px 24px' : '80px 64px', boxSizing: 'border-box' }}>
          {/* Teal top line on login card */}
          <div style={{ height: '3px', background: '#25B7C8', borderRadius: '2px 2px 0 0', marginBottom: '32px' }} />
          {isMobile && <img src={LOGO} alt="RewardsNow" style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '28px' }} />}
          <span style={{ display: 'inline-block', background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '5px 12px', borderRadius: '20px', marginBottom: '20px' }}>EMPLOYEE PORTAL</span>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.03em' }}>Staff Login</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', margin: '0 0 36px 0' }}>Sign in to issue customer points</p>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' }}>Email</label>
          <input style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#ffffff', fontSize: '15px', marginBottom: '20px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' }}>Password</label>
          <input style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#ffffff', fontSize: '15px', marginBottom: '20px', outline: 'none', width: '100%', boxSizing: 'border-box' }} type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          {error && <p style={{ color: '#e03434', fontSize: '13px', background: 'rgba(224,52,52,0.15)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(224,52,52,0.3)', margin: '0 0 14px 0' }}>{error}</p>}
          <button style={{ padding: '16px', borderRadius: '12px', border: 'none', background: ROYAL, color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: loading ? 0.7 : 1 }} onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '24px 0 16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '0 0 10px', textAlign: 'center' }}>Are you a business owner?</p>
          <button style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: `1.5px solid ${ROYAL}`, background: 'rgba(11,92,173,0.12)', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxSizing: 'border-box', fontFamily: 'inherit' }} onClick={() => navigate('/business-owner')}>
            Go to Business Owner Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: rootBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Teal accent bar */}
      <div style={{ height: '3px', background: '#25B7C8' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#07243A', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ color: '#F2B84B', fontSize: '1.2rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }} onClick={() => navigate('/')}>RewardsNow</button>
          <span style={{ background: '#e8f4ed', color: '#2e7d52', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', padding: '3px 10px', borderRadius: '20px' }}>{employee?.role}</span>
          {isUniquePoints && !isMobile && <span style={{ background: 'rgba(37,183,200,0.15)', color: '#25B7C8', fontSize: '10px', fontWeight: '700', letterSpacing: '1px', padding: '3px 10px', borderRadius: '20px' }}>Custom Points</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isMobile && <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600' }}>{employee?.firstName}</span>}
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
          <button style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }} onClick={() => { setToken(null); setEmployee(null); resetFlow(); }}>Sign Out</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', boxSizing: 'border-box', padding: isMobile ? '16px' : '32px 16px' }}>

        {step === 'lookup' && (
          <div style={{ width: '100%', maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#25B7C8', color: '#fff', fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</span>
              <div>
                <h2 style={{ color: textColor, fontSize: '1.1rem', fontWeight: '700', margin: '0 0 2px 0' }}>Find Customer</h2>
                <p style={{ color: mutedColor, fontSize: '13px', margin: 0 }}>Enter the customer's phone number</p>
              </div>
            </div>
            <div style={{ background: cardBg, borderRadius: '16px', padding: '20px', border: `1px solid ${borderColor}` }}>
              <label style={{ color: mutedColor, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Customer phone number</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  style={{ padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${inputBorder}`, background: inputBg, color: inputText, fontSize: isMobile ? '1rem' : '1.1rem', letterSpacing: '2px', marginBottom: 0, flex: 1, outline: 'none', boxSizing: 'border-box' }}
                  type="tel" placeholder="5551234567" value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLookup()}
                  autoComplete="tel"
                />
                <button style={{ padding: '13px 16px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, opacity: loading ? 0.7 : 1 }} onClick={handleLookup} disabled={loading}>
                  {loading ? '...' : 'Find →'}
                </button>
              </div>
              {customerError && <p style={{ color: '#e03434', fontSize: '13px', marginTop: '8px', marginBottom: 0 }}>{customerError}</p>}
              <p style={{ color: isDark ? 'rgba(255,255,255,0.35)' : '#aaa', fontSize: '12px', marginTop: '12px', lineHeight: 1.5 }}>No account? Ask the customer to sign up on RewardsNow first.</p>
            </div>
          </div>
        )}

        {step === 'menu' && customer && (
          <div style={{ width: '100%', maxWidth: '680px' }}>
            <div style={{ background: cardBg, borderRadius: '14px', padding: '14px 16px', border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: ROYAL, color: '#fff', fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{customer.firstName?.charAt(0)?.toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: '100px' }}>
                <p style={{ color: textColor, fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' }}>{customer.firstName} {customer.lastName}</p>
                {isUniquePoints ? (
                  <p style={{ color: mutedColor, fontSize: '12px', margin: 0 }}>{customerUniqueBalance ?? '...'} custom · {customer.rnBalance} RN pts</p>
                ) : (
                  <p style={{ color: mutedColor, fontSize: '12px', margin: 0 }}>{customer.rnBalance} RN pts balance</p>
                )}
              </div>
              <button style={{ padding: '7px 12px', borderRadius: '8px', border: `1.5px solid ${borderColor}`, background: 'transparent', color: mutedColor, fontSize: '12px', fontWeight: '600', cursor: 'pointer', flexShrink: 0 }} onClick={resetFlow}>Change</button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button style={{ padding: '10px 16px', borderRadius: '10px', border: `1.5px solid ${ROYAL}`, fontSize: '13px', fontWeight: '700', cursor: 'pointer', flex: 1, background: mode === 'issue' ? ROYAL : 'transparent', color: mode === 'issue' ? '#fff' : ROYAL }}
                      onClick={() => { setMode('issue'); setSelectedServices([]); }}>
                Issue Points
              </button>
              <button style={{ padding: '10px 16px', borderRadius: '10px', border: '1.5px solid #2e7d52', fontSize: '13px', fontWeight: '700', cursor: 'pointer', flex: 1, background: mode === 'redeem' ? '#2e7d52' : 'transparent', color: mode === 'redeem' ? '#fff' : '#2e7d52' }}
                      onClick={() => { setMode('redeem'); setSelectedServices([]); }}>
                Redeem Points
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: mode === 'redeem' ? '#2e7d52' : '#25B7C8', color: '#fff', fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</span>
              <div>
                <h2 style={{ color: textColor, fontSize: '1.1rem', fontWeight: '700', margin: '0 0 2px 0' }}>{mode === 'issue' ? 'Select Purchase' : 'Select Redemption'}</h2>
                <p style={{ color: mutedColor, fontSize: '13px', margin: 0 }}>{mode === 'issue' ? 'Tap what the customer ordered' : 'Tap what to redeem'}</p>
              </div>
            </div>

            {services.length === 0 ? (
              <div style={{ background: cardBg, borderRadius: '14px', padding: '32px', textAlign: 'center', border: `1px solid ${borderColor}`, color: mutedColor, fontSize: '14px' }}><p>No services configured. Ask your manager to add menu items.</p></div>
            ) : (
              <div style={{ display: 'grid', gap: '10px', marginBottom: '16px', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                {services.map(svc => {
                  const selected = !!selectedServices.find(s => s.id === svc.id);
                  const pts = mode === 'issue' ? svc.rewardsGrant : svc.rewardsCost;
                  const selectedBg = mode === 'redeem'
                    ? (isDark ? 'rgba(46,125,82,0.25)' : '#e8f4ed')
                    : (isDark ? 'rgba(11,92,173,0.25)' : '#f0f4ff');
                  const unselectedBg = isDark ? 'rgba(255,255,255,0.04)' : '#fff';
                  const selectedBorder = mode === 'redeem' ? '#2e7d52' : ROYAL;
                  return (
                    <div key={svc.id}
                         style={{ borderRadius: '14px', padding: '14px', cursor: 'pointer', position: 'relative', border: selected ? `2.5px solid ${selectedBorder}` : `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#eee'}`, background: selected ? selectedBg : unselectedBg, transform: selected ? 'scale(1.02)' : 'scale(1)' }}
                         onClick={() => toggleService(svc)}>
                      {selected && <div style={{ position: 'absolute', top: '10px', right: '12px', fontSize: '14px', fontWeight: '800', color: mode === 'redeem' ? '#2e7d52' : ROYAL }}>✓</div>}
                      <p style={{ color: textColor, fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0', paddingRight: '20px' }}>{svc.name}</p>
                      <p style={{ color: mutedColor, fontSize: '11px', margin: '0 0 10px 0', lineHeight: 1.4 }}>{svc.description}</p>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', display: 'inline-block', background: mode === 'redeem' ? '#fdeaea' : '#e8f4ed', color: mode === 'redeem' ? '#c0392b' : '#2e7d52' }}>
                        {mode === 'issue' ? '+' : '-'}{pts} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {selectedServices.length > 0 && (
              <div style={{ borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', background: mode === 'redeem' ? '#2e7d52' : ROYAL }}>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontWeight: '600', margin: '0 0 3px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{mode === 'issue' ? 'Selected' : 'Redeeming'}:</p>
                  <p style={{ color: '#fff', fontSize: '13px', fontWeight: '600', margin: 0 }}>{selectedServices.map(s => s.name).join(', ')}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>{mode === 'issue' ? '+' : '-'}{totalPoints} pts</p>
                  <button style={{ padding: '9px 16px', borderRadius: '10px', border: 'none', background: '#fff', color: ROYAL, fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => setStep('confirm')}>
                    {mode === 'issue' ? 'Issue →' : 'Redeem →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'confirm' && (
          <div style={{ width: '100%', maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: mode === 'redeem' ? '#2e7d52' : '#25B7C8', color: '#fff', fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</span>
              <div>
                <h2 style={{ color: textColor, fontSize: '1.1rem', fontWeight: '700', margin: '0 0 2px 0' }}>Confirm Transaction</h2>
                <p style={{ color: mutedColor, fontSize: '13px', margin: 0 }}>Review before {mode === 'issue' ? 'issuing' : 'redeeming'}</p>
              </div>
            </div>
            <div style={{ background: cardBg, borderRadius: '16px', padding: '20px', border: `1px solid ${borderColor}` }}>
              <div style={{ marginBottom: '4px' }}>
                <p style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#aaa', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px 0' }}>Customer</p>
                <p style={{ color: textColor, fontSize: '1rem', fontWeight: '700', margin: '0 0 14px 0' }}>{customer?.firstName} {customer?.lastName}</p>
              </div>
              <div style={{ marginBottom: '4px' }}>
                <p style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#aaa', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px 0' }}>Type</p>
                <p style={{ color: mode === 'redeem' ? '#2e7d52' : ROYAL, fontSize: '1rem', fontWeight: '700', margin: '0 0 14px 0' }}>
                  {mode === 'issue' ? 'Issue Points' : 'Redeem Points'}
                </p>
              </div>
              <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', margin: '14px 0' }} />
              <div style={{ marginBottom: '4px' }}>
                <p style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#aaa', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px 0' }}>Items</p>
                {selectedServices.map(s => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: textColor, fontSize: '14px', fontWeight: '600' }}>{s.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: mode === 'redeem' ? '#c0392b' : '#2e7d52' }}>
                      {mode === 'issue' ? '+' : '-'}{mode === 'issue' ? s.rewardsGrant : s.rewardsCost} pts
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', margin: '14px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: textColor, fontSize: '14px', fontWeight: '700', margin: 0 }}>Total</p>
                <p style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: mode === 'redeem' ? '#c0392b' : ROYAL }}>
                  {mode === 'issue' ? '+' : '-'}{totalPoints} pts
                </p>
              </div>
              {result && !result.success && <p style={{ color: '#e03434', fontSize: '13px', marginTop: '8px', marginBottom: 0 }}>{result.message}</p>}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button style={{ padding: '12px 14px', borderRadius: '10px', border: `1.5px solid ${borderColor}`, background: 'transparent', color: mutedColor, fontSize: '13px', fontWeight: '600', cursor: 'pointer', flex: 1 }} onClick={() => { setResult(null); setStep('menu'); }}>← Back</button>
                <button style={{ padding: '12px 14px', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', flex: 2, background: mode === 'redeem' ? '#2e7d52' : ROYAL, opacity: submitting ? 0.7 : 1 }}
                        onClick={mode === 'issue' ? handleIssue : handleRedeem} disabled={submitting}>
                  {submitting ? 'Processing...' : mode === 'issue' ? `Issue ${totalPoints} pts` : `Redeem ${totalPoints} pts`}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && result && (
          <div style={{ width: '100%', maxWidth: '680px' }}>
            <div style={{ background: cardBg, borderRadius: '20px', padding: '36px 24px', textAlign: 'center', border: `1px solid ${borderColor}` }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', background: mode === 'redeem' ? '#fdeaea' : '#e8f4ed', color: mode === 'redeem' ? '#c0392b' : '#2e7d52' }}>✓</div>
              <h2 style={{ color: textColor, fontSize: '1.5rem', fontWeight: '800', margin: '0 0 8px 0' }}>{mode === 'issue' ? 'Points Issued!' : 'Points Redeemed!'}</h2>
              <p style={{ color: mutedColor, fontSize: '14px', margin: '0 0 20px 0' }}>{result.message}</p>
              {result.newBalance !== undefined && (
                <div style={{ background: '#0B5CAD', borderRadius: '14px', padding: '20px', marginBottom: '18px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 4px 0' }}>{customer?.firstName}'s new balance</p>
                  <p style={{ color: '#F2B84B', fontSize: '2.6rem', fontWeight: '800', margin: 0, lineHeight: 1 }}>{result.newBalance.toLocaleString()}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', margin: '4px 0 0 0' }}>points</p>
                </div>
              )}
              {result.items?.length > 0 && (
                <div style={{ margin: '0 0 24px 0', textAlign: 'left' }}>
                  <p style={{ color: mutedColor, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Items:</p>
                  {result.items.map((item, i) => <p key={i} style={{ color: textColor, fontSize: '13px', margin: '0 0 3px 0' }}>· {item}</p>)}
                </div>
              )}
              <button style={{ padding: '13px 28px', borderRadius: '12px', border: 'none', background: ROYAL, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }} onClick={resetFlow}>New Transaction</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
