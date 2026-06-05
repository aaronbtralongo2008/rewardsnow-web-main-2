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
const DEEP    = '#0F6356';
const NIGHT   = '#0A1211';
const YELLOW  = '#F8C922';
const MUTED   = '#5F6B73';

/* ── StepItem ─────────────────────────────────────────────────────────── */
function StepItem({ num, title, body, delay, numColor }) {
  return (
    <FadeInBoth delay={delay}>
      <div style={{ flex: '1 1 0', minWidth: 0 }}>
        <div style={{
          fontSize:      '3.5rem',
          fontWeight:    900,
          color:         numColor || CYAN,
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
function ServiceCard({ title, body, accent, delay }) {
  return (
    <FadeInBoth delay={delay}>
      <div
        className="vn-card"
        style={{
          background:   'var(--vn-card)',
          border:       '1px solid var(--vn-card-border)',
          borderTop:    `3px solid ${accent}`,
          borderRadius: 14,
          padding:      '40px 36px',
        }}
      >
        <div style={{
          width:        32,
          height:       3,
          background:   accent,
          borderRadius: 2,
          marginBottom: 20,
          opacity:      0.5,
        }} />
        <div style={{
          fontSize:      17,
          fontWeight:    700,
          color:         'var(--vn-text)',
          marginBottom:  12,
          letterSpacing: '-0.01em',
        }}>
          {title}
        </div>
        <div style={{
          fontSize:   15,
          color:      'var(--vn-text-sub)',
          lineHeight: 1.75,
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
        background:    NIGHT,
        paddingTop:    isMobile ? 100 : 64,
        paddingBottom: isMobile ? 72  : 96,
        paddingLeft:   isMobile ? 24  : '8%',
        paddingRight:  isMobile ? 24  : '8%',
        display:       'flex',
        alignItems:    'center',
      }}
    >
      <div style={{ ...inner, width: '100%' }}>
        <FadeInBoth>
          {/* Eyebrow */}
          <div style={{
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         YELLOW,
            marginBottom:  24,
          }}>
            SHARED REWARDS PLATFORM
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize:      isMobile ? '3.4rem' : '6.5rem',
            fontWeight:    900,
            letterSpacing: '-0.05em',
            lineHeight:    0.93,
            color:         '#FFF8EA',
            margin:        0,
            maxWidth:      780,
          }}>
            One card.<br />Every business.
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize:     isMobile ? 17 : 21,
            color:        'rgba(255,248,234,0.68)',
            lineHeight:   1.7,
            maxWidth:     520,
            marginBottom: 48,
            marginTop:    32,
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
            marginBottom: 64,
          }}>
            <button
              className="vn-cta-primary"
              style={{
                background:   LAGOON,
                color:        '#fff',
                border:       'none',
                padding:      '16px 36px',
                borderRadius: 9,
                fontSize:     16,
                fontWeight:   700,
                cursor:       'pointer',
                fontFamily:   'inherit',
              }}
              onClick={() => navigate('/join')}
            >
              Join Veniar
            </button>
            <button
              style={{
                background:   'transparent',
                color:        'rgba(255,248,234,0.75)',
                border:       '1.5px solid rgba(255,248,234,0.22)',
                padding:      '16px 36px',
                borderRadius: 9,
                fontSize:     16,
                fontWeight:   700,
                cursor:       'pointer',
                fontFamily:   'inherit',
              }}
              onClick={() => navigate('/business-overview')}
            >
              For businesses
            </button>
          </div>

          {/* Mission strip */}
          <div style={{
            display:       'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap:           isMobile ? 20 : 0,
            borderTop:     '1px solid rgba(255,248,234,0.10)',
            paddingTop:    32,
          }}>
            {[
              { label: 'Earn everywhere',  sub: 'Points pooled across the whole network — not per business.', accent: CYAN   },
              { label: 'Spend anywhere',   sub: 'Redeem at any partner, not just where you earned.',           accent: '#5CB2C9' },
              { label: 'No card needed',   sub: 'Just a phone number at checkout.',                            accent: '#648D62' },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  flex:        1,
                  paddingLeft: isMobile ? 0 : (i > 0 ? 40 : 0),
                  borderLeft:  (!isMobile && i > 0) ? '1px solid rgba(255,248,234,0.08)' : 'none',
                }}
              >
                <div style={{
                  width:        28,
                  height:       3,
                  background:   item.accent,
                  borderRadius: 2,
                  marginBottom: 12,
                }} />
                <div style={{
                  fontSize:     15,
                  fontWeight:   700,
                  color:        '#FFF8EA',
                  marginBottom: 6,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize:   14,
                  color:      'rgba(255,248,234,0.50)',
                  lineHeight: 1.6,
                }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </FadeInBoth>
      </div>
    </section>
  );

  /* ── SECTION 2 — HOW IT WORKS ─────────────────────────────────────── */
  const howSection = (
    <section style={{
      background:    'var(--vn-panel)',
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
            numColor="#1692A2"
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
            numColor="#0E96CD"
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
            numColor="#648D62"
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
          gap:                 isMobile ? 20 : 32,
          alignItems:          'start',
        }}>
          <ServiceCard
            title="Shared Points Network"
            body="Customers earn at any partner and spend anywhere in the network."
            accent="#1692A2"
            delay={0}
          />
          <ServiceCard
            title="Merchant Dashboard"
            body="Real-time activity, redemption management, and staff tools."
            accent="#0E96CD"
            delay={80}
          />
          <ServiceCard
            title="Customer App"
            body="Balance, transaction history, and partner locations in one place."
            accent="#5CB2C9"
            delay={160}
          />
          <ServiceCard
            title="Onboarding & Support"
            body="RewardsNow handles setup and ongoing support for every partner."
            accent="#D66024"
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
