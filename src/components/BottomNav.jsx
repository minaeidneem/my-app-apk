import React, { useContext } from 'react';
import { LayoutDashboard, Users, Activity, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppContext } from '../App';

const BottomNav = ({ activeTab, setActiveTab }) => {
    const { lang, role } = useContext(AppContext);

    const translations = {
        en: { CORE: "CORE", LENS: "LENS", SYNC: "SYNC", DATA: "DATA" },
        ar: { CORE: "الرئيسية", LENS: "العدسة", SYNC: "مزامنة", DATA: "البيانات" }
    };

    const t = translations[lang];

    const tabs = [
        { id: 'dashboard', icon: LayoutDashboard, label: t.CORE },
        { id: 'directory', icon: Users, label: t.LENS },
        { id: 'activity', icon: Activity, label: t.SYNC },
        { id: 'settings', icon: Settings, label: t.DATA },
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        if (window.navigator.vibrate) window.navigator.vibrate(12);
    };

    return (
        <nav className="bottom-nav-em" style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            height: 'var(--nav-height)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: '24px',
            zIndex: 100,
            marginBottom: 'var(--safe-area-inset-bottom)',
            border: '1px solid var(--glass-border)',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px)'
        }}>
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '6px',
                            color: isActive ? 'var(--accent-secondary)' : 'var(--text-dim)',
                            position: 'relative',
                            width: '60px'
                        }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-pill"
                                style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    width: '4px',
                                    height: '4px',
                                    background: 'var(--accent-secondary)',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px var(--accent-secondary)'
                                }}
                            />
                        )}
                        <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
                        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1px' }}>{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;
