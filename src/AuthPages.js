// AuthPages.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from './config';
import { useIsMobile } from './useIsMobile';

const BLUE = '#2040C8';

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
        <div style={{ ...s.card, padding: isMobile ? '32px 24px' : '48px', maxWidth: isMobile ? '100%' : '400px', borderRadius: isMobile ? '0' : '16px', border: isMobile ? 'none' : '1px solid #e5e7eb', minHeight: isMobile ? '100vh' : 'auto' }}>
          <button style={s.backLink} onClick={() => navigate('/')}>← Back to sign in</button>
          <div style={s.brand}>RewardsNow</div>
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
        <div style={{ ...s.card, padding: isMobile ? '32px 24px' : '48px', maxWidth: isMobile ? '100%' : '400px', borderRadius: isMobile ? '0' : '16px', border: isMobile ? 'none' : '1px solid #e5e7eb', minHeight: isMobile ? '100vh' : 'auto' }}>
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
  root: { minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", padding: '0' },
  card: { background: '#fff', width: '100%', boxSizing: 'border-box' },
  backLink: { background: 'none', border: 'none', color: '#9ca3af', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: 0, marginBottom: '28px', display: 'block' },
  brand: { color: '#0a0a0a', fontSize: '14px', fontWeight: '700', marginBottom: '28px' },
  title: { color: '#0a0a0a', fontSize: '1.4rem', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.02em' },
  sub: { color: '#6b7280', fontSize: '14px', lineHeight: 1.6, margin: '0 0 24px' },
  label: { display: 'block', color: '#374151', fontSize: '12px', fontWeight: '600', marginBottom: '5px', letterSpacing: '0.02em' },
  input: { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', color: '#0a0a0a', background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: '14px' },
  error: { color: '#dc2626', fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: '0 0 14px' },
  btn: { width: '100%', padding: '11px', background: BLUE, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' },
  successIcon: { width: '52px', height: '52px', borderRadius: '50%', background: '#f0fdf4', color: '#16a34a', fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' },
};