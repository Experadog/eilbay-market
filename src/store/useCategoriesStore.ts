import { create } from 'zustand'

import { CategoriesTypes } from '@/types/categories'

type State = {
  categories: CategoriesTypes.Item[]
}

type Actions = {
  setCategories: (categories: CategoriesTypes.Item[]) => void
}

export const useCategoriesStore = create<State & Actions>((set) => ({
  categories: [],

  setCategories: (categories: CategoriesTypes.Item[]) => set(() => ({ categories })),
}))
