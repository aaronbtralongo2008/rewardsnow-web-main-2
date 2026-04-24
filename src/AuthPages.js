// AuthPages.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from './config';
import { useIsMobile } from './useIsMobile';

const BLUE = '#7c3aed';

export function ForgotPassword() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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

  return (
      <div style={s.root}>
        <div style={s.orb1} />
        <div style={s.orb2} />
        <div style={{ ...s.card, padding: isMobile ? '32px 24px' : '48px', maxWidth: isMobile ? '100%' : '420px', borderRadius: isMobile ? '0' : '20px', minHeight: isMobile ? '100vh' : 'auto', boxShadow: isMobile ? 'none' : '0 24px 80px rgba(0,0,0,0.45)' }}>
          <div style={s.brand}>RewardsNow</div>
          <button style={s.backLink} onClick={() => navigate('/')}>← Back to sign in</button>
          {!sent ? (
              <>
                <h1 style={s.title}>Reset your password</h1>
                <p style={s.sub}>Enter the email address on your account and we'll send a reset link.</p>
                <label style={s.label}>Email address</label>
                <input style={s.input} type="email" autoComplete="email"
                       placeholder="you@email.com" value={email}
                       onChange={e => setEmail(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
                {error && <p style={s.error}>{error}</p>}
                <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>
              </>
          ) : (
              <div style={s.success}>
                <div style={s.successIcon}>✓</div>
                <h1 style={s.title}>Check your email</h1>
                <p style={s.sub}>
                  If an account exists for <strong>{email}</strong>, you'll receive a reset link shortly.
                  Check your spam folder if you don't see it.
                </p>
                <button style={s.btn} onClick={() => navigate('/')}>Back to sign in</button>
              </div>
          )}
        </div>
      </div>
  );
}

export function ResetPassword() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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

  return (
      <div style={s.root}>
        <div style={s.orb1} />
        <div style={s.orb2} />
        <div style={{ ...s.card, padding: isMobile ? '32px 24px' : '48px', maxWidth: isMobile ? '100%' : '420px', borderRadius: isMobile ? '0' : '20px', minHeight: isMobile ? '100vh' : 'auto', boxShadow: isMobile ? 'none' : '0 24px 80px rgba(0,0,0,0.45)' }}>
          <div style={s.brand}>RewardsNow</div>
          {!done ? (
              <>
                <h1 style={s.title}>Choose a new password</h1>
                <p style={s.sub}>Pick something strong that you haven't used before.</p>
                <label style={s.label}>New password</label>
                <input style={s.input} type="password" autoComplete="new-password"
                       placeholder="At least 8 characters" value={password}
                       onChange={e => setPassword(e.target.value)} />
                <label style={s.label}>Confirm new password</label>
                <input style={s.input} type="password" autoComplete="new-password"
                       placeholder="••••••••" value={confirm}
                       onChange={e => setConfirm(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleReset()} />
                {error && <p style={s.error}>{error}</p>}
                <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} onClick={handleReset} disabled={loading}>
                  {loading ? 'Updating password…' : 'Set new password'}
                </button>
              </>
          ) : (
              <div style={s.success}>
                <div style={s.successIcon}>✓</div>
                <h1 style={s.title}>Password updated</h1>
                <p style={s.sub}>Your password has been changed. You can now sign in with your new password.</p>
                <button style={s.btn} onClick={() => navigate('/')}>Sign in</button>
              </div>
          )}
        </div>
      </div>
  );
}

const s = {
  root: { minHeight: '100vh', background: '#08011a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", padding: '24px', position: 'relative', overflow: 'hidden' },
  orb1: { position: 'absolute', top: '-100px', left: '-80px', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.5)', filter: 'blur(110px)', zIndex: 1, pointerEvents: 'none' },
  orb2: { position: 'absolute', bottom: '-80px', right: '-60px', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.25)', filter: 'blur(90px)', zIndex: 1, pointerEvents: 'none' },
  card: { background: '#faf8ff', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 2 },
  brand: { color: '#7c3aed', fontSize: '15px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.01em' },
  backLink: { background: 'none', border: 'none', color: '#a78bfa', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: 0, marginBottom: '28px', display: 'block' },
  title: { color: '#0f172a', fontSize: '1.6rem', fontWeight: '900', margin: '0 0 8px', letterSpacing: '-0.03em' },
  sub: { color: '#64748b', fontSize: '14px', lineHeight: 1.6, margin: '0 0 28px' },
  label: { display: 'block', color: '#7c3aed', fontSize: '10px', fontWeight: '700', marginBottom: '7px', letterSpacing: '2px', textTransform: 'uppercase' },
  input: { width: '100%', padding: '13px 16px', border: '2px solid #ede8fa', borderRadius: '10px', fontSize: '14px', color: '#0f172a', background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: '20px' },
  error: { color: '#dc2626', fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: '0 0 16px' },
  btn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 24px rgba(124, 58, 237, 0.45)' },
  success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' },
  successIcon: { width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff', fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(124, 58, 237, 0.45)' },
};