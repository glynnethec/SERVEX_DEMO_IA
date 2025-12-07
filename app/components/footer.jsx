"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-neutral-900 py-12 px-6 mt-20 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* GLYNNE */}
        <div>
          <h3 className="text-xl font-bold tracking-wide">GLYNNE S.A.S</h3>
          <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
            Empresa registrada dedicada al desarrollo de plataformas, automatización
            empresarial e inteligencia artificial. <br />
            Glynne IA es nuestro producto principal orientado a autonomía empresarial.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="https://glynneai.com/appInfo" target="_blank" className="hover:text-black transition">
                Información de la aplicación
              </a>
            </li>
            <li>
              <a href="https://glynneai.com/politicas" target="_blank" className="hover:text-black transition">
                Políticas y privacidad
              </a>
            </li>
            <li>
              <a href="https://www.datacreditoempresas.com.co/directorio/glynne-sas.html" target="_blank" className="hover:text-black transition">
                Registro empresarial
              </a>
            </li>
          </ul>
        </div>

        {/* Servex US */}
        <div>
          <h3 className="text-xl font-bold tracking-wide">SERVEX US</h3>
          <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
            Plataforma de análisis y gestión de productos de mobiliario educativo. 
            Servex ofrece toda la información de su catálogo en una matriz CSV para alimentar 
            sistemas de inteligencia artificial y análisis de datos.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="https://servexus.com/catalogo" target="_blank" className="hover:text-black transition">
                Catálogo de productos
              </a>
            </li>
            <li>
              <a href="https://servexus.com/soporte" target="_blank" className="hover:text-black transition">
                Soporte técnico
              </a>
            </li>
            <li>
              <a href="mailto:info@servexus.com" className="hover:text-black transition">
                Email: info@servexus.com
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div>
          <h4 className="font-semibold mb-3 text-sm tracking-wide">REDES</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.instagram.com/glynneai/" target="_blank" className="hover:text-black transition">
                Instagram GLYNNE
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/servex-us" target="_blank" className="hover:text-black transition">
                LinkedIn Servex
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@AXGLYNNE" target="_blank" className="hover:text-black transition">
                YouTube GLYNNE
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-semibold mb-3 text-sm tracking-wide">CONTACTO</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://wa.me/573123455328" target="_blank" className="hover:text-black transition">
                WhatsApp GLYNNE: +57 312 345 5328
              </a>
            </li>
            <li>
              <a href="mailto:alexglynne7@gmail.com" className="hover:text-black transition">
                Email GLYNNE: alexglynne7@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+12025550123" className="hover:text-black transition">
                Tel Servex US: +1 (202) 555-0123
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-neutral-200 mt-10 pt-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} GLYNNE S.A.S & Servex US — Todos los derechos reservados.
      </div>
    </footer>
  );
}
