import { useState } from 'react'
import { CardMeta } from '../CardMeta'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface Meta {
  id: string
  title: string
  target: number
  progress: number
  imageUrl: string
  category?: {
    color: string
    name: string
  }
}


interface ListaDeMetasProps {
  onEditMeta: (meta: Meta) => void
  onDeleteMeta: (id: string) => void
  metas: Meta[]
}

export function ListaDeMetas({
  onEditMeta,
  onDeleteMeta,
  metas = [],
}: ListaDeMetasProps) {
  const [startIndex, setStartIndex] = useState(0)
  const cardsPerPage = 5

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, Math.max(0, metas.length - cardsPerPage))
    )
  }

  const visibleMetas = metas.slice(startIndex, startIndex + cardsPerPage)

  return (
    <div className="flex items-center gap-2">
      <div className="w-10 relative left-2">
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="p-2 bg-gray-400 rounded-full hover:bg-gray-600 text-white"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>

      <div className="flex gap-3 overflow-visible">
        {visibleMetas.map((meta, index) => (
          <CardMeta
            key={index}
            title={meta.title}
            target={meta.target}
            progress={meta.progress}
            imageUrl={meta.imageUrl}
            color={meta.category?.color || '#B191F5'} // fallback para roxo se não tiver cor
            onEditMeta={() => onEditMeta(meta)}
            onDeleteMeta={() => onDeleteMeta(meta.id)}
          />
        ))}
      </div>

      <div className="w-10">
        {startIndex + cardsPerPage < metas.length && (
          <button
            onClick={handleNext}
            className="p-2 bg-gray-400 rounded-full hover:bg-gray-600 text-white"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  )
}
