import { useState } from 'react';
import { useIsMobile } from './useIsMobile';
import { API } from './config';
import { useTheme } from './ThemeContext';

function Register({ onRegister, onBack }) {
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
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

  const themeToggleSt = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
    color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73',
    borderRadius: '6px',
    padding: '5px 10px',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.05em',
  };

  const container = {
    minHeight: '100vh',
    background: isDark ? '#07243A' : '#FFF8EA',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  };

  const wrapper = {
    display: 'flex',
    flex: 1,
  };

  const mobileHeader = {
    background: '#07243A',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const mobileHeaderBrand = {
    color: '#F2B84B',
    fontSize: '1.4rem',
    fontWeight: '800',
  };

  const mobileHeaderSub = {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '13px',
    marginTop: '4px',
  };

  const leftPanel = {
    flex: 1,
    background: '#07243A',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '80px',
    position: 'relative',
    overflow: 'hidden',
  };

  const leftContent = {
    position: 'relative',
    zIndex: 2,
  };

  const badge = {
    display: 'inline-block',
    color: '#F2B84B',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '4px',
    marginBottom: '20px',
  };

  const goldLine = {
    width: '56px',
    height: '3px',
    background: '#F2B84B',
    marginBottom: '32px',
    borderRadius: '2px',
  };

  const tagline = {
    color: '#fff',
    fontSize: '3.4rem',
    fontWeight: '900',
    lineHeight: 1.06,
    margin: '0 0 16px 0',
    maxWidth: '440px',
    letterSpacing: '-0.03em',
  };

  const leftDesc = {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '15px',
    lineHeight: 1.7,
    margin: 0,
    maxWidth: '360px',
  };

  const stepRow = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '48px',
  };

  const stepItem = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
  };

  const stepNum = {
    color: '#25B7C8',
    fontWeight: '800',
    fontSize: '11px',
    letterSpacing: '0.05em',
    marginTop: '2px',
    minWidth: '20px',
  };

  const stepText = {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '13px',
    lineHeight: 1.5,
  };

  const tealConnector = {
    width: '2px',
    height: '16px',
    background: '#25B7C8',
    marginLeft: '9px',
    opacity: 0.4,
  };

  const rightPanel = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: isDark ? '#0D2E42' : '#ffffff',
    boxSizing: 'border-box',
    overflowY: 'auto',
    position: 'relative',
    borderLeft: isDark ? '3px solid #0B5CAD' : 'none',
    borderTop: isDark ? 'none' : '3px solid #0B5CAD',
  };

  const brandName = {
    color: isDark ? '#ffffff' : '#101820',
    fontWeight: '900',
    margin: '0 0 6px 0',
    letterSpacing: '-0.03em',
  };

  const goldAccentBar = {
    width: '40px',
    height: '3px',
    background: '#F2B84B',
    borderRadius: '2px',
    margin: '0 0 16px 0',
  };

  const brandSub = {
    color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73',
    fontSize: '1rem',
    margin: '0 0 24px 0',
  };

  const row = {
    display: 'flex',
    gap: '12px',
  };

  const half = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const inputLabel = {
    color: isDark ? 'rgba(255,255,255,0.7)' : '#5F6B73',
    fontSize: '10px',
    fontWeight: '700',
    marginBottom: '7px',
    display: 'block',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  };

  const input = {
    padding: '12px 16px',
    borderRadius: '10px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
    background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
    color: isDark ? '#ffffff' : '#101820',
    fontSize: '14px',
    marginBottom: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  const registerBtn = {
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#0B5CAD',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    marginTop: '4px',
  };

  const backBtn = {
    padding: '14px',
    borderRadius: '12px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)'}`,
    background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
    color: isDark ? 'rgba(255,255,255,0.6)' : '#374151',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  };

  const divider = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '18px 0',
  };

  const dividerLine = {
    flex: 1,
    height: '1px',
    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
  };

  const dividerText = {
    color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73',
    fontSize: '13px',
  };

  const errorSt = {
    color: '#dc2626',
    fontSize: '13px',
    margin: '0 0 14px 0',
    background: '#fff0f0',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ffd0d0',
  };

  return (
    <div style={container}>
      {/* Teal accent line at top */}
      <div style={{ height: '3px', background: '#25B7C8', flexShrink: 0 }} />
      <div style={{ ...wrapper, flexDirection: isMobile ? 'column' : 'row' }}>

        {isMobile ? (
          <div style={mobileHeader}>
            <span style={mobileHeaderBrand}>RewardsNow</span>
            <span style={mobileHeaderSub}>Create your free account</span>
          </div>
        ) : (
          <div style={leftPanel}>
            <div style={leftContent}>
              <div style={badge}>REWARDSNOW</div>
              <div style={goldLine} />
              <p style={tagline}>Join customers earning rewards every day.</p>
              <p style={leftDesc}>It only takes a minute to get started.</p>
              <div style={stepRow}>
                <div style={stepItem}>
                  <span style={stepNum}>01</span>
                  <span style={stepText}>Create your free account</span>
                </div>
                <div style={tealConnector} />
                <div style={stepItem}>
                  <span style={stepNum}>02</span>
                  <span style={stepText}>Visit participating businesses</span>
                </div>
                <div style={tealConnector} />
                <div style={stepItem}>
                  <span style={stepNum}>03</span>
                  <span style={stepText}>Earn and redeem your rewards</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{
          ...rightPanel,
          width: isMobile ? '100%' : '520px',
          padding: isMobile ? '28px 24px 48px' : '48px 56px',
          boxShadow: isMobile ? 'none' : '-8px 0 40px rgba(0,0,0,0.06)',
          flex: isMobile ? '1' : 'none',
        }}>
          <button style={themeToggleSt} onClick={toggleTheme}>
            {isDark ? 'LIGHT' : 'DARK'}
          </button>
          <h1 style={{ ...brandName, fontSize: isMobile ? '1.6rem' : '2rem' }}>Create Account</h1>
          <div style={goldAccentBar} />
          <p style={brandSub}>Join RewardsNow for free</p>

          <div style={row}>
            <div style={half}>
              <label style={inputLabel}>First Name</label>
              <input style={input} placeholder="First name" value={form.firstName}
                     onChange={handleChange('firstName')} autoComplete="given-name"
                     onKeyDown={e => e.key === 'Enter' && handleRegister()} />
            </div>
            <div style={half}>
              <label style={inputLabel}>Last Name</label>
              <input style={input} placeholder="Last name" value={form.lastName}
                     onChange={handleChange('lastName')} autoComplete="family-name"
                     onKeyDown={e => e.key === 'Enter' && handleRegister()} />
            </div>
          </div>

          <label style={inputLabel}>Username</label>
          <input style={input} placeholder="username" value={form.username}
                 onChange={handleChange('username')} autoComplete="username"
                 onKeyDown={e => e.key === 'Enter' && handleRegister()} />

          <label style={inputLabel}>Email</label>
          <input style={input} type="email" placeholder="you@email.com" value={form.email}
                 onChange={handleChange('email')} autoComplete="email"
                 onKeyDown={e => e.key === 'Enter' && handleRegister()} />

          <div style={row}>
            <div style={half}>
              <label style={inputLabel}>Phone</label>
              <input style={input} type="tel" placeholder="10-15 digits" value={form.phoneNumber}
                     onChange={handleChange('phoneNumber')} autoComplete="tel-national"
                     onKeyDown={e => e.key === 'Enter' && handleRegister()} />
            </div>
            <div style={half}>
              <label style={inputLabel}>Age</label>
              <input style={input} type="number" placeholder="Age" value={form.age}
                     onChange={handleChange('age')} autoComplete="off" min="13" max="120"
                     onKeyDown={e => e.key === 'Enter' && handleRegister()} />
            </div>
          </div>

          <label style={inputLabel}>Password</label>
          <input style={input} type="password" placeholder="At least 8 characters" value={form.password}
                 onChange={handleChange('password')} autoComplete="new-password"
                 onKeyDown={e => e.key === 'Enter' && handleRegister()} />

          {error && <p style={errorSt}>{error}</p>}

          <button style={{ ...registerBtn, opacity: loading ? 0.7 : 1 }}
                  onClick={handleRegister} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div style={divider}>
            <div style={dividerLine} />
            <span style={dividerText}>or</span>
            <div style={dividerLine} />
          </div>

          <button style={backBtn} onClick={onBack}>
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
