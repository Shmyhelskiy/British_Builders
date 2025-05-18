import { create } from 'zustand';
import type { ModalType, MyFormData } from '../types/modalTypes';


interface ModalStore {
  isOpen: boolean;
  type: ModalType | null;
  id: number | null;
  initialData: MyFormData | null;
  open: (type: ModalType, data?: MyFormData | null, id?: number | null) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  id: null,
  initialData: null,
  open: (type, data = null, id = null) =>
    set({ isOpen: true, type, initialData: data, id }),
  close: () =>
    set({ isOpen: false, type: null, id: null, initialData: null }),
}));
