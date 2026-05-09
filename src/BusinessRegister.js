import { useState } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';

const BLUE = '#2563eb';
const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

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

const STEP_LABELS = ['Create account', 'Business details', 'Payment', 'Under review'];

function formatCardNumber(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(val) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

export default function BusinessRegister({ onBack, onSuccess }) {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [accountToken, setAccountToken] = useState(null);
  const [form, setForm] = useState({ email: '', phoneNumber: '', username: '', password: '' });
  const [bizForm, setBizForm] = useState({ businessName: '', address: '', latitude: '', longitude: '' });
  const [tier, setTier] = useState('standard');
  const [cardForm, setCardForm] = useState({ cardNumber: '', cardName: '', expiry: '', cvv: '' });
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
      else { setStep(3); }
    } catch {
      setError('Could not connect. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    setError('');
    const { cardNumber, cardName, expiry, cvv } = cardForm;
    const digits = cardNumber.replace(/\s/g, '');
    if (!cardName.trim()) { setError('Cardholder name is required'); return; }
    if (digits.length !== 16) { setError('Enter a valid 16-digit card number'); return; }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) { setError('Enter expiry as MM/YY'); return; }
    if (cvv.length < 3) { setError('Enter a valid CVV'); return; }
    setLoading(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setLoading(false);
      setStep(4);
      onSuccess?.();
    }, 1200);
  };

  const selectedTier = TIERS.find(t => t.key === tier);

  return (
      <div style={s.root}>
        {/* Left panel — desktop only */}
        {!isMobile && (
            <div style={s.left}>
              <div style={s.orb1} />
              <div style={s.orb2} />
              <div style={s.orb3} />
              <div style={s.leftInner}>
                <button style={s.backLink} onClick={onBack}>← Back to sign in</button>
                <div style={s.brand}>RewardsNow</div>
                <h1 style={s.headline}>Grow your business<br />with loyalty.</h1>
                <p style={s.tagline}>
                  Join the RewardsNow network and give your customers a reason to keep coming back.
                </p>
                <div style={s.steps}>
                  {STEP_LABELS.map((label, i) => (
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
          borderLeft: isMobile ? 'none' : '1px solid #bfdbfe',
        }}>
          {/* Mobile top bar */}
          {isMobile && (
              <div style={s.mobileTopBar}>
                <button style={s.mobileBack} onClick={step > 1 ? () => setStep(st => st - 1) : onBack}>←</button>
                <span style={s.mobileBrand}>RewardsNow</span>
                <div style={s.mobileStepDots}>
                  {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{
                        ...s.stepDot,
                        background: step >= i ? BLUE : '#e0e0e0',
                      }} />
                  ))}
                </div>
              </div>
          )}

          <div style={{ ...s.form, padding: isMobile ? '28px 24px 48px' : '0' }}>

            {/* ── Step 1: Account ── */}
            {step === 1 && (
                <>
                  <h2 style={s.formTitle}>Create your account</h2>
                  <p style={s.formSub}>Step 1 of 3</p>
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

            {/* ── Step 2: Business details ── */}
            {step === 2 && (
                <>
                  <h2 style={s.formTitle}>Business details</h2>
                  <p style={s.formSub}>Step 2 of 3</p>
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
                      {loading ? 'Submitting…' : 'Continue to payment →'}
                    </button>
                  </div>
                </>
            )}

            {/* ── Step 3: Payment ── */}
            {step === 3 && (
                <>
                  <h2 style={s.formTitle}>Payment</h2>
                  <p style={s.formSub}>Step 3 of 3</p>

                  {/* Order summary */}
                  <div style={s.orderSummary}>
                    <div style={s.orderRow}>
                      <span style={s.orderLabel}>{selectedTier?.name} plan</span>
                      <span style={s.orderAmount}>{selectedTier?.price}<span style={s.orderPeriod}>/mo</span></span>
                    </div>
                    <div style={s.orderDivider} />
                    <div style={s.orderRow}>
                      <span style={{ ...s.orderLabel, fontWeight: '700', color: '#0f172a' }}>Due today</span>
                      <span style={{ ...s.orderAmount, color: BLUE }}>{selectedTier?.price}</span>
                    </div>
                  </div>

                  {/* Card inputs */}
                  <div style={s.field}>
                    <label style={s.label}>Cardholder Name</label>
                    <input style={s.input} autoComplete="cc-name" placeholder="Jane Smith"
                           value={cardForm.cardName}
                           onChange={e => setCardForm(p => ({ ...p, cardName: e.target.value }))} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Card Number</label>
                    <div style={s.cardInputWrap}>
                      <input style={{ ...s.input, paddingRight: '48px', marginBottom: 0 }}
                             autoComplete="cc-number" placeholder="1234 5678 9012 3456"
                             value={cardForm.cardNumber}
                             onChange={e => setCardForm(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))} />
                      <span style={s.cardIcon}>💳</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ ...s.field, flex: 1 }}>
                      <label style={s.label}>Expiry</label>
                      <input style={s.input} autoComplete="cc-exp" placeholder="MM/YY"
                             value={cardForm.expiry}
                             onChange={e => setCardForm(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} />
                    </div>
                    <div style={{ ...s.field, width: '100px' }}>
                      <label style={s.label}>CVV</label>
                      <input style={s.input} autoComplete="cc-csc" placeholder="123"
                             value={cardForm.cvv}
                             onChange={e => setCardForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} />
                    </div>
                  </div>

                  <div style={s.secureNote}>
                    <span style={s.lockIcon}>🔒</span>
                    <span>Payments are encrypted and secure</span>
                  </div>

                  {error && <p style={s.error}>{error}</p>}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {!isMobile && <button style={s.backBtn} onClick={() => setStep(2)}>← Back</button>}
                    <button style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1, flex: 1 }} onClick={handlePayment} disabled={loading}>
                      {loading ? 'Processing…' : `Pay ${selectedTier?.price} →`}
                    </button>
                  </div>
                </>
            )}

            {/* ── Step 4: Success ── */}
            {step === 4 && (
                <div style={s.successScreen}>
                  <div style={s.successIcon}>✓</div>
                  <h2 style={s.formTitle}>You're all set!</h2>
                  <p style={s.successMsg}>
                    Payment confirmed. Our team reviews every application within 24–48 hours. You'll get an email the moment your business goes live.
                  </p>
                  <p style={s.successTier}>Plan: <strong>{selectedTier?.name}</strong> · <strong>{selectedTier?.price}/mo</strong></p>
                  <button style={s.submitBtn} onClick={onBack}>Back to sign in</button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}

const s = {
  root: { display: 'flex', minHeight: '100vh', fontFamily: FONT, background: '#f0f7ff' },
  left: { flex: 1, background: '#08011a', display: 'flex', alignItems: 'center', padding: '80px', position: 'relative', overflow: 'hidden' },
  orb1: { position: 'absolute', top: '-100px', left: '-80px', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.55)', filter: 'blur(110px)', zIndex: 1, pointerEvents: 'none' },
  orb2: { position: 'absolute', bottom: '-80px', right: '-40px', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.3)', filter: 'blur(90px)', zIndex: 1, pointerEvents: 'none' },
  orb3: { position: 'absolute', top: '48%', right: '22%', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(217, 70, 239, 0.25)', filter: 'blur(70px)', zIndex: 1, pointerEvents: 'none' },
  leftInner: { maxWidth: '440px', width: '100%', position: 'relative', zIndex: 2 },
  backLink: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: 0, marginBottom: '48px', display: 'block', fontFamily: FONT },
  brand: { color: '#f59e0b', fontSize: '12px', fontWeight: '700', letterSpacing: '4px', marginBottom: '48px', textTransform: 'uppercase' },
  headline: { color: '#fff', fontSize: '3rem', fontWeight: '900', lineHeight: 1.06, letterSpacing: '-0.03em', margin: '0 0 20px' },
  tagline: { color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, margin: '0 0 48px' },
  steps: { display: 'flex', flexDirection: 'column', gap: '16px' },
  stepRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  stepCircle: { width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 },
  stepLabel: { color: '#fff', fontSize: '13px', fontWeight: '500' },
  right: { display: 'flex', flexDirection: 'column', overflowY: 'auto', boxSizing: 'border-box', background: '#f0f7ff' },
  mobileTopBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #bfdbfe', position: 'sticky', top: 0, background: '#f0f7ff', zIndex: 10 },
  mobileBack: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#555', padding: '4px 8px' },
  mobileBrand: { color: '#0f172a', fontSize: '15px', fontWeight: '700' },
  mobileStepDots: { display: 'flex', gap: '6px' },
  stepDot: { width: '8px', height: '8px', borderRadius: '50%', transition: 'background 0.2s' },
  form: { width: '100%', maxWidth: '400px', margin: '0 auto', boxSizing: 'border-box' },
  formTitle: { color: '#0f172a', fontSize: '1.6rem', fontWeight: '800', margin: '0 0 6px', letterSpacing: '-0.03em' },
  formSub: { color: '#60a5fa', fontSize: '13px', fontWeight: '500', margin: '0 0 28px' },
  field: { marginBottom: '16px' },
  label: { display: 'block', color: '#b45309', fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' },
  input: { width: '100%', padding: '11px 14px', border: '2px solid #bfdbfe', borderRadius: '8px', fontSize: '14px', color: '#0f172a', background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 0, fontFamily: FONT },
  addrRow: { display: 'flex', gap: '8px', alignItems: 'center' },
  geocodeBtn: { padding: '11px 14px', background: '#bfdbfe', border: '2px solid #bfdbfe', borderRadius: '8px', color: '#2563eb', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: FONT },
  geocodeConfirm: { color: '#16a34a', fontSize: '12px', margin: '6px 0 0' },
  tierList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  tierCard: { border: '2px solid #bfdbfe', borderRadius: '10px', padding: '14px 16px', cursor: 'pointer', position: 'relative', background: '#fff' },
  tierCardSelected: { borderColor: BLUE, background: '#eff6ff' },
  tierHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' },
  tierName: { color: '#0f172a', fontSize: '14px', fontWeight: '600', margin: 0 },
  tierBadge: { background: 'linear-gradient(135deg, #1e40af, #2563eb)', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' },
  tierPrice: { color: '#0f172a', fontSize: '16px', fontWeight: '700', margin: 0 },
  tierPeriod: { color: '#9ca3af', fontSize: '12px', fontWeight: '400' },
  tierDesc: { color: '#6b7280', fontSize: '12px', lineHeight: 1.5, margin: 0, paddingRight: '24px' },
  tierRadio: { position: 'absolute', top: '16px', right: '16px', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #d1d5db', background: '#fff' },
  tierRadioSelected: { borderColor: BLUE, background: BLUE },
  // Payment step
  orderSummary: { background: '#fff', border: '2px solid #bfdbfe', borderRadius: '12px', padding: '16px 18px', marginBottom: '24px' },
  orderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  orderLabel: { color: '#6b7280', fontSize: '13px', fontWeight: '500' },
  orderAmount: { color: '#0f172a', fontSize: '16px', fontWeight: '700' },
  orderPeriod: { color: '#9ca3af', fontSize: '12px', fontWeight: '400' },
  orderDivider: { borderTop: '1px solid #e5e7eb', margin: '12px 0' },
  cardInputWrap: { position: 'relative' },
  cardIcon: { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', pointerEvents: 'none' },
  secureNote: { display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '12px', marginBottom: '20px', marginTop: '4px' },
  lockIcon: { fontSize: '14px' },
  // Shared
  error: { color: '#dc2626', fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: '0 0 14px' },
  submitBtn: { width: '100%', padding: '13px', background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 24px rgba(37, 99, 235, 0.4)', fontFamily: FONT },
  backBtn: { padding: '12px 16px', background: '#fff', color: '#374151', border: '2px solid #bfdbfe', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: FONT },
  successScreen: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' },
  successIcon: { width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e40af, #2563eb)', color: '#fff', fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  successMsg: { color: '#6b7280', fontSize: '14px', lineHeight: 1.7, margin: 0 },
  successTier: { color: '#6b7280', fontSize: '13px', margin: 0 },
};
