'use client';

import { useEffect, useState } from 'react';

export default function Main1() {
  const [bgImage, setBgImage] = useState('/fondomain1.png');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 700;
      setIsMobile(mobile);
      setBgImage('/fondomain1.png');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="relative w-full h-[100vh] overflow-hidden font-inter">

      {/* 🔹 Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={bgImage}
          alt="Fondo GLYNNE - Arquitectura de software B2B"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        {/* 🔹 Blur muy suave */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      </div>

      {/* 🔹 CONTENIDO CENTRADO */}
      <div className="relative z-40 w-full h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center text-gray-900 bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">

          {/* 🔹 TÍTULO ESTILO ELEGANTE */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 drop-shadow-sm leading-tight">
            Impulsa tu Empresa con <span className="text-gray-800">Inteligencia Artificial</span>
          </h1>

          {/* 🔹 SUBTÍTULO */}
          <p className="text-lg sm:text-xl text-gray-800 leading-relaxed">
            Automatizamos procesos, integramos IA a tus sistemas y creamos soluciones 
            tecnológicas a la medida para potenciar tu crecimiento.
          </p>

        </div>
      </div>

      {/* 🔹 CURVA INFERIOR */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 -50 1440 320"
          className="w-full h-[60vh]"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="
              M0,250 
              C360,230 720,260 1080,220 
              C1260,200 1380,180 1440,160 
              L1440,320 L0,320Z
            "
          />
        </svg>
      </div>

    </main>
  );
}
