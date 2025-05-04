
import CashFlowBox from '@/components/shapes/cash-flow-box';
import Expenses from '@/components/shapes/expenses';

export default function calculator() {
  return (
    <section>
      <div 
        className="h-screen w-full flex flex-col justify-between bg-cover bg-center relative overflow-y-auto" 
        style={{ backgroundColor: '#F0F0F0' }}>

        <CashFlowBox/>
        <Expenses/>
      </div>

    </section>
  );
}