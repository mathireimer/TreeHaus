import React from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="#" onClick={() => scrollToSection('home')}>ThreeHaus</a>
      </div>
      <div className={styles.navLinks}>
        <a href="#calculadora" onClick={() => scrollToSection('calculadora')}>Calculadora</a>
        <a href="#sobre-el-desafio" onClick={() => scrollToSection('sobre-el-desafio')}>Sobre el desafío</a>
        <a href="#threehaus" onClick={() => scrollToSection('threehaus')}>ThreeHaus</a>
      </div>
    </nav>
  );
};

export default Navbar; 