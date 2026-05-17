import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { API } from './config';

const LOGO = process.env.PUBLIC_URL + '/logo514.png';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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

  return (
      <div style={styles.container}>
        <div style={{ ...styles.loginWrapper, flexDirection: isMobile ? 'column' : 'row' }}>

          {isMobile ? (
              <div style={styles.mobileHeader}>
                <img src={LOGO} alt="RewardsNow" style={styles.mobileLogoImg} />
                <span style={styles.mobileHeaderSub}>Earn rewards everywhere</span>
              </div>
          ) : (
              <div style={styles.leftPanel}>
                <div style={styles.orb1} />
                <div style={styles.orb2} />
                <div style={styles.orb3} />
                <div style={styles.leftContent}>
                  <img src={LOGO} alt="RewardsNow" style={styles.logoImg} />
                  <div style={styles.goldLine} />
                  <p style={styles.tagline}>One card.<br />Every business.</p>
                  <p style={styles.leftDesc}>Join thousands of customers earning rewards at local businesses across the city.</p>
                </div>
              </div>
          )}

          <div style={{
            ...styles.rightPanel,
            width: isMobile ? '100%' : '500px',
            padding: isMobile ? '32px 24px 48px' : '80px 64px',
            boxShadow: isMobile ? 'none' : '-8px 0 40px rgba(0,0,0,0.06)',
            flex: isMobile ? '1' : 'none',
          }}>
            <h1 style={{ ...styles.brandName, fontSize: isMobile ? '1.8rem' : '2.2rem' }}>Welcome back</h1>
            <p style={styles.brandSub}>Sign in to your RewardsNow account</p>
            <label style={styles.inputLabel}>Email</label>
            <input style={styles.input} type="email" placeholder="you@email.com"
                   value={email} onChange={e => setEmail(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <label style={styles.inputLabel}>Password</label>
            <input style={styles.input} type="password" placeholder="••••••••"
                   value={password} onChange={e => setPassword(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            {error && <p style={styles.error}>{error}</p>}
            <button style={{ ...styles.loginBtn, opacity: loading ? 0.7 : 1 }}
                    onClick={handleLogin} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              <span style={styles.forgotLink} onClick={() => navigate('/forgot-password')}>
                Forgot password?
              </span>
            </div>
            <div style={styles.divider}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>or</span>
              <div style={styles.dividerLine} />
            </div>
            <button style={styles.registerBtn} onClick={() => navigate('/register')}>
              Create an Account
            </button>
            <button style={styles.bizRegisterBtn} onClick={() => navigate('/business-overview')}>
              Own a business?
            </button>
            <p style={styles.terms}>
              By signing in you agree to our{' '}
              <span style={styles.link} onClick={() => navigate('/terms')}>Terms of Service</span> and{' '}
              <span style={styles.link} onClick={() => navigate('/privacy')}>Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f7ff', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' },
  loginWrapper: { display: 'flex', flex: 1, minHeight: 0 },
  mobileHeader: { background: 'linear-gradient(145deg, #0f172a 0%, #1e3a8a 100%)', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mobileLogoImg: { height: '44px', width: 'auto', objectFit: 'contain', marginBottom: '2px' },
  mobileHeaderSub: { color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' },
  leftPanel: { flex: 1, background: '#08011a', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', position: 'relative', overflow: 'hidden' },
  orb1: { position: 'absolute', top: '-100px', left: '-80px', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.55)', filter: 'blur(110px)', zIndex: 1, pointerEvents: 'none' },
  orb2: { position: 'absolute', bottom: '-80px', right: '-40px', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.3)', filter: 'blur(90px)', zIndex: 1, pointerEvents: 'none' },
  orb3: { position: 'absolute', top: '48%', right: '22%', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(217, 70, 239, 0.25)', filter: 'blur(70px)', zIndex: 1, pointerEvents: 'none' },
  leftContent: { position: 'relative', zIndex: 2 },
  logoImg: { height: '52px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '20px' },
  goldLine: { width: '56px', height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)', marginBottom: '32px', borderRadius: '2px' },
  tagline: { color: '#fff', fontSize: '3.6rem', fontWeight: '900', lineHeight: 1.06, margin: '0 0 20px 0', maxWidth: '440px', letterSpacing: '-0.03em' },
  leftDesc: { color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '360px' },
  rightPanel: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f0f7ff', boxSizing: 'border-box' },
  brandName: { color: '#0f172a', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.03em' },
  brandSub: { color: '#64748b', fontSize: '1rem', margin: '0 0 36px 0' },
  inputLabel: { color: '#b45309', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' },
  input: { padding: '14px 16px', borderRadius: '10px', border: '2px solid #bfdbfe', background: '#fff', color: '#0f172a', fontSize: '15px', marginBottom: '20px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  loginBtn: { padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: '#ffffff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', width: '100%', boxShadow: '0 4px 24px rgba(37, 99, 235, 0.45)', letterSpacing: '0.02em' },
  forgotLink: { color: '#2563eb', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  registerBtn: { padding: '15px', borderRadius: '12px', border: '2px solid #bfdbfe', background: '#fff', color: '#374151', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', transition: 'all 0.2s' },
  bizRegisterBtn: { padding: '15px', borderRadius: '12px', border: '2px solid #bfdbfe', background: '#fff', color: '#374151', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', transition: 'all 0.2s', marginTop: '10px' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' },
  dividerLine: { flex: 1, height: '1px', background: '#bfdbfe' },
  dividerText: { color: '#60a5fa', fontSize: '13px' },
  error: { color: '#dc2626', fontSize: '13px', margin: '0 0 14px 0', background: '#fff0f0', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ffd0d0' },
  terms: { color: '#94a3b8', fontSize: '12px', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 },
  link: { color: '#2563eb', cursor: 'pointer' },
};

export default Login;