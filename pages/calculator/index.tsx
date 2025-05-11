import CashFlowBox from '@/components/shapes/cash-flow-box'
import Expenses from '@/components/shapes/expenses'
import Chart from '@/components/shapes/chart-calculator'

export default function Calculator() {
  return (
    <div className="flex flex-col md:flex-row bg-[##F0F0F0] w-full h-screen overflow-y-auto custom-scrollbar p-4">
      {/* Flex container ajustado para CashFlowBox */}
      <div className="flex flex-col sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
        <CashFlowBox />
        <Expenses />
      </div>
      <Chart />
    </div>
  )
}
