import { useState, useRef, useEffect } from "react";
import { MdMenuBook, MdOutlineCalculate, MdOutlineQrCode } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { GiMoonOrbit } from "react-icons/gi";

export default function SideBar() {
    const [itemSelecionado, setItemSelecionado] = useState("Dashboard");
    const [colapsado, setColapsado] = useState(false);
    const refs = useRef<any>([]);

    const menuItens = [
        { nome: "Dashboard", icone: <MdOutlineQrCode size={25} /> },
        { nome: "Educação", icone: <MdMenuBook size={25} /> },
        { nome: "Metas", icone: <TbPigMoney size={25} /> },
        { nome: "Calculadora", icone: <MdOutlineCalculate size={25} /> },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setColapsado(true);
            } else {
                setColapsado(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`bg-gray-100 ${colapsado ? "w-20" : "w-48"} px-2 pb-4 pt-6 shadow-xl h-screen flex flex-col items-center justify-between`}>
            <div className="flex flex-col items-center gap-5">
                {/* Logo ou ícone */}
                <div className="text-5xl text-gray-800 mb-4">
                    {colapsado ? <GiMoonOrbit /> : "Orbs"}
                </div>

                {/* Lista de menus */}
                <ul className="text-xl flex flex-col gap-3 z-10">
                    {menuItens.map((item, index) => (
                        <li
                        key={item.nome}
                        ref={(el) => { refs.current[index] = el; }}
                        onClick={() => setItemSelecionado(item.nome)}
                        className={`flex gap-2 px-3 py-1 text-center transition-all cursor-pointer
                            ${itemSelecionado === item.nome ? "text-blue-900 bg-indigo-100 border-round-xl" : "text-gray-800"}
                        `}
                    >
                        <i>{item.icone}</i>
                        {!colapsado && item.nome}
                    </li>
                    ))}
                </ul>
            </div>

            {/* Botão sair */}
            <button className="text-gray-800 flex items-center gap-2 text-xl hover:bg-gray-300 px-3 py-1 rounded-xl">
                <i><RxExit /></i>
                {!colapsado && "Sair"}
            </button>
        </div>
    );
}
