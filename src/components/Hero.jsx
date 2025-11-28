import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import './Hero.css';

function RotatingSphere() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
    });

    return (
        <mesh ref={meshRef} scale={[2, 2, 2]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#00f3ff" wireframe />
        </mesh>
    );
}

const Hero = () => {
    const [isInView, setIsInView] = React.useState(true);
    const containerRef = useRef();

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <section id="home" className="hero-section" ref={containerRef}>
            <div className="hero-canvas-container">
                {isInView && (
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75 }} frameloop="demand">
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />
                        <RotatingSphere />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
                    </Canvas>
                )}
            </div>

            <div className="container hero-content">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="hero-title"
                >
                    v-Krama
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hero-subtitle"
                >
                    Cloud & AI Enthusiast | AWS Certified
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="hero-description"
                >
                    Exploring the intersection of cloud architecture, AI, and cybersecurity.
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;