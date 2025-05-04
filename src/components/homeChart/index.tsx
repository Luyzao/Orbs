import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'

export default function DoughnutChartDemo() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const data = {
      labels: ['Educação', 'Transporte', 'Beleza'],
      datasets: [
        {
          data: [40, 20, 16],
          backgroundColor: ['#7B61FF', '#2C2956', '#D11FB6'],
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
              return chart.data.labels.map((label: any, i: any) => {
                const value = dataset.data[i]
                const total = dataset.data.reduce((a: any, b: any) => a + b, 0)
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

    setChartData(data)
    setChartOptions(options)
  }, [])

  return (
    <div className="card font-comfortaa flex flex-col justify-content-center rounded-md gap-3">
      <p>Gastos por categoria</p>
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="gap-5"
        style={{ width: '400px', height: '150px' }}
      />
    </div>
  )
}
