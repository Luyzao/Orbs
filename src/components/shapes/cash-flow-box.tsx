import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';

interface CashFlowBoxProps {
    className?: string;
  }

  const CashFlowBox: React.FC<CashFlowBoxProps> = () => {
    const [income, setIncome] = useState("");
    const [extraIncome, setextraIncome] = useState("");
    const [others, setOthers] = useState("");

    return (
        <div className="relative ml-5 mt-8 sm:ml-8 sm:mt-8 md:ml-8 md:mt-8 lg:ml-8 lg:mt-8 xl:ml-8 xl:mt-8">

        {/* Calculo */}
        <div className="absolute inset-y-0 right-0 translate-x-10 bg-[#383577] w-[160px] sm:w-[310px] md:w-[291px] lg:w-[291px] xl:w-[219] h-[247px] sm:h-[320px] md:h-[320px] lg:h-[320px] xl:h-[320px] mt-3 rounded-md shadow-lg" style={{ borderRadius: '20px' }}>

        <h2 className="font-poppins text-sm sm:text-xl md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-2 s:mt-2 m:mt-2 lg:mt-2 s:ml-4 m:ml-4 lg:ml-4 "> Total </h2>
        <p className="font-comfortaa text-lg sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl text-start text-[#FFFFFF] ml-3 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-2"> R$ 00,00 </p>
        
        <h2 className="font-poppins text-sm sm:text-lg md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4"> Renda extra </h2>
        <p className="font-comfortaa text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 "> R$ 00,00 </p>

        <h2 className="font-poppins text-sm sm:text-lg md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4"> Outros </h2>
        <p className="font-comfortaa text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4"> R$ 00,00 </p>

        <h2 className="font-poppins text-sm sm:text-lg md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4"> Imposto de renda </h2>
        <p className="font-comfortaa text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4"> R$ 00,00 </p>
       

        </div>

      
        {/* Entradas de receita */}
        <div className="bg-[#EBEBEB] w-[320px] h-[353px] sm:w-[540px] md:w-[540px] lg:w-[540px] xl:w-[540px] flex flex-col items-start justify-start gap-3 rounded-lg shadow-md p-4">
          <h2 className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#888888] mb-1">
            Receita
          </h2>
      
          <div className="w-3/5 sm:w-2/5 md:w-2/5 lg:w-2/5 xl:w-2/5">
            <label className="font-comfortaa font-medium block text-[#383577] mb-2">Renda</label>
            <input 
              type="text" 
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="R$ 00,00" 
              className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
            />
          </div>
      
          <div className="w-3/5 sm:w-2/5 md:w-2/5 lg:w-2/5 xl:w-2/5">
            <label className="font-comfortaa font-medium block text-[#383577] mb-2">Renda extra</label>
            <input 
              type="text" 
              value={extraIncome}
              onChange={(e) => setextraIncome(e.target.value)}
              placeholder="R$ 00,00" 
              className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
            />
          </div>
      
          <div className="w-3/5 sm:w-2/5 md:w-2/5 lg:w-2/5 xl:w-2/5">
            <label className="font-comfortaa font-medium block text-[#383577] mb-2">Outros</label>
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
      
    );
};
export default CashFlowBox;