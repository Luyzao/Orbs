import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import { supabase } from 'lib/supabaseClient';

interface SignUpRectangleProps {
  className?: string;
}

const SignUpRectangle: React.FC<SignUpRectangleProps> = () => {

  const router = useRouter();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);

  const validateForm = () => {
    const noWhiteSpace = (str: string) => str.trim() === str && str !== '';

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && noWhiteSpace(email);
    const passwordValid = password.length >= 8 && noWhiteSpace(password);
    const nameValid = noWhiteSpace(name);
    const surnameValid = noWhiteSpace(surname);

    setEmailError(!emailValid);
    setPasswordError(!passwordValid);
    setNameError(!nameValid);
    setSurnameError(!surnameValid);

    return emailValid && passwordValid && nameValid && surnameValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        const user = data.user;

        if (error) {
          throw error;
        }

        const fullName = `${name} ${surname}`.trim();

        await supabase
          .from('User')
          .upsert({ id: user?.id, name: fullName });


        alert("Cadastrado com sucesso!");
        setSubmitted(true);
        router.push('/auth/login');

      } catch (error: any) {
        console.error("Erro ao criar a conta:", error.message);
      }
    }
  };

  return (
    <section>
      <div className="bg-[#E9E9E9] w-[225px] h-screen sm:w-[375px] md:w-[450px] lg:w-[525px] xl:w-[625px] 2xl:w-[825px]
      flex flex-col items-center py-24 xl:py-32">
        <img src="/vector/orbs.svg" alt="Logo" className="w-[60px] h-auto mb-4 sm:w-[75px] md:w-[85px] lg:w-[90px] xl:mt-4" />
        <p className="text-[#000000] font-comfortaa text-md py-1 mt-4 sm:text-[19px] md:mt-6 2xl:text-[21px]">Crie uma conta</p>

        <div className="flex flex-col lg:flex-row lg:gap-2.5">
          {/* Nome */}
          <div className="flex flex-col relative mb-1">
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[170px] h-[32px] bg-[#D9D9D9] mt-3 text-[#000000] font-comfortaa text-[10px] 
            placeholder-black py-1 px-3 sm:text-[11px] sm:w-[220px] sm:h-[35px] lg:w-[150px] lg:h-[37px] 
            xl:w-[170px] xl:text-[12px] 2xl:w-[240px] focus:outline-none focus:ring-0 focus:border-transparent"
              placeholder="Nome"
            />
            {nameError && (
              <small className="p-error text-[10px] mt-0.5 absolute top-[100%] left-0 text-red-500">Preencha o nome!</small>
            )}
          </div>

          {/* Sobrenome */}
          <div className="flex flex-col relative mb-1">
            <InputText
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-[170px] h-[32px] bg-[#D9D9D9] mt-3 text-[#000000] font-comfortaa text-[10px] 
            placeholder-black py-1 px-3 sm:text-[11px] sm:w-[220px] sm:h-[35px] lg:w-[150px] lg:h-[37px] 
            xl:w-[170px] xl:text-[12px] 2xl:w-[240px] focus:outline-none focus:ring-0 focus:border-transparent"
              placeholder="Sobrenome"
            />
            {surnameError && (
              <small className="p-error text-[10px] mt-0.5 absolute top-[100%] left-0 text-red-500">Preencha o sobrenome!</small>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col relative mb-1">
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[170px] h-[32px] bg-[#D9D9D9] mt-3 text-[#000000] font-comfortaa text-[10px] placeholder-black py-1 px-3 
              sm:text-[11px] sm:w-[220px] sm:h-[35px] lg:w-[310px] lg:h-[37px] xl:w-[350px] xl:text-[12px] 2xl:w-[490px]
              focus:outline-none focus:ring-0 focus:border-transparent"
            placeholder="E-mail"
          />
          {emailError && (
            <small className="p-error text-[10px] mt-0.5 absolute top-[100%] left-0 text-red-500">Digite um e-mail válido!</small>
          )}
        </div>

        {/* Senha */}
        <div className="flex flex-col relative mb-1">
          <InputText
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[170px] h-[32px] bg-[#D9D9D9] mt-3 text-[#000000] font-comfortaa text-[10px] placeholder-black py-1 px-3 
              sm:text-[11px] sm:w-[220px] sm:h-[35px] lg:w-[310px] lg:h-[37px] xl:w-[350px] xl:text-[12px] 2xl:w-[490px]
              focus:outline-none focus:ring-0 focus:border-transparent"
            placeholder="Senha"
          />
          {passwordError && (
            <small className="p-error text-[10px] mt-0.5 absolute top-[100%] left-0 text-red-500">Mín. 8 caracteres e sem espaços!</small>
          )}
        </div>

        <div className="flex text-[#000000] font-poppins font-light text-[0.65rem] mt-3 sm:text-[0.7rem] xl: mt-4 xl:text-[0.75rem]">
          <p>Já tem uma conta?</p>
          <a href="/auth/login" className="px-1"><span className="text-[#1E195B] underline">Login</span></a>
        </div>

        <button onClick={() => {
          if (validateForm()) {
            setSubmitted(true);
            handleSubmit();
          }
        }}
          className="w-[165px] h-[32px] bg-[#252436] font-poppins text-[13px] py-1 mt-3 flex items-center 
        justify-center border rounded-lg sm:w-[200px] sm:h-[35px] sm:text-[15px] lg:w-[295px] lg:h-[37px] lg:text-[16px] 
        xl:w-[345px] 2xl:mt-4 2xl:w-[480px] 2xl:text-[18px]">
          Criar conta
        </button>

        <div className="flex items-center w-[155px] mt-3 sm:w-[190px] lg:w-[280px] xl:mt-4 xl:w-[330px] 2xl:w-[460px]">
          <div className="flex-grow h-px bg-[#BFBEBE]" />
          <span className="mx-1 text-[#000000] font-poppins text-[11.5px] sm:text-[13px] xl:text-[14px]">Ou, cadastre-se com</span>
          <div className="flex-grow h-px bg-[#BFBEBE]" />
        </div>

        <button className="w-[130px] h-[30px] bg-[#D9D9D9] text-black font-poppins text-[12px] py-1 mt-3 border rounded-md flex items-center justify-center gap-2.5
        sm:w-[150px] sm:h-[32px] sm:text-[13px] xl:w-[170px] xl:h-[34px] xl:text-[14px]">
          <img className="w-[16px] h-auto xl:w-[18px]" src="/images/google-icon.png" alt="Google" />
          Google
        </button>

      </div>
    </section>
  );
};

export default SignUpRectangle;
