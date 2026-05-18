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

const INITIAL = {
  firstName: '', lastName: '', email: '',
  password: '', phoneNumber: '', username: '', age: '',
};

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }));

  const handleRegister = async () => {
    setError('');
    const { firstName, lastName, email, password, phoneNumber, username, age } = form;
    if (!firstName || !lastName || !email || !password || !phoneNumber || !username || !age) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!/^[0-9]{10,15}$/.test(phoneNumber)) {
      setError('Phone must be 10–15 digits, no spaces or dashes');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/customers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, age: parseInt(age, 10) }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
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

          <Text style={s.title}>Create Account</Text>
          <Text style={s.sub}>Join RewardsNow for free</Text>

          <View style={s.row}>
            <View style={s.half}>
              <Text style={s.label}>FIRST NAME</Text>
              <TextInput
                style={s.input}
                placeholder="First name"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={form.firstName}
                onChangeText={set('firstName')}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>
            <View style={s.half}>
              <Text style={s.label}>LAST NAME</Text>
              <TextInput
                style={s.input}
                placeholder="Last name"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={form.lastName}
                onChangeText={set('lastName')}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>
          </View>

          <Text style={s.label}>USERNAME</Text>
          <TextInput
            style={s.input}
            placeholder="username"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={form.username}
            onChangeText={set('username')}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          <Text style={s.label}>EMAIL</Text>
          <TextInput
            style={s.input}
            placeholder="you@email.com"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={form.email}
            onChangeText={set('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          <View style={s.row}>
            <View style={s.half}>
              <Text style={s.label}>PHONE</Text>
              <TextInput
                style={s.input}
                placeholder="10–15 digits"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={form.phoneNumber}
                onChangeText={set('phoneNumber')}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>
            <View style={s.half}>
              <Text style={s.label}>AGE</Text>
              <TextInput
                style={s.input}
                placeholder="Age"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={form.age}
                onChangeText={set('age')}
                keyboardType="number-pad"
                returnKeyType="next"
              />
            </View>
          </View>

          <Text style={s.label}>PASSWORD</Text>
          <TextInput
            style={s.input}
            placeholder="At least 8 characters"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={form.password}
            onChangeText={set('password')}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />

          {error ? <Text style={s.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[s.primaryBtn, loading && s.btnDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnText}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerLabel}>or</Text>
            <View style={s.dividerLine} />
          </View>

          <TouchableOpacity
            style={s.ghostBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.75}
          >
            <Text style={s.ghostBtnText}>Already have an account? Sign In</Text>
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
    position: 'absolute', top: -80, left: -60, width: 280, height: 280,
    borderRadius: 140, backgroundColor: 'rgba(37,99,235,0.4)', opacity: 0.5,
  },
  orb2: {
    position: 'absolute', bottom: 80, right: -60, width: 220, height: 220,
    borderRadius: 110, backgroundColor: 'rgba(217,70,239,0.2)', opacity: 0.4,
  },
  backBtn: { marginBottom: 24, alignSelf: 'flex-start' },
  backText: { color: 'rgba(255,255,255,0.55)', fontSize: 15 },
  logo: { width: 130, height: 40, marginBottom: 18 },
  goldLine: { width: 44, height: 3, backgroundColor: '#f59e0b', borderRadius: 2, marginBottom: 22 },
  title: { color: '#ffffff', fontSize: 28, fontWeight: '900', letterSpacing: -0.4, marginBottom: 6 },
  sub: { color: 'rgba(255,255,255,0.55)', fontSize: 15, marginBottom: 28 },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  label: {
    color: '#f59e0b', fontSize: 10, fontWeight: '700',
    letterSpacing: 2, marginBottom: 7, textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 18,
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
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
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
