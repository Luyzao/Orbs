'use client'

import { useContext, useEffect, useState } from 'react'
import { ListaDeMetas } from '@/components/ListaDeMetas'
import { GraficoAnaliseMetas } from '@/components/GraficoAnaliseMetas'
import { BarraDeProgresso } from '@/components/BarraDeProgresso'
import { ModalNovaMeta } from '@/components/ModalNovaMeta'
import { ThemeContext } from '@/context/ThemeContext'
import { getGoalsByUser, deleteGoal } from '@/services/goals'
import { supabase } from '../../lib/supabaseClient'
import { getCategory } from '@/services/category'
import ToolBar from '@/components/toolBar'

export default function Home() {
  const { toggleTheme } = useContext(ThemeContext)
  const [modalAberto, setModalAberto] = useState(false)
  const [metas, setMetas] = useState<any[]>([])
  const [metaSelecionada, setMetaSelecionada] = useState<any | null>(null)
  const [contadorAtualizacao, setContadorAtualizacao] = useState(0)

  const buscarMetas = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const [goals, categoriasResponse] = await Promise.all([
      getGoalsByUser(user.id),
      getCategory(),
    ])

    const categorias = categoriasResponse.data

    const metasComCategoria = goals.map((goal: any) => {
      const categoria = categorias.find((cat: any) => cat.id === goal.categoryId)
      return {
        ...goal,
        category: {
          name: categoria?.name || 'Desconhecida',
          color: categoria?.color || '#B191F5',
        },
      }
    })

    setMetas(metasComCategoria)
  }


  const atualizarTudo = async () => {
    await buscarMetas()
    setContadorAtualizacao((prev) => prev + 1)
  }

  useEffect(() => {
    buscarMetas()
  }, [])

  return (
    <div className="flex w-full">
      {/* Conteúdo principal */}
      <main className="flex-1 p-5 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <ToolBar selectedDate={undefined} setSelectedDate={undefined} />

        {/* Linha divisória */}
        <hr className="border-t border-gray-400 dark:border-gray-600 -mx-5 mt-4" />

        {/* Seção de metas */}
        <section className="mt-4">
          <div className="flex items-center justify-between px-14 mb-2">
            <h2
              style={{ marginLeft: '60px' }}
              className="mb-2 text-2xl font-bold text-gray-800 dark:text-white"
            >
              Metas
            </h2>
            <button
              onClick={() => {
                setMetaSelecionada(null)
                setModalAberto(true)
              }}
              className="mr-8 flex items-center gap-2 bg-gray-300 dark:bg-gray-700 shadow px-4 py-2 rounded-full text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              + Nova meta
            </button>
          </div>

          <ListaDeMetas
            metas={metas}
            onEditMeta={(meta) => {
              setMetaSelecionada(meta)
              setModalAberto(true)
            }}
            onDeleteMeta={async (id) => {
              await deleteGoal(id)
              atualizarTudo()
            }}
          />

          <ModalNovaMeta
            isOpen={modalAberto}
            onClose={() => {
              setModalAberto(false)
              setMetaSelecionada(null)
              atualizarTudo()
            }}
            metaSelecionada={metaSelecionada}
          />
        </section>

        {/* Seção de Gráfico e BarraProgresso */}
        <div
          style={{ marginLeft: '55px' }}
          className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4"
        >
          <GraficoAnaliseMetas atualizar={contadorAtualizacao} />
          <BarraDeProgresso atualizar={contadorAtualizacao} />
        </div>
      </main>
    </div>
  )
}
