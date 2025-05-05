import DoughnutChartDemo from '@/components/homeChart'
import ToolBar from '@/components/toolBar'
import { FiPlusCircle } from 'react-icons/fi'
import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { Nullable } from 'primereact/ts-helpers'
import GoalsList from '@/components/goals'
import DespesasList from '@/components/despesasList'

export default function Home() {
  const [date, setDate] = useState<Nullable<Date>>(null)
  return (
    <div className="w-full font-comfortaa pb-7 lg:pb-0 p-4 flex flex-col gap-4 xl:pt-6 xl:pb-0 xl:p-8">
      <ToolBar />
      <div className="flex flex-col xl:flex-row w-auto xl:gap-0 gap-4">
        <div className="w-full flex flex-col gap-4 ">
          <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-4 xl:gap-6">
            <div className=" p-4 bg-gray-50 text-black rounded-lg shadow-xl w-full xl:w-7">
              <DoughnutChartDemo />
            </div>
            <div className="flex flex-col items-center text-black w-4 bg-gray-50 rounded-xl shadow-xl gap-3 h-15rem justify-center">
            <div className="flex flex-col items-center text-black w-12 md:w-4 bg-gray-50 rounded-xl shadow-xl gap-3 h-15rem justify-center">
              <p className="text-4xl font-bol font-poppins">Saldo</p>
              <p className="text-2xl text-[#1E195B] font-poppins">R$2.050,90</p>
              <p className="text-xs">16 de março de 2025</p>
              <button className="flex items-center gap-1 bg-gray-200 p-1 px-3 rounded-lg text-sm">
                Novo saldo{' '}
                <i>
                  <FiPlusCircle />
                </i>
              </button>
            </div>
          </div>
          <div className="xl:pr-5 ">
            <DespesasList />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="shadow-xl text-black bg-gray-50 p-4 rounded-xl">
            <p className="mb-5">Calendário</p>
            <div className="card flex flex-col  justify-content-center ">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                inline
                className="text-xs"
              />
            </div>
          </div>
          <div>
            <GoalsList />
          </div>
        </div>
      </div>
    </div>
  )
}
