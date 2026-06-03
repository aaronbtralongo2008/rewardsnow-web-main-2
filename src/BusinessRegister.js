import { useState } from 'react';
import { API } from './config';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';

const BLUE = '#0B5CAD';

const TIERS = [
  {
    key: 'standard',
    name: 'Standard',
    price: '$100',
    period: '/mo',
    desc: 'Join the Veniar Network. Customers earn Veniar Points that work across every partner location.',
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
    desc: 'Your own branded points currency. Customers earn your points — not RN Points. Fully private-label.',
    paidPartner: true,
    uniqueRewards: true,
    badge: 'Most popular',
  },
];

export default function BusinessRegister({ onBack, onSuccess }) {
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
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

  // Theme-aware values
  const rightBg = isDark ? '#07243A' : '#FFF8EA';
  const textColor = isDark ? '#ffffff' : '#101820';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const inputBg = isDark ? 'rgba(255,255,255,0.07)' : '#ffffff';
  const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const inputText = isDark ? '#ffffff' : '#101820';
  const mobileTopBg = isDark ? '#07243A' : '#FFF8EA';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: rightBg }}>
      {/* Left panel — desktop only, always dark */}
      {!isMobile && (
        <div style={{ flex: 1, background: '#07243A', display: 'flex', alignItems: 'center', padding: '80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '440px', width: '100%', position: 'relative', zIndex: 2 }}>
            <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: 0, marginBottom: '48px', display: 'block' }} onClick={onBack}>← Back to sign in</button>
            <div style={{ color: '#F2B84B', fontSize: '12px', fontWeight: '700', letterSpacing: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>Veniar</div>
            {/* Gold accent bar */}
            <div style={{ width: '56px', height: '3px', background: '#F2B84B', marginBottom: '32px', borderRadius: '2px' }} />
            <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: '900', lineHeight: 1.06, letterSpacing: '-0.03em', margin: '0 0 20px' }}>Grow your business<br />with loyalty.</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, margin: '0 0 48px' }}>
              Join the Veniar network and give your customers a reason to keep coming back.
            </p>
            {/* Step indicators in teal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Create account', 'Business details', 'Under review'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0,
                    background: step > i + 1 ? '#25B7C8' : step === i + 1 ? '#25B7C8' : 'transparent',
                    border: `2px solid ${step >= i + 1 ? '#25B7C8' : 'rgba(255,255,255,0.2)'}`,
                    color: step >= i + 1 ? '#fff' : 'rgba(255,255,255,0.3)',
                  }}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: '500', opacity: step >= i + 1 ? 1 : 0.35 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{
        display: 'flex', flexDirection: 'column', overflowY: 'auto', boxSizing: 'border-box', background: rightBg,
        width: isMobile ? '100%' : '520px',
        padding: isMobile ? '0' : '48px',
        borderLeft: isMobile ? 'none' : `1px solid ${borderColor}`,
      }}>
        {/* Teal accent bar — top of right panel */}
        <div style={{ height: '3px', background: '#25B7C8', flexShrink: 0 }} />
        {/* Mobile top bar */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid ${borderColor}`, position: 'sticky', top: '3px', background: mobileTopBg, zIndex: 10 }}>
            <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: mutedColor, padding: '4px 8px' }} onClick={step > 1 ? () => setStep(s => s - 1) : onBack}>←</button>
            <span style={{ color: textColor, fontSize: '15px', fontWeight: '700' }}>Veniar</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={toggleTheme}
                style={{
                  padding: '5px 10px',
                  background: 'none',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                  color: isDark ? 'rgba(255,255,255,0.7)' : '#5F6B73',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {isDark ? '○' : '●'}
              </button>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: step >= i ? '#25B7C8' : (isDark ? 'rgba(255,255,255,0.2)' : '#e0e0e0') }} />
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Desktop theme toggle — top right of form area */}
        {!isMobile && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '5px 10px',
                background: 'none',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                color: isDark ? 'rgba(255,255,255,0.7)' : '#5F6B73',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {isDark ? '○' : '●'}
            </button>
          </div>
        )}

        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', boxSizing: 'border-box', padding: isMobile ? '28px 24px 48px' : '0' }}>
          {step === 1 && (
            <>
              <h2 style={{ color: textColor, fontSize: '1.6rem', fontWeight: '900', margin: '0 0 6px', letterSpacing: '-0.03em' }}>Create your account</h2>
              <p style={{ color: BLUE, fontSize: '13px', margin: '0 0 28px' }}>Step 1 of 2</p>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: mutedColor, fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' }}>Email</label>
                <input style={{ width: '100%', padding: '11px 14px', border: `2px solid ${inputBorder}`, borderRadius: '8px', fontSize: '14px', color: inputText, background: inputBg, outline: 'none', boxSizing: 'border-box', marginBottom: 0 }} type="email" autoComplete="email"
                       placeholder="owner@business.com"
                       value={form.email} onChange={set(setForm, 'email')}
                       onKeyDown={e => e.key === 'Enter' && handleCreateAccount()} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: mutedColor, fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' }}>Username</label>
                <input style={{ width: '100%', padding: '11px 14px', border: `2px solid ${inputBorder}`, borderRadius: '8px', fontSize: '14px', color: inputText, background: inputBg, outline: 'none', boxSizing: 'border-box', marginBottom: 0 }} autoComplete="username" placeholder="bizowner"
                       value={form.username} onChange={set(setForm, 'username')}
                       onKeyDown={e => e.key === 'Enter' && handleCreateAccount()} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: mutedColor, fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' }}>Phone</label>
                <input style={{ width: '100%', padding: '11px 14px', border: `2px solid ${inputBorder}`, borderRadius: '8px', fontSize: '14px', color: inputText, background: inputBg, outline: 'none', boxSizing: 'border-box', marginBottom: 0 }} type="tel" autoComplete="tel-national" placeholder="5551234567"
                       value={form.phoneNumber} onChange={set(setForm, 'phoneNumber')}
                       onKeyDown={e => e.key === 'Enter' && handleCreateAccount()} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: mutedColor, fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' }}>Password</label>
                <input style={{ width: '100%', padding: '11px 14px', border: `2px solid ${inputBorder}`, borderRadius: '8px', fontSize: '14px', color: inputText, background: inputBg, outline: 'none', boxSizing: 'border-box', marginBottom: 0 }} type="password" autoComplete="new-password"
                       placeholder="8+ characters"
                       value={form.password} onChange={set(setForm, 'password')}
                       onKeyDown={e => e.key === 'Enter' && handleCreateAccount()} />
              </div>
              {error && <p style={{ color: '#dc2626', fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: '0 0 14px' }}>{error}</p>}
              <button style={{ width: '100%', padding: '12px', background: BLUE, color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', opacity: loading ? 0.7 : 1 }} onClick={handleCreateAccount} disabled={loading}>
                {loading ? 'Creating account…' : 'Continue →'}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ color: textColor, fontSize: '1.6rem', fontWeight: '900', margin: '0 0 6px', letterSpacing: '-0.03em' }}>Business details</h2>
              <p style={{ color: BLUE, fontSize: '13px', margin: '0 0 28px' }}>Step 2 of 2</p>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: mutedColor, fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' }}>Business Name</label>
                <input style={{ width: '100%', padding: '11px 14px', border: `2px solid ${inputBorder}`, borderRadius: '8px', fontSize: '14px', color: inputText, background: inputBg, outline: 'none', boxSizing: 'border-box', marginBottom: 0 }} autoComplete="organization" placeholder="Joe's Coffee"
                       value={bizForm.businessName} onChange={set(setBizForm, 'businessName')} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: mutedColor, fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' }}>Business Address</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input style={{ width: '100%', padding: '11px 14px', border: `2px solid ${inputBorder}`, borderRadius: '8px', fontSize: '14px', color: inputText, background: inputBg, outline: 'none', boxSizing: 'border-box', marginBottom: 0, flex: 1 }}
                         autoComplete="street-address" placeholder="123 Main St, Boca Raton FL 33431"
                         value={bizForm.address} onChange={set(setBizForm, 'address')} />
                  <button style={{ padding: '11px 14px', background: 'rgba(37,183,200,0.12)', border: '2px solid rgba(37,183,200,0.3)', borderRadius: '8px', color: '#25B7C8', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, opacity: geocoding ? 0.6 : 1 }}
                          onClick={geocodeAddress} disabled={geocoding}>
                    {geocoding ? '…' : 'Locate'}
                  </button>
                </div>
                {bizForm.latitude && (
                  <p style={{ color: '#16a34a', fontSize: '12px', margin: '6px 0 0' }}>✓ Coordinates found: {bizForm.latitude}, {bizForm.longitude}</p>
                )}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: mutedColor, fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' }}>Select Your Plan</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {TIERS.map(t => (
                    <div key={t.key} style={{
                      border: tier === t.key ? `2px solid ${BLUE}` : `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(11,92,173,0.2)'}`,
                      borderRadius: '10px', padding: '14px 16px', cursor: 'pointer', position: 'relative',
                      background: tier === t.key ? (isDark ? 'rgba(11,92,173,0.15)' : 'rgba(11,92,173,0.05)') : (isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'),
                    }}
                         onClick={() => setTier(t.key)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <div>
                          <p style={{ color: textColor, fontSize: '14px', fontWeight: '600', margin: 0 }}>{t.name}</p>
                          {t.badge && <span style={{ background: '#25B7C8', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>{t.badge}</span>}
                        </div>
                        <p style={{ color: textColor, fontSize: '16px', fontWeight: '700', margin: 0 }}>{t.price}<span style={{ color: mutedColor, fontSize: '12px', fontWeight: '400' }}>{t.period}</span></p>
                      </div>
                      <p style={{ color: mutedColor, fontSize: '12px', lineHeight: 1.5, margin: 0, paddingRight: '24px' }}>{t.desc}</p>
                      <div style={{
                        position: 'absolute', top: '16px', right: '16px', width: '16px', height: '16px', borderRadius: '50%',
                        border: tier === t.key ? `2px solid ${BLUE}` : `2px solid ${isDark ? 'rgba(255,255,255,0.2)' : '#d1d5db'}`,
                        background: tier === t.key ? BLUE : (isDark ? 'transparent' : '#fff'),
                      }} />
                    </div>
                  ))}
                </div>
              </div>
              {error && <p style={{ color: '#dc2626', fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: '0 0 14px' }}>{error}</p>}
              <div style={{ display: 'flex', gap: '10px' }}>
                {!isMobile && <button style={{ padding: '12px 16px', background: isDark ? 'rgba(255,255,255,0.07)' : '#fff', color: isDark ? '#fff' : '#374151', border: `2px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(11,92,173,0.2)'}`, borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }} onClick={() => setStep(1)}>← Back</button>}
                <button style={{ width: '100%', padding: '12px', background: BLUE, color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', flex: 1, opacity: loading ? 0.7 : 1 }} onClick={handleSubmitRequest} disabled={loading}>
                  {loading ? 'Submitting…' : 'Submit application'}
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Success icon: BLUE bg, white icon */}
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: BLUE, color: '#fff', fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
              <h2 style={{ color: textColor, fontSize: '1.6rem', fontWeight: '900', margin: '0 0 6px', letterSpacing: '-0.03em' }}>Application submitted</h2>
              <p style={{ color: mutedColor, fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Our team reviews every application and will contact you by email once approved.
              </p>
              <p style={{ color: mutedColor, fontSize: '13px', margin: 0 }}>Plan selected: <strong style={{ color: textColor }}>{TIERS.find(t => t.key === tier)?.name}</strong></p>
              <button style={{ width: '100%', padding: '12px', background: BLUE, color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }} onClick={onBack}>Back to sign in</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
