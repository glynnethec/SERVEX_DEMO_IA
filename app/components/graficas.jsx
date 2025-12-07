"use client";

import { useState, useEffect } from "react";
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// ======================================================
// 1. PALETA DE COLORES (AZUL MONOCROMÁTICO Y TONOS PRO)
// ======================================================

// Colores base para un estilo moderno y profesional (basado en azules)
const PRO_COLORS = {
  // Azul Dominante (Principal) - un azul oscuro y vibrante
  PRIMARY_MAIN: 'rgb(0, 102, 204)', // Un azul de negocio fuerte
  PRIMARY_LIGHT: 'rgba(0, 102, 204, 0.6)', // Versión con transparencia
  PRIMARY_LIGHTER: 'rgba(0, 102, 204, 0.2)', // Versión muy clara para rellenos

  // Gris/Neutro para un look limpio
  NEUTRAL_DARK: '#333333',
  NEUTRAL_LIGHT: '#f4f4f4',
  
  // Colores secundarios para segmentación, usando tonos del mismo azul y grises para ser "no tan colorido"
  SEGMENTS: [
    'rgb(0, 102, 204)',     // Azul principal
    'rgb(51, 153, 255)',    // Azul más claro
    'rgb(0, 76, 153)',      // Azul más oscuro
    'rgb(102, 178, 255)',   // Azul muy claro
    'rgb(153, 204, 255)',   // Azul pastel
    'rgb(204, 229, 255)',   // Azul casi blanco
    'rgb(120, 120, 120)',   // Gris oscuro
    'rgb(180, 180, 180)',   // Gris medio
  ]
};

// Arreglo para gráficos con múltiples segmentos (Pie, Doughnut, Polar)
const SEGMENT_COLORS = PRO_COLORS.SEGMENTS;


// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

// ======================================================
// 2. CONFIGURACIÓN GLOBAL MODERNA Y PRO
// ======================================================
ChartJS.defaults.font.family = "'Inter', 'Roboto', 'Arial', sans-serif"; // Fuente moderna
ChartJS.defaults.color = PRO_COLORS.NEUTRAL_DARK; // Color de texto oscuro
ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Fondo oscuro y opaco para Tooltip
ChartJS.defaults.plugins.tooltip.titleFont = { size: 16, weight: 'bold' };
ChartJS.defaults.plugins.tooltip.bodyFont = { size: 14 };
ChartJS.defaults.plugins.legend.labels.boxWidth = 14;
ChartJS.defaults.plugins.legend.labels.usePointStyle = true; // Usar círculos en la leyenda
ChartJS.defaults.plugins.legend.position = 'bottom';


// Configuración de escalas (ejes) para un look más limpio
const AXIS_OPTIONS = {
    grid: {
        color: PRO_COLORS.NEUTRAL_LIGHT, // Líneas de cuadrícula muy claras
        borderColor: PRO_COLORS.NEUTRAL_LIGHT,
        borderDash: [5, 5], // Líneas punteadas
        drawOnChartArea: true,
        drawTicks: false,
    },
    ticks: {
        color: PRO_COLORS.NEUTRAL_DARK,
    }
};

const CHART_OPTIONS_BASE = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
        },
    },
};

export default function DashboardCharts() {
  const [data, setData] = useState([]);
  const [activeChart, setActiveChart] = useState("bar"); 

  useEffect(() => {
    fetch("/catalogo.csv")
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.split("\n").filter((l) => l.trim() !== "");
        const headers = lines[0].split(",");
        const rows = lines.slice(1).map((line) => {
          const values = line.split(",");
          const obj = {};
          headers.forEach((h, i) => (obj[h] = values[i]));
          return obj;
        });
        setData(rows);
      })
      .catch((error) => console.error("Error al cargar o parsear el CSV:", error));
  }, []);

  if (data.length === 0) return <p className="text-center p-6 text-gray-500">Cargando datos...</p>;

  // ==========================
  // Helpers
  // ==========================
  const numeric = (col) =>
    data
      .map((d) => Number(String(d[col]).replace(/"/g, "").trim()))
      .filter((n) => !isNaN(n) && n !== 0);

  const countBy = (col) => {
    const c = {};
    data.forEach((d) => {
      const key = String(d[col] || "N/A").replace(/"/g, "").trim();
      if (key !== "") {
          c[key] = (c[key] || 0) + 1;
      }
    });
    return c;
  };

  const avg = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  // ==========================
  // Data (Usando Nombres de Columna Correctos)
  // ==========================
  const widthData = numeric("Dimensiones_W");
  const heightData = numeric("Dimensiones_H");
  const depthData = numeric("Dimensiones_D");
  // const weightCapacityData = numeric("Capacidad_Peso"); <-- Eliminada para este gráfico
  const actualWeightData = numeric("Peso"); 

  const categoryCounts = countBy("Categoria");
  const subcategoryCounts = countBy("Subcategoria");
  const widthCounts = countBy("Dimensiones_W");


  // ==========================
  // Charts AVAILABLE (Eliminada la gráfica 'line' de Capacidad de Peso)
  // ==========================
  const charts = {

    polar: {
        title: "Distribución de Peso (Peso Real)",
        element: (
            <PolarArea
                data={{
                    labels: actualWeightData.map((_, i) => i + 1),
                    datasets: [{
                        data: actualWeightData,
                        // Uso de la paleta para múltiples segmentos
                        backgroundColor: SEGMENT_COLORS.map(c => c.replace('rgb', 'rgba').replace(')', ', 0.6)')), // Tonos con 60% de opacidad
                        borderColor: 'white',
                        borderWidth: 2,
                    }],
                }}
                  options={{
                    ...CHART_OPTIONS_BASE,
                    scales: {
                        r: {
                            grid: {
                                color: PRO_COLORS.NEUTRAL_LIGHT,
                            },
                            angleLines: {
                                color: PRO_COLORS.NEUTRAL_LIGHT,
                            },
                            ticks: {
                                backdropColor: 'white',
                                color: PRO_COLORS.NEUTRAL_DARK,
                            }
                        }
                    }
                }}
            />
        ),
    },
    bar: {
      title: "Distribución por Categoría Principal",
      element: (
        <Bar
          data={{
            labels: Object.keys(categoryCounts),
            datasets: [{
              label: "Cantidad de Productos",
              // Uso del color dominante (Azul)
              data: Object.values(categoryCounts),
              backgroundColor: PRO_COLORS.PRIMARY_LIGHT, // Relleno claro
              borderColor: PRO_COLORS.PRIMARY_MAIN, // Borde oscuro
              borderWidth: 1,
              borderRadius: 4, // Esquinas redondeadas para barras
            }],
          }}
          options={{
            ...CHART_OPTIONS_BASE,
            scales: {
                x: AXIS_OPTIONS,
                y: AXIS_OPTIONS,
            }
          }}
        />
      ),
    },

    doughnut: {
      title: "Distribución por Subcategoría",
      element: (
        <Doughnut
          data={{
            labels: Object.keys(subcategoryCounts),
            datasets: [{
              data: Object.values(subcategoryCounts),
              // Uso de la paleta para múltiples segmentos (tonos de azul/gris)
              backgroundColor: SEGMENT_COLORS,
              borderColor: 'white',
              borderWidth: 4, // Borde más grueso para separar segmentos
            }],
          }}
            options={CHART_OPTIONS_BASE}
        />
      ),
    },

    // La gráfica 'line' (Capacidad de Peso) ha sido ELIMINADA aquí.

    radar: {
      title: "Promedios de Dimensiones (W / D / H)",
      element: (
        <Radar
          data={{
            labels: ["Ancho Promedio", "Profundidad Promedio", "Altura Promedio"],
            datasets: [
              {
                label: "Dimensión Promedio",
                data: [avg(widthData), avg(depthData), avg(heightData)],
                // Uso de un color secundario o el azul principal
                backgroundColor: PRO_COLORS.PRIMARY_LIGHTER, // Relleno suave
                borderColor: PRO_COLORS.PRIMARY_MAIN,
                pointBackgroundColor: PRO_COLORS.PRIMARY_MAIN,
                pointBorderColor: 'white',
                borderWidth: 2,
              },
            ],
          }}
            options={{
                ...CHART_OPTIONS_BASE,
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: PRO_COLORS.NEUTRAL_LIGHT,
                        },
                        angleLines: {
                            color: PRO_COLORS.NEUTRAL_LIGHT,
                        },
                        pointLabels: {
                            color: PRO_COLORS.NEUTRAL_DARK,
                            font: {
                                size: 14,
                                weight: 'bold',
                            }
                        },
                        ticks: {
                            backdropColor: 'white',
                            color: PRO_COLORS.NEUTRAL_DARK,
                        }
                    }
                }
            }}
        />
      ),
    },

    pie: {
        title: "Distribución de Valores de Ancho Comunes",
        element: (
            <Pie
                data={{
                    labels: Object.keys(widthCounts),
                    datasets: [{
                        data: Object.values(widthCounts),
                        // Uso de la paleta para múltiples segmentos (tonos de azul/gris)
                        backgroundColor: SEGMENT_COLORS,
                        borderColor: 'white',
                        borderWidth: 4,
                    }],
                }}
                  options={CHART_OPTIONS_BASE}
            />
        ),
    },

    
  };
  
  // ==========================
  // LÓGICA DE CORRECCIÓN DE ESTADO 
  // ==========================
  // Solución al "Cannot read properties of undefined (reading 'title')"
  // Si el gráfico activo ya no existe (porque fue eliminado), lo reseteamos a "bar"
  if (!charts[activeChart]) {
    setActiveChart("bar");
    // Esto fuerza a React a re-renderizar con un valor válido en el próximo ciclo
    return <p className="text-center p-6 text-gray-500">Ajustando gráfico...</p>;
  }


  // ==========================
  // JSX (Ajustes de estilo en Tailwind CSS para un look moderno/pro)
  // ==========================
  return (
    // Contenedor principal con fondo ligero para contraste
    <div className="p-8 w-full min-h-screen bg-white flex flex-col items-center gap-8">
    <div className="max-w-[1200px] w-full text-center md:text-left space-y-4">
    <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
  Visualiza cómo la IA <span className="text-blue-900">desestructura y analiza</span> tus datos en tiempo real.
</h2>

<p className="text-gray-600 text-sm sm:text-base leading-relaxed">
  Estas gráficas representan el proceso de <strong>desestructuración, análisis y comprensión</strong> 
  que realiza el modelo de inteligencia artificial a partir del set de datos original. Toda la 
  información del catálogo de <strong>Diversified Spaces</strong> —productos, medidas, materiales y 
  configuraciones— es convertida en una matriz vectorial que la IA interpreta para generar 
  <strong>insights precisos, patrones claros y relaciones clave</strong>.  
  Aquí puedes visualizar cómo el sistema transforma datos complejos en conocimiento útil.
</p>
      </div>
        
      {/* Selector de Gráficos */}
      <div className="flex gap-4 mt-[50px] flex-wrap justify-center max-w-4xl w-full">
        
        {Object.keys(charts).map((key) => (
          <button
            key={key}
            onClick={() => setActiveChart(key)}
            className={`px-5 py-2 rounded-full border transition-all duration-300 font-semibold text-sm shadow-md ${
              activeChart === key
                // Botón activo: Azul con sombra fuerte
                ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/50"
                // Botón inactivo: Blanco/Gris con hover pro
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-blue-300"
            }`}
          >
            {charts[key].title}
          </button>
        ))}
      </div>

      {/* Contenedor del Gráfico Activo */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 border-b border-gray-100 pb-4">
           {charts[activeChart].title}
        </h2>
        {/* Contenedor del gráfico: clase h-[400px] asegura altura y centrado con mx-auto en el padre */}
        <div className="relative h-[400px] w-full">
          {charts[activeChart].element}
        </div>
      </div>
    </div>
  );
}