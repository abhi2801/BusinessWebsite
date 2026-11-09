import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleSignInModal } from '../components/common/GoogleSignInModal';
import { ODISHA_DISTRICTS } from '../data/mockProperties';

export const AuthPage = ({ setActivePage, initialMode = 'login' }) => {
  const { login, register, resetPassword } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'forgot'

  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  // Status & Feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    city: 'Bhubaneswar',
    district: 'Khordha (Bhubaneswar)',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetCompleted, setResetCompleted] = useState(false);

  // Switch tabs and clear alerts
  const handleSwitchTab = (newMode) => {
    setMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = login(loginEmail, loginPassword, rememberMe);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    setSuccessMessage(`Welcome back, ${result.user.name}!`);
    setTimeout(() => {
      if (result.user.role === 'admin') {
        setActivePage('admin');
      } else {
        setActivePage('home');
      }
    }, 400);
  };

  // Handle Sign Up
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signupData.agreeTerms) {
      setErrorMessage('Please accept the Terms & Conditions and Privacy Policy to continue.');
      return;
    }

    setIsLoading(true);
    const result = register(signupData);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    setSuccessMessage(`Account successfully created for ${result.user.name}! Redirecting...`);
    setTimeout(() => {
      setActivePage('home');
    }, 600);
  };

  // Handle Password Reset
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('Please choose a new password with at least 6 characters.');
      return;
    }

    setIsLoading(true);
    const result = resetPassword(forgotEmail, newPassword);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    setResetCompleted(true);
    setSuccessMessage('Password updated successfully! You can now sign in with your new password.');
  };

  // Quick fill helper for testing
  const handleFillDemo = (type) => {
    setErrorMessage('');
    if (type === 'admin') {
      setLoginEmail('admin');
      setLoginPassword('pwd@123');
    } else if (type === 'seller') {
      setLoginEmail('santosh.rout@gmail.com');
      setLoginPassword('Password@123');
    } else {
      setLoginEmail('rajesh.mohanty@gmail.com');
      setLoginPassword('Password@123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-md border border-emerald-500/30">
            <Building2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl font-black text-navy-900 tracking-tight">
            JAMI<span className="text-emerald-600">DUNIA</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {mode === 'login' && 'Sign in to access your verified bookings, inquiries & dashboard'}
            {mode === 'signup' && 'Create your verified account to buy, sell, or book services'}
            {mode === 'forgot' && 'Reset your Jami Dunia account password'}
          </p>
        </div>

        {/* Tab Switcher (Sign In vs Sign Up) */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-5">
            <button
              type="button"
              onClick={() => handleSwitchTab('login')}
              className={`py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                mode === 'login' 
                  ? 'bg-white text-navy-900 shadow-sm' 
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('signup')}
              className={`py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                mode === 'signup' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Prominent Google (Gmail) Login Button */}
        {mode !== 'forgot' && (
          <div className="mb-5">
            <button
              type="button"
              onClick={() => setIsGoogleModalOpen(true)}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm hover:shadow transition cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{mode === 'login' ? 'Sign in with Google (Gmail)' : 'Sign up with Google (Gmail)'}</span>
            </button>

            <div className="relative my-4 flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold absolute">
                or continue with email
              </span>
            </div>
          </div>
        )}

        {/* Alert Notifications */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-800 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-semibold leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-emerald-800 text-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-semibold leading-relaxed">{successMessage}</div>
          </div>
        )}

        {/* ======================= LOGIN FORM ======================= */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full text-xs pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleSwitchTab('forgot')}
                  className="text-[11px] text-emerald-700 font-semibold hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-medium">Remember my session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-black text-xs rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? 'Verifying...' : 'Sign In to Jami Dunia'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Test credentials helper link */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500">
                Admin credentials: <strong className="text-navy-900 font-bold">admin</strong> / <strong className="text-navy-900 font-bold">pwd@123</strong>{' '}
                <button
                  type="button"
                  onClick={() => handleFillDemo('admin')}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer ml-1"
                >
                  (Fill Admin)
                </button>
              </p>
            </div>
          </form>
        )}

        {/* ======================= SIGN UP FORM ======================= */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Account Type <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSignupData(prev => ({ ...prev, role: 'customer' }))}
                  className={`py-2.5 px-3 rounded-xl font-bold border transition text-left cursor-pointer ${
                    signupData.role === 'customer' 
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-800' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-black">Buyer / Investor</div>
                  <div className="text-[10px] text-slate-500 font-normal">Buy land, villas & flats</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSignupData(prev => ({ ...prev, role: 'seller' }))}
                  className={`py-2.5 px-3 rounded-xl font-bold border transition text-left cursor-pointer ${
                    signupData.role === 'seller' 
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-800' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-black">Property Seller</div>
                  <div className="text-[10px] text-slate-500 font-normal">List land & properties</div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Legal Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Asit Kumar Mohanty"
                  value={signupData.name}
                  onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full text-xs pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full text-xs pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="98610 12345"
                    value={signupData.phone}
                    onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full text-xs pl-8 pr-2 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  District in Odisha <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={signupData.district}
                    onChange={(e) => setSignupData(prev => ({ ...prev, district: e.target.value }))}
                    className="w-full text-xs pl-8 pr-2 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {ODISHA_DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Create Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min 6 characters"
                  value={signupData.password}
                  onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full text-xs pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full text-xs pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={signupData.agreeTerms}
                  onChange={(e) => setSignupData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 mt-0.5"
                />
                <span className="leading-tight">
                  I agree to the <span className="text-emerald-700 font-semibold">Terms of Service</span> and acknowledge title verification policies.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? 'Creating Account...' : 'Complete Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ======================= FORGOT PASSWORD ======================= */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            {resetCompleted ? (
              <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-black text-navy-900 text-sm">Password Updated Successfully</h4>
                <p className="text-xs text-slate-600">
                  Your credentials have been securely refreshed. You can now log into your account with your new password.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResetCompleted(false);
                    setMode('login');
                    setLoginPassword('');
                  }}
                  className="w-full py-3 bg-emerald-600 text-white font-black text-xs rounded-xl shadow cursor-pointer mt-2"
                >
                  Proceed to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Registered Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full text-xs pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Choose New Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-black text-xs rounded-xl shadow transition cursor-pointer"
                >
                  {isLoading ? 'Updating...' : 'Update & Reset Password'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => handleSwitchTab('login')}
                    className="text-xs text-slate-600 font-bold hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>

      {/* Google Sign-In Sheet Dialog */}
      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        preferredRole={signupData.role || 'customer'}
        onClose={() => setIsGoogleModalOpen(false)}
        onSuccess={(user) => {
          setSuccessMessage(`Signed in with Google as ${user.name}!`);
          setTimeout(() => {
            if (user.role === 'admin') setActivePage('admin');
            else setActivePage('home');
          }, 400);
        }}
      />
    </div>
  );
};
