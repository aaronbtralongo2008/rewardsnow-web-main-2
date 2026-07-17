import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';
import { API } from './config';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark } = useTheme();
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
                <span style={{fontStyle:'italic', fontWeight:800, fontSize:'1.4rem', color:'#1692A2', letterSpacing:'-0.03em', cursor:'pointer'}} onClick={() => navigate('/')}>Veniar</span>
                <span style={styles.mobileHeaderSub}>Earn rewards everywhere</span>
              </div>
          ) : (
              <div style={{
                ...styles.leftPanel,
                background: isDark ? '#0A1211' : 'var(--vn-section-alt, #F5F5F4)',
              }}>
              <div style={styles.leftContent}>
                  <span style={{fontStyle:'italic', fontWeight:800, fontSize:'1.4rem', color: isDark ? '#FFF8EA' : '#1692A2', letterSpacing:'-0.03em', cursor:'pointer', display:'block', marginBottom:'20px'}} onClick={() => navigate('/')}>Veniar</span>
                  <div style={styles.goldLine} />
                  <p style={{ ...styles.tagline, color: isDark ? '#FFF8EA' : 'var(--vn-text)' }}>Earn rewards while supporting local businesses.</p>
                  <p style={{ ...styles.leftDesc, color: isDark ? 'rgba(255,248,234,0.65)' : 'var(--vn-text-sub)' }}>Discover participating restaurants, cafés, shops, and local services. Earn and redeem rewards across the <em>Veniar</em> Network.</p>
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
            <p style={styles.brandSub}>Sign in to your Veniar account</p>
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
  container: { minHeight: '100vh', background: 'var(--vn-bg, #FFF8EA)', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' },
  loginWrapper: { display: 'flex', flex: 1, minHeight: 0 },
  mobileHeader: { background: 'var(--vn-bg, #FFF8EA)', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mobileHeaderSub: { color: 'var(--vn-text-sub, #5F6B73)', fontSize: '13px', marginTop: '4px' },
  leftPanel: { flex: 1, background: '#0A1211', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', position: 'relative', overflow: 'hidden' },
  leftContent: { position: 'relative', zIndex: 2 },
  goldLine: { width: '48px', height: '3px', background: '#F2B84B', marginBottom: '32px', borderRadius: '2px' },
  tagline: { color: '#FFF8EA', fontSize: '3.6rem', fontWeight: '900', lineHeight: 1.06, margin: '0 0 20px 0', maxWidth: '440px', letterSpacing: '-0.03em' },
  leftDesc: { color: 'rgba(255,248,234,0.65)', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '360px' },
  rightPanel: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--vn-card, #FFFFFF)', boxSizing: 'border-box' },
  brandName: { color: 'var(--vn-text)', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.03em' },
  brandSub: { color: 'var(--vn-text-sub)', fontSize: '1rem', margin: '0 0 36px 0' },
  inputLabel: { color: 'var(--vn-text-sub)', fontSize: '10px', fontWeight: '700', marginBottom: '7px', display: 'block', letterSpacing: '2px', textTransform: 'uppercase' },
  input: { padding: '14px 16px', borderRadius: '10px', border: '2px solid var(--vn-card-border, rgba(16,24,32,0.14))', background: 'var(--vn-bg, #FFF8EA)', color: 'var(--vn-text)', fontSize: '15px', marginBottom: '20px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  loginBtn: { padding: '16px', borderRadius: '10px', border: 'none', background: '#0E96CD', color: '#ffffff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', width: '100%', letterSpacing: '0.01em' },
  forgotLink: { color: '#0E96CD', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  registerBtn: { padding: '15px', borderRadius: '12px', border: '2px solid var(--vn-card-border, rgba(16,24,32,0.18))', background: 'transparent', color: 'var(--vn-text)', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  bizRegisterBtn: { padding: '15px', borderRadius: '12px', border: '2px solid var(--vn-card-border, rgba(16,24,32,0.18))', background: 'transparent', color: 'var(--vn-text)', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', marginTop: '10px' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' },
  dividerLine: { flex: 1, height: '1px', background: 'var(--vn-card-border, rgba(16,24,32,0.12))' },
  dividerText: { color: 'var(--vn-text-sub)', fontSize: '13px' },
  error: { color: '#dc2626', fontSize: '13px', margin: '0 0 14px 0', background: '#fff0f0', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ffd0d0' },
  terms: { color: 'var(--vn-text-sub)', fontSize: '12px', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 },
  link: { color: '#0E96CD', cursor: 'pointer' },
};

export default Login;
