import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, Cpu, Flame } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
    const { lang } = useContext(AppContext);
    const [pulse, setPulse] = useState(88);
    // Lazy initialization for random data ensures it's created once and pure
    const [heatmapData] = useState(() => Array.from({ length: 24 }).map(() => Math.random()));

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
            neural: "Neural Pulse"
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
            neural: "النبض العصبي"
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

            {/* Main KPI */}
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

            {/* Grid Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <StatItem icon={<Shield size={20} />} label={t.security} value="HIGH" color="#22d3ee" />
                <StatItem icon={<Cpu size={20} />} label={t.load} value="12%" color="#818cf8" />
            </div>

            {/* Intelligence Heatmap */}
            <div className="em-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{t.neural}</h3>
                    <Activity size={18} color="var(--text-dim)" />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px' }}>
                    {heatmapData.map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${val * 100}%` }}
                            transition={{ delay: i * 0.02, type: 'spring' }}
                            style={{
                                flex: 1,
                                background: i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)',
                                borderRadius: '2px',
                                opacity: 0.6 + val * 0.4
                            }}
                        />
                    ))}
                </div>
            </div>
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

export default Dashboard;
