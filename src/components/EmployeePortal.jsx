import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LogOut, ClipboardList, Clock, Star, MessageSquare } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const EmployeePortal = () => {
    const { lang, logout } = useContext(AppContext);

    const translations = {
        en: {
            welcome: "Welcome back,",
            name: "Bill McBride",
            role: "AI Intelligence Officer",
            tasks: "Current Objectives",
            logout: "Exit Session",
            activity: "Recent Logs"
        },
        ar: {
            welcome: "مرحباً بك مجدداً،",
            name: "بيل ماكبرايد",
            role: "مسؤول ذكاء اصطناعي",
            tasks: "المهام الحالية",
            logout: "تسجيل الخروج",
            activity: "السجلات الأخيرة"
        }
    };

    const t = translations[lang];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{t.welcome}</p>
                <h1 className="gradient-text" style={{ fontSize: '32px' }}>{t.name}</h1>
                <p className="accent-text" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1px' }}>{t.role.toUpperCase()}</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <ActionCard icon={<ClipboardList color="#818cf8" />} label={t.tasks} count="4" />
                <ActionCard icon={<Clock color="#22d3ee" />} label="Hours" count="38h" />
            </div>

            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>{t.tasks}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <TaskItem label="Neural Sync Verification" time="2h remaining" status="high" />
                    <TaskItem label="Entity Directory Audit" time="5h remaining" status="medium" />
                    <TaskItem label="System Calibration" time="Tomorrow" status="low" />
                </div>
            </div>

            <button
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
                    marginTop: 'auto'
                }}
            >
                <LogOut size={20} />
                {t.logout}
            </button>
        </div>
    );
};

const ActionCard = ({ icon, label, count }) => (
    <div className="em-card" style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
        <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{count}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.5px' }}>{label.toUpperCase()}</div>
    </div>
);

const TaskItem = ({ label, time, status }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
            width: '4px',
            height: '30px',
            background: status === 'high' ? '#f43f5e' : status === 'medium' ? '#fb923c' : '#10b981',
            borderRadius: '2px'
        }} />
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{time}</div>
        </div>
        <ChevronRight size={14} color="var(--text-dim)" />
    </div>
);

const ChevronRight = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export default EmployeePortal;
