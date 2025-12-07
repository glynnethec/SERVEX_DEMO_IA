"use client";

import { motion } from "framer-motion";

export default function Catalogo() {
  return (
    <main className="w-screen h-[90vh] bg-white flex p-0 m-0 overflow-hidden">
      {/* 🔹 Panel principal (100%) */}
      <div className="w-full mt-[50px] h-full overflow-y-auto flex flex-col items-center justify-center relative">
        {/* Sección de texto centrada */}
        <motion.div
          className="relative z-10 max-w-4xl text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Título */}
          <motion.h2
            className="text-neutral-800 text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            CATALOGO <span className="text-gray-500">DIVERSIFIED SPACES</span>
          </motion.h2>

          {/* Texto descriptivo */}
          <motion.p
            className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Esta sección contiene el catálogo completo de la empresa, incluyendo productos, especificaciones, tamaños, disponibilidades y demás atributos relevantes. 
            Para que el <strong>modelo de inteligencia artificial</strong> pueda procesar y entender toda esta información, el catálogo se ha transformado en una <strong>matriz vectorial</strong>. 
            Esto permite que el modelo pueda conectarse a los datos y relacionarlos con las preguntas del usuario, verificando la información de manera precisa y consistente. 
            Aquí no se trata de presentar los productos de forma comercial, sino de ofrecer un espacio donde se pueda corroborar la data que el modelo está generando, 
            asegurando que cada consulta se base en la información real del catálogo.
          </motion.p>

          {/* Nota final */}
          <motion.p
            className="text-gray-400 text-xs md:text-sm mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Visualización de datos conectada al modelo de IA
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
