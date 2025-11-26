import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';

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
    return (
        <section id="home" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <RotatingSphere />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ fontSize: '4rem', marginBottom: '1rem', textShadow: '0 0 20px #00f3ff' }}
                >
                    CYBER-AI
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ fontSize: '2rem', color: '#a0a0a0' }}
                >
                    CLOUD ARCHITECT
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    style={{ marginTop: '2rem', fontSize: '1.2rem', maxWidth: '600px' }}
                >
                    Designing the future of secure, intelligent cloud infrastructure.
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;
