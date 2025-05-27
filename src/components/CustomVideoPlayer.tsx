'use client';

import { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Clip } from '@/types/Clip';

interface Props {
  clip: Clip;
  src: string;
  onLoadedMetadata?: (duration: number) => void;
}

const CustomVideoPlayer = ({ clip, src, onLoadedMetadata }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const duration = clip.end - clip.start;

  // Cuando carga metadata, notificamos al padre
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    onLoadedMetadata?.(e.currentTarget.duration);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Posiciona el video al inicio del clip
    video.currentTime = clip.start;

    // Fuerza el estado a "reproduciendo"
    setIsPlaying(true);

    // Intenta reproducir el video (puede fallar si no hay interacción del usuario)
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => { });
    }

    const onTimeUpdate = () => {
      if (!video) return;
      const current = video.currentTime;
      if (current >= clip.end) {
        video.pause();
        setIsPlaying(false);
      }
      setCurrentTime(current - clip.start);
      setProgress(((current - clip.start) / duration) * 100);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [clip, duration]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const seekTo = clip.start + (parseFloat(e.target.value) / 100) * duration;
      video.currentTime = seekTo;
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="max-w-xl mx-auto my-6 rounded-lg shadow-lg overflow-hidden bg-gray-900">
      <div className="relative group">
        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          className="w-full aspect-video rounded-t-lg"
          onLoadedMetadata={handleLoadedMetadata}
        />

        {/* Overlay para controles con aparición al hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Botón central de play/pause */}
          <button
            onClick={togglePlayPause}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>
        </div>

        {/* Barra de controles */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
          {/* Barra de progreso mejorada */}
          <div className="flex items-center w-full mb-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 rounded-full appearance-none bg-gray-600 outline-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`,
              }}
            />
          </div>

          {/* Controles y tiempo */}
          <div className="flex items-center justify-between text-white">
            <div className="flex space-x-3 items-center">
              <button
                onClick={togglePlayPause}
                className="p-1.5 rounded-full hover:bg-white/20 transition"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 rounded-full hover:bg-white/20 transition"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div className="text-xs font-medium sm:text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;