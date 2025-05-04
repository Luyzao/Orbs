
import { HiExclamationCircle } from 'react-icons/hi';

 
interface ChartProps {
    className?: string;
  }

  const Chart: React.FC<ChartProps> = ({ className }) => {
    return (
    
        <div className="relative ml-4 mt-6 sm:ml-4 sm:mt-8 md:ml-8 md:mt-6 lg:ml-8 lg:mt-4 xl:ml-8 xl:mt-4">
        {/* Gráfico e análises */}
        <div className="bg-[#EBEBEB] w-[255px] h-[545px] sm:w-[360px] sm:h-[545px] md:w-[440px] md:h-[668px] lg:w-[440px] lg:h-[698px] xl:w-[540px] xl-h[790px] flex flex-col items-start justify-start rounded-lg shadow-md p-4">
            <h2 className="font-poppins text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#1C1B1F]">
                Saldo Mensal
            </h2>
            <p className="font-comfortaa font-medium text-[#1C1B1F] text-3xl sm:text-3xl">
                R$ 00,00
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
            <img 
                src="/images/chart-graphic.svg" 
                alt="Gráfico de saldo ao longo do mês" 
                className="w-full h-auto mt-2 md:mt-2"
            />

        </div>
    
      </div>
    );
  };  
export default Chart;