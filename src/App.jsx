import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Directory from './components/Directory';
import EmployeePortal from './components/EmployeePortal';
import BottomNav from './components/BottomNav';
import ManagerLogin from './components/ManagerLogin';

import LandingPage from './components/LandingPage';
import './components/LandingPage.css';
import { AppContext } from './context/AppContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [role, setRole] = useState(localStorage.getItem('role') || 'none');
  const [showLogin, setShowLogin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }
  }, [theme, lang, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      localStorage.setItem('lang', lang);
      localStorage.setItem('role', role);
    }
  }, [theme, lang, role, mounted]);

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

  if (!mounted) return null;

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
                {activeTab === 'dashboard' ? <Dashboard /> : <Directory />}
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
