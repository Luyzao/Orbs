import React, { useState, useEffect } from "react";
import { supabase } from 'lib/supabaseClient';


interface Category {
  id: string;
  name: string;
  color?: string | null;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string; // ISO string
  isCredit: boolean;
  totalInstallments?: number | null;
  currentInstallment?: number | null;
  category: Category;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados para os cálculos
  const [total, setTotal] = useState(0);
  const [categoryWithHighestExpense, setCategoryWithHighestExpense] = useState<{ name: string; total: number } | null>(null);
  const [differenceFromLastMonth, setDifferenceFromLastMonth] = useState(0);

  useEffect(() => {
  async function fetchExpenses() {
    setLoading(true);

    // Pega a sessão atual de forma assíncrona
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.log("Erro ao obter sessão:", error.message);
      setLoading(false);
      return;
    }

    const session = data.session;

    if (!session) {
      console.log("Usuário não autenticado");
      setLoading(false);
      return;
    }

    const token = session.access_token;

    const res = await fetch('/api/expenses', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      setExpenses(data);
    } else {
      console.error("Erro ao buscar despesas");
    }
    setLoading(false);
  }

  fetchExpenses();
}, []);
    
    useEffect(() => {

        if (expenses.length === 0) {
        setTotal(0);
        setCategoryWithHighestExpense(null);
        setDifferenceFromLastMonth(0);
        return;
        }

        // 1. Calcular total de despesas (considerando créditos como negativos)
        const totalCalc = expenses.reduce((acc, e) => {
        return acc + (e.isCredit ? -e.amount : e.amount);
        }, 0);
        setTotal(totalCalc);

    }, [expenses]);

    // Função para formatar moeda BRL
    function formatCurrency(value: number) {
        return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        });
    }

    return (
        <div className="relative ml-2 mt-10 sm:ml-2 sm:mt-4 md:ml-2 md:mt-4 lg:ml-2 lg:mt-4 xl:ml-2 xl:mt-4">

        {/* Calculo */}
        <div className="absolute inset-y-0 left-40 sm:left-56 md:left-64 right-0 translate-x-4 bg-[#383577] w-[136px] sm:w-[220px] md:w-[300px] lg:w-[310px] xl:w-[310] h-[280px] sm:h-[290px] md:h-[300px] lg:h-[300px] xl:h-[300px] ml-2 mt-4 rounded-md shadow-lg" style={{ borderRadius: '20px' }}>

        <h2 className="font-poppins text-sm sm:text-sm md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-4 mt-4 sm:mt-4 md:mt-5 lg:mt-4 xl:mt-4"> Total </h2>
        <p className="font-comfortaa text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-start text-[#FFFFFF] ml-3 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-2 sm:mb-2 md:mb-4 lg:mb-3"> {formatCurrency(total)} </p>
        
        <h2 className="font-poppins text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base text-start text-[#FFFFFF] ml-3 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4"> Categoria com maior gasto </h2>
        <p className="font-comfortaa text-xs sm:text-sm md:text-sm  lg:text-sm xl:text-base text-start text-[#C2F74F] ml-3 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 "> Categoria A </p>
        <p className="font-comfortaa text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-2 sm:mb-2 md:mb-3 lg:mb-2 xl:mb-3"> R$ 00,00 </p>

        <h2 className="font-poppins text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base text-start text-[#FFFFFF] ml-3  s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4"> Diferença com o mês anterior </h2>
        <p className="font-comfortaa text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 xl:mb-2"> R$ 00,00 </p>



        </div>

      
        {/* Despesas */}
        <div className="bg-[#EBEBEB] w-[255px] h-[340px] sm:w-[360px] sm:h-[420px] md:w-[530px] md:h-[346px] lg:w-[520px] lg:h-[340px] xl:w-[540px] xl:h-[330px] flex flex-col items-start justify-start gap-3 rounded-lg shadow-md p-4">
          <h2 className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#888888] mb-1">
            Despesas
          </h2>

          <div className="w-2/3 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 text-xs bg-[#E1E1E1] text-[#000000] p-2 rounded-lg font-poppins">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-2 bg-[#F04D23] rounded-full shrink-0"></div>
                    <span>Raquete beach - R$ 239,90</span>
                </div>
        
            </div>
            <div className="w-2/3 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 text-xs bg-[#E1E1E1] text-[#000000] p-2 rounded-lg font-poppins">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-2 bg-[#287E6A] rounded-full shrink-0"></div>
                    <span>Aluguel loja - R$ 2.239,90</span>
                </div>
        
            </div>
            <div className="w-2/3 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 text-xs bg-[#E1E1E1] text-[#000000] p-2 rounded-lg font-poppins">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-2 bg-[#F39E00] rounded-full shrink-0"></div>
                    <span>Mercado - R$ 559,90</span>
                </div>
        
            </div>
            <div className="w-2/3 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 text-xs bg-[#E1E1E1] text-[#000000] p-2 rounded-lg font-poppins">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-2 bg-[#7166FE] rounded-full shrink-0"></div>
                    <span>Mandarim - R$ 398,90</span>
                </div>
        
            </div>
           

        </div>

      
      </div>
      
    );
};
export default Expenses;