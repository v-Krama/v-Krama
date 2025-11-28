import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="neon-text contact-title"
                >
                    CONTACT ME
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="contact-form-container"
                >
                    <div className="neon-border contact-form-wrapper">
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeg90Kj9-eX7zMwpu1zEfWijmXpNY9kNfTt1gw29E0jpr3WXQ/viewform?embedded=true"
                            width="100%"
                            height="865"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                            title="Contact Form"
                            className="contact-form"
                        >
                            Loading…
                        </iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
