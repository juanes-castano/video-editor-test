'use client'; // Indica que este componente se ejecuta del lado del cliente (Next.js App Router)

import { Clip } from '@/types/Clip'; // Importa el tipo Clip
import { Play, Trash2 } from 'lucide-react'; // Importa los iconos Play y Trash2

// Define la interfaz de las props que recibe el componente
interface Props {
  clips: Clip[]; // Lista de clips a mostrar
  onSelect: (clip: Clip) => void; // Función para seleccionar un clip
  onDelete: (id: string) => void; // Función para eliminar un clip
  activeClipId?: string; // Opcional: id del clip activo para resaltarlo
}

// Componente funcional ClipList
const ClipList = ({ clips, onSelect, onDelete, activeClipId }: Props) => {
  // Si no hay clips, muestra un mensaje
  if (clips.length === 0) {
    return <div className="text-gray-400 text-center py-6">No hay clips disponibles</div>;
  }

  return (
    // Contenedor principal de la lista de clips
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Título de la sección */}
      <h3 className="text-white font-medium p-4 border-b border-gray-700 text-lg">Mis Clips</h3>
      {/* Lista de clips */}
      <ul className="divide-y divide-gray-700">
        {clips.map((clip) => {
          const isActive = activeClipId === clip.id; // ¿Este clip es el activo?
          const isDefault = clip.name === 'Video Completo'; // ¿Es el clip por defecto (todo el video)?

          return (
            <li
              key={clip.id} // Clave única para React
              className={`hover:bg-gray-700/50 transition duration-150 ${isActive ? 'bg-gray-700' : ''}`} // Resalta si es activo
            >
              <div className="flex items-center justify-between p-3">
                {/* Info del clip */}
                <div className="flex-1">
                  <div className="font-medium text-white">{clip.name}</div> {/* Nombre del clip */}
                  <div className="text-sm text-gray-400">
                    {/* Muestra inicio, fin y duración */}
                    {clip.start.toFixed(1)}s - {clip.end.toFixed(1)}s ({(clip.end - clip.start).toFixed(1)}s)
                  </div>
                </div>
                {/* Botones de acción */}
                <div className="flex space-x-2">
                  {/* Botón para seleccionar/reproducir el clip */}
                  <button
                    onClick={() => onSelect(clip)} // Llama a onSelect con el clip
                    className="p-2 rounded-full hover:bg-blue-600/20 text-blue-500 hover:text-blue-400 transition"
                    title="Reproducir clip"
                  >
                    <Play size={18} /> {/* Icono de reproducir */}
                  </button>

                  {/* Botón para eliminar el clip, solo si no es el clip por defecto */}
                  {!isDefault && (
                    <button
                      onClick={() => onDelete(clip.id)} // Llama a onDelete con el id del clip
                      className="p-2 rounded-full hover:bg-red-600/20 text-red-500 hover:text-red-400 transition"
                      title="Eliminar clip"
                    >
                      <Trash2 size={18} /> {/* Icono de eliminar */}
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClipList; // Exporta el componente