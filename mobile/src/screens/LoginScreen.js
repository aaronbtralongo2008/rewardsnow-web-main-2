import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { API } from '../config';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/customers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) {
        setError('Username or password incorrect');
      } else {
        await login(data);
      }
    } catch {
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08011a" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={s.orb1} />
          <View style={s.orb2} />

          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backText}>← Back</Text>
          </TouchableOpacity>

          <Image
            source={require('../../assets/logo514.png')}
            style={s.logo}
            resizeMode="contain"
          />
          <View style={s.goldLine} />

          <Text style={s.title}>Welcome back</Text>
          <Text style={s.sub}>Sign in to your RewardsNow account</Text>

          <Text style={s.label}>EMAIL</Text>
          <TextInput
            style={s.input}
            placeholder="you@email.com"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          <Text style={s.label}>PASSWORD</Text>
          <TextInput
            style={s.input}
            placeholder="••••••••"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          {error ? <Text style={s.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[s.primaryBtn, loading && s.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnText}>{loading ? 'Signing in…' : 'Sign In'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.textLink}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={s.textLinkText}>Forgot password?</Text>
          </TouchableOpacity>

          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerLabel}>or</Text>
            <View style={s.dividerLine} />
          </View>

          <TouchableOpacity
            style={s.ghostBtn}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.75}
          >
            <Text style={s.ghostBtnText}>Create an Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#08011a' },
  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 16, paddingBottom: 48 },
  orb1: {
    position: 'absolute', top: -80, left: -60, width: 300, height: 300,
    borderRadius: 150, backgroundColor: 'rgba(37,99,235,0.4)', opacity: 0.5,
  },
  orb2: {
    position: 'absolute', bottom: 60, right: -60, width: 240, height: 240,
    borderRadius: 120, backgroundColor: 'rgba(6,182,212,0.2)', opacity: 0.45,
  },
  backBtn: { marginBottom: 24, alignSelf: 'flex-start' },
  backText: { color: 'rgba(255,255,255,0.55)', fontSize: 15 },
  logo: { width: 140, height: 44, marginBottom: 20 },
  goldLine: { width: 44, height: 3, backgroundColor: '#f59e0b', borderRadius: 2, marginBottom: 24 },
  title: { color: '#ffffff', fontSize: 30, fontWeight: '900', letterSpacing: -0.4, marginBottom: 6 },
  sub: { color: 'rgba(255,255,255,0.55)', fontSize: 15, marginBottom: 32 },
  label: {
    color: '#f59e0b', fontSize: 10, fontWeight: '700',
    letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 15,
    marginBottom: 20,
  },
  error: {
    color: '#fca5a5',
    backgroundColor: 'rgba(220,38,38,0.15)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    marginBottom: 16,
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
    marginBottom: 12,
  },
  btnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: '#08011a', fontSize: 16, fontWeight: '800' },
  textLink: { alignSelf: 'flex-end', marginBottom: 20 },
  textLinkText: { color: '#2563eb', fontSize: 13, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  dividerLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 13 },
  ghostBtn: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingVertical: 15,
    alignItems: 'center',
  },
  ghostBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});
