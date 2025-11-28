import React, { useState, useEffect, Suspense, lazy } from 'react';
import Hero from './components/Hero';
import './App.css';

// Lazy load components
const About = lazy(() => import('./components/About'));
const Journey = lazy(() => import('./components/Journey'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMobileMenu();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="App">
      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
            v-Krama
          </a>

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <ul className={mobileMenuOpen ? 'active' : ''}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
        <Hero />
        <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
          <About />
          <Journey />
          <Skills />
          <Certifications />
          <Contact />
        </Suspense>
      </main>

      <footer className="main-footer">
        <p>&copy; {new Date().getFullYear()} V-Krama. All rights reserved.</p>
      </footer>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </div>
  );
}

export default App;
