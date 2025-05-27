export interface Clip { // Exporta la interfaz Clip para ser usada en otros archivos
  id: string;      // Identificador único del clip
  name: string;    // Nombre descriptivo del clip
  start: number;   // Tiempo de inicio del clip (en segundos)
  end: number;     // Tiempo de fin del clip (en segundos)
}