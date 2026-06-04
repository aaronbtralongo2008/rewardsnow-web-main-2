import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';
import FadeInBoth from './FadeInBoth';
import { useIsMobile } from './useIsMobile';

/* ── Brand palette ────────────────────────────────────────────────────── */
const BLUE   = '#0B5CAD';
const NAVY   = '#07243A';
const GOLD   = '#F2B84B';
const TEAL   = '#25B7C8';
const ORANGE = '#E86F2E';
const MUTED  = '#5F6B73';

/* ── Layout helpers ──────────────────────────────────────────────────── */
const CONTENT_MAX = 1080;

function sectionPad(isMobile) {
  return {
    paddingTop:    isMobile ? 60 : 80,
    paddingBottom: isMobile ? 60 : 80,
    paddingLeft:   isMobile ? 24 : '5%',
    paddingRight:  isMobile ? 24 : '5%',
  };
}

function inner() {
  return { maxWidth: CONTENT_MAX, margin: '0 auto' };
}

/* ── Eyebrow label ───────────────────────────────────────────────────── */
function Eyebrow({ children }) {
  return (
    <div style={{
      fontSize:      11,
      fontWeight:    700,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color:         GOLD,
      marginBottom:  14,
    }}>
      {children}
    </div>
  );
}

/* ── Gold accent bar ─────────────────────────────────────────────────── */
function AccentBar() {
  return (
    <div style={{
      width:        48,
      height:       3,
      background:   GOLD,
      borderRadius: 2,
      marginTop:    16,
      marginBottom: 40,
    }} />
  );
}

/* ── DashboardMock ────────────────────────────────────────────────────── */
function DashboardMock() {
  const txRows = [
    { sign: '+', pts: '120 pts', label: 'Café Sunrise',   color: TEAL   },
    { sign: '−', pts: '80 pts',  label: 'The Taco Stand', color: ORANGE },
    { sign: '+', pts: '200 pts', label: 'Corner Bakery',  color: TEAL   },
  ];

  return (
    <div
      className="vn-dash-card"
      style={{
        background:   NAVY,
        borderRadius: 16,
        padding:      '24px 28px',
        maxWidth:     380,
        width:        '100%',
        boxShadow:    '0 24px 64px rgba(7,36,58,0.28)',
      }}
    >
      {/* Balance label */}
      <div style={{
        fontSize:      11,
        fontWeight:    700,
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color:         GOLD,
        marginBottom:  8,
      }}>
        Your Veniar Balance
      </div>

      {/* Balance number */}
      <div style={{
        fontSize:      '2.8rem',
        fontWeight:    900,
        color:         '#ffffff',
        letterSpacing: '-0.03em',
        lineHeight:    1.05,
        marginBottom:  6,
      }}>
        1,240 pts
      </div>

      {/* Sub-label */}
      <div style={{
        fontSize:     13,
        color:        'rgba(245,240,232,0.52)',
        marginBottom: 24,
      }}>
        Available to spend at any partner
      </div>

      {/* Divider */}
      <div style={{
        height:       1,
        background:   'rgba(255,255,255,0.08)',
        marginBottom: 18,
      }} />

      {/* Transaction rows */}
      {txRows.map((tx, i) => (
        <div
          key={i}
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          10,
            marginBottom: i < txRows.length - 1 ? 12 : 0,
          }}
        >
          {/* Dot */}
          <div style={{
            width:        8,
            height:       8,
            borderRadius: '50%',
            background:   tx.color,
            flexShrink:   0,
          }} />
          {/* Label */}
          <div style={{
            flex:     1,
            fontSize: 13,
            color:    'rgba(245,240,232,0.78)',
          }}>
            {tx.label}
          </div>
          {/* Amount */}
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
          background:   TEAL,
          borderRadius: 1,
          marginTop:    20,
        }}
      />
    </div>
  );
}

/* ── StepCard ─────────────────────────────────────────────────────────── */
function StepCard({ num, title, body, delay }) {
  return (
    <FadeInBoth delay={delay}>
      <div
        className="vn-card"
        style={{
          flex:         '1 1 220px',
          background:   'var(--rn-card-bg)',
          border:       '1px solid var(--rn-card-border)',
          borderRadius: 14,
          padding:      '28px 24px',
          height:       '100%',
        }}
      >
        <div style={{
          fontSize:     '2.5rem',
          fontWeight:   900,
          color:        TEAL,
          lineHeight:   1,
          marginBottom: 14,
        }}>
          {num}
        </div>
        <div style={{
          fontSize:     15,
          fontWeight:   700,
          color:        'var(--rn-text)',
          marginBottom: 10,
        }}>
          {title}
        </div>
        <div style={{
          fontSize:   14,
          color:      MUTED,
          lineHeight: 1.65,
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
          background:   'var(--rn-card-bg)',
          border:       '1px solid var(--rn-card-border)',
          borderRadius: 14,
          padding:      24,
          height:       '100%',
        }}
      >
        <div style={{
          fontSize:     15,
          fontWeight:   700,
          color:        'var(--rn-text)',
          marginBottom: 8,
        }}>
          {title}
        </div>
        <div style={{
          fontSize:   13,
          color:      'var(--rn-text-sub)',
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
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Veniar | Shared Rewards for Local Businesses';
    window.scrollTo(0, 0);
  }, []);

  /* ── Shared button styles ──────────────────────────────────────────── */
  const primaryBtn = {
    background:    BLUE,
    color:         '#fff',
    border:        'none',
    padding:       '14px 28px',
    borderRadius:  10,
    fontSize:      15,
    fontWeight:    700,
    cursor:        'pointer',
    fontFamily:    'inherit',
    letterSpacing: '-0.01em',
  };

  const ghostBtn = {
    background:    'transparent',
    color:         'var(--rn-ghost-color)',
    border:        '1.5px solid var(--rn-ghost-border)',
    padding:       '14px 28px',
    borderRadius:  10,
    fontSize:      15,
    fontWeight:    700,
    cursor:        'pointer',
    fontFamily:    'inherit',
    letterSpacing: '-0.01em',
  };

  const lightGhostBtn = {
    background:    'transparent',
    color:         'rgba(245,240,232,0.85)',
    border:        '1.5px solid rgba(245,240,232,0.28)',
    padding:       '14px 28px',
    borderRadius:  10,
    fontSize:      15,
    fontWeight:    700,
    cursor:        'pointer',
    fontFamily:    'inherit',
    letterSpacing: '-0.01em',
  };

  /* ── SECTION 1 — HERO ─────────────────────────────────────────────── */
  const heroSection = (
    <section
      style={{
        minHeight:     '100vh',
        paddingTop:    64,
        display:       'flex',
        alignItems:    'center',
        background:    'var(--rn-bg)',
        paddingLeft:   isMobile ? 24 : '5%',
        paddingRight:  isMobile ? 24 : '5%',
        paddingBottom: isMobile ? 48 : 0,
      }}
    >
      <div style={{ ...inner(), width: '100%' }}>
        <div style={{
          display:       'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems:    isMobile ? 'flex-start' : 'center',
          gap:           isMobile ? 48 : 64,
          paddingTop:    isMobile ? 40 : 0,
        }}>

          {/* Left: text */}
          <div style={{ flex: '1 1 400px', maxWidth: 560 }}>
            {/* Eyebrow */}
            <div style={{
              display:    'inline-flex',
              alignItems: 'center',
              gap:        8,
              marginBottom: 20,
            }}>
              <div style={{
                width:        6,
                height:       6,
                borderRadius: '50%',
                background:   GOLD,
                flexShrink:   0,
              }} />
              <span style={{
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color:         GOLD,
              }}>
                Shared Rewards Network
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontSize:      isMobile ? '3rem' : '5rem',
              fontWeight:    900,
              letterSpacing: '-0.04em',
              lineHeight:    1.0,
              color:         'var(--rn-text)',
              marginBottom:  28,
            }}>
              One card.<br />Every business.
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize:     isMobile ? 16 : 19,
              color:        'var(--rn-text-sub)',
              maxWidth:     520,
              lineHeight:   1.7,
              marginBottom: 36,
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
                style={primaryBtn}
                onClick={() => navigate('/join')}
              >
                Join Veniar
              </button>
              <button
                className="vn-cta-ghost"
                style={ghostBtn}
                onClick={() => navigate('/business-overview')}
              >
                For businesses
              </button>
            </div>
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
      background: 'var(--rn-section-alt)',
      ...sectionPad(isMobile),
    }}>
      <div style={inner()}>
        <FadeInBoth>
          <Eyebrow>How It Works</Eyebrow>
          <h2 style={{
            fontSize:      isMobile ? '2rem' : '2.6rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            color:         'var(--rn-text)',
            lineHeight:    1.1,
          }}>
            Simple by design.
          </h2>
          <AccentBar />
        </FadeInBoth>

        <div style={{
          display:  'flex',
          flexWrap: 'wrap',
          gap:      20,
        }}>
          <StepCard
            num="01"
            title="Visit any partner"
            body={<>Give your phone number at checkout at any <em>Veniar</em> partner location.</>}
            delay={0}
          />
          <StepCard
            num="02"
            title="Earn points"
            body={<>Points are added to your <em>Veniar</em> balance instantly. No card needed.</>}
            delay={120}
          />
          <StepCard
            num="03"
            title="Redeem anywhere"
            body="Use your balance at any partner in the network — not just where you earned."
            delay={240}
          />
        </div>
      </div>
    </section>
  );

  /* ── SECTION 3 — SERVICES ─────────────────────────────────────────── */
  const servicesSection = (
    <section style={{
      background: 'var(--rn-bg)',
      ...sectionPad(isMobile),
    }}>
      <div style={inner()}>
        <FadeInBoth>
          <Eyebrow>Services</Eyebrow>
          <h2 style={{
            fontSize:      isMobile ? '2rem' : '2.6rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            color:         'var(--rn-text)',
            lineHeight:    1.1,
          }}>
            What Veniar offers.
          </h2>
          <AccentBar />
        </FadeInBoth>

        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:                 20,
        }}>
          <ServiceCard
            title="Shared Points Network"
            body="One point balance. Every partner."
            delay={0}
          />
          <ServiceCard
            title="Merchant Dashboard"
            body="Real-time redemption and activity tracking."
            delay={80}
          />
          <ServiceCard
            title="Customer App"
            body="Balance, history, and partner map in one place."
            delay={160}
          />
          <ServiceCard
            title="Onboarding & Support"
            body="RewardsNow handles setup from day one."
            delay={240}
          />
        </div>

        <div style={{ marginTop: 36 }}>
          <FadeInBoth delay={280}>
            <button
              className="vn-cta-ghost"
              style={{
                background:    'transparent',
                border:        'none',
                padding:       0,
                fontSize:      15,
                fontWeight:    600,
                color:         BLUE,
                cursor:        'pointer',
                fontFamily:    'inherit',
                letterSpacing: '-0.01em',
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

  /* ── SECTION 4 — FOR BUSINESS ─────────────────────────────────────── */
  const businessSection = (
    <section style={{
      background: 'var(--rn-dark-band)',
      ...sectionPad(isMobile),
    }}>
      <div style={inner()}>
        <FadeInBoth>
          <div style={{
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color:         GOLD,
            marginBottom:  14,
          }}>
            For Businesses
          </div>

          <h2 style={{
            fontSize:      isMobile ? '2rem' : '2.6rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            color:         '#F5F0E8',
            lineHeight:    1.1,
            marginBottom:  20,
          }}>
            Give your customers a reason to return.
          </h2>

          <div style={{
            width:        48,
            height:       3,
            background:   GOLD,
            borderRadius: 2,
            marginBottom: 28,
          }} />

          <p style={{
            fontSize:     isMobile ? 16 : 18,
            color:        'rgba(245,240,232,0.68)',
            maxWidth:     580,
            lineHeight:   1.75,
            marginBottom: 36,
          }}>
            Join the <em>Veniar</em> network and offer your customers a shared
            rewards program that works across the entire city.
            No separate app, no separate card — just your business, connected.
          </p>

          <div style={{
            display:    'flex',
            flexWrap:   'wrap',
            gap:        12,
            alignItems: 'center',
          }}>
            <button
              className="vn-cta-primary"
              style={primaryBtn}
              onClick={() => navigate('/business-overview')}
            >
              Apply to partner
            </button>
            <button
              className="vn-cta-ghost"
              style={lightGhostBtn}
              onClick={() => navigate('/veniar')}
            >
              Learn more
            </button>
          </div>
        </FadeInBoth>
      </div>
    </section>
  );

  /* ── SECTION 5 — NETWORK ──────────────────────────────────────────── */
  const networkSection = (
    <section style={{
      background: 'var(--rn-bg)',
      ...sectionPad(isMobile),
    }}>
      <div style={inner()}>
        <FadeInBoth>
          <Eyebrow>Network</Eyebrow>
          <h2 style={{
            fontSize:      isMobile ? '2rem' : '2.6rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            color:         'var(--rn-text)',
            lineHeight:    1.1,
            marginBottom:  20,
          }}>
            Every partner. One network.
          </h2>

          <div style={{
            width:        48,
            height:       3,
            background:   GOLD,
            borderRadius: 2,
            marginBottom: 28,
          }} />

          <p style={{
            fontSize:     isMobile ? 16 : 18,
            color:        'var(--rn-text-sub)',
            maxWidth:     520,
            lineHeight:   1.75,
            marginBottom: 36,
          }}>
            The <em>Veniar</em> network grows with every new partner.
            Your points follow you.
          </p>

          <button
            className="vn-cta-ghost"
            style={ghostBtn}
            onClick={() => navigate('/network')}
          >
            Explore the network →
          </button>
        </FadeInBoth>
      </div>
    </section>
  );

  /* ── SECTION 6 — PRICING CTA ──────────────────────────────────────── */
  const pricingSection = (
    <section style={{
      background: 'var(--rn-section-alt)',
      ...sectionPad(isMobile),
    }}>
      <div style={inner()}>
        <FadeInBoth>
          <Eyebrow>Pricing</Eyebrow>
          <h2 style={{
            fontSize:      isMobile ? '2rem' : '2.6rem',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            color:         'var(--rn-text)',
            lineHeight:    1.1,
          }}>
            Simple, transparent pricing.
          </h2>
          <AccentBar />

          <p style={{
            fontSize:     isMobile ? 16 : 18,
            color:        'var(--rn-text-sub)',
            maxWidth:     520,
            lineHeight:   1.75,
            marginBottom: 36,
          }}>
            Currently building out our public pricing page.
            Contact us for information.
          </p>

          <div style={{
            display:    'flex',
            flexWrap:   'wrap',
            gap:        12,
            alignItems: 'center',
          }}>
            <button
              className="vn-cta-primary"
              style={primaryBtn}
              onClick={() => navigate('/contact')}
            >
              Contact us
            </button>
            <button
              className="vn-cta-ghost"
              style={ghostBtn}
              onClick={() => navigate('/pricing')}
            >
              See pricing page
            </button>
          </div>
        </FadeInBoth>
      </div>
    </section>
  );

  /* ── SECTION 7 — TRUST / LEGAL NOTE ──────────────────────────────── */
  const trustSection = (
    <section style={{
      background: 'var(--rn-bg)',
      ...sectionPad(isMobile),
    }}>
      <div style={inner()}>
        <FadeInBoth>
          <p style={{
            fontSize:   13,
            color:      'var(--rn-text-sub)',
            lineHeight: 1.7,
            textAlign:  'center',
            maxWidth:   480,
            margin:     '0 auto',
          }}>
            Veniar Points are a loyalty program. They are not cash, currency,
            or stored value. They cannot be transferred or exchanged for money.
            Subject to program terms.
          </p>
        </FadeInBoth>
      </div>
    </section>
  );

  /* ── SECTION 8 — FINAL CTA ────────────────────────────────────────── */
  const finalCtaSection = (
    <section style={{
      background: 'var(--rn-section-alt)',
      ...sectionPad(isMobile),
      textAlign: 'center',
    }}>
      <div style={inner()}>
        <FadeInBoth>
          <h2 style={{
            fontSize:      isMobile ? '2.2rem' : '3rem',
            fontWeight:    900,
            letterSpacing: '-0.04em',
            color:         'var(--rn-text)',
            lineHeight:    1.05,
            marginBottom:  16,
          }}>
            Join the Veniar network.
          </h2>

          <p style={{
            fontSize:     isMobile ? 16 : 19,
            color:        'var(--rn-text-sub)',
            lineHeight:   1.7,
            marginBottom: 36,
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
              style={primaryBtn}
              onClick={() => navigate('/register')}
            >
              Create account
            </button>
            <button
              className="vn-cta-ghost"
              style={ghostBtn}
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
    <div style={{ background: 'var(--rn-bg)', color: 'var(--rn-text)' }}>
      <VeniarNav />
      {heroSection}
      {howSection}
      {servicesSection}
      {businessSection}
      {networkSection}
      {pricingSection}
      {trustSection}
      {finalCtaSection}
      <VeniarFooter />
    </div>
  );
}
