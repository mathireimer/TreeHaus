import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WallAssembly3D from './components/WallAssembly3D';
import './App.css';

function Calculadora() {
  const [nombre, setNombre] = useState("");
  const [area, setArea] = useState("");
  const [deltaT, setDeltaT] = useState("");
  const [materiales, setMateriales] = useState([
    { conductividad: "", espesor: "" },
    { conductividad: "", espesor: "" },
    { conductividad: "", espesor: "" },
    { conductividad: "", espesor: "" }
  ]);
  const [resultados, setResultados] = useState([]);
  const [cajas, setCajas] = useState([]); // NUEVO ESTADO
  const [error, setError] = useState(null);
  const [archivoNombre, setArchivoNombre] = useState("");
  const fileInputRef = useRef();

  const actualizarMaterial = (i, campo, valor) => {
    const nuevos = [...materiales];
    nuevos[i][campo] = valor;
    setMateriales(nuevos);
  };

  const formatearNumero = (valor, decimales = 2) => {
    if (valor === undefined || valor === null) return '-';
    return valor.toFixed(decimales);
  };

  const enviarDatos = () => {
    setError(null);
    if (!nombre || !area || !deltaT || materiales.some(m => !m.conductividad || !m.espesor)) {
      setError("Por favor, complete todos los campos");
      return;
    }

    const nuevaCaja = {
      nombre: nombre,
      area: parseFloat(area),
      delta_t: parseFloat(deltaT),
      materiales: materiales.map(m => ({
        conductividad: parseFloat(m.conductividad),
        espesor_mm: parseFloat(m.espesor)
      }))
    };

    setCajas(prev => [...prev, nuevaCaja]);
    setNombre("");
    setArea("");
    setDeltaT("");
    setMateriales([
      { conductividad: "", espesor: "" },
      { conductividad: "", espesor: "" },
      { conductividad: "", espesor: "" },
      { conductividad: "", espesor: "" }
    ]);
  };

  const calcularTodo = async () => {
    if (cajas.length === 0) {
      setError("No hay cajas para calcular");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/calcular", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ cajas })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      setResultados(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResultados([]);
    }
  };

  const vaciarCajas = () => {
    setCajas([]);
  };
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivoNombre(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets["Entrada"];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
      const filas = json.slice(3).filter(row => row[0] !== "");
      const cajasExcel = filas.map(row => ({
        nombre: row[0],
        area: parseFloat(row[1]),
        delta_t: parseFloat(row[2]),
        materiales: [
          { conductividad: parseFloat(row[3]), espesor_mm: parseFloat(row[4]) },
          { conductividad: parseFloat(row[5]), espesor_mm: parseFloat(row[6]) },
          { conductividad: parseFloat(row[7]), espesor_mm: parseFloat(row[8]) },
          { conductividad: parseFloat(row[9]), espesor_mm: parseFloat(row[10]) }
        ]
      }));
      setCajas(cajasExcel);
    };
    reader.readAsArrayBuffer(file);
  };

  const exportarExcel = () => {
    if (!resultados.length) return;
    const wsData = [
      [
        "Caja", "R térmica [m²K/W]", "Flujo calor [W]", "Calor 10 días [J]", "Masa hielo [kg]", "Volumen hielo [m³]", "Eficiencia térmica [%]"
      ],
      ...resultados.map(fila => [
        fila.Caja || '-',
        formatearNumero(fila.R_termina, 3),
        formatearNumero(fila.Flujo_calor),
        fila.Calor_total ? fila.Calor_total.toLocaleString() : '-',
        formatearNumero(fila.Masa_hielo),
        formatearNumero(fila.Volumen_hielo, 4),
        formatearNumero(fila.Eficiencia)
      ])
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, "resultados_calculadora_termica.xlsx");
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20, marginTop: "80px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Calculadora de Eficiencia Térmica</h2>
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <a
            href="\plantilla_calculadora_eficiencia_termica.xlsx"
            download
            className="btn-primary"
            style={{ marginBottom: 20, display: "inline-block" }}
          >
            Descargar plantilla Excel
          </a>
          <br />
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="file-upload" className="btn-primary" style={{ cursor: 'pointer', display: 'inline-block', padding: '8px 24px' }}>
              Subir archivo Excel
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <span style={{ marginLeft: 12, fontSize: 14, color: '#555' }}>{archivoNombre}</span>
          </div>

          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <input
            className="input"
            placeholder="Nombre de la caja"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <input
            className="input"
            placeholder="Área (m²)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <input
            className="input"
            placeholder="Diferencia de temperatura (°C)"
            value={deltaT}
            onChange={(e) => setDeltaT(e.target.value)}
            style={{ marginBottom: 20 }}
          />

          <h4 style={{ fontSize: 18, fontWeight: 600, margin: '20px 0 10px 0' }}>Materiales:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {["Suelo", "Paredes", "Techo", "Abertura"].map((nombre, i) => (
              <div key={i} style={{ display: 'flex', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
                    Conductividad {nombre} (W/m·K):
                  </label>
                  <input
                    type="number"
                    value={materiales[i].conductividad}
                    onChange={(e) => actualizarMaterial(i, "conductividad", e.target.value)}
                    className="input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
                    Espesor {nombre} (mm):
                  </label>
                  <input
                    type="number"
                    value={materiales[i].espesor}
                    onChange={(e) => actualizarMaterial(i, "espesor", e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: '#333', marginTop: 10 }}>
            Cajas cargadas: {cajas.length}
          </p>

          <button onClick={enviarDatos} className="btn-primary" style={{ marginTop: 18 }}>
            Agregar caja
          </button>

          <button onClick={calcularTodo} className="btn-primary" style={{ marginTop: 18, marginLeft: 16 }}>
            Calcular
          </button>

          <button onClick={exportarExcel} className="btn-primary" style={{ marginTop: 18, marginLeft: 16 }}>
            Exportar resultados a Excel
          </button>
          <button
          onClick={vaciarCajas}
          className="btn-primary"
          style={{ marginTop: 18, marginLeft: 16, backgroundColor: '#fbbf24' }}>
            Vaciar cajas
          </button>
        </div>

        <div style={{ width: 220, minWidth: 180, margin: '0 auto' }}>
          <WallAssembly3D />
        </div>
      </div>

      {resultados && resultados.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>Resultados:</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th style={{ border: '1px solid #e5e7eb', padding: 8 }}>Caja</th>
                  <th style={{ border: '1px solid #e5e7eb', padding: 8 }}>R térmica [m²K/W]</th>
                  <th style={{ border: '1px solid #e5e7eb', padding: 8 }}>Flujo calor [W]</th>
                  <th style={{ border: '1px solid #e5e7eb', padding: 8 }}>Calor 10 días [J]</th>
                  <th style={{ border: '1px solid #e5e7eb', padding: 8 }}>Masa hielo [kg]</th>
                  <th style={{ border: '1px solid #e5e7eb', padding: 8 }}>Volumen hielo [m³]</th>
                  <th style={{ border: '1px solid #e5e7eb', padding: 8 }}>Eficiencia térmica [%]</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((fila, index) => (
                  <tr key={index} style={{ background: index % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{fila.Caja || '-'}</td>
                    <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{formatearNumero(fila.R_termina, 3)}</td>
                    <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{formatearNumero(fila.Flujo_calor)}</td>
                    <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{fila.Calor_total ? fila.Calor_total.toLocaleString() : '-'}</td>
                    <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{formatearNumero(fila.Masa_hielo)}</td>
                    <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{formatearNumero(fila.Volumen_hielo, 4)}</td>
                    <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{formatearNumero(fila.Eficiencia)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function SobreElDesafio() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20, marginTop: "80px" }}>
      <h2>Sobre el Desafío</h2>
      <p>Contenido sobre el desafío...</p>
    </div>
  );
}

function ThreeHaus() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20, marginTop: "80px" }}>
      <h2>ThreeHaus</h2>
      <p>Contenido sobre ThreeHaus...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Calculadora />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/sobre-el-desafio" element={<SobreElDesafio />} />
        <Route path="/threehaus" element={<ThreeHaus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
