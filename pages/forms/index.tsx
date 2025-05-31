import { RadioButton } from 'primereact/radiobutton';
import { ProgressBar } from 'primereact/progressbar';
import { useState } from 'react';

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
        pergunta: 'Quanto você gostaria de poupar por mês?',
        tipo: 'radio',
        opcoes: [
            { key: '1', name: 'Nada, desejo gastar tudo que ganho.' },
            { key: '2', name: 'R$50,00' },
            { key: '3', name: 'R$100,00' },
            { key: '4', name: 'R$200,00' },
            { key: '5', name: 'R$300,00' },
            { key: '7', name: 'Outro' },
        ]
    },
];

export default function Login() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const currentQuestion = perguntas[currentIndex];

    // Valor da barra de progresso em %
    const progressValue = ((currentIndex) / (perguntas.length - 1)) * 100;

    // Para armazenar a resposta selecionada
    const handleRadioChange = (value: any) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    };

    const handleInputChange = (e: { target: { value: any; }; }) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }));
    };

    const handleNext = () => {
        if (currentIndex < perguntas.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Aqui você pode enviar os dados para o banco
            console.log('Respostas finais:', answers);
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
            <div className="flex flex-col gap-4 py-6">
                <p className="font-comfortaa text-3xl px-6 text-[#D9D9D9]">Orbs</p>
                <p className="font-comfortaa text-[12px] px-6 text-[#D9D9D9]">Quase lá! Precisamos de mais alguns dados.</p>
                <p className="font-comfortaa text-4xl px-6 text-[#FFFFFF]">{currentQuestion.pergunta}</p>

                <div className="px-6">
                    {currentQuestion.tipo === 'radio' && currentQuestion.opcoes && currentQuestion.opcoes.map((option) => (
                        <div key={option.key} className="flex align-items-center font-comfortaa text-md mb-2">
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

                    {currentQuestion.tipo === 'text' && (
                        <input
                            type="text"
                            className="w-full p-2 rounded border border-gray-300"
                            value={answers[currentQuestion.id] || ''}
                            onChange={handleInputChange}
                        />
                    )}
                </div>

                <div className='px-6 py-6 flex items-center gap-4'>
                    <button
                        onClick={handleNext}
                        className="w-[120px] h-[32px] bg-indigo-500 font-poppins text-[18px] rounded-lg flex items-center justify-center"
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
