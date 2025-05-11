import { Progress } from '@/components/ui/progress'

type Meta = {
  nome: string
  valorAtual: number
  valorTotal: number
}

const metas: Meta[] = [
  { nome: 'Viagem', valorAtual: 2500, valorTotal: 10000 },
  { nome: 'Televisão 50pol', valorAtual: 1500, valorTotal: 10000 },
  { nome: 'Celular novo', valorAtual: 2550, valorTotal: 3000 },
  { nome: 'Computador', valorAtual: 9000, valorTotal: 20000 },
]
export function BarraDeProgresso() {
  return (
    <div className="w-full text-gray-700 max-w-[350px] p-4 bg-white rounded-2xl shadow">
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
      </div>
    </div>
  )
}
