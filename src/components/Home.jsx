import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Home = () => {
    const { lang } = useContext(AppContext);
    const [pulse, setPulse] = useState(88);
    const [showDetails, setShowDetails] = useState(false);

    const translations = {
        en: {
            title: "Command",
            subtitle: "Center",
            status: "System Operational",
            activeNode: "Active Node",
            efficiency: "Efficiency Index",
            peak: "+2.4% from peak",
            sync: "Real-time Sync",
            security: "Security",
            load: "Network Load",
            viewDetails: "View Details",
            hideDetails: "Hide Details",
            totalUsers: "Total Users",
            activeUsers: "Active Users",
            serverUptime: "Server Uptime",
            responseTime: "Response Time"
        },
        ar: {
            title: "مركز",
            subtitle: "القيادة",
            status: "النظام قيد التشغيل",
            activeNode: "نقطة نشطة",
            efficiency: "مؤشر الكفاءة",
            peak: "+2.4% من الذروة",
            sync: "مزامنة مباشرة",
            security: "الأمان",
            load: "حمل الشبكة",
            viewDetails: "عرض التفاصيل",
            hideDetails: "إخفاء التفاصيل",
            totalUsers: "إجمالي المستخدمين",
            activeUsers: "المستخدمون النشطون",
            serverUptime: "وقت تشغيل الخادم",
            responseTime: "وقت الاستجابة"
        }
    };

    const t = translations[lang];

    useEffect(() => {
        const interval = setInterval(() => {
            setPulse(prev => Math.min(100, Math.max(80, prev + (Math.random() - 0.5) * 4)));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '32px', letterSpacing: '-1px' }}>
                        {t.title} <span className="accent-text">{t.subtitle}</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{t.status}</p>
                </div>
                <div className="em-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="status-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{t.activeNode}</span>
                </div>
            </header>

            {/* Primary KPI - Efficiency */}
            <motion.div
                className="em-card"
                style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}
                whileHover={{ scale: 1.02 }}
            >
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
                    <Zap size={24} className="accent-text" />
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{t.efficiency}</div>
                <div style={{ fontSize: '48px', fontWeight: 700 }}>{Math.round(pulse)}<span style={{ fontSize: '24px', opacity: 0.5 }}>%</span></div>
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#10b981' }}>{t.peak}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>|</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{t.sync}</span>
                </div>
            </motion.div>

            {/* Top 3 KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <StatItem icon={<Shield size={20} />} label={t.security} value="HIGH" color="#22d3ee" />
                <StatItem icon={<Cpu size={20} />} label={t.load} value="12%" color="#818cf8" />
            </div>

            {/* View Details Toggle */}
            <motion.button
                onClick={() => setShowDetails(!showDetails)}
                className="em-card"
                style={{
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'rgba(129, 140, 248, 0.1)',
                    borderColor: 'rgba(129, 140, 248, 0.2)',
                    color: '#818cf8',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer'
                }}
                whileTap={{ scale: 0.98 }}
            >
                {showDetails ? t.hideDetails : t.viewDetails}
                {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </motion.button>

            {/* Expandable Details */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '8px' }}>
                            <StatItem icon={<Zap size={20} />} label={t.totalUsers} value="1284" color="#10b981" />
                            <StatItem icon={<Cpu size={20} />} label={t.activeUsers} value="942" color="#f59e0b" />
                            <StatItem icon={<Shield size={20} />} label={t.serverUptime} value="99.8%" color="#22d3ee" />
                            <StatItem icon={<Zap size={20} />} label={t.responseTime} value="32ms" color="#818cf8" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatItem = ({ icon, label, value, color }) => (
    <div className="em-card" style={{ padding: '20px' }}>
        <div style={{ color: color, marginBottom: '12px' }}>{icon}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px' }}>{label.toUpperCase()}</div>
        <div style={{ fontSize: '20px', fontWeight: 700 }}>{value}</div>
    </div>
);

export default Home;
