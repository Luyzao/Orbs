'use client'
import React, { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { addGoal, updateGoal } from '@/services/goals'
import { supabase } from '../../../lib/supabaseClient'
import { getCategory } from '@/services/category'

interface ModalNovaMetaProps {
  isOpen: boolean
  onClose: () => void
  metaSelecionada?: any | null
}

const imagens = [
  '/images/car.svg',
  '/images/beach.svg',
  '/images/closet.svg',
  '/images/sport.svg',
  '/images/study.svg',
]

export const ModalNovaMeta: React.FC<ModalNovaMetaProps> = ({
  isOpen,
  onClose,
  metaSelecionada,
}) => {
  const [titulo, setTitulo] = useState('')
  const [valorMeta, setValorMeta] = useState('')
  const [valorGuardado, setValorGuardado] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [categorias, setCategorias] = useState<any[]>([])
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const response = await getCategory()
        setCategorias(response.data || [])
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      }
    }
    carregarCategorias()
  }, [])

  useEffect(() => {
    if (isOpen) {
      if (metaSelecionada) {
        setTitulo(metaSelecionada.title || '')
        setValorMeta(metaSelecionada.target?.toString() || '')
        setValorGuardado(metaSelecionada.progress?.toString() || '')
        setCategoriaId(metaSelecionada.categoryId || '')
        const imgIndex = imagens.findIndex(img => img === metaSelecionada.imageUrl)
        setImgIndex(imgIndex >= 0 ? imgIndex : 0)
      } else {
        setTitulo('')
        setValorMeta('')
        setValorGuardado('')
        setCategoriaId('')
        setImgIndex(0)
      }
    }
  }, [isOpen, metaSelecionada])

  if (!isOpen) return null

  const handleNext = () => {
    setImgIndex((prev) => (prev + 1) % imagens.length)
  }

  const handlePrev = () => {
    setImgIndex((prev) => (prev - 1 + imagens.length) % imagens.length)
  }

  const handleSalvar = async () => {
    if (!titulo || !valorMeta || !valorGuardado || !categoriaId) {
      alert('Preencha todos os campos!')
      return
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      alert('Usuário não autenticado')
      return
    }

    try {
      const payload = {
        title: titulo,
        target: parseFloat(valorMeta),
        progress: parseFloat(valorGuardado),
        categoryId: categoriaId,
        imageUrl: imagens[imgIndex],
        userId: user.id,
        status: 'PENDING',
      }

      if (metaSelecionada?.id) {
        await updateGoal(metaSelecionada.id, payload)
      } else {
        await addGoal(payload)
      }

      onClose()
    } catch (error) {
      console.error('Erro ao salvar meta:', error)
      alert('Erro ao salvar. Tente novamente.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex text-gray-800 items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-[90%] max-w-xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-9 h-9" />
        </button>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {metaSelecionada ? 'Editar meta' : 'Adicione nova meta'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-3">
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

            <div className="flex flex-col gap-1">
              <label htmlFor="valorMeta" className="text-sm font-medium text-gray-700 dark:text-gray-200">Valor da meta</label>
              <input
                id="valorMeta"
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                value={valorMeta}
                onChange={(e) => setValorMeta(e.target.value.replace(',', '.'))}
                placeholder="Ex: 1200.50"
                className="bg-gray-100 text-sm px-2 py-1 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="valorGuardado" className="text-sm font-medium text-gray-700 dark:text-gray-200">Valor guardado</label>
              <input
                id="valorGuardado"
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                value={valorGuardado}
                onChange={(e) => setValorGuardado(e.target.value.replace(',', '.'))}
                placeholder="Ex: 300.75"
                className="bg-gray-100 text-sm px-2 py-1 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="categoria" className="text-sm font-medium text-gray-700 dark:text-gray-200">Categoria</label>
              <select
                id="categoria"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                className="bg-gray-100 text-sm px-2 py-1 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="text-sm">Escolha uma imagem:</span>
            <div className="relative w-40 h-40">
              <img src={imagens[imgIndex]} alt="Imagem da meta" className="rounded-xl w-full h-full object-contain" />
              <button onClick={handlePrev} className="absolute left-[-24px] top-1/2 -translate-y-1/2">
                <ChevronLeft />
              </button>
              <button onClick={handleNext} className="absolute right-[-24px] top-1/2 -translate-y-1/2">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSalvar}
          className="mt-6 w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800"
        >
          {metaSelecionada ? 'Salvar alterações' : 'Salvar'}
        </button>
      </div>
    </div>
  )
}
