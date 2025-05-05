import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { SlCalender } from 'react-icons/sl'
import { FaArrowDown } from 'react-icons/fa6'

const despesas = [
  {
    data: 'Hoje',
    itens: [
      { nome: 'Bolsa de praia', valor: 169.0, cor: 'bg-pink-500' },
      { nome: 'Raquete beach tênis', valor: 289.9, cor: 'bg-orange-500' },
    ],
  },
  {
    data: '11 de março de 2025',
    itens: [
      {
        nome: 'Whey protein de avelã - 1/2',
        valor: 274.5,
        cor: 'bg-indigo-600',
      },
      { nome: 'Protetor solar', valor: 75.0, cor: 'bg-purple-400' },
    ],
  },
]

export default function DespesasList() {
  return (
    <div className="bg-gray-50 px-4 md:px-6 pt-5  text-black rounded-xl shadow-xl ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-1xl">Despesas</h2>
        <button className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700">
          <span className="text-xl">
            {' '}
            <FiPlusCircle />
          </span>
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar despesas"
          className="bg-gray-200 border-0 px-3 py-1  rounded-lg border-gray-300 text-sm"
        />
        <button className="bg-gray-200 text-sm px-2  rounded-lg hover:bg-gray-300 flex items-center gap-2 text-gray-500">
          <span className="md:block hidden">Data </span>
          <i>
            <SlCalender />
          </i>
        </button>
        <button className="bg-gray-200 text-sm px-2  rounded-lg hover:bg-gray-300 flex items-center gap-2 text-gray-500">
          <span className="md:block hidden"> Categoria</span>
          <i>
            <FaArrowDown />
          </i>
        </button>
      </div>
      <div className="md:h-[370px] h-[220px] overflow-y-auto">
        {despesas.map((grupo, i) => (
          <div key={i} className="mb-4 ">
            <p className="text-xs md:text-sm text-gray-500 mb-2">
              {grupo.data}
            </p>
            {grupo.itens.map((item, j) => (
              <div
                key={j}
                className="flex justify-between items-center px-2 md:px-4 bg-white py-1 rounded-lg mb-2 shadow-sm"
              >
                <div className="flex items-center gap-2 w-auto">
                  <span
                    className={`w-2rem h-3 rounded-full ${item.cor}`}
                  ></span>
                  <span className="text-gray-700 w-full text-xs md:text-sm">
                    {item.nome}
                  </span>
                </div>
                <span className="text-gray-800 w-auto text-xs md:text-sm font-medium">
                  R$ {item.valor.toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
