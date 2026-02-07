import React from 'react';
import { motion } from 'framer-motion';
import landingEye from '../assets/landing_eye.png'; // Assuming this asset exists from previous steps

const SplashScreen = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 0 40px rgba(46, 204, 113, 0.3)'
                }}>
                    <img
                        src={landingEye}
                        alt="EM-AI"
                        style={{ width: '60px', height: 'auto', objectFit: 'contain' }}
                    />
                </div>

                <h1 style={{
                    color: 'white',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '32px',
                    fontWeight: 700,
                    marginBottom: '8px'
                }}>
                    EM-AI
                </h1>

                <motion.div
                    style={{
                        width: '40px',
                        height: '4px',
                        backgroundColor: '#2ecc71',
                        borderRadius: '2px'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                />
            </motion.div>
        </div>
    );
};

export default SplashScreen;
