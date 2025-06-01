import ToolBar from '@/components/toolBar'
import Education from '@/components/shapes/education'

export default function Educacao() {
  return (
    <div className="w-full h-screen font-comfortaa bg-[#F0F0F0] pb-7 lg:pb-0 p-4 flex flex-col gap-2 sm:pl-8 md:pl-6 xl:pt-6 xl:pb-0 xl:p-8">
      <div className="ml-2 sm:ml-6 md:ml-6 flex items-center">
        <ToolBar selectedDate={undefined} setSelectedDate={undefined} />
      </div>
      <Education />
    </div>
  )
}
