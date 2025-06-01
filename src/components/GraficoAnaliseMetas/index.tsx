'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { getGoalsByUser } from '@/services/goals'

interface GraficoAnaliseMetasProps {
  atualizar: number
}

export function GraficoAnaliseMetas({ atualizar }: GraficoAnaliseMetasProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const carregarDados = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const metas = await getGoalsByUser(user.id)

      const porMes: { [mesIndex: number]: { saldo: number; ideal: number } } = {}

      metas.forEach((meta: any) => {
        const dataCriacao = new Date(meta.createdAt)
        const mesIndex = dataCriacao.getMonth()

        if (!porMes[mesIndex]) {
          porMes[mesIndex] = { saldo: 0, ideal: 0 }
        }

        porMes[mesIndex].saldo += meta.progress
        porMes[mesIndex].ideal += meta.target
      })

      const mesesOrdem = [
        'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
        'jul', 'ago', 'set', 'out', 'nov', 'dez',
      ]

      const dataFormatada = mesesOrdem.map((mes, i) => ({
        mes,
        saldo: porMes[i]?.saldo || 0,
        ideal: porMes[i]?.ideal || 0,
      }))

      setData(dataFormatada)
    }

    carregarDados()
  }, [atualizar]) // escuta a prop

  return (
    <div className="w-full max-w-[700px] h-80 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Análise de metas
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis tickFormatter={(value) => `R$${value}`} />
          <Tooltip formatter={(value) => `R$ ${value}`} />
          <Line
            type="monotone"
            dataKey="saldo"
            stroke="#5b5bd6"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="ideal"
            stroke="#9fa8da"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
