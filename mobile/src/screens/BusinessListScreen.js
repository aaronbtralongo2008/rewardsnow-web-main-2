import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { API } from '../config';

export default function BusinessListScreen({ navigation }) {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch(`${API}/businesses`);
      const data = await res.json();
      setBusinesses(Array.isArray(data) ? data : []);
    } catch {
      // keep state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleSearch = async (q) => {
    setSearch(q);
    if (!q) { fetchAll(); return; }
    if (q.length < 2) return;
    setSearching(true);
    try {
      const res = await fetch(`${API}/businesses/search?name=${encodeURIComponent(q)}`);
      const data = await res.json();
      setBusinesses(Array.isArray(data) ? data : []);
    } catch {
      // keep state
    } finally {
      setSearching(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={s.card}
      onPress={() => navigation.navigate('BusinessDetail', { business: item })}
      activeOpacity={0.75}
    >
      <View style={s.cardLeft}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>
            {(item.businessName ?? item.name ?? '?')[0].toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={s.cardBody}>
        <Text style={s.cardName}>{item.businessName ?? item.name}</Text>
        {item.category ? (
          <Text style={s.cardCategory}>{item.category}</Text>
        ) : null}
        {item.address ? (
          <Text style={s.cardAddress} numberOfLines={1}>{item.address}</Text>
        ) : null}
      </View>
      <Text style={s.cardChevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08011a" />
      <View style={s.orb1} />
      <View style={s.orb2} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Partner Businesses</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Text style={s.mapLink}>Map</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={s.searchWrap}>
        <TextInput
          style={s.searchInput}
          placeholder="Search businesses…"
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={search}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        {searching && (
          <ActivityIndicator style={s.searchSpinner} size="small" color="#f59e0b" />
        )}
      </View>

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color="#f59e0b" />
        </View>
      ) : (
        <FlatList
          data={businesses}
          keyExtractor={(item, i) => String(item.id ?? item.businessId ?? i)}
          renderItem={renderItem}
          contentContainerStyle={s.list}
          ListEmptyComponent={
            <View style={s.empty}>
              <Text style={s.emptyText}>No businesses found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#08011a' },
  orb1: {
    position: 'absolute', top: -80, right: -60, width: 280, height: 280,
    borderRadius: 140, backgroundColor: 'rgba(37,99,235,0.35)', opacity: 0.45,
  },
  orb2: {
    position: 'absolute', bottom: 60, left: -40, width: 200, height: 200,
    borderRadius: 100, backgroundColor: 'rgba(245,158,11,0.15)', opacity: 0.5,
  },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  backText: { color: 'rgba(255,255,255,0.55)', fontSize: 15, minWidth: 60 },
  title: { color: '#ffffff', fontSize: 18, fontWeight: '800', flex: 1, textAlign: 'center' },
  mapLink: { color: '#f59e0b', fontSize: 15, fontWeight: '600', minWidth: 60, textAlign: 'right' },
  searchWrap: {
    marginHorizontal: 20, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 15,
  },
  searchSpinner: { marginLeft: 12 },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    gap: 14,
  },
  cardLeft: {},
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(245,158,11,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#f59e0b', fontSize: 18, fontWeight: '800' },
  cardBody: { flex: 1 },
  cardName: { color: '#ffffff', fontSize: 15, fontWeight: '700', marginBottom: 2 },
  cardCategory: { color: '#f59e0b', fontSize: 12, fontWeight: '600', marginBottom: 2 },
  cardAddress: { color: 'rgba(255,255,255,0.45)', fontSize: 12 },
  cardChevron: { color: 'rgba(255,255,255,0.3)', fontSize: 22, fontWeight: '300' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, alignItems: 'center', paddingTop: 60 },
  emptyText: { color: 'rgba(255,255,255,0.4)', fontSize: 15 },
});
