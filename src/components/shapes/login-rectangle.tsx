import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';

interface LoginRectangleProps {
  className?: string;
}

const LoginRectangle: React.FC<LoginRectangleProps> = () => {
  const [value, setValue] = useState('');
  
  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url(/images/background-login.png)", 
    backgroundSize: 'cover', backgroundPosition: 'center'}}>

      <div className="bg-[#E0E0E0] bg-opacity-10 backdrop-blur-sm p-6 lg:p-7 xl:p-8 rounded-[35px] shadow-lg border-1 border-[#E0E0E0] w-[320px] 
      sm:w-[400px] md:w-[460px] lg:w-[560px] h-[610px] sm:h-[600px] md:h-[600px] lg:h-[700px]">
        
      <h2 className="font-comfortaa text-[30px] md:text-[35px] text-center text-[#D9D9D9]"> Orbs </h2>

      <h5 className="font-comfortaa text-[20px] md:text-[24px] lg:text-[28px] 2xl:text-[30px] text-center flex justify-center items-center text-[#D9D9D9] 
      mt-7 md:mt-6 lg:mt-7 mx-auto">Bem-vindo <br/> de volta! </h5>

      <div className="flex flex-col items-center">
        <InputText
          id="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-[220px] h-[32px] bg-[#EDEDED] mt-3 text-[#000000] font-comfortaa text-[10px] rounded-[8px] placeholder-black py-1 px-2 
            sm:text-[11px] sm:w-[220px] sm:h-[35px] md:w-[240px] lg:w-[260px] xl:text-[12px]"
          placeholder="E-mail"
        />
        
        <InputText
          id="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-[220px] h-[32px] bg-[#EDEDED] mt-3 text-[#000000] font-comfortaa text-[10px] rounded-[8px] placeholder-black py-1 px-2 
            sm:text-[11px] sm:w-[220px] sm:h-[35px] md:w-[240px] lg:w-[260px] xl:text-[12px]"
          placeholder="Senha"
        />

        <div className="flex text-[#FFFFFF] font-poppins font-light text-[0.65rem] mt-3 sm:text-[0.7rem] 2xl:text-[0.75rem]">
          <p>Não tem uma conta?</p>
          <a href="" className="px-1"><span className="text-[#FFFFFF] underline">Cadastre-se</span></a>
        </div>

        <button className="w-[210px] h-[32px] bg-[#252436] font-poppins text-[14px] py-1 mt-3 flex items-center 
        justify-center rounded-lg sm:h-[35px] md:text-[16px] md:w-[230px] lg:w-[250px] lg:text-[16px] xl:text-[17px]">
          Login
        </button>

        <div className="flex items-center w-[203px] mt-4 md:w-[227px] lg:w-[247px]">
          <div className="flex-grow h-px bg-[#BFBEBE]" />
            <span className="mx-1 text-[#FFFFFF] font-poppins text-[11.5px] sm:text-[13px] xl:text-[14px]">Ou</span>
          <div className="flex-grow h-px bg-[#BFBEBE]" />
        </div>

        <button className="w-[210px] h-[30px] bg-[#D9D9D9] text-black font-poppins text-[11px] md:text-[12px] py-1 mt-3 border rounded-md flex items-center 
        justify-center gap-2.5 sm:h-[32px] md:w-[230px] lg:w-[250px]">
          <img className="w-[15px] h-auto xl:w-[18px]" src="/images/google-icon.png" alt="Google" />
          Continue com o Google
        </button>

      </div>

      </div>
    </div>
    
  );
};

export default LoginRectangle;
