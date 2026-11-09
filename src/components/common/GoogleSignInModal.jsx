import React, { useState } from 'react';
import { X, UserPlus, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const GoogleSignInModal = ({ isOpen, onClose, onSuccess, preferredRole = 'customer' }) => {
  const { loginWithGoogle } = useAuth();
  const [customMode, setCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');

  if (!isOpen) return null;

  // Preset quick Google accounts
  const quickAccounts = [
    {
      name: "Rajesh Mohanty",
      email: "rajesh.mohanty@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      role: preferredRole
    },
    {
      name: "Santosh Kumar Rout",
      email: "santosh.rout@gmail.com",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
      role: 'seller'
    }
  ];

  const handleSelectAccount = (account) => {
    setSelectedEmail(account.email);
    setIsAuthenticating(true);

    setTimeout(() => {
      const result = loginWithGoogle({
        ...account,
        role: preferredRole === 'seller' ? 'seller' : account.role
      });
      setIsAuthenticating(false);
      if (result.success) {
        if (onSuccess) onSuccess(result.user);
        onClose();
      }
    }, 600);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) return;

    let email = customEmail.trim();
    if (!email.includes('@')) {
      email = `${email}@gmail.com`;
    }

    setIsAuthenticating(true);
    setSelectedEmail(email);

    setTimeout(() => {
      const result = loginWithGoogle({
        name: customName.trim(),
        email: email,
        role: preferredRole
      });
      setIsAuthenticating(false);
      if (result.success) {
        if (onSuccess) onSuccess(result.user);
        onClose();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Google Header */}
        <div className="p-6 border-b border-slate-100 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Official Google G icon */}
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-slate-800">Sign in with Google</h3>
          <p className="text-xs text-slate-500 mt-1">
            Choose an account to continue to <strong className="text-navy-900">Jami Dunia</strong>
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isAuthenticating ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-700">Connecting Google Account...</p>
              <p className="text-[11px] text-slate-400">{selectedEmail}</p>
            </div>
          ) : !customMode ? (
            <div className="space-y-2.5">
              {quickAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectAccount(acc)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-left cursor-pointer group"
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-700">{acc.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{acc.email}</p>
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCustomMode(true)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl border border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 transition text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Use another Gmail account</p>
                  <p className="text-[11px] text-slate-500">Sign in with your own Google email</p>
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asit Kumar Mohanty"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Gmail Address</label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCustomMode(false)}
                  className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Google OAuth Verified
            </span>
            <span>Privacy • Terms</span>
          </div>
        </div>

      </div>
    </div>
  );
};
