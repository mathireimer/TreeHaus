import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const content = document.querySelector('.content');
    const handleScroll = () => {
      if (content) {
        setScrolled((content as HTMLElement).scrollTop > 10);
      }
    };
    if (content) {
      content.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (content) {
        content.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // Cierra el menú en móvil al hacer click
  };

  // Determina la clase de color para los enlaces y el logo
  const linkColorClass = scrolled ? styles.linkDark : styles.linkLight;

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.floatingBox} ${scrolled ? styles.scrolled : styles.transparent}`}>
        <div className={styles.logo}>
          <a href="#" onClick={() => scrollToSection('home')}>
            <img src="/logo.png" alt="Logo" className={`${styles.logoImg} ${linkColorClass}`} />
          </a>
        </div>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''} ${linkColorClass}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>
        <div className={`${styles.navLinks} ${menuOpen ? styles.show : ''}`}>
          <a className={linkColorClass} href="#calculadora" onClick={() => scrollToSection('calculadora')}>Calculadora</a>
          <a className={linkColorClass} href="#sobre-el-desafio" onClick={() => scrollToSection('sobre-el-desafio')}>Sobre el desafío</a>
          <a className={linkColorClass} href="#threehaus" onClick={() => scrollToSection('threehaus')}>ThreeHaus</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 