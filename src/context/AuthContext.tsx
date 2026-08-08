import { createContext, useContext, useEffect, useState } from 'react';

interface Profile {
  phone: string;
  location: string;
  role: string;
  bio: string;
  avatarUrl: string | null;
}

interface AuthUser extends Profile {
  name: string;
  email: string;
}

interface PendingSignup {
  name: string;
  email: string;
  otp: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  pendingEmail: string | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  verifyOtp: (code: string) => { ok: boolean; error?: string };
  resendOtp: () => string | null;
  logout: () => void;
  updateProfile: (updates: Partial<Omit<AuthUser, 'email'>>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_KEY = 'auth_user';
const PENDING_KEY = 'auth_pending_signup';
const PROFILES_KEY = 'auth_profiles';

const DEFAULT_PROFILE: Profile = { phone: '', location: '', role: 'Member', bio: '', avatarUrl: null };

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getStoredProfiles(): Record<string, Profile> {
  try {
    return JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProfileFor(email: string, profile: Profile) {
  const all = getStoredProfiles();
  all[email] = profile;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(all));
}

function buildUser(name: string, email: string): AuthUser {
  const stored = getStoredProfiles()[email];
  const profile = stored || { ...DEFAULT_PROFILE };
  if (!stored) saveProfileFor(email, profile);
  return { name, email, ...profile };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const [pending, setPending] = useState<PendingSignup | null>(() => {
    const stored = sessionStorage.getItem(PENDING_KEY);
    return stored ? (JSON.parse(stored) as PendingSignup) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    if (pending) sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    else sessionStorage.removeItem(PENDING_KEY);
  }, [pending]);

  const login: AuthContextValue['login'] = (email, password) => {
    if (!email || !password) return { ok: false, error: 'Enter your email and password.' };
    if (password.length < 6) return { ok: false, error: 'Incorrect email or password.' };
    const name = email.split('@')[0].replace(/[._]/g, ' ');
    setUser(buildUser(name, email));
    return { ok: true };
  };

  const signup: AuthContextValue['signup'] = (name, email, password) => {
    if (!name || !email || !password) return { ok: false, error: 'Please fill in all fields.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    const otp = generateOtp();
    setPending({ name, email, otp });
    // eslint-disable-next-line no-console
    console.info(`[Femora demo] OTP for ${email}: ${otp}`);
    return { ok: true };
  };

  const verifyOtp: AuthContextValue['verifyOtp'] = (code) => {
    if (!pending) return { ok: false, error: 'No signup in progress. Please sign up again.' };
    if (code !== pending.otp) return { ok: false, error: 'Invalid code. Please try again.' };
    setUser(buildUser(pending.name, pending.email));
    setPending(null);
    return { ok: true };
  };

  const resendOtp: AuthContextValue['resendOtp'] = () => {
    if (!pending) return null;
    const otp = generateOtp();
    setPending({ ...pending, otp });
    // eslint-disable-next-line no-console
    console.info(`[Femora demo] New OTP for ${pending.email}: ${otp}`);
    return otp;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile: AuthContextValue['updateProfile'] = (updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, email, ...profile } = next;
      saveProfileFor(next.email, profile as Profile);
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        pendingEmail: pending?.email ?? null,
        login,
        signup,
        verifyOtp,
        resendOtp,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}