import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { supabase } from 'lib/supabaseClient';

interface ResetPasswordRectangleProps {
    className?: string;
}

const ResetPasswordRectangle: React.FC<ResetPasswordRectangleProps> = () => {

    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState(false);

    const validateForm = () => {
        const noWhiteSpace = (str: string) => str.trim() === str && str !== '';

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && noWhiteSpace(email);

        setEmailError(!emailValid);

        return emailValid
    };

    const handlePasswordReset = async () => {
        if (validateForm()) {
            try {
                const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: "http://localhost:3000/auth/new-password"
                });

                if (error) {
                    alert("Erro ao enviar e-mail de redefinição: " + error.message);
                } else {
                    alert("E-mail de redefinição enviado com sucesso!");
                }
            } catch (error) {
                console.error(error);
                alert('Erro desconhecido ao tentar redefinir a senha.');
            }
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-cover bg-center" style={{
            backgroundImage: "url(/images/background-login.png)",
            backgroundSize: 'cover', backgroundPosition: 'center'
        }}>

            <div className="bg-[#E0E0E0] bg-opacity-10 backdrop-blur-sm p-6 lg:p-7 xl:p-8 rounded-[35px] shadow-lg border-1 border-[#E0E0E0] w-[320px] 
            sm:w-[400px] md:w-[460px] lg:w-[560px] h-[610px] sm:h-[600px] md:h-[600px] lg:h-[700px]">

                <h2 className="font-comfortaa text-[30px] md:text-[35px] text-center text-[#D9D9D9] mt-4"> Orbs </h2>

                <h5 className="font-comfortaa text-[18px] md:text-[22px] lg:text-[24px] 2xl:text-[26px] text-center flex justify-center items-center text-[#D9D9D9] 
                mt-7 md:mt-6 lg:mt-7 mx-auto">Redefinir Senha</h5>

                <div className="text-center text-[10px] py-2 font-comfortaa mt-2 sm:text-[11px] lg:text-[12px]">
                    <p>Digite o seu email no campo abaixo para <br />redefinir a senha.</p>
                </div>

                <div className="flex flex-col items-center">

                    <div className="flex flex-col relative mb-2">
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[220px] h-[32px] bg-[#EDEDED] mt-3 text-[#000000] font-comfortaa text-[10px] rounded-[8px] placeholder-black py-1 px-2 
                            sm:text-[11px] sm:w-[220px] sm:h-[35px] md:w-[240px] lg:w-[260px] xl:text-[12px] focus:outline-none focus:ring-0 focus:border-transparent"
                            placeholder="E-mail"
                        />
                        {emailError && (
                            <small className="p-error text-[10px] mt-0.5 absolute top-[100%] left-0 text-[#FF6961]">Campo inválido!</small>
                        )}
                    </div>

                    <button onClick={handlePasswordReset}
                        className="w-[210px] h-[32px] bg-[#252436] font-poppins text-[12px] py-1 mt-3 flex items-center 
                        justify-center rounded-lg sm:h-[35px] md:text-[13px] md:w-[230px] lg:w-[250px] lg:text-[14px] xl:text-[15px]">
                        Redefinir senha
                    </button>

                    <div className="flex text-[#FFFFFF] font-poppins font-light text-[0.65rem] mt-3 sm:text-[0.7rem] 2xl:text-[0.75rem]">
                        <p>Já tem uma conta?</p>
                        <a href="/auth/login" className="px-1"><span className="text-[#FFFFFF] underline">Faça login</span></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordRectangle;
