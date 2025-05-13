import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const content = document.querySelector('.content');
    if (element && content) {
      const offset = element.offsetTop;
      (content as HTMLElement).scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.floatingBox}>
        <div className={styles.logo}>
          <a href="#" onClick={() => scrollToSection('home')}>
            <img src="/logo.png" alt="Logo" className={styles.logoImg} />
          </a>
        </div>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>
        <div className={`${styles.navLinks} ${menuOpen ? styles.show : ''}`}>
          <a href="#calculadora" onClick={() => scrollToSection('calculadora')}>Calculadora</a>
          <a href="#sobre-el-desafio" onClick={() => scrollToSection('sobre-el-desafio')}>Sobre el desafío</a>
          <a href="#threehaus" onClick={() => scrollToSection('threehaus')}>ThreeHaus</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 