import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { API } from './config';
import { useTheme } from './ThemeContext';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email || !password) { setError('Please enter your email and password'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email address'); return; }
    setLoading(true);
    try {
      const response = await fetch(`${API}/customers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.error) {
        setError('Username or Password Incorrect');
      } else {
        onLogin(data);
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

  const loginWrapper = {
    display: 'flex',
    flex: 1,
    minHeight: 0,
  };

  const mobileHeader = {
    background: '#07243A',
    padding: '24px',
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
    fontSize: '3.6rem',
    fontWeight: '900',
    lineHeight: 1.06,
    margin: '0 0 20px 0',
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
    margin: '0 0 36px 0',
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
    padding: '14px 16px',
    borderRadius: '10px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
    background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
    color: isDark ? '#ffffff' : '#101820',
    fontSize: '15px',
    marginBottom: '20px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  const loginBtn = {
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: '#0B5CAD',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    letterSpacing: '0.02em',
  };

  const forgotLink = {
    color: '#0B5CAD',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  };

  const registerBtn = {
    padding: '15px',
    borderRadius: '12px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)'}`,
    background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
    color: isDark ? 'rgba(255,255,255,0.6)' : '#374151',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  };

  const bizRegisterBtn = {
    padding: '15px',
    borderRadius: '12px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)'}`,
    background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
    color: isDark ? 'rgba(255,255,255,0.6)' : '#374151',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  };

  const divider = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '24px 0',
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

  const terms = {
    color: isDark ? 'rgba(255,255,255,0.4)' : '#94a3b8',
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '20px',
    lineHeight: 1.6,
  };

  const link = {
    color: '#0B5CAD',
    cursor: 'pointer',
  };

  return (
    <div style={container}>
      {/* Teal accent line at top */}
      <div style={{ height: '3px', background: '#25B7C8', flexShrink: 0 }} />
      <div style={{ ...loginWrapper, flexDirection: isMobile ? 'column' : 'row' }}>

        {isMobile ? (
          <div style={mobileHeader}>
            <span style={mobileHeaderBrand}>Veniar</span>
            <span style={mobileHeaderSub}>Earn rewards everywhere</span>
          </div>
        ) : (
          <div style={leftPanel}>
            <div style={leftContent}>
              <div style={badge}>REWARDSNOW</div>
              <div style={goldLine} />
              <p style={tagline}>One card.<br />Every business.</p>
              <p style={leftDesc}>Join customers earning rewards at local businesses across the city.</p>
              <div style={stepRow}>
                <div style={stepItem}>
                  <span style={stepNum}>01</span>
                  <span style={stepText}>Sign in to your account</span>
                </div>
                <div style={tealConnector} />
                <div style={stepItem}>
                  <span style={stepNum}>02</span>
                  <span style={stepText}>Scan at participating businesses</span>
                </div>
                <div style={tealConnector} />
                <div style={stepItem}>
                  <span style={stepNum}>03</span>
                  <span style={stepText}>Earn and redeem rewards</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{
          ...rightPanel,
          width: isMobile ? '100%' : '500px',
          padding: isMobile ? '32px 24px 48px' : '80px 64px',
          boxShadow: isMobile ? 'none' : '-8px 0 40px rgba(0,0,0,0.06)',
          flex: isMobile ? '1' : 'none',
        }}>
          <button style={themeToggleSt} onClick={toggleTheme}>
            {isDark ? 'LIGHT' : 'DARK'}
          </button>
          <h1 style={{ ...brandName, fontSize: isMobile ? '1.8rem' : '2.2rem' }}>Welcome back</h1>
          <div style={goldAccentBar} />
          <p style={brandSub}>Sign in to your Veniar account</p>
          <label style={inputLabel}>Email</label>
          <input style={input} type="email" placeholder="you@email.com"
                 value={email} onChange={e => setEmail(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          <label style={inputLabel}>Password</label>
          <input style={input} type="password" placeholder="••••••••"
                 value={password} onChange={e => setPassword(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          {error && <p style={errorSt}>{error}</p>}
          <button style={{ ...loginBtn, opacity: loading ? 0.7 : 1 }}
                  onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div style={{ textAlign: 'right', marginTop: '8px' }}>
            <span style={forgotLink} onClick={() => navigate('/forgot-password')}>
              Forgot password?
            </span>
          </div>
          <div style={divider}>
            <div style={dividerLine} />
            <span style={dividerText}>or</span>
            <div style={dividerLine} />
          </div>
          <button style={registerBtn} onClick={() => navigate('/register')}>
            Create an Account
          </button>
          <button style={bizRegisterBtn} onClick={() => navigate('/business-overview')}>
            Own a business?
          </button>
          <p style={terms}>
            By signing in you agree to our{' '}
            <span style={link} onClick={() => navigate('/terms')}>Terms of Service</span> and{' '}
            <span style={link} onClick={() => navigate('/privacy')}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
