import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, CheckCircle, XCircle, Users } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Attendance = () => {
    const { lang } = useContext(AppContext);
    const [checkedIn, setCheckedIn] = useState(false);

    const translations = {
        en: {
            title: "Attendance",
            subtitle: "Tracker",
            checkIn: "Check In",
            checkOut: "Check Out",
            todayStatus: "Today's Status",
            present: "Present",
            absent: "Absent",
            thisWeek: "This Week",
            thisMonth: "This Month",
            totalHours: "Total Hours",
            avgArrival: "Avg. Arrival",
            recentActivity: "Recent Activity",
            viewAll: "View All Records"
        },
        ar: {
            title: "الحضور",
            subtitle: "والمتابعة",
            checkIn: "تسجيل الحضور",
            checkOut: "تسجيل الانصراف",
            todayStatus: "حالة اليوم",
            present: "حاضر",
            absent: "غائب",
            thisWeek: "هذا الأسبوع",
            thisMonth: "هذا الشهر",
            totalHours: "إجمالي الساعات",
            avgArrival: "متوسط الوصول",
            recentActivity: "النشاط الأخير",
            viewAll: "عرض جميع السجلات"
        }
    };

    const t = translations[lang];

    const handleCheckInOut = () => {
        setCheckedIn(!checkedIn);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <h1 className="gradient-text" style={{ fontSize: '32px', letterSpacing: '-1px' }}>
                    {t.title} <span className="accent-text">{t.subtitle}</span>
                </h1>
            </header>

            {/* Check In/Out Button */}
            <motion.button
                onClick={handleCheckInOut}
                className="em-card"
                style={{
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    background: checkedIn ? 'rgba(16, 185, 129, 0.1)' : 'rgba(129, 140, 248, 0.1)',
                    borderColor: checkedIn ? 'rgba(16, 185, 129, 0.3)' : 'rgba(129, 140, 248, 0.3)',
                    cursor: 'pointer'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Clock size={48} color={checkedIn ? '#10b981' : '#818cf8'} />
                <div style={{ fontSize: '24px', fontWeight: 700, color: checkedIn ? '#10b981' : '#818cf8' }}>
                    {checkedIn ? t.checkOut : t.checkIn}
                </div>
                {checkedIn && (
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                        Checked in at 09:15 AM
                    </div>
                )}
            </motion.button>

            {/* Today's Status */}
            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t.todayStatus}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {checkedIn ? (
                        <>
                            <CheckCircle size={24} color="#10b981" />
                            <span style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>{t.present}</span>
                        </>
                    ) : (
                        <>
                            <XCircle size={24} color="#f59e0b" />
                            <span style={{ fontSize: '18px', fontWeight: 600, color: '#f59e0b' }}>{t.absent}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <AttendanceStatItem icon={<Calendar size={20} />} label={t.thisWeek} value="5/5" color="#10b981" />
                <AttendanceStatItem icon={<Calendar size={20} />} label={t.thisMonth} value="22/23" color="#818cf8" />
                <AttendanceStatItem icon={<Clock size={20} />} label={t.totalHours} value="176h" color="#22d3ee" />
                <AttendanceStatItem icon={<Users size={20} />} label={t.avgArrival} value="09:12" color="#f59e0b" />
            </div>

            {/* Recent Activity */}
            <div className="em-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>{t.recentActivity}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <ActivityItem date="Feb 7" checkIn="09:15" checkOut="17:45" status="complete" />
                    <ActivityItem date="Feb 6" checkIn="09:08" checkOut="17:30" status="complete" />
                    <ActivityItem date="Feb 5" checkIn="09:20" checkOut="18:00" status="complete" />
                </div>
            </div>

            {/* View All Button */}
            <motion.button
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
                {t.viewAll}
            </motion.button>
        </div>
    );
};

const AttendanceStatItem = ({ icon, label, value, color }) => (
    <div className="em-card" style={{ padding: '20px' }}>
        <div style={{ color: color, marginBottom: '12px' }}>{icon}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px' }}>{label.toUpperCase()}</div>
        <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>{value}</div>
    </div>
);

const ActivityItem = ({ date, checkIn, checkOut, status }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
                width: '4px',
                height: '40px',
                background: status === 'complete' ? '#10b981' : '#f59e0b',
                borderRadius: '2px'
            }} />
            <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{date}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                    {checkIn} - {checkOut}
                </div>
            </div>
        </div>
        <CheckCircle size={18} color="#10b981" />
    </div>
);

export default Attendance;
