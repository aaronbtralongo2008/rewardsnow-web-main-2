import { useState } from 'react';
import { useIsMobile } from './useIsMobile';
import { API } from './config';

const GOLD = 'linear-gradient(135deg, #C9A84C 0%, #E8D48B 40%, #C9A84C 60%, #A67C2E 100%)';
const ROYAL = '#2040C8';

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
                <div style={s.badge}>REWARDSNOW</div>
                <div style={s.goldLine} />
                <p style={s.tagline}>Join thousands earning rewards every day.</p>
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
                <label style={s.inputLabel}>First name</label>
                <input style={s.input} placeholder="First name" value={form.firstName}
                       onChange={handleChange('firstName')} autoComplete="given-name"
                       onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
              <div style={s.half}>
                <label style={s.inputLabel}>Last name</label>
                <input style={s.input} placeholder="Last name" value={form.lastName}
                       onChange={handleChange('lastName')} autoComplete="family-name"
                       onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
            </div>

            <label style={s.inputLabel}>Username</label>
            <input style={s.input} placeholder="username" value={form.username}
                   onChange={handleChange('username')} autoComplete="username"
                   onKeyDown={e => e.key === 'Enter' && handleRegister()} />

            <label style={s.inputLabel}>Email address</label>
            <input style={s.input} type="email" placeholder="you@email.com" value={form.email}
                   onChange={handleChange('email')} autoComplete="email"
                   onKeyDown={e => e.key === 'Enter' && handleRegister()} />

            <div style={s.row}>
              <div style={s.half}>
                <label style={s.inputLabel}>Phone number</label>
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
              Already have an account? Log In
            </button>
          </div>
        </div>
      </div>
  );
}

const s = {
  container: { minHeight: '100vh', background: '#F4F6FB', fontFamily: "'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' },
  wrapper: { display: 'flex', flex: 1 },
  mobileHeader: { background: 'linear-gradient(145deg, #152a9e 0%, #1e35b5 100%)', padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mobileHeaderBrand: { color: '#fff', fontSize: '1.4rem', fontWeight: '800' },
  mobileHeaderSub: { color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' },
  leftPanel: { flex: 1, background: 'linear-gradient(145deg, #152a9e 0%, #1e35b5 50%, #172fa8 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px' },
  badge: { display: 'inline-block', backgroundImage: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '13px', fontWeight: '800', letterSpacing: '4px', marginBottom: '16px' },
  goldLine: { width: '83%', height: '2px', background: GOLD, marginBottom: '28px', borderRadius: '2px' },
  tagline: { backgroundImage: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2.8rem', fontWeight: '800', lineHeight: 1.2, margin: '0 0 16px 0', maxWidth: '440px' },
  rightPanel: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#ffffff', boxSizing: 'border-box', overflowY: 'auto' },
  brandName: { color: ROYAL, fontWeight: '800', margin: '0 0 6px 0' },
  brandSub: { color: '#888', fontSize: '1rem', margin: '0 0 24px 0' },
  row: { display: 'flex', gap: '12px' },
  half: { flex: 1, display: 'flex', flexDirection: 'column' },
  inputLabel: { color: '#444', fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block', letterSpacing: '0.3px' },
  input: { padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e0e0e0', background: '#fafafa', color: '#111', fontSize: '14px', marginBottom: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  registerBtn: { padding: '14px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#ffffff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%', marginTop: '4px' },
  backBtn: { padding: '14px', borderRadius: '10px', border: '1.5px solid #d0d0d0', background: 'transparent', color: '#555', fontSize: '14px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '18px 0' },
  dividerLine: { flex: 1, height: '1px', background: '#eee' },
  dividerText: { color: '#bbb', fontSize: '13px' },
  error: { color: '#e03434', fontSize: '13px', margin: '0 0 14px 0', background: '#fff0f0', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ffd0d0' },
};

export default Register;