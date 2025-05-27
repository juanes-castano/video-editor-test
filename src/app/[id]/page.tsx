'use client';

import { useParams } from 'next/navigation';
import { videos } from '@/data/videos';
import { useState, useEffect } from 'react';
import { Clip } from '@/types/Clip';
import CustomVideoPlayer from '@/components/CustomVideoPlayer';
import ClipList from '@/components/ClipList';
import ClipForm from '@/components/ClipForm';
import { v4 as uuidv4 } from 'uuid';
import { useClipsStore } from '@/store/clipsStore';

export default function VideoEditorPage() {
  const { id } = useParams();
  const videoId = Array.isArray(id) ? id[0] : id as string;
  const video = videos.find((v) => v.id === videoId);

  const { clips, setClips, addClip, deleteClip } = useClipsStore();
  const [duration, setDuration] = useState(0);
  const [currentClip, setCurrentClip] = useState<Clip | null>(null);

  // Inicializa el clip completo si no hay clips
  useEffect(() => {
    if (duration > 0 && clips.length === 0) {
      const full: Clip = {
        id: 'full',
        name: 'Video Completo',
        start: 0,
        end: duration,
      };
      setClips([full]);
    }
  }, [duration, clips.length, setClips]);

  // Establece el clip actual al cargar clips
useEffect(() => {
  if (clips.length > 0 && !currentClip) {
    const fullClip = clips.find(clip => clip.id === 'full');
    setCurrentClip(fullClip ?? clips[0]);
  }
}, [clips, currentClip]);

  const handleAddClip = (clipData: { name: string; start: number; end: number }) => {
    const newClip: Clip = { ...clipData, id: uuidv4() };
    addClip(newClip);
    setCurrentClip(newClip);
  };

  const handleDeleteClip = (clipId: string) => {
    deleteClip(clipId);
    if (currentClip?.id === clipId) {
      const full = clips.find((c) => c.id === 'full');
      setCurrentClip(full ?? null);
    }
  };

  if (!video) return <p className="p-6 text-red-500">Video no encontrado</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{video.title} – Editor de Clips</h2>
      {/* Video oculto solo para obtener la duración */}
      <video
        src={video.src}
        className="hidden"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      {currentClip && (
        <>
          <CustomVideoPlayer
            clip={currentClip} // <--- Aquí le pasas el clip seleccionado
            src={video.src}
            onLoadedMetadata={(d) => setDuration(d)}
          />
          <ClipList
            clips={clips}
            onSelect={setCurrentClip}
            onDelete={handleDeleteClip}
            activeClipId={currentClip.id}
          />
          <ClipForm onAddClip={handleAddClip} />
        </>
      )}
    </div>
  );
}