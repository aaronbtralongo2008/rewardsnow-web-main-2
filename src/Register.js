import { useState } from 'react';
import { useIsMobile } from './useIsMobile';
import { API } from './config';

function Register({ onRegister, onBack }) {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    password: '', phoneNumber: '', username: '', age: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    if (!form.firstName || !form.lastName || !form.email ||
        !form.password || !form.phoneNumber || !form.username || !form.age) {
      setError('Please fill in all fields');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!/^[0-9]{10,15}$/.test(form.phoneNumber)) {
      setError('Phone number must be 10-15 digits, no spaces or dashes');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/customers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, age: parseInt(form.age) })
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        onRegister(data);
      }
    } catch {
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={s.container}>
        <div style={{ ...s.wrapper, flexDirection: isMobile ? 'column' : 'row' }}>

          {isMobile ? (
              <div style={s.mobileHeader}>
                <span style={s.mobileHeaderBrand}>RewardsNow</span>
                <span style={s.mobileHeaderSub}>Create your free account</span>
              </div>
          ) : (
              <div style={s.leftPanel}>
                <div style={s.leftContent}>
                  <div style={s.badge}>REWARDSNOW</div>
                  <div style={s.goldLine} />
                  <p style={s.tagline}>Join customers earning rewards every day.</p>
                </div>
              </div>
          )}

          <div style={{
            ...s.rightPanel,
            width: isMobile ? '100%' : '520px',
            padding: isMobile ? '28px 24px 48px' : '48px 56px',
            boxShadow: isMobile ? 'none' : '-8px 0 40px rgba(0,0,0,0.06)',
            flex: isMobile ? '1' : 'none',
          }}>
            <h1 style={{ ...s.brandName, fontSize: isMobile ? '1.6rem' : '2rem' }}>Create Account</h1>
            <p style={s.brandSub}>Join RewardsNow for free</p>

            <div style={s.row}>
              <div style={s.half}>
                <label style={s.inputLabel}>First Name</label>
                <input style={s.input} placeholder="First name" value={form.firstName}
                       onChange={handleChange('firstName')} autoComplete="given-name"
                       onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
              <div style={s.half}>
                <label style={s.inputLabel}>Last Name</label>
                <input style={s.input} placeholder="Last name" value={form.lastName}
                       onChange={handleChange('lastName')} autoComplete="family-name"
                       onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
            </div>

            <label style={s.inputLabel}>Username</label>
            <input style={s.input} placeholder="username" value={form.username}
                   onChange={handleChange('username')} autoComplete="username"
                   onKeyDown={e => e.key === 'Enter' && handleRegister()} />

            <label style={s.inputLabel}>Email</label>
            <input style={s.input} type="email" placeholder="you@email.com" value={form.email}
                   onChange={handleChange('email')} autoComplete="email"
                   onKeyDown={e => e.key === 'Enter' && handleRegister()} />

            <div style={s.row}>
              <div style={s.half}>
                <label style={s.inputLabel}>Phone</label>
                <input style={s.input} type="tel" placeholder="10-15 digits" value={form.phoneNumber}
                       onChange={handleChange('phoneNumber')} autoComplete="tel-national"
                       onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
              <div style={s.half}>
                <label style={s.inputLabel}>Age</label>
                <input style={s.input} type="number" placeholder="Age" value={form.age}
                       onChange={handleChange('age')} autoComplete="off" min="13" max="120"
                       onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
            </div>

            <label style={s.inputLabel}>Password</label>
            <input style={s.input} type="password" placeholder="At least 8 characters" value={form.password}
                   onChange={handleChange('password')} autoComplete="new-password"
                   onKeyDown={e => e.key === 'Enter' && handleRegister()} />

            {error && <p style={s.error}>{error}</p>}

            <button style={{ ...s.registerBtn, opacity: loading ? 0.7 : 1 }}
                    onClick={handleRegister} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <div style={s.divider}>
              <div style={s.dividerLine} />
              <span style={s.dividerText}>or</span>
              <div style={s.dividerLine} />
            </div>

            <button style={s.backBtn} onClick={onBack}>
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
  );
}

const s = {
  container: { minHeight: '100vh', background: '#FFF8EA', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' },
  wrapper: { display: 'flex', flex: 1 },
  mobileHeader: { background: '#07243A', padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mobileHeaderBrand: { color: '#F2B84B', fontSize: '1.4rem', fontWeight: '800' },
  mobileHeaderSub: { color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' },
  leftPanel: { flex: 1, background: '#07243A', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', position: 'relative', overflow: 'hidden' },
  leftContent: { position: 'relative', zIndex: 2 },
  badge: { display: 'inline-block', color: '#F2B84B', fontSize: '12px', fontWeight: '700', letterSpacing: '4px', marginBottom: '20px' },
  goldLine: { width: '56px', height: '3px', background: '#F2B84B', marginBottom: '32px', borderRadius: '2px' },
  tagline: { color: '#fff', fontSize: '3.4rem', fontWeight: '900', lineHeight: 1.06, margin: '0 0 16px 0', maxWidth: '440px', letterSpacing: '-0.03em' },
  rightPanel: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#FFF8EA', boxSizing: 'border-box', overflowY: 'auto' },
  brandName: { color: '#101820', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.03em' },
  brandSub: { color: '#5F6B73', fontSize: '1rem', margin: '0 0 24px 0' },
  row: { display: 'flex', gap: '12px' },
  half: { flex: 1, display: 'flex', flexDirection: 'column' },
  inputLabel: { color: '#5F6B73', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' },
  input: { padding: '12px 16px', borderRadius: '10px', border: '2px solid rgba(11,92,173,0.25)', background: '#fff', color: '#101820', fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  registerBtn: { padding: '14px', borderRadius: '12px', border: 'none', background: '#0B5CAD', color: '#ffffff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%', marginTop: '4px' },
  backBtn: { padding: '14px', borderRadius: '12px', border: '2px solid rgba(11,92,173,0.2)', background: '#fff', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '18px 0' },
  dividerLine: { flex: 1, height: '1px', background: 'rgba(11,92,173,0.15)' },
  dividerText: { color: '#5F6B73', fontSize: '13px' },
  error: { color: '#dc2626', fontSize: '13px', margin: '0 0 14px 0', background: '#fff0f0', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ffd0d0' },
};

export default Register;
