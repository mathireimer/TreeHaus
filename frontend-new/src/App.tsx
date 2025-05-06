import React from 'react';
import Navbar from './components/Navbar';
import Calculadora from './components/Calculadora';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <section
          id="home"
          className="section"
          style={{
            position: "relative",
            background: "url('/bg2.jpg') center center/cover no-repeat",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            overflow: "hidden"
          }}
        >
          {/* Superposición oscura */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.75)",
              zIndex: 2
            }}
          />
          <div className="container" style={{ position: "relative", zIndex: 3 }}>
            <h1 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              Transformando la construcción con datos inteligentes
            </h1>
            <p className="subtitle" style={{ color: "#f0f0f0", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
              Nuestro software calcula la eficiencia térmica relativa de edificaciones. ¿El resultado? Decisiones más sostenibles, diseño más inteligente y un futuro más eficiente.
            </p>
            <p style={{ color: "#f0f0f0", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
              <strong>Nuestro objetivo:</strong> convertir datos en decisiones sostenibles.
            </p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">✔</span>
                <span style={{ color: "#fff" }}>Fácil de usar</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✔</span>
                <span style={{ color: "#fff" }}>Basado en modelos científicos</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✔</span>
                <span style={{ color: "#fff" }}>Adaptable a diferentes regiones climáticas</span>
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
              <p>
                En el marco del <a href="https://iceboxchallenge.lat/en/" target="_blank" rel="noopener noreferrer">Ice Box Challenge Paraguay 2025</a>, se desarrolló este software como respuesta directa a la necesidad de medir y cuantificar la eficiencia térmica de tres estructuras construidas bajo distintos estándares. El objetivo fue evaluar comparativamente su capacidad de conservar masa de hielo, en condiciones reales del clima paraguayo.
              </p>
              <p>
                El evento consistió en exponer durante 10 días tres cajas idénticas en forma y volumen, pero distintas en cuanto a su construcción:
              </p>
              <ol>
                <p>
                  <strong>Caja 1:</strong> Aislamiento convencional, basado en métodos tradicionales del país.
                </p>
                <p>
                  <strong>Caja 2:</strong> Construida conforme a las normas paraguayas de construcción sostenible, reguladas por el INTN (Instituto Nacional de Tecnología, Normalización y Metrología), bajo la propuesta y el impulso del <a href="https://paraguaygbc.org/" target="_blank" rel="noopener noreferrer">Paraguay Green Building Council</a>.
                </p>
                <p>
                  <strong>Caja 3:</strong> Diseñada bajo los exigentes estándares internacionales del Passive House.
                </p>
              </ol>
              <p>
                En cada caja se colocó un bloque de hielo de igual masa inicial. Al finalizar el desafío, se midió cuánta masa se había conservado en cada una, permitiendo evaluar cuantitativamente la eficiencia térmica de cada sistema constructivo.
              </p>
              <h3>¿Cómo intervino nuestro software?</h3>
              <ul>
                <li>
                  Permitimos comparar el desempeño térmico de las tres cajas en relación con una línea de base definida por la estructura con el menor rendimiento de aislamiento térmico.
                </li>
                <li>
                  Visualizamos la pérdida de masa del hielo, la reducción de volumen y la eficiencia térmica relativa de cada caja.
                </li>
                <li>
                  Los resultados pueden exportarse en formato Excel, facilitando su análisis, archivo y presentación.
                </li>
              </ul>
              <p>
                Este evento fue la validación práctica del software. Demostró que es posible combinar sostenibilidad y tecnología para apoyar decisiones de diseño, generar conciencia pública y fomentar la innovación en el sector de la construcción.
              </p>
              <h3>¿Por qué Paraguay?</h3>
              <p>
                Porque en climas extremos como el nuestro, la eficiencia energética no es un lujo, sino una necesidad. Este desafío mostró cómo una herramienta digital puede transformar una demostración física en una oportunidad de aprendizaje y cambio.
              </p>
            </div>
          </div>
        </section>

        <section id="threehaus" className="section">
          <div className="container">
            <h2>Sobre el Equipo</h2>
            <p className="team-intro">Estudiantes con visión técnica y compromiso ambiental</p>
            <p>
              Somos un grupo de estudiantes de Ingeniería Civil de la Universidad Paraguayo Alemana, apasionados por la construcción sostenible y la innovación. Unimos programación, modelado físico y análisis estadístico para crear una herramienta que responda a desafíos reales del sector.
            </p>
            <h3>Equipo fundador:</h3>
            <ul>
              <li>Cristina Valiente – Coordinadora técnica, modelado térmico y programación en Python</li>
              <li>[Nombres de tus compañeros, si quieres agregarlos]</li>
              <li>Mentoría académica: [Nombre de profesor o departamento, si aplica]</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App; 