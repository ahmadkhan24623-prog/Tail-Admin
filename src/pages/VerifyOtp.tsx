import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';

const RESEND_SECONDS = 30;

export default function VerifyOtp() {
  const { pendingEmail, verifyOtp, resendOtp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!pendingEmail) {
    return <Navigate to="/signup" replace />;
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(6).fill('');
    pasted.split('').forEach((d, i) => { next[i] = d; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const code = digits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const result = verifyOtp(code);
      setSubmitting(false);
      if (result.ok) navigate('/', { replace: true });
      else setError(result.error || 'Verification failed.');
    }, 300);
  };

  const handleResend = () => {
    const otp = resendOtp();
    setCooldown(RESEND_SECONDS);
    setDigits(Array(6).fill(''));
    setError('');
    if (otp) {
      setNotice(`A new code was sent to ${pendingEmail}.`);
      setTimeout(() => setNotice(''), 4000);
    }
    inputRefs.current[0]?.focus();
  };

  return (
    <AuthLayout>
      <AuthCard
        icon={<ShieldCheck size={22} />}
        title="Verify your email"
        subtitle={<>Enter the 6-digit code we sent to <span className="font-semibold text-gray-600 dark:text-gray-300">{pendingEmail}</span></>}
        footer={
          <p className="text-sm text-gray-400">
            Didn't receive the code?{' '}
            {cooldown > 0 ? (
              <span className="text-gray-400">Resend in {cooldown}s</span>
            ) : (
              <button onClick={handleResend} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer">Resend code</button>
            )}
          </p>
        }
      >
        <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs leading-relaxed">
          <Info size={15} className="shrink-0 mt-0.5" />
          Demo mode: no email is actually sent — check the browser console for your verification code.
        </div>

        {notice && (
          <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 text-green-600 dark:text-green-400 text-sm">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            {notice}
          </div>
        )}
        {error && (
          <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="flex justify-between gap-2 sm:gap-3">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                inputMode="numeric"
                maxLength={1}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-100 outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            {submitting ? 'Verifying...' : (
              <>Verify Code <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
