import { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { HiArrowLeft } from 'react-icons/hi2'
import Image from 'next/image'

interface EducationProps {
  className?: string
}

interface CardData {
  image: string
  title: string
  description: string
  content: string
}

const cards: CardData[] = [
  {
    image: '/images/image1.svg',
    title: 'Receita, Despesa e Investimento',
    description: 'Diferença entre receita, despesa e investimento.',
    content:
      'Receitas são entradas de dinheiro. Despesas são os gastos. Investimentos são aplicações com expectativa de retorno financeiro.Receitas são entradas de dinheiro. Despesas são os gastos.',
  },
  {
    image: '/images/image2.svg',
    title: 'Reserva de Emergência',
    description: 'Importância da reserva de emergência.',
    content:
      'A reserva de emergência é essencial para cobrir imprevistos, como problemas de saúde, sem comprometer suas finanças.',
  },
  {
    image: '/images/image3.svg',
    title: 'Juros Simples vs. Compostos',
    description: 'Juros simples vs. compostos, como funciona?',
    content:
      'Juros simples são calculados sobre o valor inicial. Juros compostos rendem sobre o valor acumulado, acelerando os ganhos.',
  },
  {
    image: '/images/image4.svg',
    title: 'Tipos de Investimento',
    description: 'O que são CDB, Tesouro Direto, Fundos, Ações?',
    content:
      'Cada tipo tem riscos e retornos diferentes. CDB e Tesouro são mais seguros. Fundos e ações podem ter mais volatilidade.',
  },
  {
    image: '/images/image5.svg',
    title: 'Gastos Supérfluos',
    description: 'Como cortar gastos supérfluos?',
    content:
      'Identifique gastos não essenciais e reduza ou elimine. Substitua hábitos caros por alternativas econômicas.',
  },
  {
    image: '/images/image6.svg',
    title: 'Planejamento de Compras',
    description: 'Como se planejar para grandes compras?',
    content:
      'Defina metas, pesquise preços e guarde um valor por mês até atingir o necessário para a compra sem dívidas.',
  },
]

const Education: React.FC<EducationProps> = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  return (
    <div className="relative flex flex-row">
      {/* Imagem de fundo (só aparece quando nenhum card está expandido) */}
      {!selectedCard && (
        <Image
          width={400}
          height={400}
          src="/images/guy shopping online.png"
          className="absolute bottom-0 top-80 z-10 right-2 hidden xl:block"
          alt="Homem fazendo compras online"
        />
      )}

      {/* Área principal */}
      <div
        className="absolute w-8 bg-transparent  "
        style={{ borderRadius: '20px' }}
      >
        <h2 className="font-poppins ml-5 text-base sm:text-base md:text-xl lg:text-xl xl:text-xl text-start text-[#3E3E3E] mt-3">
          Aprender, poupar e investir
        </h2>

        {/* Se nenhum card estiver selecionado, exibe todos */}
        {!selectedCard ? (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  ">
              {cards.map((card, index) => (
                <CardItem
                  key={index}
                  imageSrc={card.image}
                  description={card.description}
                  onClick={() => setSelectedCard(card)}
                />
              ))}
            </div>
          </div>
        ) : (
          <ExpandedCard
            card={selectedCard}
            onBack={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Education

interface CardItemProps {
  imageSrc: string
  description: string
  onClick: () => void
}

function CardItem({ imageSrc, description, onClick }: CardItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col mt-4 ml-6 sm:ml-4 bg-[#E3E3E3] w-[300px] sm:w-[298px] md:w-[300px] lg:w-[320px] xl:w-[320px] h-[254px] sm:h-[255px] md:h-[233px] lg:h-[226px] xl:h-[230px] rounded-md shadow-lg transition-transform hover:scale-[1.02]"
      style={{ borderRadius: '20px' }}
    >
      <Image
        width={300}
        height={180}
        src={imageSrc}
        className="w-full bg-white h-[200px] sm:h-[190px] md:h-[180px] lg:h-[170px] rounded-t-[20px] object-cover"
        alt={description}
      />
      <p className="font-poppins w-[240px] flex items-center gap-2 text-sm ml-4 my-2 mb-6 text-[#3E3E3E]">
        <span>{description}</span>
        <button
          className="p-1 rounded-full hover:bg-[#d1d1d1] transition"
          aria-label="Ver mais"
        >
          <HiArrowRight size={24} />
        </button>
      </p>
    </div>
  )
}

interface ExpandedCardProps {
  card: CardData
  onBack: () => void
}

function ExpandedCard({ card, onBack }: ExpandedCardProps) {
  return (
    <div className="flex flex-col pb-2 items-start justify-start p-6">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-blue-600 hover:underline mb-4"
      >
        <HiArrowLeft className="mr-1" /> Voltar
      </button>
      <div
        className="shadow-xl border-round-2xl p-3  h-[600px] overflow-y-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Image
          width={800}
          height={400}
          src={card.image}
          className="w-25rem  object-cover rounded-lg"
          alt={card.title}
        />

        <h3 className="font-bold text-xl mt-4 text-[#3E3E3E]">{card.title}</h3>

        <p className="text-base mt-2 text-[#3E3E3E]">{card.content}</p>
      </div>
    </div>
  )
}
