import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Analytics = () => {
    const { lang } = useContext(AppContext);
    const [heatmapData] = useState(() => Array.from({ length: 24 }).map(() => Math.random()));
    const [chartData] = useState(() => Array.from({ length: 7 }).map(() => Math.random()));

    const translations = {
        en: {
            title: "Analytics",
            subtitle: "Dashboard",
            neural: "Neural Pulse",
            weeklyTrend: "Weekly Trend",
            performance: "Performance Metrics",
            efficiency: "Efficiency Over Time",
            insights: "Key Insights"
        },
        ar: {
            title: "التحليلات",
            subtitle: "لوحة البيانات",
            neural: "النبض العصبي",
            weeklyTrend: "الاتجاه الأسبوعي",
            performance: "مقاييس الأداء",
            efficiency: "الكفاءة بمرور الوقت",
            insights: "الرؤى الرئيسية"
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

            {/* Neural Pulse Heatmap */}
            <div className="em-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{t.neural}</h3>
                    <Activity size={18} color="var(--text-dim)" />
                </div>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '120px', minWidth: '400px' }}>
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
                                    opacity: 0.6 + val * 0.4,
                                    minWidth: '12px'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly Trend */}
            <div className="em-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{t.weeklyTrend}</h3>
                    <TrendingUp size={18} color="var(--text-dim)" />
                </div>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '150px', minWidth: '350px' }}>
                        {chartData.map((val, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val * 100}%` }}
                                    transition={{ delay: i * 0.1, type: 'spring' }}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))',
                                        borderRadius: '4px',
                                        minWidth: '40px'
                                    }}
                                />
                                <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <MetricCard icon={<BarChart3 size={20} />} label={t.performance} value="94.2%" trend="+3.1%" color="#10b981" />
                <MetricCard icon={<PieChart size={20} />} label={t.efficiency} value="89.7%" trend="+1.8%" color="#818cf8" />
            </div>

            {/* Key Insights */}
            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t.insights}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <InsightItem text="Peak activity detected during 14:00-16:00" impact="high" />
                    <InsightItem text="System efficiency improved by 3.2%" impact="positive" />
                    <InsightItem text="Network load stable across all nodes" impact="neutral" />
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ icon, label, value, trend, color }) => (
    <motion.div className="em-card" style={{ padding: '20px' }} whileHover={{ scale: 1.05 }}>
        <div style={{ color: color, marginBottom: '12px' }}>{icon}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px' }}>{label.toUpperCase()}</div>
        <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px' }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>{trend}</div>
    </motion.div>
);

const InsightItem = ({ text, impact }) => {
    const colors = {
        high: '#f59e0b',
        positive: '#10b981',
        neutral: '#818cf8'
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
                width: '4px',
                height: '30px',
                background: colors[impact],
                borderRadius: '2px'
            }} />
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{text}</div>
        </div>
    );
};

export default Analytics;
