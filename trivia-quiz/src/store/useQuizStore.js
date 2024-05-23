import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  level: '',
  setLevel: (selectedLevel) => set({ level: selectedLevel })
}));

export default useQuizStore;