import Image from "next/image";
import GLYNNEMatrix from "./components/Data"; // Ajusta la ruta si tu componente está en otra carpeta
import Precentacion from './components/precentacion'
import Header from '../components/header'
import CardM  from './components/cardMarcketinng'

export default function Home() {
  return (
    <div className="w-full h-screen bg-white">
        <Header />
        <Precentacion />
      <main className="w-full h-full">
        <GLYNNEMatrix />
        <CardM />
      </main>

    </div>
  );
}

