import { create } from 'zustand'

import { UsersTypes } from '@/types/users'


// type State = {
//   categories: CategoriesTypes.Item[]
// }

// type Actions = {
//   setCategories: (categories: CategoriesTypes.Item[]) => void
// }

// export const useCategoriesStore = create<State & Actions>((set) => ({
//   categories: [],

//   setCategories: (categories: CategoriesTypes.Item[]) => set(() => ({ categories })),
// }))

type Store = {
  isAuth: boolean
  user: UsersTypes.Root | null
}

type Actions = {
  setUser: (user: UsersTypes.Root | null) => void
  signIn: () => void
  signOut: () => void
}

export const useUserStore = create<Store & Actions>((set) => ({
  isAuth: false,
  user: null,

  setUser: (user: UsersTypes.Root | null) => set(() => ({ user })),
  signIn: () => set(() => ({ isAuth: true })),
  signOut: () => set(() => ({ isAuth: false })),
}))
