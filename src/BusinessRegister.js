import { useState } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';

const BLUE = '#2040C8';

const TIERS = [
  {
    key: 'standard',
    name: 'Standard',
    price: '$100',
    period: '/mo',
    desc: 'Join the RewardsNow points network. Customers earn RN points that work across every partner in the city.',
    paidPartner: false,
    uniqueRewards: false,
  },
  {
    key: 'premium',
    name: 'Premium',
    price: '$190',
    period: '/mo',
    desc: 'Priority placement in search and the map, full analytics dashboard, dedicated support, and performance guarantee.',
    paidPartner: true,
    uniqueRewards: false,
  },
  {
    key: 'custom',
    name: 'Custom Rewards',
    price: '$250',
    period: '/mo',
    desc: "Your own branded points currency. Customers earn your points — not RN Points. Fully private-label.",
    paidPartner: true,
    uniqueRewards: true,
    badge: 'Most popular',
  },
];

export default function BusinessRegister({ onBack, onSuccess }) {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [accountToken, setAccountToken] = useState(null);
  const [form, setForm] = useState({ email: '', phoneNumber: '', username: '', password: '' });
  const [bizForm, setBizForm] = useState({ businessName: '', address: '', latitude: '', longitude: '' });
  const [tier, setTier] = useState('standard');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const set = (setter, field) => e => setter(prev => ({ ...prev, [field]: e.target.value }));

  const handleCreateAccount = async () => {
    setError('');
    const { email, phoneNumber, username, password } = form;
    if (!email || !phoneNumber || !username || !password) { setError('All fields are required'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      const regRes = await fetch(`${API}/business-accounts/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const regData = await regRes.json();
      if (regData.error) { setError(regData.error); return; }

      const loginRes = await fetch(`${API}/business-accounts/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();
      if (loginData.error) { setError(loginData.error); return; }

      setAccountToken(loginData.token);
      setStep(2);
    } catch {
      setError('Could not connect. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const geocodeAddress = async () => {
    if (!bizForm.address.trim()) { setError('Enter an address first'); return; }
    setGeocoding(true);
    setError('');
    try {
      const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(bizForm.address)}&format=json&limit=1`,
          { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      if (data.length > 0) {
        setBizForm(prev => ({
          ...prev,
          latitude: parseFloat(data[0].lat).toFixed(6),
          longitude: parseFloat(data[0].lon).toFixed(6),
        }));
      } else {
        setError('Address not found — try being more specific');
      }
    } catch {
      setError('Could not look up coordinates');
    } finally {
      setGeocoding(false);
    }
  };

  const handleSubmitRequest = async () => {
    setError('');
    if (!bizForm.businessName || !bizForm.address) { setError('Business name and address are required'); return; }
    setLoading(true);
    const selectedTier = TIERS.find(t => t.key === tier);
    try {
      const res = await fetch(`${API}/business-accounts/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accountToken}` },
        body: JSON.stringify({
          businessName: bizForm.businessName,
          contactEmail: form.email,
          contactPhone: form.phoneNumber,
          requestingPaidPartner: selectedTier.paidPartner,
          requestingUniqueRewardsPoint: selectedTier.uniqueRewards,
          latitude: bizForm.latitude ? parseFloat(bizForm.latitude) : null,
          longitude: bizForm.longitude ? parseFloat(bizForm.longitude) : null,
          address: bizForm.address,
        }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setStep(3); onSuccess?.(); }
    } catch {
      setError('Could not connect. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={s.root}>
        {/* Left panel — desktop only */}
        {!isMobile && (
            <div style={s.left}>
              <div style={s.leftInner}>
                <button style={s.backLink} onClick={onBack}>← Back to sign in</button>
                <div style={s.brand}>RewardsNow</div>
                <h1 style={s.headline}>Grow your business<br />with loyalty.</h1>
                <p style={s.tagline}>
                  Join the RewardsNow network and give your customers a reason to keep coming back.
                </p>
                <div style={s.steps}>
                  {['Create account', 'Business details', 'Under review'].map((label, i) => (
                      <div key={i} style={s.stepRow}>
                        <div style={{
                          ...s.stepCircle,
                          background: step > i + 1 ? BLUE : step === i + 1 ? BLUE : 'transparent',
                          border: `2px solid ${step >= i + 1 ? BLUE : 'rgba(255,255,255,0.2)'}`,
                          color: step >= i + 1 ? '#fff' : 'rgba(255,255,255,0.3)',
                        }}>
                          {step > i + 1 ? '✓' : i + 1}
                        </div>
                        <span style={{ ...s.stepLabel, opacity: step >= i + 1 ? 1 : 0.35 }}>{label}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        )}

        <div style={{
          ...s.right,
          width: isMobile ? '100%' : '520px',
          padding: isMobile ? '0' : '48px',
          borderLeft: isMobile ? 'none' : '1px solid #f0f0f0',
        }}>
          {/* Mobile top bar */}
          {isMobile && (
              <div style={s.mobileTopBar}>
                <button style={s.mobileBack} onClick={step > 1 ? () => setStep(s => s - 1) : onBack}>←</button>
                <span style={s.mobileBrand}>RewardsNow</span>
                <div style={s.mobileStepDots}>
                  {[1, 2, 3].map(i => (
                      <div key={i} style={{
                        ...s.stepDot,
                        background: step >= i ? BLUE : '#e0e0e0',
                      }} />
                  ))}
                </div>
              </div>
          )}

          <div style={{ ...s.form, padding: isMobile ? '28px 24px 48px' : '0' }}>
            {step === 1 && (
                <>
                  <h2 style={s.formTitle}>Create your account</h2>
                  <p style={s.formSub}>Step 1 of 2</p>
                  <div style={s.field}>
                    <label style={s.label}>Email</label>
                    <input style={s.input} type="email" autoComplete="email"
                           placeholder="owner@business.com"
                           value={form.email} onChange={set(setForm, 'email')}
                           onKeyDown={e => e.key === 'Enter' && handleCreateAccount()} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Username</label>
                    <input style={s.input} autoComplete="username" placeholder="bizowner"
                           value={form.username} onChange={set(setForm, 'username')}
                           onKeyDown={e => e.key === 'Enter' && handleCreateAccount()} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Phone</label>
                    <input style={s.input} type="tel" autoComplete="tel-national" placeholder="5551234567"
                           value={form.phoneNumber} onChange={set(setForm, 'phoneNumber')}
                           onKeyDown={e => e.key === 'Enter' && handleCreateAccount()} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Password</label>
                    <input style={s.input} type="password" autoComplete="new-password"
                           placeholder="8+ characters"
                           value={form.password} onChange={set(setForm, 'password')}
                           onKeyDown={e => e.key === 'Enter' && handleCreateAccount()} />
                  </div>
                  {error && <p style={s.error}>{error}</p>}
                  <button style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }} onClick={handleCreateAccount} disabled={loading}>
                    {loading ? 'Creating account…' : 'Continue →'}
                  </button>
                </>
            )}

            {step === 2 && (
                <>
                  <h2 style={s.formTitle}>Business details</h2>
                  <p style={s.formSub}>Step 2 of 2</p>
                  <div style={s.field}>
                    <label style={s.label}>Business Name</label>
                    <input style={s.input} autoComplete="organization" placeholder="Joe's Coffee"
                           value={bizForm.businessName} onChange={set(setBizForm, 'businessName')} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Business Address</label>
                    <div style={s.addrRow}>
                      <input style={{ ...s.input, marginBottom: 0, flex: 1 }}
                             autoComplete="street-address" placeholder="123 Main St, Boca Raton FL 33431"
                             value={bizForm.address} onChange={set(setBizForm, 'address')} />
                      <button style={{ ...s.geocodeBtn, opacity: geocoding ? 0.6 : 1 }}
                              onClick={geocodeAddress} disabled={geocoding}>
                        {geocoding ? '…' : 'Locate'}
                      </button>
                    </div>
                    {bizForm.latitude && (
                        <p style={s.geocodeConfirm}>✓ Coordinates found: {bizForm.latitude}, {bizForm.longitude}</p>
                    )}
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Select Your Plan</label>
                    <div style={s.tierList}>
                      {TIERS.map(t => (
                          <div key={t.key} style={{ ...s.tierCard, ...(tier === t.key ? s.tierCardSelected : {}) }}
                               onClick={() => setTier(t.key)}>
                            <div style={s.tierHeader}>
                              <div>
                                <p style={s.tierName}>{t.name}</p>
                                {t.badge && <span style={s.tierBadge}>{t.badge}</span>}
                              </div>
                              <p style={s.tierPrice}>{t.price}<span style={s.tierPeriod}>{t.period}</span></p>
                            </div>
                            <p style={s.tierDesc}>{t.desc}</p>
                            <div style={{ ...s.tierRadio, ...(tier === t.key ? s.tierRadioSelected : {}) }} />
                          </div>
                      ))}
                    </div>
                  </div>
                  {error && <p style={s.error}>{error}</p>}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {!isMobile && <button style={s.backBtn} onClick={() => setStep(1)}>← Back</button>}
                    <button style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1, flex: 1 }} onClick={handleSubmitRequest} disabled={loading}>
                      {loading ? 'Submitting…' : 'Submit application'}
                    </button>
                  </div>
                </>
            )}

            {step === 3 && (
                <div style={s.successScreen}>
                  <div style={s.successIcon}>✓</div>
                  <h2 style={s.formTitle}>Application submitted</h2>
                  <p style={s.successMsg}>
                    Our team reviews every application within 24–48 hours. You'll get an email the moment your business goes live.
                  </p>
                  <p style={s.successTier}>Plan selected: <strong>{TIERS.find(t => t.key === tier)?.name}</strong></p>
                  <button style={s.submitBtn} onClick={onBack}>Back to sign in</button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}

const s = {
  root: { display: 'flex', minHeight: '100vh', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: '#fff' },
  left: { flex: 1, background: '#0a0f1e', display: 'flex', alignItems: 'center', padding: '80px' },
  leftInner: { maxWidth: '440px', width: '100%' },
  backLink: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: 0, marginBottom: '48px', display: 'block' },
  brand: { color: '#fff', fontSize: '15px', fontWeight: '700', letterSpacing: '0.02em', marginBottom: '48px', opacity: 0.9 },
  headline: { color: '#fff', fontSize: '2.6rem', fontWeight: '800', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' },
  tagline: { color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, margin: '0 0 48px' },
  steps: { display: 'flex', flexDirection: 'column', gap: '16px' },
  stepRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  stepCircle: { width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 },
  stepLabel: { color: '#fff', fontSize: '13px', fontWeight: '500' },
  right: { display: 'flex', flexDirection: 'column', overflowY: 'auto', boxSizing: 'border-box' },
  mobileTopBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, background: '#fff', zIndex: 10 },
  mobileBack: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#555', padding: '4px 8px' },
  mobileBrand: { color: '#0a0a0a', fontSize: '15px', fontWeight: '700' },
  mobileStepDots: { display: 'flex', gap: '6px' },
  stepDot: { width: '8px', height: '8px', borderRadius: '50%', transition: 'background 0.2s' },
  form: { width: '100%', maxWidth: '400px', margin: '0 auto', boxSizing: 'border-box' },
  formTitle: { color: '#0a0a0a', fontSize: '1.5rem', fontWeight: '700', margin: '0 0 6px', letterSpacing: '-0.02em' },
  formSub: { color: '#9ca3af', fontSize: '13px', margin: '0 0 28px' },
  field: { marginBottom: '16px' },
  label: { display: 'block', color: '#6b7280', fontSize: '11px', fontWeight: '600', marginBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase' },
  input: { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', color: '#0a0a0a', background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 0 },
  addrRow: { display: 'flex', gap: '8px', alignItems: 'center' },
  geocodeBtn: { padding: '10px 14px', background: '#f3f4f6', border: '1.5px solid #e5e7eb', borderRadius: '8px', color: '#374151', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 },
  geocodeConfirm: { color: '#16a34a', fontSize: '12px', margin: '6px 0 0' },
  tierList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  tierCard: { border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '14px 16px', cursor: 'pointer', position: 'relative' },
  tierCardSelected: { borderColor: BLUE, background: '#f0f4ff' },
  tierHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' },
  tierName: { color: '#0a0a0a', fontSize: '14px', fontWeight: '600', margin: 0 },
  tierBadge: { background: BLUE, color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' },
  tierPrice: { color: '#0a0a0a', fontSize: '16px', fontWeight: '700', margin: 0 },
  tierPeriod: { color: '#9ca3af', fontSize: '12px', fontWeight: '400' },
  tierDesc: { color: '#6b7280', fontSize: '12px', lineHeight: 1.5, margin: 0, paddingRight: '24px' },
  tierRadio: { position: 'absolute', top: '16px', right: '16px', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #d1d5db', background: '#fff' },
  tierRadioSelected: { borderColor: BLUE, background: BLUE },
  error: { color: '#dc2626', fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: '0 0 14px' },
  submitBtn: { width: '100%', padding: '11px', background: BLUE, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  backBtn: { padding: '11px 16px', background: 'transparent', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  successScreen: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' },
  successIcon: { width: '56px', height: '56px', borderRadius: '50%', background: '#f0fdf4', color: '#16a34a', fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  successMsg: { color: '#6b7280', fontSize: '14px', lineHeight: 1.7, margin: 0 },
  successTier: { color: '#6b7280', fontSize: '13px', margin: 0 },
};