import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { API } from './config';

const GOLD = 'linear-gradient(135deg, #C9A84C 0%, #E8D48B 40%, #C9A84C 60%, #A67C2E 100%)';
const ROYAL = '#2040C8';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
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
                <span style={styles.mobileHeaderBrand}>RewardsNow</span>
                <span style={styles.mobileHeaderSub}>Earn rewards everywhere</span>
              </div>
          ) : (
              <div style={styles.leftPanel}>
                <div style={styles.leftContent}>
                  <div style={styles.badge}>REWARDSNOW</div>
                  <div style={styles.goldLine} />
                  <p style={styles.tagline}>One card. Every business.</p>
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
            <h1 style={{ ...styles.brandName, fontSize: isMobile ? '1.8rem' : '2.2rem' }}>RewardsNow</h1>
            <p style={styles.brandSub}>Sign in to your account</p>
            <label style={styles.inputLabel}>Email address</label>
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
              {loading ? 'Signing in...' : 'Log In'}
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
            <button style={styles.bizRegisterBtn} onClick={() => navigate('/business-register')}>
              Register a Business
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
  container: { minHeight: '100vh', background: '#F4F6FB', fontFamily: "'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column' },
  loginWrapper: { display: 'flex', flex: 1, minHeight: 0 },
  mobileHeader: { background: 'linear-gradient(145deg, #152a9e 0%, #1e35b5 100%)', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mobileHeaderBrand: { color: '#fff', fontSize: '1.4rem', fontWeight: '800' },
  mobileHeaderSub: { color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' },
  leftPanel: { flex: 1, background: 'linear-gradient(145deg, #152a9e 0%, #1e35b5 50%, #172fa8 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px' },
  leftContent: { position: 'relative', zIndex: 2 },
  badge: { display: 'inline-block', backgroundImage: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '13px', fontWeight: '800', letterSpacing: '4px', marginBottom: '16px' },
  goldLine: { width: '83%', height: '2px', background: GOLD, marginBottom: '28px', borderRadius: '2px' },
  tagline: { backgroundImage: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2.8rem', fontWeight: '800', lineHeight: 1.2, margin: '0 0 16px 0', maxWidth: '440px' },
  rightPanel: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#ffffff', boxSizing: 'border-box' },
  brandName: { color: ROYAL, fontWeight: '800', margin: '0 0 6px 0' },
  brandSub: { color: '#888', fontSize: '1rem', margin: '0 0 36px 0' },
  inputLabel: { color: '#444', fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block', letterSpacing: '0.3px' },
  input: { padding: '14px 16px', borderRadius: '10px', border: '1.5px solid #e0e0e0', background: '#fafafa', color: '#111', fontSize: '15px', marginBottom: '20px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  loginBtn: { padding: '15px', borderRadius: '10px', border: 'none', background: ROYAL, color: '#ffffff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', width: '100%', transition: 'background 0.2s' },
  forgotLink: { color: ROYAL, fontSize: '13px', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' },
  registerBtn: { padding: '15px', borderRadius: '10px', border: '1.5px solid #d0d0d0', background: 'transparent', color: '#555', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', transition: 'all 0.2s' },
  bizRegisterBtn: { padding: '15px', borderRadius: '10px', border: '1.5px solid #d0d0d0', background: 'transparent', color: '#555', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', transition: 'all 0.2s', marginTop: '8px' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' },
  dividerLine: { flex: 1, height: '1px', background: '#eee' },
  dividerText: { color: '#bbb', fontSize: '13px' },
  error: { color: '#e03434', fontSize: '13px', margin: '0 0 14px 0', background: '#fff0f0', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ffd0d0' },
  terms: { color: '#aaa', fontSize: '12px', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 },
  link: { color: ROYAL, cursor: 'pointer', textDecoration: 'underline' },
};

export default Login;