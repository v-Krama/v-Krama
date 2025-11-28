import React from 'react';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';
import awsBadge from '../assets/images/aws-certified-solutions-architect-associate.png';
import cehBadge from '../assets/images/CEH.png';
import pythonBadge from '../assets/images/pythonAI.png';
import './Certifications.css';

const certifications = [
    {
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        date: "2025",
        image: awsBadge,
        link: "https://www.credly.com/badges/875eb788-b18b-4302-98cd-96cead961d5c/public_url",
        doc: "/documents/aws solution architect training.pdf"
    },
    {
        title: "Ethical Hacking Training",
        issuer: "Training Institute",
        date: "2024",
        image: cehBadge,
        doc: "/documents/EthicalHacking.pdf"
    },
    {
        title: "Python with AI Training",
        issuer: "Training Institute",
        date: "2024",
        image: pythonBadge,
        doc: "/documents/python with AI training.pdf"
    }
];

const Certifications = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);

    return (
        <section id="certifications" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="neon-text certifications-title"
                >
                    CERTIFICATIONS
                </motion.h2>

                <div className="certifications-grid">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="neon-border certification-item"
                        >
                            {cert.image && (
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="certification-item-image"
                                    onClick={() => setSelectedImage(cert)}
                                    loading="lazy"
                                    width="150"
                                    height="150"
                                />
                            )}
                            <h3>{cert.title}</h3>
                            <p>{cert.issuer} | {cert.date}</p>

                            <div className="certification-item-links">
                                {cert.link && (
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                        Verify Credly
                                    </a>
                                )}
                                {cert.doc && (
                                    <a href={cert.doc} target="_blank" rel="noopener noreferrer">
                                        View PDF
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ImageModal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                imageSrc={selectedImage?.image}
                altText={selectedImage?.title}
            />
        </section>
    );
};

export default Certifications;
