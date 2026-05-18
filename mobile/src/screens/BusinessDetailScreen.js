import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { API } from '../config';
import { useAuth } from '../context/AuthContext';

export default function BusinessDetailScreen({ route, navigation }) {
  const { customer } = useAuth();
  const { business: initial } = route.params ?? {};
  const [business, setBusiness] = useState(initial ?? null);
  const [loading, setLoading] = useState(!initial);

  const id = initial?.id ?? initial?.businessId;

  useEffect(() => {
    if (id && !initial?.description) {
      fetchDetail();
    }
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await fetch(`${API}/businesses/${id}`);
      const data = await res.json();
      setBusiness(data);
    } catch {
      // keep partial data
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <ActivityIndicator size="large" color="#f59e0b" />
        </View>
      </SafeAreaView>
    );
  }

  if (!business) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <Text style={s.errorText}>Business not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={s.backLink}>← Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const name = business.businessName ?? business.name ?? 'Business';
  const initial1 = name[0].toUpperCase();

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08011a" />
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.orb1} />
        <View style={s.orb2} />

        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Hero */}
        <View style={s.hero}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{initial1}</Text>
          </View>
          <Text style={s.bizName}>{name}</Text>
          {business.category ? (
            <View style={s.badge}>
              <Text style={s.badgeText}>{business.category}</Text>
            </View>
          ) : null}
        </View>

        {/* Details card */}
        <View style={s.card}>
          {business.description ? (
            <>
              <Text style={s.cardLabel}>ABOUT</Text>
              <Text style={s.cardValue}>{business.description}</Text>
              <View style={s.divider} />
            </>
          ) : null}

          {business.address ? (
            <Row label="ADDRESS" value={business.address} />
          ) : null}

          {business.phone ? (
            <Row
              label="PHONE"
              value={business.phone}
              onPress={() => Linking.openURL(`tel:${business.phone}`)}
              linkColor="#f59e0b"
            />
          ) : null}

          {business.website ? (
            <Row
              label="WEBSITE"
              value={business.website}
              onPress={() => Linking.openURL(business.website)}
              linkColor="#2563eb"
            />
          ) : null}

          {business.rewardRate !== undefined ? (
            <Row label="EARN RATE" value={`${business.rewardRate} pts per $1`} />
          ) : null}
        </View>

        {/* Map shortcut */}
        <TouchableOpacity
          style={s.mapBtn}
          onPress={() => navigation.navigate('Map')}
          activeOpacity={0.75}
        >
          <Text style={s.mapBtnText}>View on Map</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value, onPress, linkColor }) {
  return (
    <View style={row.wrap}>
      <Text style={row.label}>{label}</Text>
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <Text style={[row.value, onPress && { color: linkColor ?? '#ffffff' }]}>
          {value}
        </Text>
      </TouchableOpacity>
      <View style={row.divider} />
    </View>
  );
}

const row = StyleSheet.create({
  wrap: { marginBottom: 4 },
  label: {
    color: '#f59e0b', fontSize: 10, fontWeight: '700',
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4,
  },
  value: { color: '#ffffff', fontSize: 15, lineHeight: 22 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginTop: 14, marginBottom: 14 },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#08011a' },
  scroll: { paddingBottom: 48 },
  orb1: {
    position: 'absolute', top: -60, right: -60, width: 260, height: 260,
    borderRadius: 130, backgroundColor: 'rgba(37,99,235,0.35)', opacity: 0.45,
  },
  orb2: {
    position: 'absolute', bottom: 100, left: -40, width: 200, height: 200,
    borderRadius: 100, backgroundColor: 'rgba(245,158,11,0.12)', opacity: 0.5,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  errorText: { color: 'rgba(255,255,255,0.5)', fontSize: 16 },
  backLink: { color: '#f59e0b', fontSize: 15 },
  backBtn: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  backText: { color: 'rgba(255,255,255,0.55)', fontSize: 15 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 24 },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: 'rgba(245,158,11,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2, borderColor: 'rgba(245,158,11,0.3)',
  },
  avatarText: { color: '#f59e0b', fontSize: 36, fontWeight: '900' },
  bizName: {
    color: '#ffffff', fontSize: 26, fontWeight: '900',
    textAlign: 'center', letterSpacing: -0.3, marginBottom: 10,
  },
  badge: {
    backgroundColor: 'rgba(245,158,11,0.15)',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5,
    borderWidth: 1, borderColor: 'rgba(245,158,11,0.3)',
  },
  badgeText: { color: '#f59e0b', fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  card: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16,
  },
  cardLabel: {
    color: '#f59e0b', fontSize: 10, fontWeight: '700',
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6,
  },
  cardValue: { color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 21 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginVertical: 14 },
  mapBtn: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingVertical: 15,
    alignItems: 'center',
  },
  mapBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});
