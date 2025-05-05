// pages/index.tsx
// DEPENDENCIAS -> npx shadcn@latest add progress | npm install recharts | npm install @heroicons/react
import Sidebar from "@/components/SideBar";
import { ListaDeMetas } from "@/components/ListaDeMetas";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { GraficoAnaliseMetas } from "@/components/GraficoAnaliseMetas";
import { BarraDeProgresso } from "@/components/BarraDeProgresso";
import { useContext,useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { ModalNovaMeta } from "@/components/ModalNovaMeta";

export default function Home() {
  const { toggleTheme } = useContext(ThemeContext);
  const [modalAberto, setModalAberto] = useState(false);
  
  return (
    <div className="flex">
      {/* Menu lateral */}
      <Sidebar/>

      {/* Conteúdo principal */}
      <main className="flex-1 p-5 bg-gray-100 dark:bg-gray-900 min-h-screen">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Qual orbita
          <span style={{ color: "#383577" }}> você deseja </span>
          <span className="text-gray-800 dark:text-white">conhecer?</span><br/>
          <span className="text-2xl font-bold mb-10 text-gray-800 dark:text-white">Defina suas metas...</span>
        </h1>

          <div className="flex items-center gap-2">
          <div className="bg-gray-300 dark:bg-gray-700 shadow px-3 py-2 flex items-center gap-2 text-sm flex-shrink-0">
            <span className="font-bold text-gray-800 dark:text-white">Recomendação de gasto: R$ 300,00</span>
            <CircleDollarSign size={26} className="text-gray-800 dark:text-white" />
          </div>
          <button
            onClick={() => {
              console.log("Cliquei no botão!");
              toggleTheme(); // se quiser já ativar aqui
            }}
            className="flex items-center justify-center bg-gray-300 dark:bg-gray-700 shadow px-2 py-2 text-sm text-gray-800 hover:text-black"
          >
            <i className="pi pi-moon text-lg"></i>
          </button>


            <Image
              src="/images/avatar.jpg"
              alt="Avatar"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          </div>
        </div> 

        {/* Linha divisória */}
        <hr className="border-t border-gray-400 dark:border-gray-600 -mx-5" />

        {/* Seção de metas */}
        <section className="mt-4">
          <div className="flex items-center justify-between px-14 mb-2">
          <h2 style={{ marginLeft: "60px" }} className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Metas</h2>
            <button
              onClick={() => setModalAberto(true)}
              className="flex items-center gap-2 bg-gray-300 dark:bg-gray-700 shadow px-4 py-2 rounded-full text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition">
              + Nova meta
            </button>
          </div>

          <ListaDeMetas onEdit={() => setModalAberto(true)} />
          <ModalNovaMeta isOpen={modalAberto} onClose={() => setModalAberto(false)} />
          </section>

        {/* Seção de Gráfico e BarraProgresso */}
        <div style={{ marginLeft: "55px" }} className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
          <GraficoAnaliseMetas />
          <BarraDeProgresso />
        </div>

      </main>
    </div>
  );
}
