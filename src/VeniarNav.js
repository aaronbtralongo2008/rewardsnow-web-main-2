import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';

const CYAN   = '#1692A2';
const LAGOON = '#0E96CD';

const NAV_LINKS = [
  { label: 'Services',     path: '/services' },
  { label: 'Veniar',       path: '/veniar' },
  { label: 'For Business', path: '/business-overview' },
  { label: 'Network',      path: '/network' },
];

const ALL_NAV_ITEMS = [
  { label: 'Services',            path: '/services' },
  { label: 'Veniar',              path: '/veniar' },
  { label: 'For Business',        path: '/business-overview' },
  { label: 'Network',             path: '/network' },
  { label: 'Merchant Dashboard',  path: '/merchant-dashboard' },
  { label: 'Customer App',        path: '/customer-app' },
  { label: 'Pricing',             path: '/pricing' },
  { label: 'Support',             path: '/support' },
];

export default function VeniarNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isDark } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeButtonRef = useRef(null);

  const logoColor = isDark ? '#3DD6E8' : CYAN;
  const activeColor = isDark ? '#3DD6E8' : LAGOON;

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Close drawer on Escape key
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Focus close button when drawer opens
  useEffect(() => {
    if (drawerOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [drawerOpen]);

  const isActive = (path) => location.pathname === path;

  const go = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  /* ── Styles ─────────────────────────────────────────────────────────── */

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    background: 'var(--vn-nav-bg)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--vn-nav-border)',
  };

  const logoWrapStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    flexShrink: 0,
  };

  const logoVStyle = {
    fontSize: '20px',
    fontWeight: 800,
    color: logoColor,
    letterSpacing: '-0.5px',
    lineHeight: 1,
  };

  const logoEniarStyle = {
    fontSize: '20px',
    fontWeight: 800,
    color: logoColor,
    letterSpacing: '-0.5px',
    lineHeight: 1,
    overflow: 'hidden',
    display: 'inline-block',
    opacity: scrolled ? 0 : 1,
    maxWidth: scrolled ? '0px' : '80px',
    transition: 'opacity 0.65s ease, max-width 0.75s cubic-bezier(0.16,1,0.3,1)',
    whiteSpace: 'nowrap',
  };

  const desktopCenterStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const desktopRightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  };

  const navLinkStyle = (path) => ({
    background: 'none',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: isActive(path) ? 600 : 500,
    color: isActive(path) ? activeColor : 'var(--vn-text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  });

  const loginBtnStyle = {
    background: 'none',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--vn-text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  };

  const joinBtnStyle = {
    background: LAGOON,
    border: 'none',
    padding: '8px 16px',
    borderRadius: '7px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  };

  const hamburgerStyle = {
    background: 'none',
    border: 'none',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const hamburgerLineStyle = {
    display: 'block',
    width: '22px',
    height: '2px',
    borderRadius: '2px',
    background: 'var(--vn-text)',
  };

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 1100,
    background: 'rgba(7,19,26,0.60)',
    opacity: drawerOpen ? 1 : 0,
    pointerEvents: drawerOpen ? 'all' : 'none',
    transition: 'opacity 0.25s ease',
  };

  const drawerStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1200,
    width: '280px',
    maxWidth: '85vw',
    background: isDark ? '#06141C' : '#FFFFFF',
    boxShadow: '-8px 0 40px rgba(7,19,26,0.28)',
    display: 'flex',
    flexDirection: 'column',
    transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
  };

  const drawerHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 20px 16px',
    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(16,24,32,0.10)'}`,
  };

  const drawerLogoStyle = {
    fontSize: '19px',
    fontWeight: 800,
    color: logoColor,
    letterSpacing: '-0.5px',
  };

  const closeBtnStyle = {
    background: 'none',
    border: 'none',
    padding: '6px',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'var(--vn-text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    lineHeight: 1,
    fontFamily: 'inherit',
  };

  const drawerBodyStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 12px 20px',
  };

  const drawerItemStyle = (path) => ({
    display: 'block',
    width: '100%',
    textAlign: 'left',
    background: isActive(path)
      ? (isDark ? 'rgba(61,214,232,0.10)' : 'rgba(0,169,200,0.07)')
      : 'none',
    border: 'none',
    padding: '11px 12px',
    borderRadius: '7px',
    fontSize: '15px',
    fontWeight: isActive(path) ? 600 : 500,
    color: isActive(path) ? activeColor : 'var(--vn-text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginBottom: '2px',
  });

  const drawerAuthStyle = {
    padding: '12px 12px 4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(16,24,32,0.10)'}`,
  };

  const drawerLoginStyle = {
    background: 'none',
    border: `1px solid ${isDark ? 'rgba(255,248,234,0.18)' : 'rgba(16,24,32,0.14)'}`,
    padding: '10px 16px',
    borderRadius: '7px',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--vn-text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'center',
  };

  const drawerJoinStyle = {
    background: LAGOON,
    border: 'none',
    padding: '10px 16px',
    borderRadius: '7px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'center',
  };

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <div
          style={logoWrapStyle}
          onClick={() => navigate('/')}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          aria-label="Veniar home"
        >
          <span style={logoVStyle}>V</span>
          <span style={logoEniarStyle}>eniar</span>
        </div>

        {/* Desktop center nav */}
        {!isMobile && (
          <div style={desktopCenterStyle}>
            {NAV_LINKS.map((item) => (
              <button
                key={item.path}
                className="vn-nav-btn"
                style={navLinkStyle(item.path)}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Desktop right actions */}
        {!isMobile && (
          <div style={desktopRightStyle}>
            <button
              className="vn-nav-btn"
              style={loginBtnStyle}
              onClick={() => navigate('/signin')}
            >
              Log in
            </button>
            <button
              className="vn-cta-primary"
              style={joinBtnStyle}
              onClick={() => navigate('/join')}
            >
              Join Veniar
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            style={hamburgerStyle}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="veniar-nav-drawer"
          >
            <span style={hamburgerLineStyle} />
            <span style={hamburgerLineStyle} />
            <span style={hamburgerLineStyle} />
          </button>
        )}
      </nav>

      {/* Mobile drawer overlay */}
      {isMobile && (
        <div
          style={overlayStyle}
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <div
          id="veniar-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={drawerStyle}
        >
          {/* Drawer header */}
          <div style={drawerHeaderStyle}>
            <span style={drawerLogoStyle}>Veniar</span>
            <button
              ref={closeButtonRef}
              style={closeBtnStyle}
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>

          {/* Drawer body */}
          <div style={drawerBodyStyle}>
            {ALL_NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                className="vn-nav-btn"
                style={drawerItemStyle(item.path)}
                onClick={() => go(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Drawer auth actions */}
          <div style={drawerAuthStyle}>
            <button
              className="vn-nav-btn"
              style={drawerLoginStyle}
              onClick={() => go('/signin')}
            >
              Log in
            </button>
            <button
              className="vn-cta-primary"
              style={drawerJoinStyle}
              onClick={() => go('/join')}
            >
              Join Veniar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
