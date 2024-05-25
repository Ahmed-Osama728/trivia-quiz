import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuizStore = create(
  persist(
    (set) => ({
      playerName: '',
      level: '',
      score: 0,
      currentQuestionIndex: 0,
      selectedAnswer: '',
      questions: [],
      token: '',
      categories: [],
      playedCategories: [],
      currentCategoryIndex: 0,
      error: '',
      categoriesTimes: [],

      setPlayerName: (name) => set({ playerName: name }),
      setLevel: (selectedLevel) => set({ level: selectedLevel }),
      setQuestions: (questions) => set({ questions }),
      incrementScore: () => set((state) => ({ score: state.score + 1 })),
      nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
      setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),
      setToken: (token) => set({ token }),
      setCategories: (categories) => set({ categories }),
      addPlayedCategory: (category) => set((state) => ({ playedCategories: [...state.playedCategories, category] })),
      incrementCategoryIndex: () => set((state) => ({ currentCategoryIndex: state.currentCategoryIndex + 1 })),
      setError: (error) => set({ error }),
      addCategoryTime: (time) => set((state) => ({ categoriesTimes: [...state.categoriesTimes, time] })),

      resetGame: () => set({ 
        score: 0, 
        playerName: '',
        currentQuestionIndex: 0, 
        selectedAnswer: '', 
        questions: [], 
        token: '',
        categories: [],
        playedCategories: [],
        currentCategoryIndex: 0,
        error: '',
        level: '',
        categoriesTimes: [],
      }),

      resetCategory: () => set({
        currentQuestionIndex: 0, 
        selectedAnswer: '', 
        questions: [], 
        error: '',
      })
    }),
    {
      name: 'quiz-storage', 
    }
  )
);

export default useQuizStore;