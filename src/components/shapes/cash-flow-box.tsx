import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'

interface CashFlowBoxProps {
  className?: string
}

const CashFlowBox: React.FC<CashFlowBoxProps> = () => {
  const [income, setIncome] = useState('')
  const [extraIncome, setextraIncome] = useState('')
  const [others, setOthers] = useState('')

  return (
    <div className="relative ml-4 mt-6 sm:ml-4 sm:mt-8 md:ml-4 md:mt-8 lg:ml-4 lg:mt-8 xl:ml-4 xl:mt-8">
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
          {' '}
          R$ 00,00{' '}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:tex t-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-4 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 ">
          {' '}
          Renda extra{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-1">
          {' '}
          R$ 00,00{' '}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          Outros{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-1">
          {' '}
          R$ 00,00{' '}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          Imposto de renda{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          R$ 00,00{' '}
        </p>
      </div>

      {/* Entradas de receita */}
      <div className="bg-[#EBEBEB] w-[255px] h-[325px] sm:w-[360px] sm:h-[335px] md:w-[440px] md:h-[346px] lg:w-[540px] xl:w-[540px] flex flex-col items-start justify-start gap-3 rounded-lg shadow-md p-4">
        <h2 className="font-comfortaa text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#888888] ">
          Receita
        </h2>

        <div className="w-4/6 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-2/5">
          <label className="font-comfortaa text-sm font-medium block text-[#383577] mb-1">
            Renda
          </label>
          <input
            type="text"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
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
            value={extraIncome}
            onChange={(e) => setextraIncome(e.target.value)}
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
            value={others}
            onChange={(e) => setOthers(e.target.value)}
            placeholder="R$ 00,00"
            className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
          />
        </div>
      </div>
    </div>
  )
}
export default CashFlowBox
