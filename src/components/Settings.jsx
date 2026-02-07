import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe, Bell, Shield, User, LogOut } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Settings = () => {
    const { lang, theme, toggleTheme, toggleLang, logout } = useContext(AppContext);

    const translations = {
        en: {
            title: "Settings",
            subtitle: "Preferences",
            appearance: "Appearance",
            language: "Language",
            notifications: "Notifications",
            security: "Security & Privacy",
            account: "Account",
            darkMode: "Dark Mode",
            lightMode: "Light Mode",
            english: "English",
            arabic: "Arabic",
            enableNotifications: "Enable Notifications",
            twoFactor: "Two-Factor Authentication",
            changePassword: "Change Password",
            viewProfile: "View Profile",
            logout: "Logout",
            version: "Version 1.0.0"
        },
        ar: {
            title: "الإعدادات",
            subtitle: "والتفضيلات",
            appearance: "المظهر",
            language: "اللغة",
            notifications: "الإشعارات",
            security: "الأمان والخصوصية",
            account: "الحساب",
            darkMode: "الوضع الداكن",
            lightMode: "الوضع الفاتح",
            english: "الإنجليزية",
            arabic: "العربية",
            enableNotifications: "تفعيل الإشعارات",
            twoFactor: "المصادقة الثنائية",
            changePassword: "تغيير كلمة المرور",
            viewProfile: "عرض الملف الشخصي",
            logout: "تسجيل الخروج",
            version: "الإصدار 1.0.0"
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

            {/* Appearance */}
            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                    {t.appearance}
                </h3>
                <SettingToggle
                    label={theme === 'dark' ? t.darkMode : t.lightMode}
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    icon={theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                />
            </div>

            {/* Language */}
            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={18} />
                    {t.language}
                </h3>
                <SettingToggle
                    label={lang === 'en' ? t.english : t.arabic}
                    checked={lang === 'ar'}
                    onChange={toggleLang}
                    icon={<Globe size={20} />}
                />
            </div>

            {/* Notifications */}
            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bell size={18} />
                    {t.notifications}
                </h3>
                <SettingToggle
                    label={t.enableNotifications}
                    checked={true}
                    onChange={() => { }}
                    icon={<Bell size={20} />}
                />
            </div>

            {/* Security */}
            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={18} />
                    {t.security}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <SettingButton label={t.twoFactor} icon={<Shield size={20} />} />
                    <SettingButton label={t.changePassword} icon={<Shield size={20} />} />
                </div>
            </div>

            {/* Account */}
            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} />
                    {t.account}
                </h3>
                <SettingButton label={t.viewProfile} icon={<User size={20} />} />
            </div>

            {/* Logout Button */}
            <motion.button
                onClick={logout}
                className="em-card"
                style={{
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    background: 'rgba(244, 63, 94, 0.1)',
                    borderColor: 'rgba(244, 63, 94, 0.2)',
                    color: '#f43f5e',
                    fontWeight: 700,
                    cursor: 'pointer'
                }}
                whileTap={{ scale: 0.98 }}
            >
                <LogOut size={20} />
                {t.logout}
            </motion.button>

            {/* Version */}
            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-dim)', paddingBottom: '20px' }}>
                {t.version}
            </div>
        </div>
    );
};

const SettingToggle = ({ label, checked, onChange, icon }) => (
    <motion.div
        onClick={onChange}
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            background: 'rgba(129, 140, 248, 0.05)',
            borderRadius: '12px',
            cursor: 'pointer'
        }}
        whileTap={{ scale: 0.98 }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ color: 'var(--accent-primary)' }}>{icon}</div>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
        </div>
        <div style={{
            width: '48px',
            height: '24px',
            background: checked ? 'var(--accent-primary)' : 'var(--text-dim)',
            borderRadius: '12px',
            position: 'relative',
            transition: 'background 0.3s'
        }}>
            <motion.div
                animate={{ x: checked ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                    width: '20px',
                    height: '20px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: '2px'
                }}
            />
        </div>
    </motion.div>
);

const SettingButton = ({ label, icon }) => (
    <motion.button
        className="em-card"
        style={{
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(129, 140, 248, 0.05)',
            borderColor: 'transparent',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left'
        }}
        whileTap={{ scale: 0.98 }}
    >
        <div style={{ color: 'var(--accent-primary)' }}>{icon}</div>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
    </motion.button>
);

export default Settings;
