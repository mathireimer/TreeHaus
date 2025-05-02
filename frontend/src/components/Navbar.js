import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">ThreeHaus</Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/calculadora" className={styles.navLink}>Calculadora</Link>
        <Link to="/sobre-el-desafio" className={styles.navLink}>Sobre el desafío</Link>
        <Link to="/threehaus" className={styles.navLink}>ThreeHaus</Link>
      </div>
    </nav>
  );
};

export default Navbar; 