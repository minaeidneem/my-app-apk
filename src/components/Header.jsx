import React, { useContext } from 'react';
import { Moon, Sun, Languages, Bell, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import logo from '../assets/logo.png';

const Header = () => {
    const { theme, lang, toggleTheme, toggleLang, role } = useContext(AppContext);

    return (
        <header className="header-fixed">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logo}
                        alt="EM-AI Logo"
                        style={{
                            height: '100%',
                            objectFit: 'contain',
                            // Subtle white glow/border on dark mode to keep the logo clear without inverting the green eye
                            filter: theme === 'dark' ? 'drop-shadow(0 0 5px rgba(255,255,255,0.2))' : 'none',
                        }}
                    />
                </div>
                <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 8px' }} />
                <div>
                    <h2 className="gradient-text" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                        EM-AI
                    </h2>
                    <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '1px' }}>
                        {role === 'manager' ? (lang === 'en' ? 'ADMIN PANEL' : 'لوحة المدير') : (lang === 'en' ? 'ENTITY PORTAL' : 'بوابة الموظف')}
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="em-card" style={{ display: 'flex', alignItems: 'center', padding: '6px 12px', gap: '10px' }}>
                    <button onClick={toggleLang} style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '12px' }}>
                        {lang === 'en' ? 'AR' : 'EN'}
                    </button>
                    <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)' }} />
                    <button onClick={toggleTheme} style={{ color: 'var(--text-primary)' }}>
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                <button style={{ color: 'var(--text-primary)', position: 'relative' }}>
                    <Bell size={20} />
                    <div style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: '#f43f5e', borderRadius: '50%', border: '2px solid var(--bg-primary)' }} />
                </button>
            </div>
        </header>
    );
};

export default Header;
