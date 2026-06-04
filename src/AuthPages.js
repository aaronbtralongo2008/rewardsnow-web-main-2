// AuthPages.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from './config';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';

export function ForgotPassword() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email) { setError('Enter your email address'); return; }
    setError('');
    setLoading(true);
    try {
      await fetch(`${API}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {
      setError('Could not connect. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = makeStyles(isDark, isMobile);

  return (
    <div style={styles.container}>
      {/* Teal accent line at top */}
      <div className="vn-top-bar" style={{ height: '4px', background: '#25B7C8', flexShrink: 0 }} />
      <div style={styles.wrapper}>

        {!isMobile && (
          <div style={styles.leftPanel}>
            <div style={styles.leftContent}>
              <div style={styles.badge}>VENIAR</div>
              <div style={styles.goldLine} />
              <p style={styles.tagline}>Reset your<br />password.</p>
              <p style={styles.leftDesc}>We'll send a secure link to get you back into your account.</p>
              <div style={styles.stepRow}>
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>01</span>
                  <span style={styles.stepText}>Enter your account email</span>
                </div>
                <div style={styles.tealConnector} />
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>02</span>
                  <span style={styles.stepText}>Check your inbox for the reset link</span>
                </div>
                <div style={styles.tealConnector} />
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>03</span>
                  <span style={styles.stepText}>Set a new password and sign in</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isMobile && (
          <div style={styles.mobileHeader}>
            <span style={styles.mobileHeaderBrand}>Veniar</span>
            <span style={styles.mobileHeaderSub}>Reset your password</span>
          </div>
        )}

        <div style={styles.rightPanel}>
          <button style={styles.themeToggle} onClick={toggleTheme}>
            {isDark ? 'LIGHT' : 'DARK'}
          </button>

          <div style={styles.brandRow}>
            <span style={styles.brandLabel}>Veniar</span>
          </div>

          {!sent ? (
            <>
              <button style={styles.backLink} onClick={() => navigate('/signin')}>
                &larr; Back to sign in
              </button>
              <h1 className="vn-fade-up" style={styles.title}>Reset your password</h1>
              <div style={styles.goldAccentBar} />
              <p style={styles.sub}>
                Enter the email address on your account and we&apos;ll send a reset link.
              </p>
              <label style={styles.label}>Email address</label>
              <input className="vn-input" style={styles.input} type="email" autoComplete="email"
                     placeholder="you@email.com" value={email}
                     onChange={e => setEmail(e.target.value)}
                     onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              {error && <p style={styles.error}>{error}</p>}
              <button className="vn-btn" style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
                      onClick={handleSubmit} disabled={loading}>
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </>
          ) : (
            <div style={styles.success}>
              <div style={styles.successIcon}>&#10003;</div>
              <h1 className="vn-fade-up" style={styles.title}>Check your email</h1>
              <div style={styles.goldAccentBar} />
              <p style={styles.sub}>
                If an account exists for <strong>{email}</strong>, you&apos;ll receive a reset link shortly.
                Check your spam folder if you don&apos;t see it.
              </p>
              <button style={styles.btn} onClick={() => navigate('/signin')}>Back to sign in</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResetPassword() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const token = new URLSearchParams(window.location.search).get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!password || password.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (!token) { setError('Invalid or expired reset link'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setDone(true); }
    } catch {
      setError('Could not connect. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = makeStyles(isDark, isMobile);

  return (
    <div style={styles.container}>
      {/* Teal accent line at top */}
      <div className="vn-top-bar" style={{ height: '4px', background: '#25B7C8', flexShrink: 0 }} />
      <div style={styles.wrapper}>

        {!isMobile && (
          <div style={styles.leftPanel}>
            <div style={styles.leftContent}>
              <div style={styles.badge}>VENIAR</div>
              <div style={styles.goldLine} />
              <p style={styles.tagline}>Choose a new<br />password.</p>
              <p style={styles.leftDesc}>Pick something strong that you haven&apos;t used before.</p>
              <div style={styles.stepRow}>
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>01</span>
                  <span style={styles.stepText}>Enter your new password</span>
                </div>
                <div style={styles.tealConnector} />
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>02</span>
                  <span style={styles.stepText}>Confirm it matches</span>
                </div>
                <div style={styles.tealConnector} />
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>03</span>
                  <span style={styles.stepText}>Sign in with your new credentials</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isMobile && (
          <div style={styles.mobileHeader}>
            <span style={styles.mobileHeaderBrand}>Veniar</span>
            <span style={styles.mobileHeaderSub}>Set a new password</span>
          </div>
        )}

        <div style={styles.rightPanel}>
          <button style={styles.themeToggle} onClick={toggleTheme}>
            {isDark ? 'LIGHT' : 'DARK'}
          </button>

          <div style={styles.brandRow}>
            <span style={styles.brandLabel}>Veniar</span>
          </div>

          {!done ? (
            <>
              <h1 className="vn-fade-up" style={styles.title}>Choose a new password</h1>
              <div style={styles.goldAccentBar} />
              <p style={styles.sub}>Pick something strong that you haven&apos;t used before.</p>
              <label style={styles.label}>New password</label>
              <input className="vn-input" style={styles.input} type="password" autoComplete="new-password"
                     placeholder="At least 8 characters" value={password}
                     onChange={e => setPassword(e.target.value)} />
              <label style={styles.label}>Confirm new password</label>
              <input className="vn-input" style={styles.input} type="password" autoComplete="new-password"
                     placeholder="••••••••" value={confirm}
                     onChange={e => setConfirm(e.target.value)}
                     onKeyDown={e => e.key === 'Enter' && handleReset()} />
              {error && <p style={styles.error}>{error}</p>}
              <button className="vn-btn" style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
                      onClick={handleReset} disabled={loading}>
                {loading ? 'Updating password…' : 'Set new password'}
              </button>
            </>
          ) : (
            <div style={styles.success}>
              <div style={styles.successIcon}>&#10003;</div>
              <h1 className="vn-fade-up" style={styles.title}>Password updated</h1>
              <div style={styles.goldAccentBar} />
              <p style={styles.sub}>
                Your password has been changed. You can now sign in with your new password.
              </p>
              <button style={styles.btn} onClick={() => navigate('/signin')}>Sign in</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function makeStyles(isDark, isMobile) {
  return {
    container: {
      minHeight: '100vh',
      background: isDark ? '#061A2A' : '#FFF8EA',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    },
    wrapper: {
      display: 'flex',
      flex: 1,
      flexDirection: isMobile ? 'column' : 'row',
    },
    mobileHeader: {
      background: '#061A2A',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    mobileHeaderBrand: {
      color: '#F2B84B',
      fontSize: '1.4rem',
      fontWeight: '800',
    },
    mobileHeaderSub: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: '13px',
      marginTop: '4px',
    },
    leftPanel: {
      flex: 1,
      background: '#061A2A',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px',
      position: 'relative',
      overflow: 'hidden',
    },
    leftContent: {
      position: 'relative',
      zIndex: 2,
    },
    badge: {
      display: 'inline-block',
      color: '#F2B84B',
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '4px',
      marginBottom: '20px',
    },
    goldLine: {
      width: '56px',
      height: '3px',
      background: '#F2B84B',
      marginBottom: '32px',
      borderRadius: '2px',
    },
    tagline: {
      color: '#fff',
      fontSize: '3.4rem',
      fontWeight: '900',
      lineHeight: 1.06,
      margin: '0 0 20px 0',
      maxWidth: '440px',
      letterSpacing: '-0.03em',
    },
    leftDesc: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: '15px',
      lineHeight: 1.7,
      margin: 0,
      maxWidth: '360px',
    },
    stepRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginTop: '48px',
    },
    stepItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '14px',
    },
    stepNum: {
      color: '#25B7C8',
      fontWeight: '800',
      fontSize: '11px',
      letterSpacing: '0.05em',
      marginTop: '2px',
      minWidth: '20px',
    },
    stepText: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: '13px',
      lineHeight: 1.5,
    },
    tealConnector: {
      width: '2px',
      height: '16px',
      background: '#25B7C8',
      marginLeft: '9px',
      opacity: 0.4,
    },
    rightPanel: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: isDark ? '#0C2640' : '#ffffff',
      boxSizing: 'border-box',
      overflowY: 'auto',
      position: 'relative',
      width: isMobile ? '100%' : '480px',
      flex: isMobile ? '1' : 'none',
      padding: isMobile ? '32px 24px 48px' : '64px 56px',
      boxShadow: isMobile ? 'none' : '-8px 0 40px rgba(0,0,0,0.06)',
      borderLeft: isDark ? '3px solid #0B5CAD' : 'none',
      borderTop: isDark ? 'none' : '3px solid #0B5CAD',
    },
    themeToggle: {
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
    },
    brandRow: {
      marginBottom: '8px',
    },
    brandLabel: {
      color: '#1565C4',
      fontSize: '15px',
      fontWeight: '800',
      letterSpacing: '-0.01em',
    },
    backLink: {
      background: 'none',
      border: 'none',
      color: '#1565C4',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      padding: 0,
      marginBottom: '28px',
      display: 'block',
    },
    title: {
      color: isDark ? '#ffffff' : '#101820',
      fontSize: '1.7rem',
      fontWeight: '900',
      margin: '0 0 6px',
      letterSpacing: '-0.03em',
    },
    goldAccentBar: {
      width: '40px',
      height: '3px',
      background: '#F2B84B',
      borderRadius: '2px',
      margin: '0 0 16px 0',
    },
    sub: {
      color: isDark ? 'rgba(255,255,255,0.6)' : '#5F6B73',
      fontSize: '14px',
      lineHeight: 1.6,
      margin: '0 0 28px',
    },
    label: {
      display: 'block',
      color: isDark ? 'rgba(255,255,255,0.7)' : '#5F6B73',
      fontSize: '10px',
      fontWeight: '700',
      marginBottom: '7px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
      borderRadius: '10px',
      fontSize: '15px',
      color: isDark ? '#ffffff' : '#101820',
      background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
      outline: 'none',
      boxSizing: 'border-box',
      marginBottom: '20px',
    },
    error: {
      color: '#dc2626',
      fontSize: '13px',
      background: '#fff0f0',
      border: '1px solid #ffd0d0',
      borderRadius: '8px',
      padding: '10px 14px',
      margin: '0 0 16px',
    },
    btn: {
      width: '100%',
      padding: '15px',
      background: '#1565C4',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '700',
      cursor: 'pointer',
    },
    success: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '4px',
    },
    successIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: '#1565C4',
      color: '#fff',
      fontSize: '1.5rem',
      fontWeight: '800',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '12px',
    },
  };
}
