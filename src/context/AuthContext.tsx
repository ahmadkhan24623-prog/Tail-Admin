import { createContext, useContext, useEffect, useState } from 'react';

interface AuthUser {
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
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_KEY = 'auth_user';
const PENDING_KEY = 'auth_pending_signup';

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
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
    setUser({ name: email.split('@')[0].replace(/[._]/g, ' '), email });
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
    setUser({ name: pending.name, email: pending.email });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
