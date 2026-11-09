import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Pre-seeded verified accounts for administrator & reference testing
export const INITIAL_REGISTERED_USERS = [
  {
    id: "usr-admin-001",
    name: "Jami Dunia Administrator",
    username: "admin",
    email: "admin@jamidunia.in",
    phone: "+91 674 2501001",
    role: "admin",
    district: "Khordha",
    city: "Bhubaneswar",
    password: "pwd@123", // Strict Admin Password
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    savedProperties: [],
    createdAt: "2026-01-01T10:00:00.000Z"
  },
  {
    id: "usr-seller-001",
    name: "Santosh Kumar Rout",
    email: "santosh.rout@gmail.com",
    phone: "+91 98530 12345",
    role: "seller",
    district: "Cuttack",
    city: "Cuttack",
    password: "Password@123",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    savedProperties: ["LH-LND-104"],
    createdAt: "2026-01-15T10:00:00.000Z"
  },
  {
    id: "usr-buyer-001",
    name: "Rajesh Mohanty",
    email: "rajesh.mohanty@gmail.com",
    phone: "+91 98610 98765",
    role: "customer",
    district: "Khordha",
    city: "Bhubaneswar",
    password: "Password@123",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    savedProperties: ["LH-LND-101", "LH-VIL-301"],
    createdAt: "2026-02-01T10:00:00.000Z"
  }
];

export const AuthProvider = ({ children }) => {
  // 1. Registered Users Database (in localStorage)
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('jamidunia_users');
      if (saved) {
        let parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Enforce strict admin credentials: username/email is admin and password is pwd@123 only
          parsed = parsed.map(u => {
            if (u.role === 'admin' || u.email === 'admin@jamidunia.in' || u.username === 'admin') {
              return { ...u, role: 'admin', username: 'admin', email: 'admin@jamidunia.in', password: 'pwd@123' };
            }
            return u;
          });
          localStorage.setItem('jamidunia_users', JSON.stringify(parsed));
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading users db:", e);
    }
    // Seed initial users if none exist
    localStorage.setItem('jamidunia_users', JSON.stringify(INITIAL_REGISTERED_USERS));
    return INITIAL_REGISTERED_USERS;
  });

  // 2. Current Authenticated User (null initially if not signed in)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedActive = localStorage.getItem('jamidunia_active_user') || sessionStorage.getItem('jamidunia_active_user');
      if (savedActive) {
        const parsed = JSON.parse(savedActive);
        if (parsed?.role === 'admin' || parsed?.email === 'admin@jamidunia.in' || parsed?.username === 'admin') {
          parsed.password = 'pwd@123';
          parsed.username = 'admin';
          parsed.email = 'admin@jamidunia.in';
          parsed.role = 'admin';
          localStorage.setItem('jamidunia_active_user', JSON.stringify(parsed));
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  // 3. Saved property IDs for current user
  const [savedPropertyIds, setSavedPropertyIds] = useState(() => {
    try {
      if (currentUser?.savedProperties) return currentUser.savedProperties;
      const saved = localStorage.getItem('jamidunia_saved_props');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync users db to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jamidunia_users', JSON.stringify(users));
    } catch (e) {
      console.error("Error syncing users to localStorage:", e);
    }
  }, [users]);

  // Sync active user to storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('jamidunia_active_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('jamidunia_active_user');
        sessionStorage.removeItem('jamidunia_active_user');
      }
    } catch (e) {
      console.error("Error syncing active user to storage:", e);
    }
  }, [currentUser]);

  // Sync saved properties
  useEffect(() => {
    try {
      localStorage.setItem('jamidunia_saved_props', JSON.stringify(savedPropertyIds));
      if (currentUser) {
        setCurrentUser(prev => prev ? ({ ...prev, savedProperties: savedPropertyIds }) : null);
      }
    } catch (e) {
      console.error("Error syncing saved properties:", e);
    }
  }, [savedPropertyIds]);

  // Genuine Sign In
  const login = (identifier, password, rememberMe = true) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanId) {
      return { success: false, error: 'Please enter your username or email address.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter your account password.' };
    }

    // STRICT ADMIN VERIFICATION: Username/email 'admin' or 'admin@jamidunia.in'
    // Password MUST BE STRICTLY 'pwd@123' ONLY!
    if (cleanId === 'admin' || cleanId === 'admin@jamidunia.in') {
      if (cleanPass !== 'pwd@123') {
        return { 
          success: false, 
          error: 'Access Denied: Incorrect administrator password. The password for admin is pwd@123 only.' 
        };
      }

      // Valid admin password pwd@123!
      const adminRecord = users.find(u => u.role === 'admin' || u.email === 'admin@jamidunia.in') || INITIAL_REGISTERED_USERS[0];
      const authenticatedAdmin = {
        ...adminRecord,
        role: 'admin',
        username: 'admin',
        email: 'admin@jamidunia.in',
        password: 'pwd@123'
      };

      setCurrentUser(authenticatedAdmin);
      setSavedPropertyIds(authenticatedAdmin.savedProperties || []);

      if (rememberMe) {
        localStorage.setItem('jamidunia_active_user', JSON.stringify(authenticatedAdmin));
      } else {
        sessionStorage.setItem('jamidunia_active_user', JSON.stringify(authenticatedAdmin));
        localStorage.removeItem('jamidunia_active_user');
      }

      return { success: true, user: authenticatedAdmin };
    }

    // Regular Customer / Seller verification
    const matchedUser = users.find(u => 
      u.email.toLowerCase() === cleanId || 
      (u.username && u.username.toLowerCase() === cleanId)
    );

    if (!matchedUser) {
      return { 
        success: false, 
        error: 'No account registered with this email or username. Please click "Create Account" below to register.' 
      };
    }

    // If matched user has admin role, enforce pwd@123 strictly
    if (matchedUser.role === 'admin') {
      if (cleanPass !== 'pwd@123') {
        return {
          success: false,
          error: 'Access Denied: Incorrect administrator password. Password is pwd@123 only.'
        };
      }
    } else {
      if (matchedUser.password !== cleanPass) {
        return { 
          success: false, 
          error: 'Incorrect password. Please verify and try again, or click "Forgot Password".' 
        };
      }
    }

    // Login successful
    setCurrentUser(matchedUser);
    setSavedPropertyIds(matchedUser.savedProperties || []);
    
    if (rememberMe) {
      localStorage.setItem('jamidunia_active_user', JSON.stringify(matchedUser));
    } else {
      sessionStorage.setItem('jamidunia_active_user', JSON.stringify(matchedUser));
      localStorage.removeItem('jamidunia_active_user');
    }

    return { success: true, user: matchedUser };
  };

  // Genuine Sign Up / Registration
  const register = (userData) => {
    const { name, email, phone, city, district, password, confirmPassword, role } = userData;
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();
    const cleanConfirm = (confirmPassword || '').trim();
    const cleanPhone = (phone || '').replace(/[\s-+()]/g, '');

    // Form validations
    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'Please enter your full legal name.' };
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }
    if (!cleanPass || cleanPass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    if (cleanConfirm && cleanPass !== cleanConfirm) {
      return { success: false, error: 'Passwords do not match. Please re-enter identical passwords.' };
    }

    // Check duplicate email
    const exists = users.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { 
        success: false, 
        error: 'An account with this email address already exists. Please sign in instead.' 
      };
    }

    // Format Indian mobile number nicely
    const formattedPhone = cleanPhone.startsWith('91') && cleanPhone.length > 10
      ? `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 7)} ${cleanPhone.slice(7)}`
      : `+91 ${cleanPhone.slice(-10, -5)} ${cleanPhone.slice(-5)}`;

    const newUser = {
      id: `usr-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      name: cleanName,
      email: cleanEmail,
      phone: formattedPhone,
      city: (city || 'Bhubaneswar').trim(),
      district: (district || 'Khordha').trim(),
      role: role === 'seller' ? 'seller' : 'customer',
      password: cleanPass,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=059669,047857,0284c7`,
      savedProperties: [],
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    localStorage.setItem('jamidunia_users', JSON.stringify(updatedUsers));

    // Sign in the newly registered user
    setCurrentUser(newUser);
    setSavedPropertyIds([]);
    localStorage.setItem('jamidunia_active_user', JSON.stringify(newUser));

    return { success: true, user: newUser };
  };

  // Google / Gmail Authentication
  const loginWithGoogle = (googleUserData = {}) => {
    const cleanEmail = (googleUserData.email || 'user@gmail.com').trim().toLowerCase();
    const cleanName = (googleUserData.name || cleanEmail.split('@')[0]).trim();
    
    // Check if user already exists
    let matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setSavedPropertyIds(matchedUser.savedProperties || []);
      localStorage.setItem('jamidunia_active_user', JSON.stringify(matchedUser));
      return { success: true, user: matchedUser, isNew: false };
    }

    // Register new Google account
    const newGoogleUser = {
      id: `usr-google-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: googleUserData.phone || "+91 98610 " + Math.floor(10000 + Math.random() * 90000),
      city: googleUserData.city || 'Bhubaneswar',
      district: googleUserData.district || 'Khordha',
      role: googleUserData.role || 'customer',
      password: `google_oauth_${Date.now()}`,
      avatar: googleUserData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=4285F4,34A853,EA4335`,
      isGoogleAuth: true,
      savedProperties: [],
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [newGoogleUser, ...users];
    setUsers(updatedUsers);
    localStorage.setItem('jamidunia_users', JSON.stringify(updatedUsers));

    setCurrentUser(newGoogleUser);
    setSavedPropertyIds([]);
    localStorage.setItem('jamidunia_active_user', JSON.stringify(newGoogleUser));

    return { success: true, user: newGoogleUser, isNew: true };
  };

  // Reset password
  const resetPassword = (email, newPassword) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (newPassword || '').trim();

    if (!cleanEmail) {
      return { success: false, error: 'Please enter your registered email address.' };
    }
    if (!cleanPass || cleanPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }

    const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail);
    if (userIndex === -1) {
      return { 
        success: false, 
        error: 'No registered account found with this email address.' 
      };
    }

    const updatedUsers = [...users];
    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: cleanPass
    };
    setUsers(updatedUsers);
    localStorage.setItem('jamidunia_users', JSON.stringify(updatedUsers));

    return { success: true };
  };

  // Sign Out
  const logout = () => {
    setCurrentUser(null);
    setSavedPropertyIds([]);
    localStorage.removeItem('jamidunia_active_user');
    sessionStorage.removeItem('jamidunia_active_user');
  };

  // Update profile
  const updateProfile = (updates) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);

    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...updates };
      setUsers(updatedUsers);
      localStorage.setItem('jamidunia_users', JSON.stringify(updatedUsers));
    }
  };

  // Toggle favorite / saved property
  const toggleSaveProperty = (propId) => {
    setSavedPropertyIds(prev => {
      const next = prev.includes(propId)
        ? prev.filter(id => id !== propId)
        : [...prev, propId];
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        isSeller: currentUser?.role === 'seller',
        login,
        loginWithGoogle,
        register,
        resetPassword,
        logout,
        savedPropertyIds,
        toggleSaveProperty,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
