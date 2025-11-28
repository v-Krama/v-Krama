import React from 'react';
import { motion } from 'framer-motion';
import myProfileImage from '../assets/images/mProfile.JPG';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="about-content"
                >
                    <div className="about-image-container">
                        <img src={myProfileImage} alt="My Profile" className="about-image" />
                    </div>

                    <div className="about-text-container">

                        <h2 className="neon-text">ABOUT ME</h2>

                        <p>

                            Hello! I'm a passionate and driven student in my third semester at Tech AI College of Management and Law

                            (affiliated with Rajarshi Janak University). My journey blends technical exploration with hands-on experience,

                            constantly pushing boundaries.

                        </p>

                        <p>

                            I am an <strong className="highlight">AWS Certified Solutions Architect – Associate</strong>, with proven English

                            proficiency via <strong className="highlight">IELTS certification</strong>. My core expertise includes

                            <strong className="highlight">cloud computing, ethical hacking, Python with AI, and web scraping</strong>.

                        </p>

                        <p>

                            My diverse background, from a Robotics Bootcamp and an Adex apprenticeship to roles as a barista and barber,

                            has instilled in me precision, customer service, and creativity. I actively seek internships or job opportunities

                            to apply my skills, learn continuously, and contribute to innovative projects. Let's connect and build the future together!

                        </p>

                    </div>                </motion.div>
            </div>
        </section>
    );
};

export default About;