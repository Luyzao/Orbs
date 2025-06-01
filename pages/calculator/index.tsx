'use client' // se estiver usando Next.js com interações no client-side

import { useState } from 'react'
import CashFlowBox from '@/components/shapes/cash-flow-box'
import Expenses from '@/components/shapes/expenses'
import ToolBar from '@/components/toolBar'
import Chart from '@/components/shapes/chart-calculator'

export default function Calculator() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [totalReceitas, setTotalReceitas] = useState<number>(0);
  const [totalDespesas, setTotalDespesas] = useState<number>(0);

  return (
    <div className="w-full h-screen overflow-y-auto bg-[#F0F0F0] pb-7 lg:pb-0 p-4 flex flex-col gap-2 sm:pl-8 md:pl-8 xl:pt-6 xl:pb-0 xl:p-8">
      <ToolBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="flex flex-col md:flex-row gap-4 custom-scrollbar">
        <div className="flex flex-col w-full md:w-1/3">
          <CashFlowBox selectedDate={selectedDate}  onTotalChange={setTotalReceitas} />
          <Expenses selectedDate={selectedDate} onTotalChange={setTotalDespesas}/>
        </div>
        <div className="w-full md:w-2/3 mt-4 md:mt-0">
          <Chart  selectedDate={selectedDate} receitas={totalReceitas} despesas={totalDespesas} />
        </div>
      </div>
    </div>
  )
}
