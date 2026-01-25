import React from 'react';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';
import thumbAws from '../assets/images/thumbnails/aws-certified-solutions-architect-associate.webp';
import thumbCeh from '../assets/images/thumbnails/CEH.webp';
import thumbPython from '../assets/images/thumbnails/pythonAI.webp';

import largeAws from '../assets/images/optimized/aws-certified-solutions-architect-associate.webp';
import largeCeh from '../assets/images/optimized/CEH.webp';
import largePython from '../assets/images/optimized/pythonAI.webp';

import './Certifications.css';

const certifications = [
    {
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        date: "2025",
        thumbnail: thumbAws,
        largeImage: largeAws,
        link: "https://www.credly.com/badges/875eb788-b18b-4302-98cd-96cead961d5c/public_url",
        doc: "/documents/aws solution architect training.pdf"
    },
    {
        title: "Ethical Hacking Training",
        issuer: "Broadway Infosys",
        date: "2024",
        thumbnail: thumbCeh,
        largeImage: largeCeh,
        doc: "/documents/EthicalHacking.pdf",
        link: "https://broadwayinfosys.com/certificate-verification-response"
    },
    {
        title: "Python with AI Training",
        issuer: "Broadway Infosys",
        date: "2024",
        thumbnail: thumbPython,
        largeImage: largePython,
        doc: "/documents/python with AI training.pdf",
        link: "https://broadwayinfosys.com/certificate-verification-response"
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
                            <div
                                className="certification-item-image-container"
                                onClick={() => setSelectedImage(cert)}
                            >
                                <img
                                    src={cert.thumbnail}
                                    alt={cert.title}
                                    className="certification-item-image"
                                    loading="lazy"
                                    width="150"
                                    height="150"
                                />
                            </div>
                            <h3>{cert.title}</h3>
                            <p>{cert.issuer} | {cert.date}</p>

                            <div className="certification-item-links">
                                {cert.link && (
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                        {cert.link.includes('credly') ? 'Verify Credly' : 'Verify Certificate'}
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
                imageSrc={selectedImage?.largeImage}
                altText={selectedImage?.title}
            />
        </section>
    );
};

export default Certifications;
