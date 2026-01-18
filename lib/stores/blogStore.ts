import { create } from 'zustand';

type FilterType = 'tous' | 'atelier' | 'article';

interface BlogState {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  filter: 'tous',
  setFilter: (filter) => set({ filter }),
}));
