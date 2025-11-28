import React from 'react';
import { motion } from 'framer-motion';
import awsBadge from '../assets/images/aws-certified-solutions-architect-associate.png';
import cehBadge from '../assets/images/CEH.png';
import pythonBadge from '../assets/images/pythonAI.png';

const certifications = [
    {
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        date: "2025",
        image: awsBadge,
        link: "https://www.credly.com/badges/875eb788-b18b-4302-98cd-96cead961d5c/public_url",
        doc: "./documents/aws solution architect training.pdf"
    },
    {
        title: "Ethical Hacking Training",
        issuer: "Training Institute",
        date: "2024",
        image: cehBadge,
        doc: "./documents/EthicalHacking.pdf"
    },
    {
        title: "Python with AI Training",
        issuer: "Training Institute",
        date: "2024",
        image: pythonBadge,
        doc: "./documents/python with AI training.pdf"
    }
];

const Certifications = () => {
    return (
        <section id="certifications" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="neon-text"
                    style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                    CERTIFICATIONS
                </motion.h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="neon-border"
                            style={{
                                width: '300px',
                                padding: '2rem',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '15px',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            {cert.image && (
                                <img src={cert.image} alt={cert.title} style={{ width: '150px', marginBottom: '1.5rem' }} />
                            )}
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{cert.title}</h3>
                            <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>{cert.issuer} | {cert.date}</p>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                {cert.link && (
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem' }}>
                                        Verify Credly
                                    </a>
                                )}
                                {cert.doc && (
                                    <a href={cert.doc} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem' }}>
                                        View PDF
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
