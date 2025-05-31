import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { LuMoon } from 'react-icons/lu'
import Image from 'next/image'
import { useRouter } from 'next/router'
import DatePicker from "react-datepicker";
import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from 'react-icons/ai';
import { ptBR } from 'date-fns/locale';

interface ToolBarProps {
  selectedDate: Date | any
  setSelectedDate: any
}

const ToolBar: React.FC<ToolBarProps> = ({
  selectedDate,
  setSelectedDate,
}: any) => {
  const router = useRouter()

  // Estados para IA
  const [loading, setLoading] = useState(false);
  const [recomendacao, setRecomendacao] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Dados do usuário - você deve trocar pra pegar de onde tiver os dados reais
  // Pode ser do contexto, estado global, ou uma chamada API que já fez em outro lugar
  const salario = 5000;
  const idade = 30;
  const filhos = 2;
  const metaEconomia = 1000;

  async function handleClick() {
    if (isOpen) {
      // Se já estiver aberto, fecha o card
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3003/api/recomendacao-gastos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salario, idade, filhos, metaEconomia }),
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar recomendação');
      }

      const data = await response.json();
      setRecomendacao(data.recomendacao);
      setIsOpen(true); // abre o card após receber a recomendação
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  }

  if (router.pathname === '/calculator') {
    return (
      <div className="w-full font-comfortaa flex flex-col xl:flex-row justify-between items-start sm:items-center gap-3">
        <div className="text-black flex flex-col w-auto items-center xl:items-start"></div>

        <div className="flex w-full sm:w-auto justify-center sm:justify-end items-center gap-2 text-black">
          <div className="flex items-center bg-gray-200 rounded-md h-8 px-1">
            <AiOutlineCalendar size={18} className="mr-2 ml-2 inline-block" />
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) {
                  console.log('Mês selecionado:', date.getMonth() + 1)
                  setSelectedDate(date)
                }
              }}
              dateFormat="MMMM"
              showMonthYearPicker
              locale={ptBR}
              className="bg-transparent text-xs md:text-sm w-full border-none focus:outline-none"
            />
          </div>
          <div className="bg-gray-200 h-2rem w-2rem flex justify-center items-center rounded-md">
            <LuMoon size={20} />
          </div>
          <div>
            <Image
              src="/images/avatar.png"
              alt="Avatar"
              width={32}
              height={32}
              className="h-2rem w-2rem bg-gray-200 rounded-md"
            />
          </div>
        </div>
      </div>
    )
  }

  // Demais páginas
  return (
    <div className="w-full font-comfortaa flex flex-col xl:flex-row justify-between items-start sm:items-center gap-3">
      <div className="text-black flex flex-col w-auto items-center xl:items-start">
        <h1 className="lg:text-xl xl:text-2xl">
          <span className="text-[#383577]">Bem-vindo à sua</span> órbita
          financeira!
        </h1>
        <p className="text-xs sm:text-xs md:text-sm lg:text-sm ">
          Olá, usuario123
        </p>
      </div>

      <div className="flex w-full sm:w-auto justify-center sm:justify-end items-center gap-2 text-black">
       <div className="relative inline-block">
        <button
          className="flex items-center justify-center w-auto bg-gray-200 rounded-md px-2 gap-2 py-1 h-8"
          onClick={handleClick}
          disabled={loading}
        >
          <p className="text-xs md:text-sm">Recomendação de Gastos</p>
          <RiMoneyDollarCircleLine size={20} />
        </button>

        {(loading || error || isOpen) && (
          <div className="absolute left-0 mt-2 w-80 p-4 bg-white rounded-md shadow-lg border border-gray-300 z-10">
            {loading && <p className="text-gray-500">Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {isOpen && recomendacao && (
            <>
              <ul className="text-gray-700 text-sm space-y-1">
                {Object.entries(recomendacao).map(([categoria, valor]) => (
                  <li key={categoria} className="flex justify-between">
                    <span className="capitalize">{categoria}:</span>
                    <span>R$ {valor}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          </div>
        )}
      </div>
        <div className="bg-gray-200 h-2rem w-2rem flex justify-center items-center rounded-md">
          <LuMoon size={20} />
        </div>
        <div>
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            width={32}
            height={32}
            className="h-2rem w-2rem bg-gray-200 rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

export default ToolBar
