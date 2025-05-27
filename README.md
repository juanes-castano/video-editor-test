# YouClips 🎬

A video clip editing and management project built with **Next.js**, **React**, **TypeScript**, **TailwindCSS**, and **Zustand** for global and persistent state management.

---

## 🚀 Main Features

- Browse a video gallery.
- Search videos by name.
- Edit each video: create, delete, and select custom clips.
- Custom video player for each clip.
- Automatic clip persistence using Zustand (localStorage).
- Modern and responsive UI.

---

## 📁 Project Structure

```
prueba_tecnica/
│
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main page: video gallery and search
│   │   └── [id]/page.tsx      # Clip editing page for each video
│   │
│   ├── components/
│   │   ├── VideoCard.tsx          # Individual video card
│   │   ├── CustomVideoPlayer.tsx  # Custom video player
│   │   ├── ClipList.tsx           # List of video clips
│   │   └── ClipForm.tsx           # Form to create new clips
│   │
│   ├── data/
│   │   └── videos.ts          # Static video data
│   │
│   ├── store/
│   │   └── clipsStore.ts      # Zustand global store for clips
│   │
│   └── types/
│       ├── Video.ts           # Video type definition
│       └── Clip.ts            # Clip type definition
│
├── public/                    # Static files (images, videos)
│
├── styles/                    # Global styles and Tailwind
│
├── README.md                  # This file
└── ...
```

---

## 🖼️ Example Code

### Custom Video Player

```tsx
// src/components/CustomVideoPlayer.tsx
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = clip.start;
    setIsPlaying(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
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

  // ...rest of the component...
};
```

---

## 📷 App Screenshots

> You can add real screenshots of your app here to showcase the gallery, clip editor, and player.

---

## 🛠️ Installation & Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## 📄 License

MIT

---

Enjoy editing your clips with **YouClips**! 🎬