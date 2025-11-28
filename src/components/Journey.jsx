import React from 'react';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';
import img10th from '../assets/images/10th.jpg';
import img12th from '../assets/images/12th.jpg';
import adexImg from '../assets/images/adex_apprenticeship.png';
import roboticsImg from '../assets/images/robotics_bootcamp.png';
import barberImg from '../assets/images/barber_cutting.png';
import baristaImg from '../assets/images/barista.png';
import ieltsImg from '../assets/images/IELTS.jpg';
import './Journey.css';

const journeyItems = [
    {
        title: "Secondary Education (10th)",
        description: "Completed secondary education with a strong foundation.",
        image: img10th,
        category: "Education"
    },
    {
        title: "Higher Secondary (12th)",
        description: "Completed higher secondary education, focusing on science and technology.",
        image: img12th,
        category: "Education"
    },
    {
        title: "IELTS Certification",
        description: "Achieved a proficient score in the International English Language Testing System.",
        image: ieltsImg,
        category: "Certification"
    },
    {
        title: "Robotics Bootcamp",
        description: "Hands-on experience in building and programming robots.",
        image: roboticsImg,
        category: "Workshop"
    },
    {
        title: "Adex Apprenticeship",
        description: "Professional apprenticeship experience.",
        image: adexImg,
        category: "Experience"
    },
    {
        title: "Barista Experience",
        description: "Developed customer service skills and coffee brewing expertise.",
        image: baristaImg,
        category: "Experience"
    },
    {
        title: "Barbering",
        description: "Honed precision and creativity through barbering.",
        image: barberImg,
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
                                    src={item.image}
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
                imageSrc={selectedImage?.image}
                altText={selectedImage?.title}
            />
        </section>
    );
};

export default Journey;
