import React from 'react';
import Navbar from './components/Navbar';
import Calculadora from './components/Calculadora';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <section id="home" className="section">
          <div className="container">
            <h1>Transformando la construcción con datos inteligentes</h1>
            <p className="subtitle">Nuestro software calcula la eficiencia térmica relativa de edificaciones. ¿El resultado? Decisiones más sostenibles, diseño más inteligente y un futuro más eficiente.</p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">✔</span>
                <span>Fácil de usar</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✔</span>
                <span>Basado en modelos científicos</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✔</span>
                <span>Adaptable a diferentes regiones climáticas</span>
              </div>
            </div>
          </div>
        </section>

        <section id="calculadora" className="section">
          <div className="container">
            <h2>Calculadora de Eficiencia Térmica</h2>
            <p className="section-description">Una herramienta inteligente para evaluar eficiencia energética.</p>
            <Calculadora />
          </div>
        </section>

        <section id="sobre-el-desafio" className="section">
          <div className="container">
            <h2>Caso de Estudio: Ice Box Challenge Paraguay 2025</h2>
            <div className="challenge-content">
              <p className="challenge-intro">Un evento, un desafío, una solución digital.</p>
              <p>En el marco del <a href="https://iceboxchallenge.lat/en/" target="_blank" rel="noopener noreferrer">Ice Box Challenge Paraguay 2025</a>, se desarrolló este software como respuesta directa a la necesidad de medir y cuantificar la eficiencia térmica de tres estructuras construidas bajo distintos estándares.</p>
              
              <div className="boxes-info">
                <h3>Las tres cajas del desafío:</h3>
                <div className="box-item">
                  <h4>Caja 1</h4>
                  <p>Aislamiento convencional, basado en métodos tradicionales del país.</p>
                </div>
                <div className="box-item">
                  <h4>Caja 2</h4>
                  <p>Construida conforme a las normas paraguayas de construcción sostenible.</p>
                </div>
                <div className="box-item">
                  <h4>Caja 3</h4>
                  <p>Diseñada bajo los estándares internacionales del Passive House.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="threehaus" className="section">
          <div className="container">
            <h2>Sobre el Equipo</h2>
            <p className="team-intro">Estudiantes con visión técnica y compromiso ambiental</p>
            <p>Somos un grupo de estudiantes de Ingeniería Civil de la Universidad Paraguayo Alemana, apasionados por la construcción sostenible y la innovación.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App; 