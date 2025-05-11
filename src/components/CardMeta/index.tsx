import { Pencil } from 'lucide-react';

export interface CardMetaProps {
  title: string;
  value: string;
  color: string;
  imageUrl: string;
  onEdit?: () => void;
}

export function CardMeta({ title, value, color, imageUrl, onEdit }: CardMetaProps) {
  return (
    <div className="w-48 h-60 rounded-xl shadow-md bg-white flex flex-col p-3 relative overflow-hidden">
      <div className={`absolute -top-6 -left-6 w-[120px] h-[120px] ${color} rounded-full flex items-center justify-center`}>
        <div className="relative w-12 h-12">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" className="w-full h-full">
            <path d="M560 224h-30.6c-1.4-5.1-3-10.1-4.9-15L544 184c5.3-7.1.3-17-8.6-17H497.4c-9.3-13.4-20.6-25.3-33.5-35.3l7.4-25.7c1.1-3.8.3-7.9-2.3-11s-6.3-4.9-10.3-4.9H384c-17.7 0-32 14.3-32 32v3.8c-10.4-2.5-21.3-3.8-32.4-3.8H272c-56.5 0-106.8 29.1-136.6 73.4C88.4 202.6 64 233.2 64 272v16c-35.3 0-64 28.7-64 64s28.7 64 64 64h34.7c29.4 38.2 75.2 64 125.3 64h112c47.1 0 90.3-21.7 119.2-56h73.5c8.8 0 16-7.2 16-16V320c0-26.5-21.5-48-48-48zM144 304c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[0.6rem] font-bold text-[#6e1a91]">
            R$ {value}
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <Pencil
          className="w-8 h-8 text-gray-800 hover:text-gray-500 cursor-pointer"
          onClick={onEdit}
        />
      </div>

      <div className="mt-6 mb-2">
        <img src={imageUrl} alt={title} className="h-20 mx-auto" />
      </div>

      <div className="text-gray-800 text-center text-sm font-semibold">{title}</div>
      <div className="text-center text-xs text-gray-600">Meta: R$ {value}</div>
    </div>
  );
}
