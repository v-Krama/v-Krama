import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skills = [
    { name: "Cybersecurity", level: "Advanced" },
    { name: "Artificial Intelligence", level: "Intermediate" },
    { name: "Cloud Computing (AWS)", level: "Certified" },
    { name: "Python", level: "Advanced" },
    { name: "Ethical Hacking", level: "Advanced" },
    { name: "Web Development", level: "Intermediate" },
    { name: "Web Scraping (Beautiful Soup)", level: "Intermediate" },

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
                    className="neon-text skills-title"
                >
                    CORE EXPERTISE
                </motion.h2>

                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="neon-border glitch-hover skill-item"
                        >
                            <h3>{skill.name}</h3>
                            <p>{skill.level}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
