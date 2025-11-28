import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

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
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="App">
      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="logo">
            v-Krama
          </a>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>
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
        <Journey />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <footer className="main-footer">
        <p>&copy; {new Date().getFullYear()} V-Krama. All rights reserved.</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}

export default App;
