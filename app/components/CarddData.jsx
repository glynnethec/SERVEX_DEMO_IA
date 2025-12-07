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
     

        {/* Texto */}
        <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
  Inteligencia artificial conectada al catálogo de <strong>Diversified Spaces</strong>, precisa y <span className="text-blue-900">confiable</span>.
</h2>


          <p className="text-gray-600 mt-4 text-xs sm:text-base max-w-md">
            Este modelo de inteligencia artificial se alimenta directamente de la base de datos 
            de productos disponibles de <strong>Diversified Spaces</strong>. Analiza los datos 
            tabulares para comprender el nicho de mercado, reconocer los productos y generar 
            información veraz y accionable, ayudando a tomar decisiones estratégicas basadas 
            en datos reales.
          </p>
        </div>

           {/* Imagen */}
           <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/CData.png"
            alt="Tutoriales GLYNNE"
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  );
}
