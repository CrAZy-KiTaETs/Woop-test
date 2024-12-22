import { create } from 'zustand';

interface PreloaderState {
  isLoading: boolean,
  setLoading: (loading: boolean) => void
}

export const usePreloader = create<PreloaderState>((set) => ({
  isLoading: true,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
