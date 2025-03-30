import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

interface SignUpRectangleProps {
    className?: string;
  }

  const SignUpRectangle: React.FC<SignUpRectangleProps> = () => {
    const [value, setValue] = useState('');

  return (
    <section>
      <div className="bg-[#E9E9E9] w-[225px] h-screen sm:w-[375px] md:w-[450px] lg:w-[525px] xl:w-[625px] 2xl:w-[825px]
      flex flex-col items-center py-8">
        <img src="/vector/orbs.svg" alt="Logo" className="w-[60px] h-auto"/>
        <p className="text-[#000000] font-comfortaa text-lg py-4 mt-4">Crie uma conta</p>

        <FloatLabel >
            <InputText id="name" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            className="w-[170px] h-[32px] bg-[#D9D9D9]"/>
            <label htmlFor="name" className="text-[#000000] font-comfortaa text-[10px] py-1">Nome</label>
        </FloatLabel>

        <FloatLabel className="py-2.5">
            <InputText id="surname" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            className="w-[170px] h-[32px] bg-[#D9D9D9]"/>
            <label htmlFor="surname" className="text-[#000000] font-comfortaa text-[10px] py-1">Sobrenome</label>
        </FloatLabel>

        <FloatLabel>
            <InputText id="email" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            className="w-[170px] h-[32px] bg-[#D9D9D9]"/>
            <label htmlFor="email" className="text-[#000000] font-comfortaa text-[10px] py-1">Email</label>
        </FloatLabel>

        <FloatLabel className="py-2.5">
            <InputText id="password" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            className="w-[170px] h-[32px] bg-[#D9D9D9]"/>
            <label htmlFor="password" className="text-[#000000] font-comfortaa text-[10px] py-1">Senha</label>
        </FloatLabel>

      </div>
    </section>
  );
};

export default SignUpRectangle;
