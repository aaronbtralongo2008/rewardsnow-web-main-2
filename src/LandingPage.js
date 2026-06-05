import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';
import FadeInBoth from './FadeInBoth';
import { useIsMobile } from './useIsMobile';

/* ── Brand palette ────────────────────────────────────────────────────── */
const CYAN    = '#1692A2';
const LAGOON  = '#0E96CD';
const DEEP    = '#06445E';
const NIGHT   = '#07131A';
const YELLOW  = '#F8C922';
const ORANGE  = '#E86F2E';
const MUTED   = '#5F6B73';

/* ── DashboardMock ────────────────────────────────────────────────────── */
function DashboardMock() {
  const txRows = [
    { sign: '+', pts: '120 pts', label: 'Café Sunrise',   color: CYAN   },
    { sign: '−', pts: '80 pts',  label: 'The Taco Stand', color: ORANGE },
    { sign: '+', pts: '200 pts', label: 'Corner Bakery',  color: CYAN   },
  ];

  return (
    <div
      className="vn-dash-card"
      style={{
        position:     'relative',
        background:   NIGHT,
        borderRadius: 20,
        padding:      '32px 28px',
        maxWidth:     400,
        width:        '100%',
        boxShadow:    '0 32px 80px rgba(22,146,162,0.12), 0 8px 24px rgba(7,19,26,0.28)',
        overflow:     'hidden',
      }}
    >
      {/* Top cyan accent band */}
      <div style={{
        position:     'absolute',
        top:          0,
        left:         0,
        right:        0,
        height:       4,
        background:   CYAN,
        borderRadius: '16px 16px 0 0',
      }} />

      {/* Balance label */}
      <div style={{
        fontSize:      10,
        fontWeight:    700,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color:         YELLOW,
        marginBottom:  10,
      }}>
        YOUR VENIAR BALANCE
      </div>

      {/* Balance number */}
      <div style={{
        fontSize:      '3.2rem',
        fontWeight:    900,
        color:         '#fff',
        letterSpacing: '-0.04em',
        lineHeight:    1,
      }}>
        1,240<span style={{ fontSize: 18, fontWeight: 600, color: CYAN }}> pts</span>
      </div>

      {/* Available text */}
      <div style={{
        fontSize:     12,
        color:        'rgba(255,248,234,0.45)',
        marginTop:    6,
        marginBottom: 24,
      }}>
        Available at any partner
      </div>

      {/* Divider */}
      <div style={{
        height:       1,
        background:   'rgba(255,255,255,0.07)',
        marginBottom: 20,
      }} />

      {/* Transaction rows */}
      {txRows.map((tx, i) => (
        <div
          key={i}
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          12,
            marginBottom: 10,
          }}
        >
          <div style={{
            width:        7,
            height:       7,
            borderRadius: '50%',
            background:   tx.color,
            flexShrink:   0,
          }} />
          <div style={{
            fontSize: 13,
            color:    'rgba(255,248,234,0.75)',
            flex:     1,
          }}>
            {tx.label}
          </div>
          <div style={{
            fontSize:   13,
            fontWeight: 600,
            color:      tx.color,
          }}>
            {tx.sign} {tx.pts}
          </div>
        </div>
      ))}

      {/* Route line */}
      <div
        className="vn-route-line"
        style={{
          height:       2,
          background:   CYAN,
          borderRadius: 1,
          marginTop:    20,
        }}
      />
    </div>
  );
}

/* ── StepItem ─────────────────────────────────────────────────────────── */
function StepItem({ num, title, body, delay }) {
  return (
    <FadeInBoth delay={delay}>
      <div style={{ flex: '1 1 0', minWidth: 0 }}>
        <div style={{
          fontSize:      '3.5rem',
          fontWeight:    900,
          color:         CYAN,
          lineHeight:    1,
          marginBottom:  14,
          letterSpacing: '-0.04em',
        }}>
          {num}
        </div>
        <div style={{
          fontSize:     17,
          fontWeight:   700,
          color:        'var(--vn-text)',
          marginBottom: 10,
        }}>
          {title}
        </div>
        <div style={{
          fontSize:   14,
          color:      MUTED,
          lineHeight: 1.7,
        }}>
          {body}
        </div>
      </div>
    </FadeInBoth>
  );
}

/* ── ServiceCard ──────────────────────────────────────────────────────── */
function ServiceCard({ title, body, delay }) {
  return (
    <FadeInBoth delay={delay}>
      <div
        className="vn-card"
        style={{
          background:   'var(--vn-card)',
          border:       '1px solid var(--vn-card-border)',
          borderLeft:   `3px solid ${CYAN}`,
          borderRadius: 14,
          padding:      '28px 24px',
          height:       '100%',
        }}
      >
        <div style={{
          fontSize:      16,
          fontWeight:    700,
          color:         'var(--vn-text)',
          marginBottom:  10,
          letterSpacing: '-0.01em',
        }}>
          {title}
        </div>
        <div style={{
          fontSize:   14,
          color:      'var(--vn-text-sub)',
          lineHeight: 1.65,
        }}>
          {body}
        </div>
      </div>
    </FadeInBoth>
  );
}

/* ── LandingPage (main export) ────────────────────────────────────────── */
export default function LandingPage() {
  const navigate  = useNavigate();
  const isMobile  = useIsMobile();
  const { isDark } = useTheme();

  useEffect(() => {
    document.title = 'Veniar | Shared Rewards for Local Businesses';
    window.scrollTo(0, 0);
  }, []);

  const CONTENT_MAX = 1040;
  const inner = { maxWidth: CONTENT_MAX, margin: '0 auto' };

  /* ── SECTION 1 — HERO ─────────────────────────────────────────────── */
  const heroSection = (
    <section
      style={{
        minHeight:     '100vh',
        background:    'var(--vn-bg)',
        paddingTop:    isMobile ? 100 : 64,
        paddingBottom: isMobile ? 60  : 80,
        paddingLeft:   isMobile ? 24  : '8%',
        paddingRight:  isMobile ? 24  : '8%',
        display:       'flex',
        alignItems:    'center',
      }}
    >
      <div style={{ ...inner, width: '100%' }}>
        <div style={{
          display:       'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems:    isMobile ? 'flex-start' : 'center',
          gap:           isMobile ? 52 : 72,
        }}>

          {/* Left: text */}
          <div style={{ flex: '1 1 400px', maxWidth: 560 }}>
            <FadeInBoth>
              {/* Eyebrow */}
              <div style={{
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color:         YELLOW,
                marginBottom:  16,
              }}>
                SHARED REWARDS PLATFORM
              </div>

              {/* H1 */}
              <h1 style={{
                fontSize:      isMobile ? '3.2rem' : '6rem',
                fontWeight:    900,
                letterSpacing: '-0.05em',
                lineHeight:    0.95,
                color:         'var(--vn-text)',
                margin:        0,
              }}>
                One card.<br />Every business.
              </h1>

              {/* Subheadline */}
              <p style={{
                fontSize:     isMobile ? 17 : 20,
                color:        'var(--vn-text-sub)',
                lineHeight:   1.7,
                maxWidth:     460,
                marginBottom: 40,
                marginTop:    28,
              }}>
                Earn <em>Veniar</em> Points at independent local businesses.
                Redeem them anywhere in the network.
              </p>

              {/* CTA row */}
              <div style={{
                display:    'flex',
                flexWrap:   'wrap',
                gap:        12,
                alignItems: 'center',
              }}>
                <button
                  className="vn-cta-primary"
                  style={{
                    background:   LAGOON,
                    color:        '#fff',
                    border:       'none',
                    padding:      '14px 28px',
                    borderRadius: 9,
                    fontSize:     15,
                    fontWeight:   700,
                    cursor:       'pointer',
                    fontFamily:   'inherit',
                  }}
                  onClick={() => navigate('/join')}
                >
                  Join Veniar
                </button>
                <button
                  className="vn-cta-ghost"
                  style={{
                    background:   'transparent',
                    color:        'var(--vn-text)',
                    border:       '1.5px solid var(--vn-card-border)',
                    padding:      '14px 28px',
                    borderRadius: 9,
                    fontSize:     15,
                    fontWeight:   700,
                    cursor:       'pointer',
                    fontFamily:   'inherit',
                  }}
                  onClick={() => navigate('/business-overview')}
                >
                  For businesses
                </button>
              </div>
            </FadeInBoth>
          </div>

          {/* Right: Dashboard mock */}
          <div style={{
            flex:           '0 0 auto',
            display:        'flex',
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
            width:          isMobile ? '100%' : 'auto',
          }}>
            <DashboardMock />
          </div>

        </div>
      </div>
    </section>
  );

  /* ── SECTION 2 — HOW IT WORKS ─────────────────────────────────────── */
  const howSection = (
    <section style={{
      background:    'var(--vn-section-alt)',
      paddingTop:    isMobile ? 80  : 120,
      paddingBottom: isMobile ? 80  : 120,
      paddingLeft:   isMobile ? 24  : '8%',
      paddingRight:  isMobile ? 24  : '8%',
    }}>
      <div style={inner}>
        <FadeInBoth>
          {/* Eyebrow */}
          <div style={{
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         YELLOW,
            marginBottom:  16,
          }}>
            HOW IT WORKS
          </div>

          {/* H2 */}
          <h2 style={{
            fontSize:      isMobile ? '2.4rem' : '3.2rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            lineHeight:    1.08,
            color:         'var(--vn-text)',
            margin:        0,
          }}>
            Simple by design.
          </h2>

          {/* Gold accent bar */}
          <div style={{
            width:        44,
            height:       3,
            background:   YELLOW,
            borderRadius: 2,
            margin:       '20px 0 36px',
          }} />
        </FadeInBoth>

        {/* Step items row */}
        <div style={{
          display:       'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap:           isMobile ? 48 : 0,
          alignItems:    isMobile ? 'stretch' : 'flex-start',
        }}>
          <StepItem
            num="01"
            title="Visit any partner"
            body={<>Give your phone number at checkout at any <em>Veniar</em> partner location.</>}
            delay={0}
          />

          {/* Vertical divider — desktop only */}
          {!isMobile && (
            <div style={{
              width:          1,
              background:     'rgba(22,146,162,0.25)',
              height:         60,
              alignSelf:      'center',
              flexShrink:     0,
              margin:         '0 40px',
            }} />
          )}

          <StepItem
            num="02"
            title="Earn points"
            body={<>Points are added to your <em>Veniar</em> balance instantly. No card needed.</>}
            delay={120}
          />

          {/* Vertical divider — desktop only */}
          {!isMobile && (
            <div style={{
              width:      1,
              background: 'rgba(22,146,162,0.25)',
              height:     60,
              alignSelf:  'center',
              flexShrink: 0,
              margin:     '0 40px',
            }} />
          )}

          <StepItem
            num="03"
            title="Redeem anywhere"
            body="Spend at any partner in the network, not just where you earned."
            delay={240}
          />
        </div>
      </div>
    </section>
  );

  /* ── SECTION 3 — FOR BUSINESS ─────────────────────────────────────── */
  const businessBg = isDark ? NIGHT : DEEP;

  const businessSection = (
    <section style={{
      background:    businessBg,
      paddingTop:    isMobile ? 80  : 120,
      paddingBottom: isMobile ? 80  : 120,
      paddingLeft:   isMobile ? 24  : '8%',
      paddingRight:  isMobile ? 24  : '8%',
    }}>
      <div style={inner}>
        <FadeInBoth>
          {/* Eyebrow */}
          <div style={{
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         YELLOW,
            marginBottom:  16,
          }}>
            FOR BUSINESSES
          </div>

          {/* H2 */}
          <h2 style={{
            fontSize:      isMobile ? '2.4rem' : '3.2rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            lineHeight:    1.08,
            color:         '#FFF8EA',
            margin:        0,
          }}>
            Give your customers a reason to return.
          </h2>

          {/* Gold accent bar */}
          <div style={{
            width:        44,
            height:       3,
            background:   YELLOW,
            borderRadius: 2,
            margin:       '20px 0 36px',
          }} />

          {/* Body */}
          <p style={{
            fontSize:     isMobile ? 16 : 18,
            color:        'rgba(255,248,234,0.68)',
            lineHeight:   1.75,
            maxWidth:     560,
            marginBottom: 44,
          }}>
            Join the <em>Veniar</em> network and offer your customers a shared
            rewards program that works across the entire city.
          </p>

          {/* CTAs */}
          <div style={{
            display:    'flex',
            flexWrap:   'wrap',
            gap:        12,
            alignItems: 'center',
          }}>
            <button
              className="vn-cta-primary"
              style={{
                background:   CYAN,
                color:        NIGHT,
                border:       'none',
                padding:      '14px 28px',
                borderRadius: 9,
                fontSize:     15,
                fontWeight:   700,
                cursor:       'pointer',
                fontFamily:   'inherit',
              }}
              onClick={() => navigate('/business-overview')}
            >
              Apply to partner
            </button>
            <button
              className="vn-cta-ghost"
              style={{
                background:   'transparent',
                color:        'rgba(255,248,234,0.80)',
                border:       '1.5px solid rgba(255,248,234,0.24)',
                padding:      '14px 28px',
                borderRadius: 9,
                fontSize:     15,
                fontWeight:   700,
                cursor:       'pointer',
                fontFamily:   'inherit',
              }}
              onClick={() => navigate('/veniar')}
            >
              Learn more →
            </button>
          </div>
        </FadeInBoth>
      </div>
    </section>
  );

  /* ── SECTION 4 — SERVICES ─────────────────────────────────────────── */
  const servicesSection = (
    <section style={{
      background:    'var(--vn-bg)',
      paddingTop:    isMobile ? 80  : 120,
      paddingBottom: isMobile ? 80  : 120,
      paddingLeft:   isMobile ? 24  : '8%',
      paddingRight:  isMobile ? 24  : '8%',
    }}>
      <div style={inner}>
        <FadeInBoth>
          {/* Eyebrow */}
          <div style={{
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         YELLOW,
            marginBottom:  16,
          }}>
            SERVICES
          </div>

          {/* H2 */}
          <h2 style={{
            fontSize:      isMobile ? '2.4rem' : '3.2rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            lineHeight:    1.08,
            color:         'var(--vn-text)',
            margin:        0,
          }}>
            What Veniar offers.
          </h2>

          {/* Gold accent bar */}
          <div style={{
            width:        44,
            height:       3,
            background:   YELLOW,
            borderRadius: 2,
            margin:       '20px 0 36px',
          }} />
        </FadeInBoth>

        {/* 2-col grid */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:                 16,
        }}>
          <ServiceCard
            title="Shared Points Network"
            body="Customers earn at any partner and spend anywhere in the network."
            delay={0}
          />
          <ServiceCard
            title="Merchant Dashboard"
            body="Real-time activity, redemption management, and staff tools."
            delay={80}
          />
          <ServiceCard
            title="Customer App"
            body="Balance, transaction history, and partner locations in one place."
            delay={160}
          />
          <ServiceCard
            title="Onboarding & Support"
            body="RewardsNow handles setup and ongoing support for every partner."
            delay={240}
          />
        </div>

        {/* Text link below */}
        <div style={{ marginTop: 36 }}>
          <FadeInBoth delay={280}>
            <button
              style={{
                background:  'none',
                border:      'none',
                padding:     0,
                fontSize:    15,
                fontWeight:  600,
                color:       LAGOON,
                cursor:      'pointer',
                fontFamily:  'inherit',
              }}
              onClick={() => navigate('/services')}
            >
              See all services →
            </button>
          </FadeInBoth>
        </div>
      </div>
    </section>
  );

  /* ── SECTION 5 — TRUST / LEGAL ────────────────────────────────────── */
  const trustSection = (
    <section style={{
      background:    'var(--vn-section-alt)',
      paddingTop:    isMobile ? 56 : 72,
      paddingBottom: isMobile ? 56 : 72,
      paddingLeft:   isMobile ? 24 : '8%',
      paddingRight:  isMobile ? 24 : '8%',
    }}>
      <div style={inner}>
        <FadeInBoth>
          <p style={{
            fontSize:   13,
            color:      'var(--vn-text-muted)',
            lineHeight: 1.7,
            textAlign:  'center',
            maxWidth:   480,
            margin:     '0 auto',
          }}>
            <em>Veniar</em> Points are a loyalty program. They are not cash,
            currency, or stored value. They cannot be transferred or exchanged
            for money. Subject to program terms.
          </p>
        </FadeInBoth>
      </div>
    </section>
  );

  /* ── SECTION 6 — FINAL CTA ────────────────────────────────────────── */
  const finalCtaSection = (
    <section style={{
      background:    'var(--vn-bg)',
      paddingTop:    isMobile ? 80  : 120,
      paddingBottom: isMobile ? 80  : 120,
      paddingLeft:   isMobile ? 24  : '8%',
      paddingRight:  isMobile ? 24  : '8%',
      textAlign:     'center',
    }}>
      <div style={inner}>
        <FadeInBoth>
          <h2 style={{
            fontSize:      isMobile ? '2.6rem' : '4rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            lineHeight:    1.08,
            color:         'var(--vn-text)',
            margin:        0,
          }}>
            Join the Veniar network.
          </h2>

          <p style={{
            fontSize:     isMobile ? 16 : 18,
            color:        'var(--vn-text-sub)',
            lineHeight:   1.75,
            marginBottom: 44,
            marginTop:    24,
          }}>
            Free for customers. Built for local commerce.
          </p>

          <div style={{
            display:        'flex',
            flexWrap:       'wrap',
            gap:            12,
            justifyContent: 'center',
            alignItems:     'center',
          }}>
            <button
              className="vn-cta-primary"
              style={{
                background:   LAGOON,
                color:        '#fff',
                border:       'none',
                padding:      '14px 28px',
                borderRadius: 9,
                fontSize:     15,
                fontWeight:   700,
                cursor:       'pointer',
                fontFamily:   'inherit',
              }}
              onClick={() => navigate('/register')}
            >
              Create account
            </button>
            <button
              className="vn-cta-ghost"
              style={{
                background:   'transparent',
                color:        'var(--vn-text)',
                border:       '1.5px solid var(--vn-card-border)',
                padding:      '14px 28px',
                borderRadius: 9,
                fontSize:     15,
                fontWeight:   700,
                cursor:       'pointer',
                fontFamily:   'inherit',
              }}
              onClick={() => navigate('/business-overview')}
            >
              I own a business
            </button>
          </div>
        </FadeInBoth>
      </div>
    </section>
  );

  /* ── Render ───────────────────────────────────────────────────────── */
  return (
    <div style={{ background: 'var(--vn-bg)', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <VeniarNav />
      {heroSection}
      {howSection}
      {businessSection}
      {servicesSection}
      {trustSection}
      {finalCtaSection}
      <VeniarFooter />
    </div>
  );
}
