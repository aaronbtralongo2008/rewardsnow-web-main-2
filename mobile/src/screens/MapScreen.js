import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { API } from '../config';

const DEFAULT_REGION = {
  latitude: 25.7617,
  longitude: -80.1918,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function MapScreen({ navigation }) {
  const mapRef = useRef(null);
  const [businesses, setBusinesses] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    Promise.all([fetchBusinesses(), requestLocation()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await fetch(`${API}/businesses`);
      const data = await res.json();
      setBusinesses(
        (Array.isArray(data) ? data : []).filter(
          (b) => b.latitude != null && b.longitude != null
        )
      );
    } catch {
      // show map with no pins rather than crashing
    }
  };

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission denied. Showing default area.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch {
      setLocationError('Could not get your location.');
    }
  };

  const centerOnUser = () => {
    if (!userLocation || !mapRef.current) return;
    mapRef.current.animateToRegion({
      ...userLocation,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    }, 600);
  };

  const initialRegion = userLocation
    ? { ...userLocation, latitudeDelta: 0.06, longitudeDelta: 0.06 }
    : DEFAULT_REGION;

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08011a" />

      {/* Header overlay */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Nearby Partners</Text>
        <View style={{ minWidth: 60 }} />
      </View>

      {locationError ? (
        <View style={s.locationBanner}>
          <Text style={s.locationBannerText}>{locationError}</Text>
        </View>
      ) : null}

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text style={s.loadingText}>Loading map…</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={s.map}
            // iOS uses Apple Maps (PROVIDER_DEFAULT) — no API key needed.
            // Android uses Google Maps — requires GOOGLE_MAPS_ANDROID_API_KEY in app.json.
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
            initialRegion={initialRegion}
            showsUserLocation={!!userLocation}
            showsMyLocationButton={false}
            customMapStyle={Platform.OS === 'android' ? darkMapStyle : []}
          >
            {businesses.map((biz, i) => (
              <Marker
                key={biz.id ?? biz.businessId ?? i}
                coordinate={{
                  latitude: parseFloat(biz.latitude),
                  longitude: parseFloat(biz.longitude),
                }}
                onPress={() => setSelected(biz)}
              >
                <View style={s.pin}>
                  <Text style={s.pinText}>
                    {(biz.businessName ?? biz.name ?? '?')[0].toUpperCase()}
                  </Text>
                </View>
              </Marker>
            ))}
          </MapView>

          {/* Center on user button */}
          {userLocation ? (
            <TouchableOpacity style={s.locBtn} onPress={centerOnUser} activeOpacity={0.8}>
              <Text style={s.locBtnText}>◎</Text>
            </TouchableOpacity>
          ) : null}

          {/* Selected business card */}
          {selected ? (
            <View style={s.card}>
              <View style={s.cardRow}>
                <View style={{ flex: 1 }}>
                  <Text style={s.cardName}>
                    {selected.businessName ?? selected.name}
                  </Text>
                  {selected.address ? (
                    <Text style={s.cardAddress} numberOfLines={1}>
                      {selected.address}
                    </Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={s.cardViewBtn}
                  onPress={() => {
                    setSelected(null);
                    navigation.navigate('BusinessDetail', { business: selected });
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={s.cardViewText}>View</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <Text style={s.cardDismiss}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#08011a' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10,
    backgroundColor: '#08011a',
    zIndex: 10,
  },
  backBtn: { minWidth: 60 },
  backText: { color: 'rgba(255,255,255,0.55)', fontSize: 15 },
  title: { color: '#ffffff', fontSize: 18, fontWeight: '800', flex: 1, textAlign: 'center' },
  locationBanner: {
    backgroundColor: 'rgba(220,38,38,0.15)',
    paddingHorizontal: 20, paddingVertical: 8,
  },
  locationBannerText: { color: '#fca5a5', fontSize: 13, textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },
  map: { flex: 1 },
  pin: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#f59e0b',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#f59e0b', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6, shadowRadius: 6, elevation: 6,
  },
  pinText: { color: '#08011a', fontSize: 14, fontWeight: '900' },
  locBtn: {
    position: 'absolute', bottom: 120, right: 16,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#08011a',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.18)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, shadowRadius: 6, elevation: 6,
  },
  locBtnText: { color: '#f59e0b', fontSize: 20 },
  card: {
    position: 'absolute', bottom: 24, left: 16, right: 16,
    backgroundColor: '#0f0f2a',
    borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5, shadowRadius: 12, elevation: 12,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  cardName: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginBottom: 3 },
  cardAddress: { color: 'rgba(255,255,255,0.45)', fontSize: 13 },
  cardViewBtn: {
    backgroundColor: '#f59e0b', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 10,
  },
  cardViewText: { color: '#08011a', fontSize: 14, fontWeight: '800' },
  cardDismiss: { color: 'rgba(255,255,255,0.35)', fontSize: 13, textAlign: 'center' },
});

// Dark map style to match the app's dark theme
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0a0a1a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#0d1f0d' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a1a2e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2c2c4a' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#16163a' }] },
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#05050f' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#05050f' }] },
];
