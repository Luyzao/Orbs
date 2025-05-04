import {
  FaBook,
  FaBullseye,
  FaCalculator,
  FaSignOutAlt,
  FaPiggyBank,
  FaMoon,
  FaSun,
} from 'react-icons/fa'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Educacao() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (!savedTheme) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      setIsDark(prefersDark)
      document.documentElement.classList.toggle('dark', prefersDark)
    } else if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const cards = [
    {
      imagem: '/images/educacaodespesa.png',
      largura: 'w-3',
      alturaImagem: 'h-60',
      alturaContainer: 'h-30',
    },
    {
      imagem: '/images/educacaoporco.png',
      largura: 'w-3',
      alturaImagem: 'h-14',
      alturaContainer: 'h-14',
    },
    {
      imagem: '/images/educacaomoca.png',
      largura: 'w-3',
      alturaImagem: 'h-14',
      alturaContainer: 'h-14',
    },
    {
      imagem: '/images/educacaocdb.png',
      largura: 'w-3',
      alturaImagem: 'h-14',
      alturaContainer: 'h-14',
    },
    {
      imagem: '/images/educacaorecorte.png',
      largura: 'w-3',
      alturaImagem: 'h-400',
      alturaContainer: 'h-400',
    },
    {
      imagem: '/images/educacaoplanejar.png ',
      largura: 'w-3',
      alturaImagem: 'h-14',
      alturaContainer: 'h-14',
    },
  ]

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Conteúdo principal */}
      <main className="relative flex-1 p-10 overflow-y-scroll bg-white dark:bg-gray-900 transition-colors duration-300 custom-scrollbar">
        "
        <div className="flex justify-between items-center mb-20 mt-7 text-right">
          <div>
            <h1 className="text-3xl md:text-5xl font-comfortaa leading-snug text-black dark:text-white">
              <span className="block text-indigo-500 ml-8">
                Aprenda mais{' '}
                <span className="text-black dark:text-white font-normal">
                  sobre sua receita e
                </span>
              </span>
              <span className="block font-bold ml-8">
                Evite <span className="font-black">buracos-negros...</span>
              </span>
            </h1>
          </div>

          {/* Bloco IA  + Avatar */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-black-600 dark:text-gray-300 px-5 py-2 rounded-full shadow-sm font-comfortaa">
            <span className="text-sm truncate max-w-[150px] ">
              O que a IA tem a dizer...
            </span>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {isDark ? (
                <FaSun className="text-lg text-gray-400 rounded-full" />
              ) : (
                <FaMoon className="text-lg text-gray-800 rounded-full " />
              )}
            </button>
            <img
              src="/images/educacaogarotinha.png"
              alt="Avatar"
              className="w-5 h-12 rounded-full ml-1"
            />
          </div>
        </div>
        <hr className="border-gray-300 dark:border-gray-400 mb-1" />
        <p className="text-4xl font-bold text-gray-600 dark:text-gray-300 mt-6 mb-6 font-comfortaa ml-8">
          Aprender, poupar e investir
        </p>
        {/* Cards de educação */}
        <div className="w-full flex justify-center">
          <section className="flex flex-wrap gap-6 justify-center">
            {cards.map(
              ({ imagem, largura, alturaImagem, alturaContainer }, i) => (
                <div
                  key={i}
                  className={`bg-white dark:bg-gray-800 ${largura} rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center`}
                >
                  <div
                    className={`bg-gradient-to-br from-blue-500 to-purple-700 rounded-xl w-full ${alturaContainer} flex items-center justify-center mb-4`}
                  >
                    <img
                      src={imagem}
                      className={`${alturaImagem} object-contain`}
                    />
                  </div>
                  <h2 className="text-sm font-semibold mb-4">{}</h2>
                  <div className="mt-auto self-end">
                    <span className="text-gray-600 dark:text-gray-300 text-xl"></span>
                  </div>
                </div>
              ),
            )}
          </section>
        </div>
        <img
          src="/images/educacaomenino.png"
          alt="Boneco"
          className="absolute bottom-0 right-0 w-32 md:w-40 lg:w-48 pointer-events-none select-none"
        />
      </main>
    </div>
  )
}
