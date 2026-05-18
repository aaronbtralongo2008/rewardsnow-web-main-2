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
} from 'react-native';
import { API } from '../config';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      await fetch(`${API}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSuccess(true);
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
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <View style={s.orb1} />

          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={s.goldLine} />
          <Text style={s.title}>Reset Password</Text>
          <Text style={s.sub}>
            Enter your email and we'll send you a reset link.
          </Text>

          {success ? (
            <View style={s.successBox}>
              <Text style={s.successText}>
                Check your inbox — a reset link is on its way.
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={s.successLink}>Back to Sign In</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
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
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />

              {error ? <Text style={s.error}>{error}</Text> : null}

              <TouchableOpacity
                style={[s.primaryBtn, loading && s.btnDisabled]}
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.85}
              >
                <Text style={s.primaryBtnText}>
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#08011a' },
  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 16, paddingBottom: 48 },
  orb1: {
    position: 'absolute', top: -80, right: -40, width: 260, height: 260,
    borderRadius: 130, backgroundColor: 'rgba(37,99,235,0.35)', opacity: 0.5,
  },
  backBtn: { marginBottom: 32, alignSelf: 'flex-start' },
  backText: { color: 'rgba(255,255,255,0.55)', fontSize: 15 },
  goldLine: { width: 44, height: 3, backgroundColor: '#f59e0b', borderRadius: 2, marginBottom: 24 },
  title: { color: '#ffffff', fontSize: 30, fontWeight: '900', letterSpacing: -0.4, marginBottom: 8 },
  sub: { color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 22, marginBottom: 36 },
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
  },
  btnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: '#08011a', fontSize: 16, fontWeight: '800' },
  successBox: { marginTop: 16, gap: 16 },
  successText: {
    color: '#a7f3d0',
    backgroundColor: 'rgba(16,185,129,0.12)',
    borderRadius: 10,
    padding: 16,
    fontSize: 15,
    lineHeight: 22,
  },
  successLink: { color: '#f59e0b', fontSize: 15, fontWeight: '600', textAlign: 'center' },
});
