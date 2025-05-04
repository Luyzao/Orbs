import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { LuMoon } from 'react-icons/lu'
import Image from 'next/image'

export default function ToolBar() {
  return (
    <div className="w-full font-comfortaa flex flex-col xl:flex-row justify-between items-start sm:items-center gap-3">
      <div className=" text-black flex flex-col w-auto items-center xl:items-start">
        <h1 className="  lg:text-xl xl:text-2xl">
          <span className="text-[#383577]">Bem-vindo a sua</span> orbita
          financeira!
        </h1>
        <p className="text-xs sm:text-xs md:text-sm lg:text-sm ">
          Olá, usuario123
        </p>
      </div>

      <div className="flex w-full sm:w-auto justify-center sm:justify-end items-center gap-2 text-black">
        <div className="flex items-center justify-center w-auto bg-gray-200 rounded-md px-2 gap-2 py-1 h-8">
          <p className="text-xs md:text-sm">Recomendação de gasto: R$ 300,00</p>
          <RiMoneyDollarCircleLine size={20} />
        </div>
        <div className="bg-gray-200 h-2rem w-2rem  flex justify-center items-center rounded-md">
          <LuMoon size={20} />
        </div>
        <div>
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            width={32}
            height={32}
            className="h-2rem w-2rem  bg-gray-200 rounded-md"
          />
        </div>
      </div>
    </div>
  )
}
