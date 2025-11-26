import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/images/mProfile.JPG';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="neon-text"
                    style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                    ABOUT ME
                </motion.h2>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', md: { flexDirection: 'row' } }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="neon-border"
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            flexShrink: 0
                        }}
                    >
                        <img src={profileImg} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ maxWidth: '800px', textAlign: 'center' }}
                    >
                        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                            I am a passionate student currently in my third semester at Tech AI College of Management and Law, Rajarshi Janak University, located in New Baneshwor, Kathmandu.
                        </p>
                        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                            My focus is on the intersection of Cybersecurity and Artificial Intelligence. I am constantly seeking to expand my knowledge beyond the curriculum, looking for internships and opportunities to apply my skills in real-world cloud architecture and security scenarios.
                        </p>
                        <p style={{ lineHeight: '1.6' }}>
                            I thrive on solving complex problems and building secure, scalable systems using the latest technologies.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
