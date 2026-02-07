import React from 'react';
import { motion } from 'framer-motion';
import { User, Car } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onSelectRole, lang }) => {
    const isAr = lang === 'ar';

    return (
        <div className="landing-wrapper">
            <div className="split-container">
                {/* Client Side (White) */}
                <motion.div
                    className="split-side client-side"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectRole('employee')}
                >
                    <div className="content">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
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
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectRole('manager')}
                >
                    <div className="content">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Car size={64} className="icon" />
                            <h2>{isAr ? 'سائق' : 'Driver'}</h2>
                            <p>{isAr ? 'ابدأ بالربح معنا' : 'Start earning with us'}</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating Logo Badge */}
                <div className="logo-badge-container">
                    <motion.div
                        className="logo-badge"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 12 }}
                    >
                        <img src="/assets/logo.png" alt="Logo" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
