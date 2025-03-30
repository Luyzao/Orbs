import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login:", { email, password });
    // Adicione lógica de autenticação aqui
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url(/images/background-login.png)", backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="bg-[#E0E0E0] bg-opacity-10 backdrop-blur-sm p-4 sm:p-4 md:p-6 lg:p-8 rounded-3xl shadow-lg border-1 border-[#E0E0E0] w-[320px] sm:w-[400px] md:w-[460px] lg:w-[560px] h-[610px] sm:h-[600px] md:h-[600px] lg:h-[700px]">
        
      <h2 className="font-comfortaa text-4xl sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl text-center text-[#D9D9D9]  mb-2 s:mb-2 m:mb-2 lg:mb-2"> Orbs </h2>

      <h5 className="font-comfortaa text-1xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl text-center flex justify-center items-center text-[#D9D9D9]  my-4 s:my-6 m:my-6 lg:my-6 mx-auto">Bem-vindo <br/> de volta! </h5>
       

      </div>
    </div>
    
  );
};

export default Login;
