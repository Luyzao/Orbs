import CashFlowBox from '@/components/shapes/cash-flow-box'
import Expenses from '@/components/shapes/expenses'

export default function calculator() {
  return (
    <div
      className="flex flex-col w-full"
      style={{ backgroundColor: '#F0F0F0' }}
    >
      <CashFlowBox />
      <Expenses />
    </div>
  )
}
