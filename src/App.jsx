import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="App">
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.5rem 0',
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(3, 3, 3, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid #00f3ff' : 'none'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Orbitron, sans-serif' }}>
            V-KRAMA
          </a>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <footer style={{ padding: '2rem 0', textAlign: 'center', backgroundColor: '#050505', borderTop: '1px solid #333' }}>
        <p style={{ color: '#666' }}>&copy; {new Date().getFullYear()} V-Krama. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
