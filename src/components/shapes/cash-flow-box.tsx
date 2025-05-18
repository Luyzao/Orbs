import React, { useState, useEffect } from 'react'
import { supabase } from 'lib/supabaseClient'; 


interface CashFlowBoxProps {
  className?: string
}

const CashFlowBox: React.FC<CashFlowBoxProps> = () => {
  const [income, setIncome] = useState('')
  const [extraincome, setextraIncome] = useState('')
  const [otherincome, setOthers] = useState('')
  const [total, setTotal] = useState('R$ 0,00')
  const [impostoRenda, setImpostoRenda] = useState('R$ 0,00')


  // Função para formatar valor monetário em BRL
  const formatCurrency = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, ''); // só números
    const numberValue = Number(onlyNumbers) / 100;

    // Se não for número válido, retorna vazio
    if (isNaN(numberValue)) return '';

    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatCurrencyFromNumber = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };


  // Handlers para os inputs com formatação
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setIncome(formatted);
  };

  const handleExtraIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setextraIncome(formatted);
  };

  const handleOthersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setOthers(formatted);
  };

  // Função para converter string formatada "R$ 1.234,56" em número float 1234.56 antes de enviar
  const parseCurrencyToNumber = (value: string) => {
    if (!value) return 0;
    // Remove "R$ ", pontos e troca vírgula por ponto
    return Number(value.replace(/[R$\s\.]/g, '').replace(',', '.'));
  };

  const getToken = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Erro ao obter sessão:', error);
      return null;
    }

    if (!session) {
      console.log('Usuário não está logado');
      return null;
    }

    return session.access_token;
  };

  const handleSave = async () => {
  const token = await getToken();

  if (!token) {
    alert('Usuário não autenticado');
    return;
  }

  const data = {
    income: parseCurrencyToNumber(income),
    extraincome: parseCurrencyToNumber(extraincome),
    otherincome: parseCurrencyToNumber(otherincome),
  };

  try {
    const response = await fetch('http://localhost:3390/api/income/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // ✅ usa diretamente o objeto `data` com os campos certos
    });

    if (response.ok) {
      alert('Dados salvos com sucesso!');
      await fetchIncomeData();
      
    } else {
      const errRes = await response.json();
      console.error('Erro da API:', errRes);
      alert('Erro ao salvar os dados.');
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    alert('Erro na comunicação com o servidor.');
  }
};

  function parseIncomeData(data: any) {
    return {
      income: formatCurrencyFromNumber(Number(data.income) || 0), // formata para R$
      extraincome: formatCurrencyFromNumber(Number(data.extraincome) || 0),
      otherincome: formatCurrencyFromNumber(Number(data.otherincome) || 0),
      total: formatCurrencyFromNumber(Number(data.total) || 0),
      impostoRenda: formatCurrencyFromNumber(Number(data.impostoRenda) || 0),
    };
  }



 const fetchIncomeData = async () => {
    const token = await getToken()

    if (!token) {
      alert('Usuário não autenticado')
      return
    }

    try {
      const response = await fetch('http://localhost:3390/api/income/route', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }

      const fetchedData = await response.json();
      const cleanedData = parseIncomeData(fetchedData);
      setIncome(cleanedData.income); // aqui income é string
      setextraIncome(cleanedData.extraincome);
      setOthers(cleanedData.otherincome);
      setTotal(cleanedData.total);
      setImpostoRenda(cleanedData.impostoRenda);


    } catch (error) {
      console.error(error)
      alert('Erro ao carregar dados')
    }
  }

  // Chama a busca assim que o componente monta
  useEffect(() => {
    fetchIncomeData()
  }, [])


  return (
    <div className="relative ml-2 mt-8 sm:ml-2 sm:mt-8 md:ml-2 md:mt-4 lg:ml-2 lg:mt-4 xl:ml-2 xl:mt-4">
      {/* Calculo */}
      <div
        className="absolute inset-y-0 left-40 sm:left-56 md:left-64 right-0 translate-x-4 bg-[#383577] w-[136px] sm:w-[220px] md:w-[300px] lg:w-[310px] xl:w-[310] h-[280px] sm:h-[290px] md:h-[300px] lg:h-[300px] xl:h-[300px] ml-2 mt-4 rounded-md shadow-lg"
        style={{ borderRadius: '20px' }}
      >
        <h2 className="font-poppins text-base sm:text-base md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-3 s:mt-2 m:mt-2 lg:mt-2 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          Total{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl text-start text-[#FFFFFF] ml-3 s:mt-2 s:mb-4 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-1">
          {total}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:tex t-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-4 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 ">
          {' '}
          Renda extra{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-1">
          {extraincome}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          Outros{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4 mb-1">
          {otherincome}
        </p>

        <h2 className="font-poppins text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {' '}
          Imposto de renda{' '}
        </h2>
        <p className="font-comfortaa text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#FFFFFF] ml-3 mt-1 s:mt-1 s:mb-2 m:mt-1 lg:mt-1 s:ml-4 m:ml-4 lg:ml-4">
          {impostoRenda}
        </p>
      </div>

      {/* Entradas de receita */}
      <div className="bg-[#EBEBEB] w-[255px] h-[325px] sm:w-[360px] sm:h-[335px] md:w-[440px] md:h-[356px] lg:w-[540px] xl:w-[540px] flex flex-col items-start justify-start gap-3 rounded-lg shadow-md p-4">
        <h2 className="font-comfortaa text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#888888] ">
          Receita
        </h2>

        <div className="w-4/6 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-2/5">
          <label className="font-comfortaa text-sm font-medium block text-[#383577] mb-1">
            Renda
          </label>
          <input
            type="text"
            value={income}
            onChange={handleIncomeChange}
            placeholder="R$ 00,00"
            className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
          />
        </div>

        <div className="w-4/6 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-2/5">
          <label className="font-comfortaa text-sm font-medium block text-[#383577] mb-1">
            Renda extra
          </label>
          <input
            type="text"
            value={extraincome}
            onChange={handleExtraIncomeChange}
            placeholder="R$ 00,00"
            className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
          />
        </div>

        <div className="w-4/6 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-2/5">
          <label className="font-comfortaa text-sm font-medium block text-[#383577] mb-1">
            Outros
          </label>
          <input
            type="text"
            value={otherincome}
            onChange={handleOthersChange}
            placeholder="R$ 00,00"
            className="font-comfortaa bg-[#E1E1E1] text-[#000000] placeholder:text-[#000000] w-full p-2 rounded-lg focus:outline-none focus:shadow-md"
          />
        </div>
          {/* Botão de Salvar */}
        <button
          onClick={handleSave}
          className="w-1/5 h-9/10 mt-1 mb-2 bg-[#383577] font-poppins text-white rounded-md shadow hover:bg-[#2f2c6e] transition"
        >
          Salvar
        </button>
      </div>
    </div>
  )
}
export default CashFlowBox
