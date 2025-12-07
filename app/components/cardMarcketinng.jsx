import React from "react";

export default function TutorialBanner() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 py-10">
      <div
        className="
          flex flex-col md:flex-row items-center gap-10 
          bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] 
          rounded-2xl p-6 md:p-10
        "
      >
        {/* Imagen */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/servexMac.png"
            alt="Tutoriales GLYNNE"
            className="w-full max-w-md h-auto "
          />
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2 text-center md:text-left">
  <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
    Plataforma de análisis IA para Servex, simple, rápida y <span className="text-blue-900">free</span>.
  </h2>

  <p className="text-gray-600 mt-4 text-xs sm:text-base max-w-md">
    Este demo muestra un modelo capaz de integrarse a las bases de datos de tu empresa, 
    inferir información, detectar fluctuaciones, generar análisis precisos y sugerir 
    posibles pares de productos; una experiencia práctica para entender su impacto real.
  </p>
</div>

       
      </div>
    </section>
  );
}
