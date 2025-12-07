import Image from "next/image";
import GLYNNEMatrix from "./components/chat"; // Ajusta la ruta si tu componente está en otra carpeta

export default function Home() {
  return (
    <div className="w-full h-screen bg-white ">
      <main className="w-full h-full">
        <GLYNNEMatrix />
      </main>
    </div>
  );
}

