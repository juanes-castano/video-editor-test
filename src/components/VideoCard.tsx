'use client';

import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';

interface Props {
  id: string;
  title: string;
  image: string;
}

const VideoCard = ({ id, title, image }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${id}`)}
      className="group w-full sm:w-64 h-48 rounded-lg overflow-hidden shadow-lg cursor-pointer relative transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay con degradado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
      
      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
            <Play size={24} fill="white" />
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-medium truncate text-lg">{title}</h3>
          <div className="w-10 h-0.5 bg-blue-500 mt-1 mb-1 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300" />
          <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click para editar
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;   