"use client";

import Link from "next/link";

const card = {

  description:
    "Accede al demo del modelo que se integra a tus bases de datos para interpretar información, analizar fluctuaciones, identificar patrones clave y sugerir combinaciones de productos basadas en tu realidad operativa.",
  image: "/vectorInput.png",
  link: "/model",
};

export default function CardsGrid() {
  return (
    <div className="bg-white/30 backdrop-blur-md flex flex-col items-center justify-center h-[100vh] p-6 rounded-lg">

      {/* 🔵 TÍTULO PRINCIPAL CENTRADO (FUERA DE LA CARD) */}
      <h1 className="text-gray-900 text-3xl font-bold mb-6 text-center">
        Modelo IA Servex: Análisis Inteligente en Tiempo Real
      </h1>

      <Link href={card.link} className="w-full flex justify-center">
        <div className="w-[80%] h-[50vh] rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 flex flex-col">
          
          {/* 🔵 Parte superior: fondo blur */}
          <div className="w-full h-1/2 bg-white/10 backdrop-blur-xl flex items-center justify-center p-4">
            <img
              src={card.image}
              alt={card.title}
              className="w-[600px] h-full object-contain"
            />
          </div>

          {/* ⚪ Parte inferior: contenido de la card */}
          <div className="p-5 flex flex-col justify-center h-1/2 bg-white text-center">

            {/* 🔵 TÍTULO DE LA CARD */}
            <h2 className="text-gray-800 text-xl font-semibold mb-2">
              {card.title}
            </h2>

            {/* 🔵 LOGO debajo del título */}
            <img
              src="/logo.png"        // ← Cambia por el logo real
              alt="Servex Logo"
              className="w-50 mx-auto mb-3 opacity-90"
            />

            {/* 🔵 DESCRIPCIÓN */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>

        </div>
      </Link>
    </div>
  );
}
