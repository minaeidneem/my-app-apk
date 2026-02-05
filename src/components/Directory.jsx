import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Mail, MapPin, X, Fingerprint } from 'lucide-react';
import { INITIAL_EMPLOYEES } from '../data/employees';
import { AppContext } from '../App';

const Directory = () => {
    const { lang } = useContext(AppContext);
    const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const translations = {
        en: {
            title: "Entity",
            subtitle: "Index",
            placeholder: "Filter entity index...",
            indexed: "Entities Indexed",
            sync: "Synchronize Data",
            department: "Sector",
            id: "Entity ID",
            alias: "Network Alias"
        },
        ar: {
            title: "فهرس",
            subtitle: "الكيانات",
            placeholder: "ابحث عن كيان...",
            indexed: "كيان تم فهرستهم",
            sync: "مزامنة البيانات",
            department: "القطاع",
            id: "معرف الكيان",
            alias: "الاسم المستعار"
        }
    };

    const t = translations[lang];

    useEffect(() => {
        const interval = setInterval(() => {
            const names = ["Satya Nadella", "Sundar Pichai", "Tim Cook"];
            const newName = names[Math.floor(Math.random() * names.length)];
            setEmployees(prev => [{
                id: Date.now(),
                name: `${newName}`,
                role: "AI Architect",
                status: "Active",
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newName}${Date.now()}`,
                email: `${newName.toLowerCase().replace(" ", ".")}@em-ai.tech`,
                department: "Intelligence"
            }, ...prev]);
        }, 120000);
        return () => clearInterval(interval);
    }, []);

    const filtered = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <h1 className="gradient-text" style={{ fontSize: '32px' }}>
                    {t.title} <span className="accent-text">{t.subtitle}</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>{employees.length} {t.indexed}</p>
            </header>

            <div className="em-card" style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', gap: '12px' }}>
                <Search size={18} color="var(--text-dim)" />
                <input
                    placeholder={t.placeholder}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '15px' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.map((emp, i) => (
                    <motion.div
                        key={emp.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i < 10 ? i * 0.05 : 0 }}
                        className="em-card"
                        style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                        onClick={() => setSelectedEmployee(emp)}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div style={{ position: 'relative' }}>
                            <img src={emp.avatar} style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'var(--bg-secondary)' }} alt="" />
                            <div style={{ position: 'absolute', top: -2, right: -2, width: '10px', height: '10px', borderRadius: '50%', background: emp.status === 'Active' ? '#10b981' : '#f43f5e', border: '2px solid var(--bg-primary)' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '15px' }}>{emp.name}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.5px', fontWeight: 700 }}>{emp.role.toUpperCase()}</div>
                        </div>
                        <ChevronRight size={18} color="var(--text-dim)" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedEmployee && (
                    <ProfileDrawer employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} translations={t} />
                )}
            </AnimatePresence>
        </div>
    );
};

const ProfileDrawer = ({ employee, onClose, translations }) => (
    <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} onClick={onClose} />
        <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="em-card"
            style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1001, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, padding: '32px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--accent-glow)' }}
        >
            <div style={{ width: '40px', height: '4px', background: 'var(--text-dim)', borderRadius: '2px', margin: '0 auto 24px' }} />
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <img src={employee.avatar} style={{ width: '100px', height: '100px', borderRadius: '32px', marginBottom: '16px', border: '2px solid var(--accent-glow)' }} alt="" />
                <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{employee.name}</h2>
                <p className="accent-text" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1px', marginTop: '4px' }}>{employee.department.toUpperCase()}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <DetailRow icon={<Fingerprint size={18} />} label={translations.id} value={`#${employee.id.toString().slice(-6)}`} />
                <DetailRow icon={<Mail size={18} />} label={translations.alias} value={employee.email} />
                <DetailRow icon={<MapPin size={18} />} label={translations.department} value={employee.department} />
                <button className="em-card" style={{ width: '100%', padding: '16px', background: 'var(--accent-primary)', color: '#fff', fontWeight: 600, border: 'none', marginTop: '12px', boxShadow: '0 0 20px var(--accent-glow)' }}>{translations.sync}</button>
            </div>
        </motion.div>
    </>
);

const DetailRow = ({ icon, label, value }) => {
    const { lang } = useContext(AppContext);
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: 'var(--text-dim)' }}>{icon}</div>
            <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 700 }}>{label.toUpperCase()}</div>
                <div style={{ fontSize: '15px', fontWeight: 500 }}>{value}</div>
            </div>
        </div>
    );
};

export default Directory;
