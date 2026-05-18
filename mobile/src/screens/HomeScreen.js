import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { API } from '../config';

export default function HomeScreen({ navigation }) {
  const { customer, logout } = useAuth();
  const [balance, setBalance] = useState(customer?.rnBalance ?? 0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    if (!customer?.token) return;
    try {
      const headers = { Authorization: `Bearer ${customer.token}` };
      const [hRes, bRes] = await Promise.all([
        fetch(`${API}/ledger/${customer.customerId}/history`, { headers }),
        fetch(`${API}/customers/${customer.customerId}/balance`, { headers }),
      ]);
      const [hData, bData] = await Promise.all([hRes.json(), bRes.json()]);
      setHistory(Array.isArray(hData) ? hData : []);
      setBalance(bData.rnBalance ?? customer.rnBalance ?? 0);
    } catch {
      // keep existing state on network error
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08011a" />
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f59e0b" />
        }
      >
        {/* Orbs */}
        <View style={s.orb1} />
        <View style={s.orb2} />

        {/* Nav bar */}
        <View style={s.nav}>
          <Text style={s.navBrand}>RewardsNow</Text>
          <TouchableOpacity onPress={logout}>
            <Text style={s.navLogout}>Sign out</Text>
          </TouchableOpacity>
        </View>

        {/* Balance hero */}
        <View style={s.hero}>
          <Text style={s.greeting}>
            Good to see you, {customer?.username ?? 'there'}.
          </Text>
          <View style={s.balanceRow}>
            <Text style={s.balanceNum}>
              {loading ? '—' : balance.toLocaleString()}
            </Text>
            <Text style={s.balancePts}>pts</Text>
          </View>
          <Text style={s.balanceSub}>Available at any partner business</Text>

          <View style={s.heroActions}>
            <TouchableOpacity
              style={s.actionPrimary}
              onPress={() => navigation.navigate('BusinessList')}
              activeOpacity={0.85}
            >
              <Text style={s.actionPrimaryText}>Browse Partners</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.actionSecondary}
              onPress={() => navigation.navigate('Map')}
              activeOpacity={0.75}
            >
              <Text style={s.actionSecondaryText}>View Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction history */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Recent Transactions</Text>

          {loading ? (
            [1, 2, 3].map(i => <View key={i} style={s.skeleton} />)
          ) : history.length === 0 ? (
            <View style={s.empty}>
              <Text style={s.emptyTitle}>No transactions yet</Text>
              <Text style={s.emptySub}>
                Visit any RewardsNow partner and give them your phone number at checkout to start earning points.
              </Text>
            </View>
          ) : (
            history.slice(0, 20).map((tx, i) => (
              <View key={tx.id ?? i} style={s.tx}>
                <View style={[s.txDot, { backgroundColor: tx.rnTransacted > 0 ? 'rgba(22,163,74,0.2)' : 'rgba(220,38,38,0.2)' }]}>
                  <Text style={[s.txSign, { color: tx.rnTransacted > 0 ? '#4ade80' : '#f87171' }]}>
                    {tx.rnTransacted > 0 ? '+' : '−'}
                  </Text>
                </View>
                <View style={s.txBody}>
                  <Text style={s.txBiz}>{tx.businessName ?? 'Partner'}</Text>
                  <Text style={s.txDate}>{tx.date ? new Date(tx.date).toLocaleDateString() : ''}</Text>
                </View>
                <Text style={[s.txAmount, { color: tx.rnTransacted > 0 ? '#4ade80' : '#f87171' }]}>
                  {tx.rnTransacted > 0 ? '+' : ''}{Math.abs(tx.rnTransacted)} pts
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#08011a' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  orb1: {
    position: 'absolute', top: -60, left: -80, width: 320, height: 320,
    borderRadius: 160, backgroundColor: 'rgba(37,99,235,0.4)', opacity: 0.5,
  },
  orb2: {
    position: 'absolute', top: 180, right: -60, width: 240, height: 240,
    borderRadius: 120, backgroundColor: 'rgba(6,182,212,0.2)', opacity: 0.4,
  },
  nav: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8,
  },
  navBrand: { color: '#f59e0b', fontSize: 18, fontWeight: '900', letterSpacing: -0.3 },
  navLogout: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '500' },
  hero: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  greeting: { color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 8 },
  balanceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginBottom: 4 },
  balanceNum: { color: '#ffffff', fontSize: 52, fontWeight: '900', letterSpacing: -1.5 },
  balancePts: { color: 'rgba(255,255,255,0.5)', fontSize: 18, fontWeight: '600', paddingBottom: 8 },
  balanceSub: { color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 24 },
  heroActions: { flexDirection: 'row', gap: 12 },
  actionPrimary: {
    flex: 1, backgroundColor: '#f59e0b', borderRadius: 12,
    paddingVertical: 13, alignItems: 'center',
    shadowColor: '#f59e0b', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35, shadowRadius: 8, elevation: 6,
  },
  actionPrimaryText: { color: '#08011a', fontSize: 14, fontWeight: '700' },
  actionSecondary: {
    flex: 1, borderRadius: 12, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.18)', paddingVertical: 13, alignItems: 'center',
  },
  actionSecondaryText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  section: { marginHorizontal: 20, marginTop: 32 },
  sectionTitle: { color: '#ffffff', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  skeleton: {
    height: 60, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: 10,
  },
  empty: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  emptyTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  emptySub: { color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 20, textAlign: 'center' },
  tx: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12, padding: 14, marginBottom: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  txDot: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  txSign: { fontSize: 18, fontWeight: '800' },
  txBody: { flex: 1 },
  txBiz: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  txDate: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: '700' },
});
