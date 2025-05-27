'use client'; // Indica que este componente se ejecuta del lado del cliente (Next.js App Router)

import { useState } from 'react'; // Importa el hook useState para manejar estado local
import { Plus } from 'lucide-react'; // Importa el icono Plus

// Define la interfaz de las props que recibe el componente
interface Props {
  onAddClip: (clip: { name: string; start: number; end: number }) => void; // Función para añadir un clip
}

// Componente funcional ClipForm
const ClipForm = ({ onAddClip }: Props) => {
  const [name, setName] = useState(''); // Estado para el nombre del clip
  const [start, setStart] = useState(''); // Estado para el tiempo inicial
  const [end, setEnd] = useState(''); // Estado para el tiempo final

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (!name || !start || !end) return; // Si falta algún campo, no hace nada
    onAddClip({ name, start: parseFloat(start), end: parseFloat(end) }); // Llama a la función para añadir el clip
    setName(''); // Limpia el campo nombre
    setStart(''); // Limpia el campo inicio
    setEnd(''); // Limpia el campo fin
  };

  return (
    // Formulario principal
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-4 shadow-lg mb-6 mt-5">
      {/* Título del formulario */}
      <h3 className="text-white font-medium mb-4 text-lg">Añadir nuevo clip</h3>
      {/* Grid para los campos del formulario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* Campo para el nombre del clip */}
        <div>
          <label htmlFor="clip-name" className="block text-gray-400 text-sm mb-1">
            Nombre del clip
          </label>
          <input
            id="clip-name" // ID del input
            placeholder="Ej: Introducción" // Texto de ejemplo
            value={name} // Valor ligado al estado
            onChange={(e) => setName(e.target.value)} // Actualiza el estado al escribir
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required // Campo obligatorio
          />
        </div>
        {/* Campo para el tiempo inicial */}
        <div>
          <label htmlFor="clip-start" className="block text-gray-400 text-sm mb-1">
            Tiempo inicial (seg)
          </label>
          <input
            id="clip-start" // ID del input
            type="number" // Tipo numérico
            step="0.1" // Permite decimales
            min="0" // Valor mínimo 0
            placeholder="0.0" // Texto de ejemplo
            value={start} // Valor ligado al estado
            onChange={(e) => setStart(e.target.value)} // Actualiza el estado al escribir
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required // Campo obligatorio
          />
        </div>
        {/* Campo para el tiempo final */}
        <div>
          <label htmlFor="clip-end" className="block text-gray-400 text-sm mb-1">
            Tiempo final (seg)
          </label>
          <input
            id="clip-end" // ID del input
            type="number" // Tipo numérico
            step="0.1" // Permite decimales
            min="0" // Valor mínimo 0
            placeholder="10.0" // Texto de ejemplo
            value={end} // Valor ligado al estado
            onChange={(e) => setEnd(e.target.value)} // Actualiza el estado al escribir
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required // Campo obligatorio
          />
        </div>
      </div>
      {/* Botón para enviar el formulario */}
      <button
        type="submit" // Tipo submit
        className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200 font-medium"
      >
        <Plus size={18} className="mr-1" /> {/* Icono de añadir */}
        Añadir Clip
      </button>
    </form>
  );
};

export default ClipForm; // Exporta el componente