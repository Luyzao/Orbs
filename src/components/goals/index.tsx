import React from 'react'

const metas = [
  { titulo: 'Carro suv preto', tag: 'Finanças', cor: 'bg-indigo-600' },
  { titulo: 'Sapato Jimmy Choo', tag: 'Moda', cor: 'bg-pink-500' },
  { titulo: 'Viagem p/ Dubai', tag: 'Lazer', cor: 'bg-orange-500' },
]

export default function GoalsList() {
  return (
    <div className="bg-gray-50 rounded-xl  font-comfortaa text-black py-5 px-5 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="">Metas</h2>
        <button className="bg-gray-200 text-sm px-4  rounded-full flex items-center gap-1 hover:bg-gray-300">
          Nova meta <span className="text-xl">＋</span>
        </button>
      </div>
      <ul className="space-y-3">
        {metas.map((meta, index) => (
          <li
            key={index}
            className="bg-white  rounded-lg flex items-center justify-between shadow-sm px-3"
          >
            <div className="flex items-center gap-3 p-2">
              <input type="checkbox" className="" />
              <span className="text-gray-800 font-medium">{meta.titulo}</span>
            </div>
            <span
              className={`text-white text-xs px-2 py-1 rounded-full ${meta.cor}`}
            >
              {meta.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
