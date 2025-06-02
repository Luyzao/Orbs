import { Pencil, Trash } from 'lucide-react'

export interface CardMetaProps {
  title: string
  target: number
  progress: number
  color: string
  imageUrl: string
  onEditMeta?: () => void
  onDeleteMeta?: () => void
}

export function CardMeta({
  title,
  target,
  progress,
  color,
  imageUrl,
  onEditMeta,
  onDeleteMeta,
}: CardMetaProps) {
  return (
    <div className="w-48 h-60 rounded-xl shadow-md bg-white flex flex-col p-3 relative overflow-hidden">
      {/* Barra colorida no topo centralizada */}
      <div
        className="absolute top-2 left-1/2 transform -translate-x-1/2"
        style={{ backgroundColor: color, width: '40px', height: '6px', borderRadius: '4px' }}
      ></div>

      {/* Ícone de lixeira no canto superior esquerdo */}
      <div className="absolute top-2 left-2">
        <Trash
          className="w-8 h-8 text-red-600 hover:text-red-400 cursor-pointer"
          onClick={onDeleteMeta}
        />
      </div>

      {/* Ícone de edição no canto superior direito */}
      <div className="absolute top-2 right-2">
        <Pencil
          className="w-8 h-8 text-gray-800 hover:text-gray-500 cursor-pointer"
          onClick={onEditMeta}
        />
      </div>

      {/* Imagem da meta */}
      <div className="mt-6 mb-2">
        <img src={imageUrl} alt={title} className="h-24 mx-auto" />
      </div>

      {/* Título */}
      <div className="text-gray-800 text-center text-sm font-semibold">{title}</div>

      {/* Informações financeiras */}
      <div className="text-center text-xs text-gray-600">
        Meta: R$ {target.toLocaleString('pt-BR')}
      </div>
      <div className="text-center text-xs text-gray-600">
        Guardado: R$ {progress.toLocaleString('pt-BR')}
      </div>
    </div>
  )
}
