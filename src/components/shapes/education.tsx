import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { HiArrowRight } from 'react-icons/hi';

interface EducationProps {
  className?: string
}

const Education: React.FC<EducationProps> = () => {
  const [income, setIncome] = useState('')
  const [extraIncome, setextraIncome] = useState('')
  const [others, setOthers] = useState('')

  return (
    <div className="relative flex flex-row">
       <img src="/images/guy shopping online.png" className="absolute bottom-0 top-80 z-10 right-2 hidden xl:block"></img>
      {/* Education */}
      <div
        className="absolute bg-transparent w-[420px] sm:w-[550px] md:w-[690px] lg:w-[990px] xl:w-[980px] h-[589px] sm:h-[570px] md:h-[580px] lg:h-[600px] xl:h-[620px] overflow-y-auto overflow-x-auto custom-scrollbar"
        style={{ borderRadius: '20px' }}>
        <h2 className="font-poppins text-base sm:text-base md:text-xl lg:text-xl xl:text-xl text-start text-[#3E3E3E] ml-3 mt-3 s:mt-2 m:mt-2 lg:mt-4 s:ml-6 m:ml-6 lg:ml-6">
          {' '}
          Aprender, poupar e investir{' '}
        </h2>
        {/* blocos */}
        <div className="flex flex-col ml-2 sm:ml-8 md:ml-0 lg:ml-2">
            <div className="flex flex-col ml-2 md:flex-row">
                {/* Diferença entre receita, despesa e investimento. */}
                <div className=" flex flex-col mt-4 ml-6 sm:ml-4 bg-[#E3E3E3] w-[300px] sm:w-[298px] md:w-[300px] lg:w-[320px] xl:w-[938] h-[254px] sm:h-[255px] md:h-[233px] lg:h-[226px] xl:h-[230px] rounded-md shadow-lg" style={{ borderRadius: '20px' }}>
                    {/* Imagem 1 */}
                    <div>
                    <img src="/images/image1.svg" className="w-full h-[204px] sm:h-[180px] md:h-[180px] lg:h-[170px] rounded-t-[20px] rounded-md object-cover"/>
                    </div>
                    <p className="font-poppins w-[240px] flex items-center gap-2 text-sm ml-4 mb-6 text-[#3E3E3E]"> <span>Diferença entre receita, despesa e investimento.</span>  <button onClick={() => console.log("Clique no botão")} // Altere a ação conforme necessário
                        className="p-1 rounded-full hover:bg-[#d1d1d1] transition"
                        aria-label="Ver mais">
                        <HiArrowRight size={24} />
                    </button></p>
                </div>
                {/* Importância da reserva de emergência. */}
                <div className=" flex flex-col mt-4 ml-6 sm:ml-4 bg-[#E3E3E3] w-[300px] sm:w-[298px] md:w-[300px] lg:w-[320px] xl:w-[938px] h-[254px] sm:h-[255px] md:h-[233px] lg:h-[226px] xl:h-[230px] rounded-md shadow-lg" style={{ borderRadius: '20px' }}>
                    {/* Imagem 1 */}
                    <div>
                    <img src="/images/image2.svg" className="w-full h-[200px] sm:h-[190px] md:h-[180px] lg:h-[170px] rounded-t-[20px]  rounded-md object-cover"/>
                    </div>
                    <p className="font-poppins w-[240px] flex items-center gap-2 text-sm ml-4 mb-6 text-[#3E3E3E]"> <span>Importância da reserva de emergência.</span>  <button onClick={() => console.log("Clique no botão")} // Altere a ação conforme necessário
                        className="p-1 rounded-full hover:bg-[#d1d1d1] transition"
                        aria-label="Ver mais">
                        <HiArrowRight size={24} />
                    </button></p>
                </div>
                {/* Juros simples vs. compostos, como funciona? */}
                <div className=" flex flex-col mt-4 ml-6 sm:ml-4 bg-[#E3E3E3] w-[300px] sm:w-[298px] md:w-[300px] lg:w-[320px] xl:w-[938px] h-[254px] sm:h-[255px] md:h-[233px] lg:h-[226px] xl:h-[230px] rounded-md shadow-lg" style={{ borderRadius: '20px' }}>
                    {/* Imagem 1 */}
                    <div>
                    <img src="/images/image3.svg" className="w-full h-[200px] sm:h-[190px] md:h-[180px] lg:h-[170px] rounded-t-[20px] rounded-md object-cover"/>
                    </div>
                    <p className="font-poppins w-[240px] flex items-center gap-2 text-sm ml-4 mb-6 text-[#3E3E3E]"> <span>Juros simples vs. compostos, como funciona?</span>  <button onClick={() => console.log("Clique no botão")} // Altere a ação conforme necessário
                        className="p-1 rounded-full hover:bg-[#d1d1d1] transition"
                        aria-label="Ver mais">
                        <HiArrowRight size={24} />
                    </button></p>
                </div>

            </div>
            <div className="flex flex-col ml-2 md:flex-row">
                {/* O que são CDB, Tesouro Direto, Fundos, Ações? */}
                <div className=" flex flex-col mt-4 ml-6 sm:ml-4 bg-[#E3E3E3] w-[300px] sm:w-[298px] md:w-[300px] lg:w-[320px] xl:w-[938px] h-[254px] sm:h-[255px] md:h-[233px] lg:h-[226px] xl:h-[230px] rounded-md shadow-lg" style={{ borderRadius: '20px' }}>
                    {/* Imagem 4 */}
                    <div>
                    <img src="/images/image4.svg" className="w-full h-[200px] sm:h-[190px] md:h-[180px] lg:h-[170px] rounded-t-[20px] rounded-md object-cover"/>
                    </div>
                    <p className="font-poppins w-[240px] flex items-center gap-2 text-sm ml-4 mb-6 text-[#3E3E3E]"> <span>O que são CDB, Tesouro Direto, Fundos, Ações?</span>  <button onClick={() => console.log("Clique no botão")} // Altere a ação conforme necessário
                        className="p-1 rounded-full hover:bg-[#d1d1d1] transition"
                        aria-label="Ver mais">
                        <HiArrowRight size={24} />
                    </button></p>
                </div>
                {/* Como cortar gastos supérfluos? */}
                <div className=" flex flex-col mt-4 ml-6 sm:ml-4 bg-[#E3E3E3] w-[300px] sm:w-[298px] md:w-[300px] lg:w-[320px] xl:w-[938px] h-[254px] sm:h-[255px] md:h-[233px] lg:h-[226px] xl:h-[230px] rounded-md shadow-lg" style={{ borderRadius: '20px' }}>
                    {/* Imagem 5 */}
                    <div>
                    <img src="/images/image5.svg" className="w-full h-[199px] sm:h-[190px] md:h-[180px] lg:h-[170px] rounded-t-[20px] rounded-md object-cover"/>
                    </div>
                    <p className="font-poppins w-[240px] flex items-center gap-2 text-sm ml-4 mb-6 text-[#3E3E3E]"> <span>Como cortar gastos supérfluos?</span> <button onClick={() => console.log("Clique no botão")} // Altere a ação conforme necessário
                        className="p-1 rounded-full hover:bg-[#d1d1d1] transition"
                        aria-label="Ver mais">
                        <HiArrowRight size={24} />
                    </button></p>
                </div>
                {/* Como cortar gastos supérfluos? */}
                <div className=" flex flex-col mt-4 ml-6 sm:ml-4 bg-[#E3E3E3] w-[300px] sm:w-[298px] md:w-[300px] lg:w-[320px] xl:w-[938px h-[254px] sm:h-[255px] md:h-[233px] lg:h-[226px] xl:h-[230px] rounded-md shadow-lg" style={{ borderRadius: '20px' }}>
                    {/* Imagem 6 */}
                    <div>
                    <img src="/images/image6.svg" className="w-full h-[190px] sm:h-[190px] md:h-[180px] lg:h-[170px] rounded-t-[20px] rounded-md object-cover"/>
                    </div>
                    <p className="font-poppins w-[240px] flex items-center gap-2 text-sm ml-4 mb-6 text-[#3E3E3E]"> <span>Como se planejar para grandes compras?</span> <button onClick={() => console.log("Clique no botão")} // Altere a ação conforme necessário
                        className="p-1 rounded-full hover:bg-[#d1d1d1] transition"
                        aria-label="Ver mais">
                        <HiArrowRight size={24} />
                    </button></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
export default Education
