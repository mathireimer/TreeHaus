/**
 * WallAssembly3D.jsx
 * Esquema isométrico simplificado de un muro estándar Passivhaus.
 * Capas exteriores → interiores (de izquierda a derecha en perspectiva).
 */
import React from 'react';

export default function WallAssembly3D({
  size = 220,      // ancho total del SVG
  skew = -18       // ángulo isométrico (–18 ° ≈ 3 : 1)
}) {
  // Alto proporcional para mantener relaciones correctas
  const height = size * 1.3;

  return (
    <svg
      role="img"
      aria-label="Esquema 3D de muro Passivhaus"
      width={size}
      height={height}
      viewBox="0 0 220 158"
      className="drop-shadow-lg"
    >
      {/* ---------- Degradados básicos ---------- */}
      <defs>
        <linearGradient id="cladding"   x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4c697d"/><stop offset="1" stopColor="#284b63"/>
        </linearGradient>
        <linearGradient id="structure"  x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b7c0a1"/><stop offset="1" stopColor="#939b7a"/>
        </linearGradient>
        <linearGradient id="insulation" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6c0"/><stop offset="1" stopColor="#f4dfa1"/>
        </linearGradient>
        <linearGradient id="osb"        x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4b07a"/><stop offset="1" stopColor="#c99254"/>
        </linearGradient>
        <linearGradient id="plaster"    x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7f7f7"/><stop offset="1" stopColor="#d4d4d4"/>
        </linearGradient>
      </defs>

      {/* ---------- Grupo isométrico ---------- */}
      <g transform={`skewY(${skew})`}>
        {/* (1) Revestimiento exterior */}
        <rect x="155" y="10" width="50" height="128" fill="url(#cladding)" />
        {/* (2) CLT / estructura portante */}
        <rect x="117" y="22" width="50" height="128" fill="url(#structure)" />
        {/* (3) Aislante térmico principal */}
        <rect x="79"  y="34" width="50" height="128" fill="url(#insulation)" />
        {/* (4) Tablero OSB / barrera de vapor */}
        <rect x="41"  y="46" width="50" height="128" fill="url(#osb)" />
        {/* (5) Acabado interior (yeso) */}
        <rect x="3"   y="58" width="50" height="128" fill="url(#plaster)" />
      </g>

      {/* ---------- Contornos para dar relieve ---------- */}
      <g stroke="#27495c" strokeWidth="1.5" fill="none">
        <rect x="155" y="10" width="50" height="128" transform={`skewY(${skew})`} />
        <rect x="117" y="22" width="50" height="128" transform={`skewY(${skew})`} />
        <rect x="79"  y="34" width="50" height="128" transform={`skewY(${skew})`} />
        <rect x="41"  y="46" width="50" height="128" transform={`skewY(${skew})`} />
        <rect x="3"   y="58" width="50" height="128" transform={`skewY(${skew})`} />
      </g>

      {/* ---------- Etiquetas de R-value (demo) ---------- */}
      <text x="166" y="30" fontSize="11" fill="#27495c" fontWeight="bold">R: 0.8</text>
      <text x="128" y="42" fontSize="11" fill="#27495c" fontWeight="bold">R: 1.2</text>
      <text x="90"  y="54" fontSize="11" fill="#27495c" fontWeight="bold">R: 4.5</text>
      <text x="52"  y="66" fontSize="11" fill="#27495c" fontWeight="bold">R: 0.6</text>
      <text x="14"  y="78" fontSize="11" fill="#27495c" fontWeight="bold">R: 0.4</text>
    </svg>
  );
}
