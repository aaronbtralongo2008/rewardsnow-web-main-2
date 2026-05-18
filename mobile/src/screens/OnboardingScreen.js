import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
  SafeAreaView,
} from 'react-native';

// TODO: Replace this placeholder with the real Google Meet link before launch
const BUSINESS_MEET_URL = 'https://meet.google.com/';

export default function OnboardingScreen({ navigation }) {
  const handleBusinessOwner = () => {
    Linking.openURL(BUSINESS_MEET_URL).catch(() => null);
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08011a" />
      <View style={s.container}>
        {/* Decorative glow orbs */}
        <View style={s.orb1} />
        <View style={s.orb2} />
        <View style={s.orb3} />

        <View style={s.content}>
          <Image
            source={require('../../assets/logo514.png')}
            style={s.logo}
            resizeMode="contain"
          />

          <View style={s.goldLine} />

          <Text style={s.headline}>Earn rewards while{'\n'}supporting local{'\n'}businesses.</Text>

          <Text style={s.sub}>
            Join thousands of customers earning points at partner businesses near you.
          </Text>
        </View>

        <View style={s.buttons}>
          <TouchableOpacity
            style={s.primaryBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.ghostBtn}
            onPress={handleBusinessOwner}
            activeOpacity={0.75}
          >
            <Text style={s.ghostBtnText}>Business Owner?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#08011a',
  },
  container: {
    flex: 1,
    backgroundColor: '#08011a',
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  orb1: {
    position: 'absolute',
    top: -120,
    left: -100,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: 'rgba(37,99,235,0.45)',
    opacity: 0.6,
  },
  orb2: {
    position: 'absolute',
    bottom: 40,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(6,182,212,0.25)',
    opacity: 0.5,
  },
  orb3: {
    position: 'absolute',
    top: '45%',
    right: '20%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(217,70,239,0.2)',
    opacity: 0.4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 56,
    marginBottom: 28,
  },
  goldLine: {
    width: 52,
    height: 3,
    backgroundColor: '#f59e0b',
    borderRadius: 2,
    marginBottom: 28,
  },
  headline: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  sub: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 300,
  },
  buttons: {
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnText: {
    color: '#08011a',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  ghostBtn: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(245,158,11,0.45)',
    paddingVertical: 15,
    alignItems: 'center',
  },
  ghostBtnText: {
    color: '#f59e0b',
    fontSize: 15,
    fontWeight: '600',
  },
});
