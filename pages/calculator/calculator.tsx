
import CashFlowBox from '@/components/shapes/cash-flow-box';


export default function calculator() {
  return (
    <section>
      <div 
        className="h-screen w-full flex justify-between bg-cover bg-center relative" 
        style={{ backgroundColor: '#F0F0F0' }}>

        <CashFlowBox />
      </div>

    </section>
  );
}
