import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import styles from './Calculadora.module.css';

interface Material {
  conductividad: string;
  espesor: string;
}

interface Caja {
  nombre: string;
  area: number;
  delta_t: number;
  materiales: {
    conductividad: number;
    espesor_mm: number;
  }[];
}

const Calculadora: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [deltaT, setDeltaT] = useState<string>("");
  const [materiales, setMateriales] = useState<Material[]>([
    { conductividad: "", espesor: "" },
    { conductividad: "", espesor: "" },
    { conductividad: "", espesor: "" },
    { conductividad: "", espesor: "" }
  ]);
  const [resultados, setResultados] = useState<any[]>([]);
  const [cajas, setCajas] = useState<Caja[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [archivoNombre, setArchivoNombre] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const actualizarMaterial = (i: number, campo: keyof Material, valor: string) => {
    const nuevos = [...materiales];
    nuevos[i][campo] = valor;
    setMateriales(nuevos);
  };

  const formatearNumero = (valor: number | undefined | null, decimales: number = 2): string => {
    if (valor === undefined || valor === null) return '-';
    return valor.toFixed(decimales);
  };

  const enviarDatos = () => {
    setError(null);
    if (!nombre || !area || !deltaT || materiales.some(m => !m.conductividad || !m.espesor)) {
      setError("Por favor, complete todos los campos");
      return;
    }

    const nuevaCaja: Caja = {
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/calcular`, {
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
      setError(error instanceof Error ? error.message : 'Error desconocido');
      setResultados([]);
    }
  };

  const vaciarCajas = () => {
    setCajas([]);
    setResultados([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setArchivoNombre(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets["Entrada"];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
        const filas = json.slice(3).filter((row: any) => row[0] !== "");
        const cajasExcel = filas.map((row: any) => ({
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
        setError(null);
      } catch (error) {
        setError("Error al procesar el archivo Excel");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const exportarExcel = () => {
    if (!resultados.length) {
      setError("No hay resultados para exportar");
      return;
    }
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
    <div className={styles.calculadora}>
      <div className={styles.calculadoraContainer}>
        <div className={styles.calculadoraForm}>
          <div className={styles.fileActions}>
            <a
              href="/plantilla_calculadora_eficiencia_termica.xlsx"
              download
              className={styles.btnPrimary}
            >
              ↓ Descargar plantilla Excel
            </a>
            <div className={styles.fileUpload}>
              <label htmlFor="file-upload" className={styles.btnPrimary}>
              ↑ Subir archivo Excel
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".xlsx"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              {archivoNombre && (
                <span className={styles.fileName}>{archivoNombre}</span>
              )}
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              placeholder="Nombre de la caja"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Área (m²)"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Diferencia de temperatura (°C)"
              type="number"
              value={deltaT}
              onChange={(e) => setDeltaT(e.target.value)}
            />
          </div>

          <h4>Materiales:</h4>
          <div className={styles.materialesGrid}>
            {["Suelo", "Paredes", "Techo", "Abertura"].map((nombre, i) => (
              <div key={i} className={styles.materialInputs}>
                <div>
                  <label>
                    Conductividad {nombre} (W/m·K):
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={materiales[i].conductividad}
                    onChange={(e) => actualizarMaterial(i, "conductividad", e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div>
                  <label>
                    Espesor {nombre} (mm):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={materiales[i].espesor}
                    onChange={(e) => actualizarMaterial(i, "espesor", e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cajasInfo}>
            <p>Cajas cargadas: {cajas.length}</p>
            {cajas.length > 0 && (
              <button onClick={vaciarCajas} className={styles.btnSecondary}>
                Vaciar cajas
              </button>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={enviarDatos} className={styles.btnPrimary}>
              Agregar caja
            </button>
            <button onClick={calcularTodo} className={styles.btnPrimary}>
              Calcular
            </button>
            {resultados.length > 0 && (
              <button onClick={exportarExcel} className={styles.btnPrimary}>
                Exportar resultados
              </button>
            )}
          </div>
        </div>

        {resultados.length > 0 && (
          <div className={styles.resultadosContainer}>
            <h3>Resultados</h3>
            <div className={styles.tablaContainer}>
              <table className={styles.tablaResultados}>
                <thead>
                  <tr>
                    <th>Caja</th>
                    <th>R térmica [m²K/W]</th>
                    <th>Flujo calor [W]</th>
                    <th>Calor 10 días [J]</th>
                    <th>Masa hielo [kg]</th>
                    <th>Volumen hielo [m³]</th>
                    <th>Eficiencia térmica [%]</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((fila, index) => (
                    <tr key={index}>
                      <td>{fila.Caja || '-'}</td>
                      <td>{formatearNumero(fila.R_termina, 3)}</td>
                      <td>{formatearNumero(fila.Flujo_calor)}</td>
                      <td>{fila.Calor_total ? fila.Calor_total.toLocaleString() : '-'}</td>
                      <td>{formatearNumero(fila.Masa_hielo)}</td>
                      <td>{formatearNumero(fila.Volumen_hielo, 4)}</td>
                      <td>{formatearNumero(fila.Eficiencia)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      
      </div>
    </div>
  );
};

export default Calculadora; 