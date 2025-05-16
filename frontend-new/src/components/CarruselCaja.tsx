import React, { useState } from 'react';

interface Archivo {
  src: string;
  tipo: 'imagen' | 'video';
  nombre: string;
}

interface CarruselCajaProps {
  archivos: Archivo[];
}

const CarruselCaja: React.FC<CarruselCajaProps> = ({ archivos }) => {
  const [actual, setActual] = useState(0);

  const handlePrev = () => {
    setActual((prev) => (prev === 0 ? archivos.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setActual((prev) => (prev === archivos.length - 1 ? 0 : prev + 1));
  };

  const archivo = archivos[actual];

  return (
    <div style={{ position: 'relative', maxWidth: 320, margin: '0 auto' }}>
      {archivo.tipo === 'imagen' ? (
        <img
          src={archivo.src}
          alt={archivo.nombre}
          style={{ width: '100%', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
      ) : (
        <video
          src={archivo.src}
          controls
          style={{ width: '100%', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
      )}
      {/* Flechas */}
      {archivos.length > 1 && (
        <>
          <button onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 20 }}>&lt;</button>
          <button onClick={handleNext} style={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 20 }}>&gt;</button>
        </>
      )}
      {/* Puntos */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, gap: 6 }}>
        {archivos.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setActual(idx)}
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: idx === actual ? '#007bff' : '#ccc',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarruselCaja; 