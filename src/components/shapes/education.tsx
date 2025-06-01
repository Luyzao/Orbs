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
    title: 'Fundamentos Básicos da Educação Financeira',
    description: 'O que é Educação Financeira?',
    content:
    `<strong>Educação financeira</strong> é o processo de adquirir conhecimentos e desenvolver habilidades para administrar melhor o dinheiro no dia a dia.
     Ela permite que você tome decisões <strong>conscientes</strong> sobre como ganhar, gastar, poupar, investir e proteger seus recursos.
     Ter uma boa educação financeira não significa apenas economizar, mas sim entender como o dinheiro funciona, como ele impacta sua vida e como usá-lo para conquistar seus <strong>objetivos</strong>.
     Com ela, você ganha <strong>autonomia, segurança e qualidade de vida</strong>, evitando dívidas desnecessárias e construindo um futuro mais tranquilo e próspero.
    `,
  },
  {
    image: '/images/image2.svg',
    title: 'Entendendo Renda e Orçamento Básico (Regra 50, 30, 20)',
    description: 'Renda e Orçamento Básico',
    content:
    `Organizar suas finanças começa por entender sua <strong>renda</strong> e como distribuir seus <strong>gastos</strong>. Uma das formas mais simples e eficazes é aplicar a <strong>Regra 50-30-20</strong>, que funciona assim:
    • <strong>50% da renda</strong>: Necessidades — gastos essenciais como moradia, alimentação, transporte, saúde e contas básicas.
    • <strong>30% da renda</strong>: Desejos — lazer, restaurantes, viagens, hobbies e outras coisas que trazem prazer.
    • <strong>20% da renda</strong>: Prioridades financeiras — aqui entram a reserva de emergência, investimentos e pagamento de dívidas.
    Esse método ajuda você a ter equilíbrio, viver bem no presente e ainda se planejar para o <strong>futuro</strong>, sem que o dinheiro se torne um peso na sua vida.`,
  },
  {
    image: '/images/image3.svg',
    title: 'Reserva de Emergência: Sua Segurança Financeira',
    description: 'Importância da Reserva de Emergência',
    content:
      `A <strong>reserva de emergência</strong> é um valor guardado para imprevistos, como perda de emprego, problemas de saúde, consertos urgentes ou qualquer situação <strong>inesperada</strong>.
      • <strong>Quanto guardar?</strong>
      O ideal é acumular de 3 a 6 meses dos seus custos fixos. Se você tem um trabalho informal ou instável, pode ser interessante guardar até 12 meses.
      • <strong>Onde deixar?</strong>
      Deve estar em investimentos de <strong>alta liquidez</strong> (fácil acesso) e <strong>baixo risco</strong>, como contas remuneradas, Tesouro Selic ou CDBs de liquidez diária.
      Ter uma reserva de emergência traz segurança e <strong>evita</strong> que você precise recorrer a <strong>empréstimos, cartões de crédito ou cheque especial</strong> em momentos difíceis.`,
  },
  {
    image: '/images/image4.svg',
    title: 'Dívidas, Juros e Inflação: Entenda e Proteja seu Dinheiro',
    description: 'Dívidas, Juros e Inflação',
    content:
      `• <strong>Dívidas</strong>
      Ter dívidas não é, necessariamente, um problema — desde que sejam planejadas e caibam no orçamento. O problema começa quando elas se acumulam e os juros viram uma <strong>bola de neve</strong>.
      • <strong>Juros</strong>
      Juros são o custo do dinheiro emprestado. No Brasil, eles costumam ser altos, especialmente em cartões de crédito e cheque especial. Pagar o mínimo da fatura ou atrasar boletos pode gerar dívidas que crescem <strong>rapidamente</strong>.
      • <strong>Inflação</strong>
      A inflação é o aumento geral dos preços. Ela diminui o poder de compra do seu dinheiro ao longo do tempo. Por isso, deixar dinheiro parado na conta corrente significa perder <strong>valor</strong>.
      • <strong>Soluções</strong>
       - Organize as dívidas, priorizando as mais <strong>caras</strong> (maiores juros).
       - Negocie prazos e taxas.
       - Proteja-se da inflação <strong>investindo</strong> seu dinheiro.`,
  },
  {
    image: '/images/image6.svg',
    title: 'Começando a Investir: Simples e Acessível',
    description: 'Começando a Investir',
    content:
      `Investir não é só para quem tem muito dinheiro — é para <strong>qualquer pessoa</strong> que quer fazer seu dinheiro trabalhar por ela.
      • <strong>Passos para começar</strong>:
      - <strong>Quite</strong> dívidas caras e tenha uma reserva de emergência.
      - <strong>Defina</strong> seus objetivos: curto, médio e longo prazo.
      - <strong>Conheça</strong> os tipos de investimentos:
      - <strong>Renda fixa</strong>: seguros e indicados para quem está começando <strong>(Tesouro Direto, CDB, LCI, LCA)</strong>.
      - <strong>Renda variável</strong>: ações, fundos imobiliários e outros, que podem gerar mais retorno, mas com mais risco.
      • <strong>Importante</strong>:
      Comece aos <strong>poucos</strong>, estudando, diversificando e, principalmente, investindo com consciência. <strong>Não existe milagre</strong>: constância e disciplina fazem toda a diferença.
      `,
  },
  {
    image: '/images/image5.svg',
    title: 'Como Cortar Gastos Supérfluos e Se Planejar para Grandes Compras',
    description: 'Planejamento de Compras',
    content:
      `• <strong>Cortar gastos supérfluos</strong>:
      <strong>- Anote</strong> todos os seus gastos e identifique aqueles que não são essenciais.
      <strong>- Reveja</strong> assinaturas que você não usa (streaming, academia, serviços).
      <strong>- Evite</strong> compras por impulso. Dê um prazo de 24 a 48 horas antes de decidir.
      <strong>- Adote</strong> hábitos que economizam: cozinhar mais em casa, comparar preços, pesquisar promoções.
      • <strong>Planejamento para grandes compras (casa, carro, viagem)</strong>:
      <strong>- Defina</strong> o valor e o prazo para juntar o dinheiro.
      <strong>- Crie</strong> uma poupança exclusiva ou invista para esse objetivo.
      <strong>- Calcule</strong> quanto precisa guardar por mês até a data desejada.
      <strong>- Avalie</strong> se vale mais a pena comprar à vista (com desconto) ou financiar, considerando os juros.
      Ter disciplina para cortar pequenos gastos hoje permite realizar grandes sonhos amanhã, sem se endividar.`,
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

        {card.content.split('\n').map((line, index) => (
          <p
            key={index}
            className="text-base mt-2 text-[#3E3E3E]"
            dangerouslySetInnerHTML={{ __html: line.trim() }}
          />
        ))}

      </div>
    </div>
  )
}
