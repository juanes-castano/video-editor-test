'use client'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Clip } from '@/types/Clip';

interface ClipsState {
    clips: Clip[];
    setClips: (clips: Clip[]) => void;
    addClip: (clip: Clip) => void;
    deleteClip: (clipId: string) => void;
}

export const useClipsStore = create<ClipsState>()(
    persist(
        (set, get) => ({
            clips: [],
            setClips: (clips) => set({ clips }),
            addClip: (clip) => set({ clips: [...get().clips, clip] }),
            deleteClip: (clipId) =>
                set({ clips: get().clips.filter((c) => c.id !== clipId) }),
        }),
        {
            name: 'clips-storage', // Clave en localStorage
        }
    )
);