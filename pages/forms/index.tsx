import { RadioButton } from 'primereact/radiobutton';
import { ProgressBar } from 'primereact/progressbar';
import { InputText } from 'primereact/inputtext'
import { useState } from 'react';
import { supabase } from 'lib/supabaseClient'

const perguntas = [
    {
        id: 'media_salarial',
        pergunta: 'Qual sua média salarial?',
        tipo: 'radio',
        opcoes: [
            { key: '1', name: 'Até R$2.000' },
            { key: '2', name: 'De R$2.001 a R$5.000' },
            { key: '3', name: 'De R$5.001 a R$10.000' },
            { key: '4', name: 'Acima de R$10.000' }
        ]
    },
    {
        id: 'idade',
        pergunta: 'Qual sua idade?',
        tipo: 'radio',
        opcoes: [
            { key: '1', name: 'Abaixo de 18 anos' },
            { key: '2', name: '18 a 24 anos' },
            { key: '3', name: '25 a 34 anos' },
            { key: '4', name: '35 a 44 anos' },
            { key: '5', name: 'Acima de 45 anos' }
        ]
    },
    {
        id: 'filhos',
        pergunta: 'Você tem dependentes?',
        tipo: 'radio',
        opcoes: [
            { key: '1', name: 'Sim' },
            { key: '2', name: 'Não' },
        ]
    },
    {
        id: 'dinheiro',
        pergunta: 'Quanto deseja guardar por mês?',
        tipo: 'radio',
        opcoes: [
            { key: '1', name: 'Nada.' },
            { key: '2', name: 'R$50,00' },
            { key: '3', name: 'R$100,00' },
            { key: '4', name: 'R$200,00' },
            { key: '5', name: 'R$300,00' },
            { key: '7', name: 'Outro' },
        ]
    },
];


export default function Forms() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const currentQuestion = perguntas[currentIndex];

    const isAnswered = (() => {
    if (currentQuestion.id === 'filhos' && answers['filhos'] === '1') {
        return !!answers['quantidade_filhos'];
    }
    if (currentQuestion.id === 'dinheiro' && answers['dinheiro'] === '7') {
        return !!answers['dinheiro_outro'];
    }
    return !!answers[currentQuestion.id];
    })();

    const progressValue = ((currentIndex) / (perguntas.length - 1)) * 100;

    const handleRadioChange = (value: any) => {
        const currentValue = answers[currentQuestion.id];

        if (currentValue === value) {
            
            const newAnswers = { ...answers };
            delete newAnswers[currentQuestion.id];

            if (currentQuestion.id === 'filhos') {
                delete newAnswers['quantidade_filhos'];
            }

            setAnswers(newAnswers);
        } else {
            
            if (currentQuestion.id === 'filhos' && value === '2') {
                setAnswers(prev => {
                    const newAnswers = { ...prev };
                    delete newAnswers['quantidade_filhos'];
                    return { ...newAnswers, [currentQuestion.id]: value };
                });
            } else {
                setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
            }
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < perguntas.length - 1) {
            const nextQuestionId = perguntas[currentIndex + 1].id;

            setAnswers(prev => {
            
            const newAnswers = { ...prev };
            delete newAnswers[nextQuestionId];
        
            if (nextQuestionId === 'filhos') {
                delete newAnswers['quantidade_filhos'];
            }
            return newAnswers;
            });

            setCurrentIndex(currentIndex + 1);
        } else {
            console.log('Respostas finais:', answers);
        }
    };

    const getOptionLabel = (questionId: string, key: string) => {
        const question = perguntas.find(q => q.id === questionId);
        const option = question?.opcoes.find(o => o.key === key);
        return option?.name || '';
    };

    const handleSubmit = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                console.error("Usuário não autenticado");
                return;
            }

            const payload = {
                userId: user.id,
                media_salarial: getOptionLabel('media_salarial', answers.media_salarial),
                idade: getOptionLabel('idade', answers.idade),
                quantidade_filhos: answers.filhos === '1' 
                    ? (answers.quantidade_filhos || '0') 
                    : '0',
                dinheiro: answers.dinheiro === '7'
                    ? parseFloat((answers.dinheiro_outro || '0').replace(',', '.')).toFixed(2)
                    : (() => {
                        const label = getOptionLabel('dinheiro', answers.dinheiro);
                        const numberMatch = label.match(/[\d,.]+/);
                        return numberMatch
                            ? parseFloat(numberMatch[0].replace(',', '.')).toFixed(2)
                            : '0.00';
                    })(),
            };

            const response = await fetch('http://localhost:3390/api/user/forms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Formulário enviado com sucesso:", data);
            } else {
                console.error("Erro ao enviar:", data.message);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <div
            className="h-screen w-full flex justify-between bg-cover bg-center relative"
            style={{
                backgroundImage: "url(/images/background-forms.png)",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="flex flex-col gap-4 py-6 md:py-8 ">
                <p className="font-comfortaa text-3xl px-6 text-[#D9D9D9] xl:px-8 xl:text-4xl">Orbs</p>
                <p className="font-comfortaa text-[12px] px-6 text-[#D9D9D9] xl:px-8 xl:text-[14px]">Quase lá! Precisamos de mais alguns dados.</p>
                <div className='flex flex-row mr-4 align-items-center'>
                    {currentIndex > 0 && (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-white text-sm hover:underline pl-6"
                        >
                            <img src="/vector/back_arrow_forms.svg" alt="Voltar" className="w-8 h-8 xl:ml-4 xl:mt-4" />
                        </button>
                    )}

                    <p
                    className={`font-comfortaa text-[#FFFFFF] text-xl md:text-3xl lg:text-4xl xl:text-6xl xl:mt-4
                     ${currentIndex >= 1 ? 'px-1 xl:px-3' : 'px-6 xl:px-8'}`}
                    >
                    {currentQuestion.pergunta}
                    </p>

                </div>
                <div className="px-6 xl:px-8 xl:mt-6">
                    {currentQuestion.id === 'filhos' ? (
                        <>
                            {currentQuestion.opcoes
                                .filter(option => {
                                
                                    if (answers['filhos'] === '1') {
                                        return option.key !== '2';
                                    }
                                    return true;
                                })
                                .map((option) => (
                                    <div key={option.key} className="flex items-center font-comfortaa text-md mb-2">
                                        <RadioButton
                                            inputId={option.key}
                                            name={currentQuestion.id}
                                            value={option.key}
                                            onChange={(e) => handleRadioChange(e.value)}
                                            checked={answers[currentQuestion.id] === option.key}
                                        />
                                        <label htmlFor={option.key} className="ml-2">{option.name}</label>
                                    </div>
                                ))}

                            {answers['filhos'] === '1' && (
                                <div className="mt-2">
                                    <label className="block mb-1 font-comfortaa">Quantos?*</label>
                                    <InputText
                                        type="number"
                                        min="1"
                                        step="1"
                                        className="w-[100px] !bg-[#515057] p-2 rounded-xl border border-[#515057] text-[#000000]
                                        font-comfortaa focus:outline-none focus:ring-0 focus:border-transparent text-[16px]"
                                        value={answers['quantidade_filhos'] || ''}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setAnswers(prev => ({ ...prev, ['quantidade_filhos']: value }));
                                            }
                                        }}
                                        placeholder="Quantos"
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {currentQuestion.opcoes?.map((option) => (
                                <div key={option.key} className="flex items-center font-comfortaa text-base mb-2 md:text-xl xl:text-2xl">
                                    <RadioButton
                                        inputId={option.key}
                                        name={currentQuestion.id}
                                        value={option.key}
                                        onChange={(e) => handleRadioChange(e.value)}
                                        checked={answers[currentQuestion.id] === option.key}
                                    />
                                    <label htmlFor={option.key} className="ml-2">{option.name}</label>
                                </div>
                            ))}

                            {currentQuestion.id === 'dinheiro' && answers['dinheiro'] === '7' && (
                            <div className="mt-2">
                                <label className="block mb-1 font-comfortaa">Quantia*</label>
                                <InputText
                                    type="text"
                                    min="1"
                                    step="1"
                                    className="w-[100px] !bg-[#515057] p-2 rounded-xl border border-[#515057] text-[#000000]
                                        font-comfortaa focus:outline-none focus:ring-0 focus:border-transparent text-[16px]"
                                    value={answers['dinheiro_outro'] || ''}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(',', '.');
                                        if (/^\d*\.?\d*$/.test(value)) {
                                            setAnswers(prev => ({ ...prev, ['dinheiro_outro']: value }));
                                        }
                                    }}
                                    placeholder="Quantia"
                                />
                            </div>
                        )}
                        </>
                    )}
                </div>

                <div className='px-6 py-6 flex items-center gap-4 xl:px-8 xl:mt-6'>
                    <button
                        onClick={() => {
                            if (currentIndex < perguntas.length - 1) {
                            handleNext();
                            } else {
                            handleSubmit(); 
                            }
                        }}
                        disabled={!isAnswered}
                        className={`w-[120px] h-[32px] ${
                            isAnswered ? 'bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'
                        } font-poppins text-[18px] rounded-lg flex items-center justify-center`}
                        >
                        {currentIndex < perguntas.length - 1 ? 'Próximo' : 'Enviar'}
                        </button>

                    <ProgressBar
                        value={progressValue}
                        showValue={false}
                        className="custom-progressbar flex-1"
                    />
                </div>
            </div>
        </div>
    )
}
