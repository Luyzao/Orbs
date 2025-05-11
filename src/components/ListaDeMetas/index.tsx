// Listademetas.tsx
import { useState } from 'react'
import { CardMeta } from '../CardMeta'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface Meta {
  title: string
  value: string
  color: string
  imageUrl: string
}

interface ListaDeMetasProps {
  onEdit: () => void
}

export function ListaDeMetas({ onEdit }: ListaDeMetasProps) {
  const [metas, setMetas] = useState<Meta[]>([
    {
      title: 'Sapato Jimmy Choo',
      value: '609,00',
      color: 'bg-purple-500',
      imageUrl: '/images/sapato.png',
    },
    {
      title: 'Carro novo',
      value: '101.000,09',
      color: 'bg-blue-500',
      imageUrl: '/images/carro.png',
    },
    {
      title: 'Viagem para Dubai',
      value: '101.000,09',
      color: 'bg-red-400',
      imageUrl: '/images/viagem.png',
    },
    {
      title: 'Curso de mandarim',
      value: '2.340,00',
      color: 'bg-green-400',
      imageUrl: '/images/mandarim.png',
    },
    {
      title: 'Campeonato beach...',
      value: '560,40',
      color: 'bg-blue-600',
      imageUrl: '/images/fitness.png',
    },
    {
      title: 'Curso de IA',
      value: '3.000,00',
      color: 'bg-yellow-400',
      imageUrl: '/images/ia.png',
    },
  ])

  const [startIndex, setStartIndex] = useState(0)
  const cardsPerPage = 5

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, metas.length - cardsPerPage))
  }

  const visibleMetas = metas.slice(startIndex, startIndex + cardsPerPage)

  return (
    <div className="flex items-center gap-2">
      {/* Botão voltar */}
      <div className="w-10 relative left-2">
        {startIndex > 0 ? (
          <button
            onClick={handlePrev}
            className="p-2 bg-gray-400 rounded-full hover:bg-gray-600 text-white"
          >
            <ChevronLeft size={24} />
          </button>
        ) : null}
      </div>

      {/* Lista de cards */}
      <div className="flex gap-3 overflow-visible">
        {visibleMetas.map((meta, index) => (
          <CardMeta key={index} {...meta} onEdit={onEdit} />
        ))}
      </div>

      {/* Botão avançar */}
      <div className="w-10">
        {startIndex + cardsPerPage < metas.length ? (
          <button
            onClick={handleNext}
            className="p-2 bg-gray-400 rounded-full hover:bg-gray-600 text-white"
          >
            <ChevronRight size={24} />
          </button>
        ) : null}
      </div>
    </div>
  )
}
