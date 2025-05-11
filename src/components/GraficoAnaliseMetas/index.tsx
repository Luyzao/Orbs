
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mes: "mai", saldo: 200, ideal: 150 },
  { mes: "jun", saldo: 400, ideal: 250 },
  { mes: "jul", saldo: 600, ideal: 400 },
  { mes: "ago", saldo: 850, ideal: 500 },
  { mes: "set", saldo: 700, ideal: 480 },
  { mes: "out", saldo: 600, ideal: 450 },
  { mes: "nov", saldo: 500, ideal: 430 },
  { mes: "dez", saldo: 480, ideal: 420 },
];
export function GraficoAnaliseMetas() {
    return (
      <div className="w-full max-w-[700px] h-80 p-4 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Análise de metas</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis
              tickFormatter={(value) => `R$${value}`}
              ticks={[100, 500, 900]} // Personaliza os valores do eixo Y
            />
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
    );
}