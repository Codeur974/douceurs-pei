import { create } from 'zustand';

interface ReservationData {
  prestation: string;
  date: string;
  nom: string;
  email: string;
  telephone: string;
  details: string;
}

interface ReservationState {
  data: ReservationData;
  step: number;
  setField: <K extends keyof ReservationData>(field: K, value: ReservationData[K]) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const initialData: ReservationData = {
  prestation: '',
  date: '',
  nom: '',
  email: '',
  telephone: '',
  details: '',
};

export const useReservationStore = create<ReservationState>((set) => ({
  data: initialData,
  step: 1,
  setField: (field, value) =>
    set((state) => ({
      data: { ...state.data, [field]: value },
    })),
  setStep: (step) => set({ step }),
  reset: () => set({ data: initialData, step: 1 }),
}));
