import React, { useState, useEffect } from 'react'
import { supabase } from 'lib/supabaseClient'
import { postIncome, putIncome } from '@/services/income'
import { getUserByID } from '@/services/user'

interface CashFlowBoxProps {
  className?: string
  selectedDate: Date | null // nova prop
}

const CashFlowBox: React.FC<CashFlowBoxProps> = ({ selectedDate }) => {
  const [extraincome, setextraIncome] = useState<any>('')
  const [otherincome, setOthers] = useState<any>('')
  const [total, setTotal] = useState<any>('R$ 0,00')
  const [impostoRenda, setImpostoRenda] = useState<any>('R$ 0,00')
  const [renda, setRenda] = useState<any>('R$ 0,00')
  const [idUser, setIdUser] = useState<any>()
  const [income, setIncome] = useState<any>('R$ 0,00')
  const [incomes, setIncomes] = useState<any>()

  // Função para formatar valor monetário em BRL
  const formatCurrency = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '') // só números
    const numberValue = Number(onlyNumbers) / 100

    // Se não for número válido, retorna vazio
    if (isNaN(numberValue)) return ''

    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  // const formatCurrencyFromNumber = (value: number) => {
  //   return value.toLocaleString('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL',
  //   })
  // }

  // Handlers para os inputs com formatação
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setRenda(formatted)
  }

  const handleExtraIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setextraIncome(formatted)
  }

  const handleOthersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setOthers(formatted)
  }

  // Função para converter string formatada "R$ 1.234,56" em número float 1234.56 antes de enviar
  const parseCurrencyToNumber = (value: any) => {
    if (!value) return 0

    // Se for número, retorna direto
    if (typeof value === 'number') return value

    // Se não for string, tenta forçar para string
    if (typeof value !== 'string') value = String(value)

    // Remove "R$ ", espaços, pontos e troca vírgula por ponto
    return Number(value.replace(/[R$\s\.]/g, '').replace(',', '.'))
  }

  const handleSave = async () => {
    if (incomes && incomes.length > 0) {
      const Data = {
        id: income.id,
        userId: idUser,
        income: parseCurrencyToNumber(renda),
        extraincome: parseCurrencyToNumber(extraincome),
        otherincome: parseCurrencyToNumber(otherincome),
        month: selectedDate,
        date: selectedDate,
      }
      putIncome(Data)
    } else {
      const Data = {
        userId: idUser,
        income: parseCurrencyToNumber(renda),
        extraincome: parseCurrencyToNumber(extraincome),
        otherincome: parseCurrencyToNumber(otherincome),
      }
      postIncome(Data)
    }
  }

  function formatDateToMySQL(dateInput: Date | string): string {
    if (typeof dateInput === 'string') {
      // Exemplo: "2025-05-31T19:07:13.094Z"
      // Pega só 'yyyy-mm'
      return dateInput.split('T')[0].slice(0, 7) // "2025-05"
    } else {
      // Se for Date, formata para 'yyyy-mm'
      const pad = (n: number, z = 2) => ('00' + n).slice(-z)
      return dateInput.getFullYear() + '-' + pad(dateInput.getMonth() + 1)
    }
  }

  function calcularImpostoRenda(total: number): number {
    console.log('aquiiiiii', total)
    let imposto = 0

    const faixas = [
      { limite: 2259.2, aliquota: 0, deducao: 0 },
      { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
      { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
      { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
      { limite: Infinity, aliquota: 0.275, deducao: 896.0 },
    ]

    for (let i = faixas.length - 1; i >= 0; i--) {
      const faixa = faixas[i]
      if (total > faixa.limite) {
        imposto = total * faixa.aliquota - faixa.deducao
        break
      }
    }

    return imposto > 0 ? Number(imposto.toFixed(2)) : 0
  }

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) setIdUser(user.id)
    }
    getUser()
  }, [])

  // 1. useEffect que busca e seta income
  useEffect(() => {
    if (selectedDate && idUser) {
      const fetchIncomeData = async () => {
        try {
          const response = await getUserByID(idUser)
          const allIncome = response.data.Income
          setIncomes(allIncome)

          if (allIncome && selectedDate) {
            const formattedSelectedDate = formatDateToMySQL(selectedDate)

            const filteredIncome = allIncome.filter((income: any) => {
              const incomeDate = formatDateToMySQL(income.date)
              return incomeDate === formattedSelectedDate
            })

            // Aqui: seta o objeto encontrado ou null
            setIncome(filteredIncome[0] || null)
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchIncomeData()
    }
  }, [selectedDate, idUser])

  // 2. useEffect que calcula os valores após income estar definido
  useEffect(() => {
    if (income) {
      const extraincome = Number(income.extraincome ?? 0)
      const otherincome = Number(income.otherincome ?? 0)
      const impostoRenda = calcularImpostoRenda(extraincome + otherincome)

      const total = extraincome + otherincome + impostoRenda

      setextraIncome(extraincome)
      setOthers(otherincome)
      setTotal(total)
      setImpostoRenda(impostoRenda)
      setRenda(income.income)
    } else {
      // se income for null, zera tudo
      setextraIncome('0,00')
      setOthers('0,00')
      setTotal('0,00')
      setImpostoRenda('0,00')
      setRenda('0,00')
    }
  }, [income])

  return (
    <div className="relative ml-2 mt-8 sm:ml-2 sm:mt-8 md:ml-2 md:mt-4 lg:ml-2 lg:mt-4 xl:ml-2 xl:mt-4">
      {/* Calculo */}
      <div
        className="absolute inset-y-0 left-40 sm:left-56 md:left-64 right-0 translate-x-4 bg-[#383577] w-[136px] sm:w-[220px] md:w-[300px] lg:w-[310px] xl:w-[310] h-[280px] sm:h-[290px] md:h-[300px] lg:h-[300px] xl:h-[300px] ml-2 mt-4 rounded-md shadow-lg"
        style={{ borderRadius: '20px' }}
      >
        <h2 className="font-poppins text-base sm:text-base md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-3 s:mt-2 m:mt-2 lg:mt-2 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          Total{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl text-start text-[#FFFFFF] ml-3 s:mt-2 s:mb-4 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-1">
          {total}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:tex t-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-4 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 ">
          {' '}
          Renda extra{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-1">
          {extraincome}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          Outros{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-1">
          {otherincome}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          Imposto de renda{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {impostoRenda}
        </p>
      </div>

      {/* Entradas de receita */}
      <div className="bg-[#EBEBEB] w-[255px] h-[325px] sm:w-[360px] sm:h-[335px] md:w-[440px] md:h-[356px] lg:w-[540px] xl:w-[540px] flex flex-col items-start justify-start gap-3 rounded-lg shadow-md p-4">
        <h2 className="font-comfortaa text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#888888] ">
          Receita
        </h2>

        <div className="w-4/6 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-2/5">
          <label className="font-comfortaa text-sm font-medium block text-[#383577] mb-1">
            Renda
          </label>
          <input
            type="text"
            value={renda}
            onChange={handleIncomeChange}
            placeholder="R$ 00,00"
            className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
          />
        </div>

        <div className="w-4/6 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-2/5">
          <label className="font-comfortaa text-sm font-medium block text-[#383577] mb-1">
            Renda extra
          </label>
          <input
            type="text"
            value={extraincome}
            onChange={handleExtraIncomeChange}
            placeholder="R$ 00,00"
            className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
          />
        </div>

        <div className="w-4/6 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-2/5">
          <label className="font-comfortaa text-sm font-medium block text-[#383577] mb-1">
            Outros
          </label>
          <input
            type="text"
            value={otherincome}
            onChange={handleOthersChange}
            placeholder="R$ 00,00"
            className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
          />
        </div>
        {/* Botão de Salvar */}
        <button
          onClick={handleSave}
          className="w-1/5 h-9/10 mt-1 mb-2 bg-[#383577] font-poppins text-white rounded-md shadow hover:bg-[#2f2c6e] transition"
        >
          Salvar
        </button>
      </div>
    </div>
  )
}
export default CashFlowBox
