import React, { useContext } from 'react';
import { Settings, Bell, Lock, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const SettingsPage = () => {
    const { lang } = useContext(AppContext);

    const translations = {
        en: {
            title: "Settings",
            subtitle: "& Preferences",
            comingSoon: "Coming Soon",
            description: "Application settings and preferences will be available here."
        },
        ar: {
            title: "الإعدادات",
            subtitle: "والتفضيلات",
            comingSoon: "قريباً",
            description: "إعدادات التطبيق والتفضيلات ستكون متاحة هنا."
        }
    };

    const t = translations[lang];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <h1 className="gradient-text" style={{ fontSize: '32px', letterSpacing: '-1px' }}>
                    {t.title} <span className="accent-text">{t.subtitle}</span>
                </h1>
            </header>

            <div className="em-card" style={{
                padding: '48px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                textAlign: 'center'
            }}>
                <div style={{ display: 'flex', gap: '16px', opacity: 0.5 }}>
                    <Settings size={32} />
                    <Bell size={32} />
                    <Lock size={32} />
                    <User size={32} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{t.comingSoon}</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>{t.description}</p>
            </div>
        </div>
    );
};

export default SettingsPage;
