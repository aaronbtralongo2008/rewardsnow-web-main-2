import { useNavigate } from 'react-router-dom';

const COLUMNS = [
  {
    title: 'Product',
    items: [
      { label: 'Veniar',              path: '/veniar' },
      { label: 'Veniar Network',      path: '/network' },
      { label: 'Customer App',        path: '/customer-app' },
      { label: 'Merchant Dashboard',  path: '/merchant-dashboard' },
    ],
  },
  {
    title: 'Business',
    items: [
      { label: 'Veniar for Business', path: '/business-overview' },
      { label: 'Pricing',             path: '/pricing' },
      { label: 'Join Veniar',         path: '/join' },
      { label: 'Merchant Tools',      path: '/merchant-dashboard' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Support Center',      path: '/support' },
      { label: 'Contact',             path: '/contact' },
      { label: 'Account Access',      path: '/signin' },
      { label: 'Log in to Veniar',    path: '/signin' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'RewardsNow',          href: 'https://rewards-now.net', external: true },
      { label: 'Mission',             path: '/mission' },
      { label: 'Partners',            path: '/partners' },
      { label: 'News',                path: '/news' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy',             path: '/privacy' },
      { label: 'Terms',               path: '/terms' },
    ],
  },
];

export default function VeniarFooter() {
  const navigate = useNavigate();

  /* ── Styles ─────────────────────────────────────────────────────────── */

  const footerStyle = {
    background: '#07243A',
    color: '#F5F0E8',
    paddingTop: '56px',
    paddingBottom: '0',
  };

  const innerStyle = {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 24px',
  };

  const brandSectionStyle = {
    marginBottom: '40px',
  };

  const wordmarkStyle = {
    fontSize: '16px',
    fontWeight: 800,
    color: '#ffffff',
    letterSpacing: '-0.3px',
    marginBottom: '6px',
  };

  const taglineStyle = {
    fontSize: '13px',
    color: 'rgba(245,240,232,0.62)',
    marginBottom: '3px',
  };

  const productOfStyle = {
    fontSize: '12px',
    color: 'rgba(245,240,232,0.38)',
  };

  const columnsWrapStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '32px 40px',
    marginBottom: '48px',
  };

  const columnStyle = {
    minWidth: '120px',
    flex: '1 1 120px',
  };

  const columnTitleStyle = {
    fontSize: '10px',
    fontWeight: 700,
    color: '#F2B84B',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '12px',
  };

  const linkBtnStyle = {
    display: 'block',
    background: 'none',
    border: 'none',
    padding: '3px 0',
    fontSize: '13px',
    fontWeight: 400,
    color: 'rgba(245,240,232,0.58)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    marginBottom: '2px',
  };

  const externalLinkStyle = {
    display: 'block',
    padding: '3px 0',
    fontSize: '13px',
    fontWeight: 400,
    color: 'rgba(245,240,232,0.58)',
    textDecoration: 'none',
    marginBottom: '2px',
  };

  const dividerStyle = {
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    margin: '0 0 20px',
  };

  const bottomBarStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px 24px 20px',
    textAlign: 'center',
  };

  const copyrightStyle = {
    fontSize: '12px',
    color: 'rgba(245,240,232,0.32)',
  };

  const bottomLinkStyle = {
    fontSize: '12px',
    color: 'rgba(245,240,232,0.32)',
    textDecoration: 'none',
  };

  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        {/* Brand section */}
        <div style={brandSectionStyle}>
          <div style={wordmarkStyle}>Veniar</div>
          <div style={taglineStyle}>Shared rewards for local favorites.</div>
          <div style={productOfStyle}>A product of RewardsNow.</div>
        </div>

        {/* Columns */}
        <div style={columnsWrapStyle}>
          {COLUMNS.map((col) => (
            <div key={col.title} style={columnStyle}>
              <div style={columnTitleStyle}>{col.title}</div>
              {col.items.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vn-footer-link"
                    style={externalLinkStyle}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label + item.path}
                    className="vn-footer-link"
                    style={linkBtnStyle}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={dividerStyle} />
      <div style={bottomBarStyle}>
        <span style={copyrightStyle}>
          © 2026 RewardsNow. Veniar is a product of RewardsNow.
        </span>
        <a
          href="https://rewards-now.net"
          target="_blank"
          rel="noopener noreferrer"
          style={bottomLinkStyle}
        >
          rewards-now.net
        </a>
      </div>
    </footer>
  );
}
