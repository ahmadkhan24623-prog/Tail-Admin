import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Check, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const STRENGTH_LABELS = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['bg-gray-200 dark:bg-gray-700', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-green-500'];

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please accept the Terms of Service to continue.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const result = signup(name, email, password);
      setSubmitting(false);
      if (result.ok) navigate('/otp');
      else setError(result.error || 'Something went wrong.');
    }, 400);
  };

  return (
    <AuthLayout>
      <div className="lg:hidden w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-base mb-6 shadow-md shadow-blue-600/30 mx-auto">TA</div>

      <AuthCard
        icon={<UserPlus size={22} />}
        title="Create your account"
        subtitle="Start your free trial, no credit card required"
        footer={
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sign in</Link>
          </p>
        }
      >
        {error && (
          <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 block">Full Name</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors"><User size={17} /></span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 block">Email Address</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors"><Mail size={17} /></span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 block">Password</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors"><Lock size={17} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-11 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < strength ? STRENGTH_COLORS[strength] : 'bg-gray-200 dark:bg-gray-700'}`}></span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{STRENGTH_LABELS[strength]}</p>
              </div>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 block">Confirm Password</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors"><Lock size={17} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-11 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
              {confirm && password === confirm && (
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-green-500"><Check size={17} /></span>
              )}
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none pt-1">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
            />
            I agree to the <span className="text-gray-600 dark:text-gray-300 font-medium">Terms of Service</span> and <span className="text-gray-600 dark:text-gray-300 font-medium">Privacy Policy</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            {submitting ? 'Creating account...' : (
              <>Create Account <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
