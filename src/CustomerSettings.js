import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from './config';
import { useIsMobile } from './useIsMobile';

export default function CustomerSettings({ customer, onCustomerUpdate, onLogout }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [profile, setProfile] = useState({
    firstName: customer.firstName || '',
    lastName: customer.lastName || '',
    username: customer.username || '',
    email: customer.email || '',
    phoneNumber: customer.phoneNumber || '',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });

  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState({ text: '', type: '' });

  const headers = {
    Authorization: `Bearer ${customer.token}`,
    'Content-Type': 'application/json',
  };

  const handleProfileSave = async () => {
    if (profileSaving) return;
    if (profile.phoneNumber && !/^[0-9]{10,15}$/.test(profile.phoneNumber)) {
      setProfileMsg({ text: 'Phone must be 10–15 digits, no spaces or dashes.', type: 'error' });
      return;
    }
    setProfileSaving(true);
    setProfileMsg({ text: '', type: '' });
    try {
      const res = await fetch(`${API}/customers/${customer.customerId}`, {
        method: 'PATCH', headers,
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.error) {
        setProfileMsg({ text: data.error, type: 'error' });
      } else {
        setProfileMsg({ text: 'Profile updated.', type: 'success' });
        onCustomerUpdate({ ...customer, ...profile });
      }
    } catch {
      setProfileMsg({ text: 'Could not connect to server.', type: 'error' });
    }
    setProfileSaving(false);
  };

  const handlePasswordChange = async () => {
    if (pwSaving) return;
    if (!pw.current) { setPwMsg({ text: 'Enter your current password.', type: 'error' }); return; }
    if (pw.next.length < 8) { setPwMsg({ text: 'New password must be at least 8 characters.', type: 'error' }); return; }
    if (pw.next !== pw.confirm) { setPwMsg({ text: 'Passwords do not match.', type: 'error' }); return; }
    setPwSaving(true);
    setPwMsg({ text: '', type: '' });
    try {
      const res = await fetch(`${API}/customers/${customer.customerId}/change-password`, {
        method: 'POST', headers,
        body: JSON.stringify({ currentPassword: pw.current, newPassword: pw.next }),
      });
      const data = await res.json();
      if (data.error) {
        setPwMsg({ text: data.error, type: 'error' });
      } else {
        setPwMsg({ text: 'Password updated successfully.', type: 'success' });
        setPw({ current: '', next: '', confirm: '' });
      }
    } catch {
      setPwMsg({ text: 'Could not connect to server.', type: 'error' });
    }
    setPwSaving(false);
  };

  return (
    <div style={s.root}>
      <div style={s.orb1} />
      <div style={s.orb2} />

      <nav style={{ ...s.nav, padding: isMobile ? '0 16px' : '0 40px' }}>
        <button style={s.navBrand} onClick={() => navigate('/home')}>RewardsNow</button>
        <div style={s.navRight}>
          {!isMobile && <button style={s.navLink} onClick={() => navigate('/businesses')}>Partners</button>}
          {!isMobile && <button style={s.navLink} onClick={() => navigate('/map')}>Map</button>}
          <button style={s.navLink} onClick={() => navigate('/home')}>← Home</button>
          <button style={s.navLogout} onClick={onLogout}>Sign out</button>
        </div>
      </nav>

      <div style={{ ...s.body, padding: isMobile ? '28px 16px 60px' : '40px 24px' }}>
        <h1 style={{ ...s.pageTitle, fontSize: isMobile ? '1.7rem' : '2rem' }}>Account Settings</h1>
        <p style={s.pageSub}>Manage your profile and security preferences.</p>

        <div style={s.card}>
          <h2 style={s.cardTitle}>Profile</h2>
          <p style={s.cardSub}>Update your personal information</p>

          <div style={{ ...s.row, flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={s.half}>
              <label style={s.label}>First Name</label>
              <input style={s.input} value={profile.firstName}
                onChange={e => setProfile({ ...profile, firstName: e.target.value })}
                placeholder="First name" autoComplete="given-name" />
            </div>
            <div style={s.half}>
              <label style={s.label}>Last Name</label>
              <input style={s.input} value={profile.lastName}
                onChange={e => setProfile({ ...profile, lastName: e.target.value })}
                placeholder="Last name" autoComplete="family-name" />
            </div>
          </div>

          <label style={s.label}>Username</label>
          <input style={s.input} value={profile.username}
            onChange={e => setProfile({ ...profile, username: e.target.value })}
            placeholder="username" autoComplete="username" />

          <label style={s.label}>Email</label>
          <input style={s.input} type="email" value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
            placeholder="you@email.com" autoComplete="email" />

          <label style={s.label}>Phone Number</label>
          <input style={s.input} type="tel" value={profile.phoneNumber}
            onChange={e => setProfile({ ...profile, phoneNumber: e.target.value })}
            placeholder="10–15 digits, no spaces or dashes" autoComplete="tel-national" />

          {profileMsg.text && <Feedback msg={profileMsg} />}
          <button style={{ ...s.saveBtn, opacity: profileSaving ? 0.7 : 1 }}
            onClick={handleProfileSave} disabled={profileSaving}>
            {profileSaving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>

        <div style={s.card}>
          <h2 style={s.cardTitle}>Security</h2>
          <p style={s.cardSub}>Change your password</p>

          <label style={s.label}>Current Password</label>
          <input style={s.input} type="password" value={pw.current}
            onChange={e => setPw({ ...pw, current: e.target.value })}
            placeholder="••••••••" autoComplete="current-password" />

          <label style={s.label}>New Password</label>
          <input style={s.input} type="password" value={pw.next}
            onChange={e => setPw({ ...pw, next: e.target.value })}
            placeholder="At least 8 characters" autoComplete="new-password" />

          <label style={s.label}>Confirm New Password</label>
          <input style={s.input} type="password" value={pw.confirm}
            onChange={e => setPw({ ...pw, confirm: e.target.value })}
            placeholder="••••••••" autoComplete="new-password"
            onKeyDown={e => e.key === 'Enter' && handlePasswordChange()} />

          {pwMsg.text && <Feedback msg={pwMsg} />}
          <button style={{ ...s.saveBtn, opacity: pwSaving ? 0.7 : 1 }}
            onClick={handlePasswordChange} disabled={pwSaving}>
            {pwSaving ? 'Updating…' : 'Update Password'}
          </button>
        </div>

        <div style={{ ...s.card, borderColor: 'rgba(220,38,38,0.25)' }}>
          <h2 style={{ ...s.cardTitle, color: '#f87171' }}>Sign Out</h2>
          <p style={s.cardSub}>Sign out of your RewardsNow account on this device.</p>
          <button style={s.dangerBtn} onClick={onLogout}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

function Feedback({ msg }) {
  const err = msg.type === 'error';
  return (
    <p style={{
      fontSize: '13px', padding: '10px 14px', borderRadius: '8px', margin: '0 0 16px',
      color: err ? '#dc2626' : '#16a34a',
      background: err ? 'rgba(220,38,38,0.1)' : 'rgba(22,163,74,0.1)',
      border: `1px solid ${err ? 'rgba(220,38,38,0.3)' : 'rgba(22,163,74,0.3)'}`,
    }}>{msg.text}</p>
  );
}

const s = {
  root: { minHeight: '100vh', background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 100%)', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", position: 'relative', overflow: 'hidden' },
  orb1: { position: 'fixed', top: '-80px', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(37,99,235,0.3)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' },
  orb2: { position: 'fixed', bottom: '-60px', left: '15%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(6,182,212,0.15)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100 },
  navBrand: { color: '#f59e0b', fontSize: '15px', fontWeight: '800', letterSpacing: '-0.01em', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  navRight: { display: 'flex', alignItems: 'center', gap: '4px' },
  navLink: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: '6px 8px', borderRadius: '6px', fontFamily: 'inherit' },
  navLogout: { background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontFamily: 'inherit' },
  body: { maxWidth: '680px', margin: '0 auto', boxSizing: 'border-box', position: 'relative', zIndex: 1 },
  pageTitle: { color: '#fff', fontWeight: '900', margin: '0 0 6px', letterSpacing: '-0.03em' },
  pageSub: { color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '0 0 32px' },
  card: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '28px', marginBottom: '20px', backdropFilter: 'blur(8px)' },
  cardTitle: { color: '#fff', fontSize: '1rem', fontWeight: '700', margin: '0 0 4px', letterSpacing: '-0.01em' },
  cardSub: { color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: '0 0 24px' },
  row: { display: 'flex', gap: '12px' },
  half: { flex: 1, display: 'flex', flexDirection: 'column' },
  label: { color: '#f59e0b', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '7px' },
  input: { width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: '14px', marginBottom: '18px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
  saveBtn: { padding: '13px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,99,235,0.4)', fontFamily: 'inherit' },
  dangerBtn: { padding: '11px 22px', borderRadius: '10px', border: '1.5px solid rgba(220,38,38,0.5)', background: 'rgba(220,38,38,0.1)', color: '#f87171', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
};
