import React from 'react';
import { motion } from 'framer-motion';
import { User, Car } from 'lucide-react';
import './LandingPage.css';
import landingEye from '../assets/landing_eye.png';

const LandingPage = ({ onSelectRole, lang }) => {
    const isAr = lang === 'ar';

    return (
        <div className="landing-wrapper">
            <div className="split-container">
                {/* Client Side (White) */}
                <motion.div
                    className="split-side client-side"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectRole('employee')}
                >
                    <div className="content">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <User size={64} className="icon" />
                            <h2>{isAr ? 'عميل' : 'Client'}</h2>
                            <p>{isAr ? 'اطلب رحلة أو توصيل' : 'Book a ride or delivery'}</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Driver Side (Dark) */}
                <motion.div
                    className="split-side driver-side"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectRole('manager')}
                >
                    <div className="content">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Car size={64} className="icon" />
                            <h2>{isAr ? 'سائق' : 'Driver'}</h2>
                            <p>{isAr ? 'ابدأ بالربح معنا' : 'Start earning with us'}</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating Logo Badge - Composite Design */}
                <div className="logo-badge-container">
                    <motion.div
                        className="logo-badge"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', damping: 12, stiffness: 120 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="logo-content">
                            <img src={landingEye} alt="EM-AI Eye" className="logo-eye" />
                            <h1 className="logo-text">EM-AI</h1>
                            <div className="logo-line"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
