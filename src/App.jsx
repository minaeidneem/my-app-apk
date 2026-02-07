import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AnalyticsPage from './components/AnalyticsPage';
import AttendancePage from './components/AttendancePage';
import SettingsPage from './components/SettingsPage';
import EmployeePortal from './components/EmployeePortal';
import BottomNav from './components/BottomNav';
import ManagerLogin from './components/ManagerLogin';
import SplashScreen from './components/SplashScreen'; // Import Splash

import LandingPage from './components/LandingPage';
import './components/LandingPage.css';
import { AppContext } from './context/AppContext';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  // State Machine: 'init' | 'ready' | 'error'
  const [appStatus, setAppStatus] = useState('init');

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [role, setRole] = useState(localStorage.getItem('role') || 'none');
  const [showLogin, setShowLogin] = useState(false);

  // Initialize App
  useEffect(() => {
    const initApp = async () => {
      try {
        // Enforce a minimum splash time for better UX (prevent flicker)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Hydrate state from localStorage (already done in initial state, but can be expanded)
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        setAppStatus('ready');
      } catch (error) {
        console.error("App initialization failed:", error);
        setAppStatus('error');
      }
    };

    initApp();

    // Fallback safety timeout (5s)
    const safetyTimeout = setTimeout(() => {
      setAppStatus(prev => prev === 'init' ? 'ready' : prev);
    }, 5000);

    return () => clearTimeout(safetyTimeout);
  }, [theme, lang]);

  useEffect(() => {
    if (appStatus === 'ready') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }
  }, [theme, lang, appStatus]);

  useEffect(() => {
    if (appStatus === 'ready') {
      localStorage.setItem('theme', theme);
      localStorage.setItem('lang', lang);
      localStorage.setItem('role', role);
    }
  }, [theme, lang, role, appStatus]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const logout = () => {
    setRole('none');
    setShowLogin(false);
  };

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'manager') {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  };

  if (appStatus === 'init') {
    return <SplashScreen />;
  }

  if (appStatus === 'error') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black', color: 'white' }}>
        <h2>Something went wrong. Please restart.</h2>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ theme, lang, role, setRole, toggleTheme, toggleLang, logout }}>
      <div className="app-shell">
        <div className="app-bg">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
        </div>

        {role !== 'none' && <Header />}

        <main className="app-container">
          <AnimatePresence mode="wait">
            {role === 'none' ? (
              <LandingPage key="landing" onSelectRole={handleSelectRole} lang={lang} />
            ) : showLogin ? (
              <ManagerLogin key="login" onBack={() => { setShowLogin(false); setRole('none'); }} />
            ) : role === 'employee' ? (
              <motion.div
                key="employee-portal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <EmployeePortal />
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeTab === 'home' && <HomePage onNavigate={setActiveTab} />}
                {activeTab === 'analytics' && <AnalyticsPage />}
                {activeTab === 'attendance' && <AttendancePage />}
                {activeTab === 'settings' && <SettingsPage />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {!showLogin && role === 'manager' && (
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
