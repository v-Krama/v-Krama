import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { name: "Cybersecurity", level: "Advanced" },
    { name: "Artificial Intelligence", level: "Intermediate" },
    { name: "Cloud Computing (AWS)", level: "Certified" },
    { name: "Python", level: "Advanced" },
    { name: "Ethical Hacking", level: "Advanced" },
    { name: "Web Development", level: "Intermediate" },
    { name: "React & Vite", level: "Intermediate" },
    { name: "Linux Administration", level: "Advanced" }
];

const Skills = () => {
    return (
        <section id="skills" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="neon-text"
                    style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                    CORE EXPERTISE
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="neon-border glitch-hover"
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{skill.name}</h3>
                            <p style={{ color: '#a0a0a0' }}>{skill.level}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
