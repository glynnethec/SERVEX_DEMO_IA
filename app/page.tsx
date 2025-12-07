import Image from "next/image";
import Main1 from './components/main1'
import GLYNNEMatrix from "./components/menuIicial"; // Ajusta la ruta si tu componente está en otra carpeta
import Header from "./components/header";
import CardM from './components/cardMarcketinng'

import CData from './components/CarddData'
import Movile from './components/movileCard'
import Footer from './components/footer'


export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Header fijo */}
      <Header />

    
      {/* Contenido principal */}
      <main
  className="w-full pt-14 bg-black text-white bg-cover bg-center"
  style={{ backgroundImage: "url('https://i.pinimg.com/736x/6e/79/0f/6e790fbd1a0166e5b40338d024628330.jpg')" }}
>
  <GLYNNEMatrix />
</main>


 {/* Contenido principal */}
 <main className="w-full pt-14 bg-white text-black">
        {/* pt-14 = padding top igual a la altura del header */}
        <CardM/>
      </main>

        
      

      <main className="w-full pt-14 bg-white text-black">
        {/* pt-14 = padding top igual a la altura del header */}
        <CData />
      </main>
      
  
        
      <main className="w-full pt-14 bg-white text-black">
        {/* pt-14 = padding top igual a la altura del header */}
        <Movile />
      </main>
      <main className="w-full pt-14 bg-white text-black">
        {/* pt-14 = padding top igual a la altura del header */}
        <Footer />
      </main>
    </div>
  );
}
