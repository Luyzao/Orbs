'use client'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { supabase } from '../../../lib/supabaseClient'
import { getGoalsByUser } from '@/services/goals'

type Meta = {
  nome: string
  valorAtual: number
  valorTotal: number
}

interface BarraDeProgressoProps {
  atualizar: number
}

export function BarraDeProgresso({ atualizar }: BarraDeProgressoProps) {
  const [metas, setMetas] = useState<Meta[]>([])

  useEffect(() => {
    const carregarMetas = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const goals = await getGoalsByUser(user.id)

      const metasFormatadas: Meta[] = goals.map((goal: any) => ({
        nome: goal.title,
        valorAtual: goal.progress,
        valorTotal: goal.target,
      }))

      setMetas(metasFormatadas)
    }

    carregarMetas()
  }, [atualizar]) // Atualiza sempre que a prop mudar

  return (
    <div className="w-full text-gray-700 max-w-[480px] p-4 bg-white rounded-2xl ">
      <h2 className="text-xl font-semibold mb-4">Barra de progresso</h2>
      <div className="space-y-4">
        {metas.map((meta, index) => {
          const porcentagem = Math.min(
            100,
            Math.round((meta.valorAtual / meta.valorTotal) * 100),
          )

          return (
            <div key={index}>
              <div className="flex justify-between text-gray-800 text-sm font-medium mb-1">
                <span>{meta.nome}</span>
                <span>{porcentagem}%</span>
              </div>
              <Progress value={porcentagem} />
              <p className="text-xs text-gray-520 mt-1">
                R$ {meta.valorAtual.toLocaleString('pt-BR')} de R${' '}
                {meta.valorTotal.toLocaleString('pt-BR')} alcançado
              </p>
            </div>
          )
        })}

        {metas.length === 0 && (
          <p className="text-sm text-gray-500 text-center">
            Nenhuma meta encontrada.
          </p>
        )}
      </div>
    </div>
  )
}
