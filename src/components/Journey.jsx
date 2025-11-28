import React from 'react';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';
import img10th from '../assets/images/10th.jpg';
import img12th from '../assets/images/12th.jpg';
import adexImg from '../assets/images/adex_apprenticeship.png';
import roboticsImg from '../assets/images/robotics_bootcamp.png';
import barberImg from '../assets/images/barber_cutting.png';
import baristaImg from '../assets/images/barista.png';

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
                    className="neon-text"
                    style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                    MY JOURNEY
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {journeyItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="neon-border"
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div
                                style={{ height: '200px', overflow: 'hidden', cursor: 'pointer' }}
                                onClick={() => setSelectedImage(item)}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1 }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    color: '#00f3ff',
                                    border: '1px solid #00f3ff',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '5px',
                                    marginBottom: '0.5rem',
                                    display: 'inline-block'
                                }}>
                                    {item.category}
                                </span>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>{item.description}</p>
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
