import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({ isOpen, onClose, imageSrc, altText }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
            >
                {imageSrc && imageSrc.toLowerCase().endsWith('.pdf') ? (
                    <iframe
                        src={imageSrc}
                        title="Certificate PDF"
                        style={{
                            width: '90%',
                            height: '90%',
                            border: 'none',
                            borderRadius: '10px',
                            boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
                            background: '#fff' // Ensure PDF is readable against dark modal
                        }}
                    />
                ) : (
                    <motion.img
                        src={imageSrc}
                        alt={altText}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            objectFit: 'contain',
                            borderRadius: '10px',
                            boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)'
                        }}
                    />
                )}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '2rem',
                        cursor: 'pointer'
                    }}
                >
                    &times;
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageModal;
