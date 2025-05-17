import CashFlowBox from '@/components/shapes/cash-flow-box'
import Expenses from '@/components/shapes/expenses'
import ToolBar from '@/components/toolBar'
import Chart from '@/components/shapes/chart-calculator'

export default function Calculator() {
  return (
    <div className="w-full h-screen overflow-y-auto bg-[##F0F0F0] pb-7 lg:pb-0 p-4 flex flex-col gap-2 sm:pl-8 md:pl-8 xl:pt-6 xl:pb-0 xl:p-8">
        <ToolBar />
      <div className="flex flex-col md:flex-row custom-scrollbar">
      {/* Flex container ajustado para CashFlowBox */}
      <div className="flex flex-col sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
        <CashFlowBox />
        <Expenses />
      </div>
      <Chart />
    </div>
    </div>
    
  )
}
