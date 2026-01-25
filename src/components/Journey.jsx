import React from 'react';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';

// Thumbnails
import thumb10th from '../assets/images/thumbnails/10th.webp';
import thumb12th from '../assets/images/thumbnails/12th.webp';
import thumbAdex from '../assets/images/thumbnails/adex_apprenticeship.webp';
import thumbRobotics from '../assets/images/thumbnails/robotics_bootcamp.webp';
import thumbBarber from '../assets/images/thumbnails/barber_cutting.webp';
import thumbBarista from '../assets/images/thumbnails/barista.webp';
import thumbIelts from '../assets/images/thumbnails/IELTS.webp';

// Optimized Large Images
import large10th from '../assets/images/optimized/10th.webp';
import large12th from '../assets/images/optimized/12th.webp';
import largeAdex from '../assets/images/optimized/adex_apprenticeship.webp';
import largeRobotics from '../assets/images/optimized/robotics_bootcamp.webp';
import largeBarber from '../assets/images/optimized/barber_cutting.webp';
import largeBarista from '../assets/images/optimized/barista.webp';
import largeIelts from '../assets/images/optimized/IELTS.webp';

import './Journey.css';

const journeyItems = [
    {
        title: "Secondary Education (10th)",
        description: "Completed secondary education with a strong foundation.",
        thumbnail: thumb10th,
        largeImage: large10th,
        category: "Education"
    },
    {
        title: "Higher Secondary (12th)",
        description: "Completed higher secondary education, focusing on science and technology.",
        thumbnail: thumb12th,
        largeImage: large12th,
        category: "Education"
    },
    {
        title: "IELTS Certification",
        description: "Achieved a proficient score in the International English Language Testing System.",
        thumbnail: thumbIelts,
        largeImage: largeIelts,
        category: "Certification"
    },
    {
        title: "Robotics Bootcamp",
        description: "Hands-on experience in building and programming robots.",
        thumbnail: thumbRobotics,
        largeImage: largeRobotics,
        category: "Workshop"
    },
    {
        title: "Adex Apprenticeship",
        description: "Professional apprenticeship experience.",
        thumbnail: thumbAdex,
        largeImage: largeAdex,
        category: "Experience"
    },
    {
        title: "Barista Experience",
        description: "Developed customer service skills and coffee brewing expertise.",
        thumbnail: thumbBarista,
        largeImage: largeBarista,
        category: "Experience"
    },
    {
        title: "Barbering",
        description: "Honed precision and creativity through barbering.",
        thumbnail: thumbBarber,
        largeImage: largeBarber,
        category: "Experience"
    }
];

const Journey = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);

    return (
        <section id="journey" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="neon-text journey-title"
                >
                    MY JOURNEY
                </motion.h2>

                <div className="journey-grid">
                    {journeyItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="neon-border journey-item"
                        >
                            <div
                                className="journey-item-image-container"
                                onClick={() => setSelectedImage(item)}
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="journey-item-image"
                                    loading="lazy"
                                    width="300"
                                    height="200"
                                />
                            </div>
                            <div className="journey-item-content">
                                <span className="journey-item-category">
                                    {item.category}
                                </span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
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

export default Journey;
