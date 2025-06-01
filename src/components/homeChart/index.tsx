import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'

interface Expense {
  amount: number
  category: {
    id: string
    name: string
    color: string
  }
}

interface Props {
  expenses: Expense[]
}

export default function DoughnutChartDemo({ expenses }: Props) {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    if (!expenses || expenses.length === 0) return

    // Agrupar e somar os valores por categoria
    const categoryMap = new Map<
      string,
      { name: string; color: string; total: number }
    >()

    for (const expense of expenses) {
      const categoryId = expense.category.id
      const existing = categoryMap.get(categoryId)
      if (existing) {
        existing.total += expense.amount
      } else {
        categoryMap.set(categoryId, {
          name: expense.category.name,
          color: expense.category.color,
          total: expense.amount,
        })
      }
    }

    const labels = Array.from(categoryMap.values()).map((cat) => cat.name)
    const data = Array.from(categoryMap.values()).map((cat) => cat.total)
    const colors = Array.from(categoryMap.values()).map((cat) => cat.color)

    const chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 0,
          cutout: '50%',
        },
      ],
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 25,
            usePointStyle: true,
            pointStyle: 'circle',
            generateLabels: function (chart: any) {
              const dataset = chart.data.datasets[0]
              const total = dataset.data.reduce(
                (a: number, b: number) => a + b,
                0,
              )
              return chart.data.labels.map((label: string, i: number) => {
                const value = dataset.data[i]
                const percentage = Math.round((value / total) * 100)
                return {
                  text: `${label}  ${percentage}%`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.backgroundColor[i],
                  index: i,
                }
              })
            },
          },
        },
      },
    }

    setChartData(chartData)
    setChartOptions(options)
  }, [expenses])

  return (
    <div className="card font-comfortaa flex flex-col justify-content-center rounded-md gap-3">
      <p>Gastos por categoria</p>
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="gap-5 w-[300px] md:w-[480px] lg:w-[260px] xl:w-[450px]  h-[150px]"
      />
    </div>
  )
}
