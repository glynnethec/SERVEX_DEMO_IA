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
            src="/movile.png"
            alt="Tutoriales GLYNNE"
            className="w-full max-w-md h-auto"
          />
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
  Acceso móvil a la IA de Servex, análisis claro y <span className="text-blue-900">en tiempo real</span>.
</h2>


          <p className="text-gray-600 mt-4 text-xs sm:text-base max-w-md">
            Este desarrollo de modelo de inteligencia artificial para <strong>Servex</strong> 
            está disponible en dispositivos móviles, permitiendo acceder a análisis y datos 
            de productos educativos desde cualquier lugar. La IA se alimenta de la base de 
            datos de <strong>Diversified Spaces</strong>, analiza la información tabular, 
            reconoce productos y genera insights precisos y accionables, optimizando la toma 
            de decisiones incluso sobre la marcha.
          </p>
        </div>

     
      </div>
    </section>
  );
}
