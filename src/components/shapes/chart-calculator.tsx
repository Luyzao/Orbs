import { HiExclamationCircle } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { supabase } from 'lib/supabaseClient';
import { getChartData } from '@/services/chart';
import { Chart as PrimeChart } from 'primereact/chart';
import { TooltipItem } from 'chart.js';

interface ChartProps {
  receitas: number;
  despesas: number;
  selectedDate: Date | null;
}

interface DataPoint {
  date: Date;
  value: number;
  type: 'receita' | 'despesa';
}

interface BackendData {
  incomes: Array<{
    date: string;
    income: number;
    extraincome: number;
    otherincome: number;
  }>;
  expenses: Array<{
    date: string;
    amount: number;
  }>;
}

const Chart: React.FC<ChartProps> = ({ receitas, despesas, selectedDate }) => {
  const [idUser, setIdUser] = useState<string | null>(null);
  const [backendData, setBackendData] = useState<BackendData | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const formatCurrency = (value: number = 0) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIdUser(user?.id ?? null);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (idUser && selectedDate) {
      getChartData(idUser, selectedDate)
        .then(response => setBackendData(response.data))
        .catch(error => console.error('Erro ao carregar dados do gráfico:', error));
    }
  }, [idUser, selectedDate]);

  useEffect(() => {
    if (backendData) {
      const combinedData: DataPoint[] = [];

    console.log('Incomes:', backendData.incomes);
    console.log('Expenses:', backendData.expenses);

      // Processa receitas
      backendData.incomes.forEach(income => {
        combinedData.push({
          date: new Date(income.date),
          value: income.income + income.extraincome + income.otherincome,
          type: 'receita',
        });
      });

      // Processa despesas
      backendData.expenses.forEach(expense => {
        combinedData.push({
          date: new Date(expense.date),
          value: Math.abs(expense.amount),
          type: 'despesa',
        });
      });

      // Ordena por data
      combinedData.sort((a, b) => a.date.getTime() - b.date.getTime());

      // Prepara dados para o gráfico
      const labels = combinedData.map(item => `Dia ${item.date.getDate()}`);
      const values = combinedData.map(item => item.value);
      const receitaColors = ['#C2F74F', '#A2E44F', '#8AD84F', '#72CC4F'];
      const despesaColors = ['#B91BAE', '#A01A9F', '#881891', '#701683'];

        let receitaIndex = 0;
        let despesaIndex = 0;

        const pointBackgroundColors = combinedData.map(item => {
        if (item.type === 'receita') {
            const color = receitaColors[receitaIndex % receitaColors.length];
            receitaIndex++;
            return color;
        } else {
            const color = despesaColors[despesaIndex % despesaColors.length];
            despesaIndex++;
            return color;
        }
        });


      setChartData({
        labels,
        datasets: [{
          label: 'Fluxo de Caixa',
          data: values,
          borderColor: '#383577',
          tension: 0.4,
          pointBackgroundColor: pointBackgroundColors,
          pointRadius: 0,
        }],
      });
    }
  }, [backendData]);

    return (
    
        <div className="relative ml-4 mt-6 sm:ml-4 sm:mt-8 md:ml-8 md:mt-6 lg:ml-8 lg:mt-4 xl:ml-8 xl:mt-4">
        {/* Gráfico e análises */}
        <div className="bg-[#EBEBEB] w-[255px] h-[545px] sm:w-[360px] sm:h-[545px] md:w-[440px] md:h-[668px] lg:w-[440px] lg:h-[698px] xl:w-[540px] xl-h[790px] flex flex-col items-start justify-start rounded-lg shadow-md p-4">
            <h2 className="font-poppins text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#1C1B1F]">
                Saldo Mensal
            </h2>
            <p className="font-comfortaa font-medium text-[#1C1B1F] text-3xl sm:text-3xl">
               {formatCurrency(receitas - despesas)}
            </p>
            <hr className="w-full border-t border-[#C0C0C0] mb-3" />

            <p className="flex items-start gap-2 font-comfortaa text-[#1C1B1F] text-xs sm:text-xs md:text-base lg:text-base xl:text-base mb-3">
                <HiExclamationCircle className="text-5xl md:text-4xl lg:text-4xl xl:text-4xl mt-[1px]" />
                Alerta: Mais de 60% dos seus gastos estão indo para beleza. Considere diminuir seus gastos.
            </p>
            <p className="flex items-start gap-2 font-comfortaa text-[#1C1B1F] text-xs sm:text-xs md:text-base lg:text-base xl:text-base mb-3">
                <HiExclamationCircle className="text-5xl md:text-4xl lg:text-4xl xl:text-4xl  mt-[1px]" />
                Alerta: Mais de 30% dos seus gastos estão indo para dívidas. Considere renegociar ou reduzir as parcelas.
            </p>
            <p className="flex items-start gap-2 font-comfortaa text-[#1C1B1F] text-xs sm:text-xs md:text-base lg:text-base xl:text-base mb-3">
                <HiExclamationCircle className="text-5xl md:text-4xl lg:text-4xl xl:text-4xl mt-[1px]" />
                Alerta: Mais de 50% dos seus gastos estão indo para comida. Considere reduzir suas saídas.           
            </p>
            <h2 className="font-comfortaa text-xs sm:text-ms md:text-sm lg:text-base xl:text-base text-start text-[#383577] md:mt-2 lg:mt-1 xl:mt-1">
                Saldo ao longo do mês
            </h2>

            <div className="w-full md:h-[350px] lg:h-[400px] xl:h-[720px] md:w-[350px] lg:w-[400px] xl:w-[720px] bg-[#EBEBEB] rounded-md flex items-center justify-center">
               {chartData ? (
               <PrimeChart
                    type="line"
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index' as const,
                            intersect: false,
                        },
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                    color: '#383577',
                                    font: { size: 14, family: 'Poppins' },
                                    },
                                },
                                tooltip: {
                                    enabled: true,
                                    mode: 'index',
                                    intersect: false,
                                    callbacks: {
                                    title: (tooltipItems: TooltipItem<'line'>[]) => {
                                        return tooltipItems[0].label;
                                    },
                                    label: (context: TooltipItem<'line'>) => {
                                        const label = context.dataset.label || '';
                                        const value = context.parsed.y ?? 0;
                                        return `${label}: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                                    },
                                    },
                                },
                            },

                            scales: {
                                x: {
                                    title: {
                                    display: false,
                                    text: 'Dias do mês',
                                    color: '#383577',
                                    font: { size: 14, weight: 'bold', family: 'Poppins, sans-serif',  },
                                    },
                                    ticks: {
                                    color: '#383577',
                                    font: { size: 12,family: 'Poppins, sans-serif' },
                                    },
                                    grid: {
                                    color: '#E0E0E0',
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    title: {
                                    display: false,
                                    text: 'Valor (R$)',
                                    color: '#383577',
                                    font: { size: 14, weight: 'bold' },
                                    },
                                    ticks: {
                                    color: '#383577',
                                    font: { size: 12,family: 'Poppins, sans-serif' },
                                    callback: (value: number | string) => {
                                        const val = typeof value === 'string' ? parseFloat(value) : value;
                                        return `R$ ${val.toFixed(2)}`;
                                        },
                                    },
                                    grid: {
                                    color: '#E0E0E0',
                                    },
                                },
                            },
                        
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />

                ) : (
                <p className="text-gray-500 text-sm">Carregando gráfico...</p>
                )}
            </div>

        </div>
    
      </div>
    );
  };  
export default Chart;