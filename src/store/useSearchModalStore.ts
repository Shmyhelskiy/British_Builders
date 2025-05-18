import { create } from 'zustand';

interface SearchModalStore {
  isOpen: boolean;
  searchParams: string;
  setSearchParams: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useSearchModalStore = create<SearchModalStore>((set) => ({
  isOpen: false,
  searchParams: '',
  setSearchParams: (query) => set({ searchParams: query }),
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false }),
}));

