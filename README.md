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

Below you will see the web application interface.
![image](https://github.com/user-attachments/assets/20ead4b9-4838-4d0a-8932-0278d368cca4)

If you select the first video (or any of the three), you'll be taken to another page where you can watch the playback of that video. As you can see below:

![image](https://github.com/user-attachments/assets/c329dfad-5eff-4da8-89ea-bb70aad96b7a)

Also, below the video you can see a menu that allows you to add a new clip from the original video, where you will indicate the second where it will start and the second where it will end.

![image](https://github.com/user-attachments/assets/1d3d8845-f3c6-4e0c-ac2e-91d0995c7974)

To give an example, the exercise was performed using the clip name as "clip 1" and selecting it to start at second 10 and end at second 15, and you can see how a new clip with those characteristics is created below the original.

![image](https://github.com/user-attachments/assets/4225f8d7-3850-4e20-a125-76c2a3b9adf4)



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

N/A

---

Enjoy editing your clips with **YouClips**! 🎬
