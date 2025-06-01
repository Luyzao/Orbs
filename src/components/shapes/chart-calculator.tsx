'use client';

import { useEffect, useState } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import { supabase } from 'lib/supabaseClient';

interface ChartProps {
    className?: string;
}

const Chart: React.FC<ChartProps> = ({ className }) => {
    const [analise, setAnalise] = useState<string>(''); // 🔥 Resultado da análise
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>('');

  useEffect(() => {
    const executarAnaliseCompleta = async () => {
        setCarregando(true);
        setErro('');

        try {
        console.log('🚀 Iniciando análise financeira...');

        // 🔸 1. Obter usuário
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        console.log('👤 Dados do usuário retornados:', user);
        if (userError) console.error('❌ Erro ao obter usuário:', userError);

        if (userError || !user) {
            throw new Error('Erro ao obter usuário');
        }

        const userId = user.id;
        console.log('✅ UserID:', userId);

        // 🔸 2. Buscar dados do Forms
        const { data: formsData, error: formsError } = await supabase
            .from('Forms')
            .select('media_salarial, idade, quantidade_filhos, dinheiro')
            .eq('userId', userId)
            .single();

        console.log('📄 Dados do Forms retornados:', formsData);
        if (formsError) console.error('❌ Erro no Forms:', formsError);

        if (formsError || !formsData) {
            throw new Error('Erro ao buscar dados do Forms');
        }

        const { media_salarial, idade, quantidade_filhos, dinheiro } = formsData;
        const salario = media_salarial;
        const filhos = quantidade_filhos;
        const metaEconomia = dinheiro;

        console.log('💰 Dados financeiros:', {
            salario,
            idade,
            filhos,
            metaEconomia,
        });

        // 🔸 3. Buscar resumo financeiro (gastos)
        console.log('📤 Enviando requisição para resumo financeiro...');
        const resumoResponse = await fetch('http://localhost:3390/api/resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });

        const resumoData = await resumoResponse.json();

        console.log('📥 Resposta bruta do resumo financeiro:', resumoData);

        if (!resumoResponse.ok) {
            console.error('❌ Erro na resposta do resumo financeiro:', resumoResponse.status);
            throw new Error('Erro ao buscar resumo financeiro');
        }

        const gastos = resumoData?.data;

        if (!gastos || Object.keys(gastos).length === 0) {
            console.warn('⚠️ Gastos estão vazios ou indefinidos:', gastos);
        } else {
            console.log('💸 Gastos retornados:', gastos);
        }

        console.log('🔍 Dados enviados para análise:', {
            salario,
            idade,
            filhos,
            metaEconomia,
            gastos,
        });

        // 🔸 4. Enviar para a análise
        console.log('📤 Enviando dados para análise...');
        const analiseResponse = await fetch('http://localhost:3003/api/analise-gastos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            salario,
            idade,
            filhos,
            metaEconomia,
            gastos,
            }),
        });

        const analiseData = await analiseResponse.json();

        console.log('📥 Resposta da análise:', analiseData);

        if (!analiseResponse.ok) {
            console.error('❌ Erro na análise:', analiseData?.erro);
            throw new Error(analiseData?.erro || 'Erro ao gerar análise');
        }

        console.log('✅ Análise gerada com sucesso:', analiseData);

        setAnalise(analiseData.analise); // 🔥 Guarda a análise no estado

        } catch (error: any) {
        console.error('❌ Erro geral:', error);
        setErro(error.message);
        } finally {
        setCarregando(false);
        console.log('🏁 Processo de análise encerrado');
        }
    };

    executarAnaliseCompleta();
    }, []);

    return (
        <div className="relative ml-4 mt-6 sm:ml-4 sm:mt-8 md:ml-8 md:mt-6 lg:ml-8 lg:mt-4 xl:ml-8 xl:mt-4">
            <div className="bg-[#EBEBEB] w-[255px] h-[545px] sm:w-[360px] sm:h-[545px] md:w-[440px] md:h-[668px] lg:w-[440px] lg:h-[698px] xl:w-[540px] xl-h[790px] flex flex-col items-start justify-start rounded-lg shadow-md p-4">
                <h2 className="font-poppins text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-start text-[#1C1B1F]">
                    Saldo Mensal
                </h2>
                <p className="font-comfortaa font-medium text-[#1C1B1F] text-3xl sm:text-3xl">
                    R$ 00,00
                </p>
                <hr className="w-full border-t border-[#C0C0C0] mb-3" />

                <div className="w-full">
                    {carregando ? (
                        <p className="font-comfortaa text-[#1C1B1F] text-sm">
                            🔄 Carregando análise...
                        </p>
                    ) : erro ? (
                        <p className="font-comfortaa text-red-600 text-sm">
                            ❌ Erro: {erro}
                        </p>
                    ) : analise ? (
                        <div className="space-y-4">
                            {analise
                                .split('\n')
                                .filter((linha) => linha.trim() !== '')
                                .map((linha, index) => {
                                    const isTitulo =
                                        linha.endsWith(':') ||
                                        linha.endsWith(' :') ||
                                        /^[A-ZÀ-Ú\s]+:$/.test(linha.trim());

                                    const isItem =
                                        linha.trim().startsWith('-') ||
                                        linha.trim().startsWith('•') ||
                                        linha.trim().startsWith('→') ||
                                        /^\d+\./.test(linha.trim());

                                    if (isTitulo) {
                                        return (
                                            <h3
                                                key={index}
                                                className="flex items-start gap-2 font-comfortaa text-[#1C1B1F] text-base md:text-lg font-semibold"
                                            >
                                                <HiExclamationCircle className="text-xl md:text-2xl mt-1 text-[#F97316]" />
                                                {linha.replace(':', '').trim()}
                                            </h3>
                                        );
                                    }

                                    if (isItem) {
                                        return (
                                            <li
                                                key={index}
                                                className="ml-8 list-disc font-comfortaa text-[#1C1B1F] text-sm md:text-base"
                                            >
                                                {linha.replace(/^[-•→\d.]+\s*/, '').trim()}
                                            </li>
                                        );
                                    }

                                    return (
                                        <p
                                            key={index}
                                            className="flex items-start gap-2 font-comfortaa text-[#1C1B1F] text-sm md:text-base"
                                        >
                                            <HiExclamationCircle className="text-xl md:text-2xl mt-1 text-[#F97316]" />
                                            {linha.trim()}
                                        </p>
                                    );
                                })}
                        </div>
                    ) : (
                        <p className="font-comfortaa text-[#1C1B1F] text-sm">
                            Nenhuma análise disponível.
                        </p>
                    )}
                </div>

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
