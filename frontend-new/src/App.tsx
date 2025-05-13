import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Calculadora from './components/Calculadora';
import './App.css';
import caja1 from './assets/caja1.png';
import caja2 from './assets/caja2.png';
import caja3 from './assets/caja3.png';
import video1 from './assets/video1.mp4';

const App: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const content = document.querySelector('.content');
    const handleScroll = () => {
      if (content) {
        setScrollPosition((content as HTMLElement).scrollTop);
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

  return (
    <div className="app" style={{ 
      height: '100vh', 
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Navbar />
      <div className="content" style={{ 
        height: '100vh',
        overflowY: 'auto', 
        scrollBehavior: 'smooth',
        position: 'relative',
        zIndex: 1
      }}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: -1,
            transform: `translateY(${-scrollPosition * 0.2}px)`,
          }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "url('/bg2.jpg') center center/cover no-repeat"
          }} />
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.75)"
          }} />
        </div>
        <section
          id="home"
          className="section"
          style={{
            position: "relative",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          <div className="container" style={{ 
            position: "relative", 
            padding: "48px 32px", 
            borderRadius: "24px", 
            background: "rgba(0,0,0,0.10)",
            zIndex: 2
          }}>
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
                <span style={{ color: "#fff" }}>✔ Fácil de usar</span>
              </div>
              <div className="feature">                
                <span style={{ color: "#fff" }}>✔ Basado en modelos científicos</span>
              </div>
              <div className="feature">                
                <span style={{ color: "#fff" }}>✔ Adaptable a diferentes regiones climáticas</span>
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
              <div style={{
               display: 'flex',
               justifyContent: 'space-between',
               gap: '1.5rem',
               marginTop: '2rem'
             }}>
               <div style={{ flex: 1, textAlign: 'center' }}>
                 <img src={caja1} alt="Caja 1" style={{
                   width: '100%',
                   maxWidth: '300px',
                   borderRadius: '12px',
                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                   transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}/>
                 <p><strong>Caja 1:</strong> Aislamiento convencional, basado en métodos tradicionales del país.</p>
               </div>

               <div style={{ flex: 1, textAlign: 'center' }}>
                 <img src={caja2} alt="Caja 2" style={{
                   width: '100%',
                   maxWidth: '300px',
                   borderRadius: '12px',
                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                   transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                 }} />
                 <p><strong>Caja 2:</strong> Construida conforme a las normas paraguayas de construcción sostenible, reguladas por el INTN, bajo el impulso del <a href="https://paraguaygbc.org/" target="_blank" rel="noopener noreferrer">Paraguay Green Building Council</a>.</p>
               </div>

               <div style={{ flex: 1, textAlign: 'center' }}>
                 <img src={caja3} alt="Caja 3" style={{
                   width: '100%',
                   maxWidth: '300px',
                   borderRadius: '12px',
                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                   transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                 }} />
                 <p><strong>Caja 3:</strong> Diseñada bajo los exigentes estándares internacionales del Passive House.</p>
               </div>
             </div>


              <p>
                En cada caja se colocó un bloque de hielo de igual masa inicial. Al finalizar el desafío, se midió cuánta masa se había conservado en cada una, permitiendo evaluar cuantitativamente la eficiencia térmica de cada sistema constructivo.
              </p>
              <h3>¿Cómo intervino nuestro software?</h3>
              <ul>
                <p>
                  ✔ Permitimos comparar el desempeño térmico de las tres cajas en relación con una línea de base definida por la estructura con el menor rendimiento de aislamiento térmico.
                </p>
                <p>
                  ✔ Visualizamos la pérdida de masa del hielo, la reducción de volumen y la eficiencia térmica relativa de cada caja.
                </p>
                <p>
                  ✔ Los resultados pueden exportarse en formato Excel, facilitando su análisis, archivo y presentación.
                </p>
              </ul>
              <p>
                Este evento fue la validación práctica del software. Demostró que es posible combinar sostenibilidad y tecnología para apoyar decisiones de diseño, generar conciencia pública y fomentar la innovación en el sector de la construcción.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '2rem',
                marginTop: '3rem'
              }}>
                <div style={{ flex: 1 }}>
                  <h3>¿Por qué Paraguay?</h3>
                  <p>
                    Porque en climas extremos como el nuestro, la eficiencia energética no es un lujo, sino una necesidad. 
                    Este desafío mostró cómo una herramienta digital puede transformar una demostración física en una 
                    oportunidad de aprendizaje y cambio.
                  </p>
                </div>

                <div style={{ flex: 1, textAlign: 'center' }}>
                  <video
                    src={video1}
                    autoPlay
                    muted
                    loop
                    controls
                    style={{
                      width: '100%',
                      maxWidth: '360px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                    }}
                  />
                </div>
              </div>
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
              <p>• Salomé Valiente - Coordinadora técnica, modelado térmico y programación en Python </p>
              <p>• Serena Rojas Marcelli - Equipo técnico, modelado térmico y programación en Python </p>
              <p>• Andrea Sandoval - Equipo técnico, modelado térmico y programación en Python</p>
              <p>• Mentoria académica: Profesor. Gustavo Sosa</p>
              <p> </p>
              <h3>Colaboradores: </h3>
              <p>• Mathias Reimer - Ing. Informática Empresarial - Diseño Web</p>
              <p>• Elias Samaniego - Ing. Informática Empresarial - Backend y alojamiento</p>
              <p>• Hernando Parini - Ing Informática Empresarial - Usabilidad del software y optimización</p>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App; 