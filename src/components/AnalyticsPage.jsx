import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, Cpu, TrendingUp, TrendingDown } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const AnalyticsPage = () => {
    const { lang } = useContext(AppContext);
    const [heatmapData] = useState(() => Array.from({ length: 24 }).map(() => Math.random()));

    const translations = {
        en: {
            title: "Analytics",
            subtitle: "Overview",
            efficiency: "Efficiency Index",
            security: "Security",
            load: "Network Load",
            uptime: "System Uptime",
            neural: "Neural Pulse",
            performance: "Performance",
            threats: "Threats Blocked",
            activeUsers: "Active Users"
        },
        ar: {
            title: "التحليلات",
            subtitle: "نظرة عامة",
            efficiency: "مؤشر الكفاءة",
            security: "الأمان",
            load: "حمل الشبكة",
            uptime: "وقت التشغيل",
            neural: "النبض العصبي",
            performance: "الأداء",
            threats: "التهديدات المحظورة",
            activeUsers: "المستخدمون النشطون"
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

            {/* All KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                <KPICard icon={<Zap size={20} />} label={t.efficiency} value="89%" trend="up" color="#f59e0b" />
                <KPICard icon={<Shield size={20} />} label={t.security} value="HIGH" color="#22d3ee" />
                <KPICard icon={<Cpu size={20} />} label={t.load} value="12%" trend="down" color="#818cf8" />
                <KPICard icon={<Activity size={20} />} label={t.uptime} value="99.8%" color="#10b981" />
                <KPICard icon={<Shield size={20} />} label={t.threats} value="1,284" color="#ef4444" />
                <KPICard icon={<Activity size={20} />} label={t.activeUsers} value="942" trend="up" color="#8b5cf6" />
            </div>

            {/* Intelligence Heatmap */}
            <div className="em-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{t.neural}</h3>
                    <Activity size={18} color="var(--text-dim)" />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '4px',
                    height: '120px',
                    overflowX: 'auto',
                    paddingBottom: '8px'
                }}>
                    {heatmapData.map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${val * 100}%` }}
                            transition={{ delay: i * 0.02, type: 'spring' }}
                            style={{
                                minWidth: '12px',
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

const KPICard = ({ icon, label, value, trend, color }) => (
    <motion.div
        className="em-card"
        style={{ padding: '20px' }}
        whileHover={{ scale: 1.05 }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ color: color }}>{icon}</div>
            {trend && (
                <div style={{ color: trend === 'up' ? '#10b981' : '#ef4444' }}>
                    {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
            )}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '8px' }}>
            {label.toUpperCase()}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 700 }}>{value}</div>
    </motion.div>
);

export default AnalyticsPage;
