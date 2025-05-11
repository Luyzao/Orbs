// components/ModalNovaMeta.tsx
import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ModalNovaMetaProps {
isOpen: boolean;
onClose: () => void;
}

const imagens = [
  "/images/carro.png",
  "/images/esporte2.png",
  "/images/esporte3.png",
];

export const ModalNovaMeta: React.FC<ModalNovaMetaProps> = ({ isOpen, onClose }) => {
const [titulo, setTitulo] = React.useState("");
const [valorMeta, setValorMeta] = React.useState("");
const [valorGuardado, setValorGuardado] = React.useState("");
const [categoria, setCategoria] = React.useState("");
const [imgIndex, setImgIndex] = React.useState(0);

if (!isOpen) return null;

const handleNext = () => {
setImgIndex((prev) => (prev + 1) % imagens.length);
};

const handlePrev = () => {
setImgIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
};

return ( <div className="fixed inset-0 z-50 flex text-gray-800 items-center justify-center bg-black/40 backdrop-blur-sm"> <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-[90%] max-w-xl shadow-lg relative"> <button onClick={onClose} className="absolute top-4 right-4"> <X className="w-9 h-9" /> </button>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        Adicione nova meta
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col space-y-3">
        {/* Título */}
        <div className="flex flex-col gap-1">
            <label htmlFor="titulo" className="text-sm font-medium text-gray-700 dark:text-gray-200">Título</label>
            <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            className="bg-gray-100 text-sm px-2 py-1 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        {/* Valor da meta */}
        <div className="flex flex-col gap-1">
            <label htmlFor="valorMeta" className="text-sm font-medium text-gray-700 dark:text-gray-200">Valor da meta</label>
            <input
            id="valorMeta"
            type="number"
            value={valorMeta}
            onChange={(e) => setValorMeta(e.target.value)}
            placeholder="Valor"
            className="bg-gray-100 text-sm px-2 py-1 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        {/* Valor guardado */}
        <div className="flex flex-col gap-1">
            <label htmlFor="valorGuardado" className="text-sm font-medium text-gray-700 dark:text-gray-200">Valor guardado</label>
            <input
            id="valorGuardado"
            type="number"
            value={valorGuardado}
            onChange={(e) => setValorGuardado(e.target.value)}
            placeholder="Valor"
            className="bg-gray-100 text-sm px-2 py-1 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        {/* Categoria */}
        <div className="flex flex-col gap-1">
            <label htmlFor="categoria" className="text-sm font-medium text-gray-700 dark:text-gray-200">Categoria</label>
            <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="bg-gray-100 text-sm px-2 py-1 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            <option value="">Selecione...</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Viagem">Viagem</option>
            </select>
        </div>
        </div>

      <div className="flex flex-col items-center justify-center space-y-2">
        <span className="text-sm">Escolha uma imagem:</span>
        <div className="relative w-40 h-40">
          <img
            src={imagens[imgIndex]}
            alt="Imagem da meta"
            className="rounded-xl w-full h-full object-contain"
          />
          <button onClick={handlePrev} className="absolute left-[-24px] top-1/2 -translate-y-1/2">
            <ChevronLeft />
          </button>
          <button onClick={handleNext} className="absolute right-[-24px] top-1/2 -translate-y-1/2">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>

    <button className="mt-6 w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800">
      Salvar
    </button>
  </div>
</div>
  );
};
