import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useIsMobile } from './useIsMobile';
import { API } from './config';

const ROYAL = '#0B5CAD';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function BusinessMap({ customer, onLogout, onNavigate, onSelectBusiness }) {
  const isMobile = useIsMobile();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState([26.35, -80.08]);
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
          () => {}
      );
    }
    const fetchBusinesses = async () => {
      try {
        const res = await fetch(`${API}/businesses`);
        const data = await res.json();
        setBusinesses(Array.isArray(data) ? data.filter(b => b.latitude && b.longitude) : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  return (
      <div style={s.container}>
        <div style={s.topBar}>
          <span style={s.logo}>RewardsNow</span>
          <div style={s.topBarRight}>
            {!isMobile && (
                <>
                  <button style={s.navBtn} onClick={() => onNavigate('/home')}>Home</button>
                  <button style={s.navBtn} onClick={() => onNavigate('/businesses')}>List</button>
                </>
            )}
            <button style={s.navBtn} onClick={() => setShowSidebar(v => !v)}>
              {showSidebar ? (isMobile ? '✕ Close' : 'Hide list') : '☰ Nearby'}
            </button>
            <button style={s.logoutBtn} onClick={onLogout}>{isMobile ? '↩' : 'Log Out'}</button>
          </div>
        </div>

        <div style={{ ...s.body, flexDirection: isMobile ? 'column' : 'row' }}>
          {showSidebar && (
              <div style={{
                ...s.sidebar,
                width: isMobile ? '100%' : '300px',
                maxHeight: isMobile ? '45vh' : 'none',
                borderRight: isMobile ? 'none' : '1px solid rgba(0,0,0,0.08)',
                borderBottom: isMobile ? '1px solid rgba(0,0,0,0.08)' : 'none',
                flexShrink: isMobile ? 0 : undefined,
              }}>
                <h2 style={s.sidebarTitle}>Nearby Partners</h2>
                <p style={s.sidebarSub}>Tap a business or map pin to view rewards</p>
                {loading ? (
                    <div style={s.skeletonList}>
                      {[1, 2, 3].map(i => <div key={i} style={s.skeleton} />)}
                    </div>
                ) : businesses.length === 0 ? (
                    <div style={s.emptyState}>
                      <p style={s.emptyText}>No businesses with locations yet.</p>
                    </div>
                ) : (
                    <div style={s.bizList}>
                      {businesses.map((biz) => (
                          <div
                              key={biz.id}
                              style={s.bizCard}
                              onClick={() => onSelectBusiness(biz)}
                              onMouseEnter={e => e.currentTarget.style.borderColor = ROYAL}
                              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
                          >
                            <div style={s.bizInitial}>{biz.name.charAt(0).toUpperCase()}</div>
                            <div style={s.bizMeta}>
                              <p style={s.bizName}>{biz.name}</p>
                              <p style={s.bizAddress}>{biz.address || 'Address not listed'}</p>
                              {biz.paidPartner && <span style={s.featuredPill}>Featured</span>}
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </div>
          )}

          <div style={{ ...s.mapWrapper, flex: 1, minHeight: isMobile ? (showSidebar ? '55vh' : 'calc(100vh - 60px)') : 'auto' }}>
            {!loading && (
                <MapContainer center={userLocation} zoom={13} style={{ width: '100%', height: '100%' }}>
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {businesses.map((biz) => (
                      <Marker key={biz.id} position={[biz.latitude, biz.longitude]}>
                        <Popup>
                          <div style={s.popup}>
                            <strong style={s.popupName}>{biz.name}</strong>
                            {biz.address && <p style={s.popupAddress}>{biz.address}</p>}
                            <button style={s.popupBtn} onClick={() => onSelectBusiness(biz)}>
                              View Rewards →
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                  ))}
                </MapContainer>
            )}
            {loading && (
                <div style={s.mapLoading}>
                  <p style={{ color: '#888', fontSize: '14px' }}>Loading map...</p>
                </div>
            )}
          </div>
        </div>

        {isMobile && (
            <div style={s.mobileBottomNav}>
              <button style={s.mobileNavBtn} onClick={() => onNavigate('/home')}>🏠 Home</button>
              <button style={s.mobileNavBtn} onClick={() => onNavigate('/businesses')}>📋 List</button>
              <button style={{ ...s.mobileNavBtn, color: ROYAL, fontWeight: '700' }}>🗺️ Map</button>
            </div>
        )}
      </div>
  );
}

const s = {
  container: { height: '100vh', background: '#FFF8EA', fontFamily: "'Segoe UI', system-ui, sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', height: '56px', background: '#07243A', borderBottom: '1px solid rgba(255,255,255,0.1)', zIndex: 1000, position: 'relative', flexShrink: 0 },
  logo: { color: '#F2B84B', fontSize: '1.2rem', fontWeight: '800' },
  topBarRight: { display: 'flex', alignItems: 'center', gap: '6px' },
  navBtn: { padding: '6px 10px', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  logoutBtn: { padding: '6px 12px', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  body: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { background: '#ffffff', padding: '16px', overflowY: 'auto', zIndex: 10 },
  sidebarTitle: { color: ROYAL, fontSize: '1.1rem', fontWeight: '800', margin: '0 0 4px 0' },
  sidebarSub: { color: '#aaa', fontSize: '12px', margin: '0 0 14px 0' },
  skeletonList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  skeleton: { height: '56px', borderRadius: '12px', background: '#f0f0f0' },
  emptyState: { textAlign: 'center', padding: '24px 0' },
  emptyText: { color: '#888', fontSize: '13px' },
  bizList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  bizCard: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'border-color 0.2s' },
  bizInitial: { width: '36px', height: '36px', borderRadius: '9px', background: ROYAL, color: '#ffffff', fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  bizMeta: { flex: 1, minWidth: 0 },
  bizName: { color: '#101820', fontSize: '13px', fontWeight: '700', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  bizAddress: { color: '#aaa', fontSize: '11px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  featuredPill: { background: '#F2B84B', color: '#07243A', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px', marginTop: '4px', display: 'inline-block' },
  mapWrapper: { position: 'relative', minWidth: 0 },
  mapLoading: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF8EA' },
  popup: { fontFamily: "'Segoe UI', system-ui, sans-serif", minWidth: '160px', maxWidth: '220px' },
  popupName: { color: ROYAL, fontSize: '14px', display: 'block', marginBottom: '4px', fontWeight: '700' },
  popupAddress: { color: '#888', fontSize: '12px', margin: '0 0 10px 0' },
  popupBtn: { padding: '7px 12px', borderRadius: '8px', border: 'none', background: ROYAL, color: '#ffffff', fontSize: '12px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  mobileBottomNav: { display: 'flex', borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff', flexShrink: 0 },
  mobileNavBtn: { flex: 1, padding: '12px', background: 'none', border: 'none', fontSize: '12px', fontWeight: '500', color: '#6b7280', cursor: 'pointer' },
};

export default BusinessMap;
