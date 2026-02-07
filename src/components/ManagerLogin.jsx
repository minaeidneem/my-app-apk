import React, { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LogIn, ShieldCheck, User, ArrowRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ManagerLogin = ({ onBack }) => {
    const { setRole, lang } = useContext(AppContext);
    const [name, setName] = useState('');

    const translations = {
        en: {
            title: "Manager Auth",
            placeholder: "Enter ID name (e.g. mina)",
            btn: "Authorize Session",
            back: "Back to Portal"
        },
        ar: {
            title: "دخول المدير",
            placeholder: "أدخل الاسم (مثلاً: مينا)",
            btn: "تخويل الجلسة",
            back: "العودة للبوابة"
        }
    };

    const t = translations[lang];

    const handleLogin = (e) => {
        e.preventDefault();
        if (name.toLowerCase() === 'mina') {
            setRole('manager');
        } else {
            alert(lang === 'en' ? 'Access Denied. Identity mismatch.' : 'تم رفض الوصول. الهوية غير متطابقة.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px'
            }}
        >
            <div className="em-card" style={{ width: '100%', padding: '40px 24px', textAlign: 'center' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'var(--accent-primary)',
                    borderRadius: '20px',
                    margin: '0 auto 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px var(--accent-glow)'
                }}>
                    <ShieldCheck size={32} color="#fff" />
                </div>

                <h2 className="gradient-text" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>{t.title}</h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginBottom: '32px' }}>Identity Verification Required</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="em-card" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: '12px', background: 'var(--bg-primary)' }}>
                        <User size={18} color="var(--text-dim)" />
                        <input
                            type="text"
                            placeholder={t.placeholder}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
                        />
                    </div>

                    <button type="submit" className="em-card" style={{ padding: '16px', background: 'var(--accent-primary)', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none' }}>
                        {t.btn}
                        <ArrowRight size={18} />
                    </button>
                </form>

                <button onClick={onBack} style={{ marginTop: '24px', color: 'var(--text-dim)', fontSize: '12px', fontWeight: 600 }}>
                    {t.back.toUpperCase()}
                </button>
            </div>
        </motion.div>
    );
};

export default ManagerLogin;
