'use client'; // Indica que este componente se ejecuta del lado del cliente (Next.js App Router)

import { videos } from '@/data/videos'; // Importa la lista de videos
import VideoCard from '@/components/VideoCard'; // Componente para mostrar cada video
import { useState } from 'react'; // Hook para manejar el estado local
import { Search } from 'lucide-react'; // Icono de búsqueda

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // Filtra los videos según el término de búsqueda (ignorando mayúsculas/minúsculas)
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Título principal */}
      <h1 className="text-2xl font-bold mb-4">YouClips</h1>

      {/* Buscador con icono */}
      <div className="relative mb-6 max-w-md">
        {/* Icono de búsqueda dentro del input */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-blue-500" />
        </div>
        {/* Input para buscar videos */}
        <input
          type="text"
          placeholder="Buscar videos..."
          value={searchTerm} // Valor del input ligado al estado
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado al escribir
          className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 font-medium border-2 border-gray-300 
          rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-blue-500 transition-colors placeholder-gray-400"
        />
      </div>

      {/* Mensaje si no hay videos que coincidan */}
      {filteredVideos.length === 0 && (
        <p className="text-gray-500 text-center py-8">No se encontraron videos con ese nombre</p>
      )}

      {/* Lista de videos filtrados */}
      <div className="flex flex-wrap gap-4">
        {filteredVideos.map((video) => (
          // Renderiza una tarjeta por cada video
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            image={video.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}