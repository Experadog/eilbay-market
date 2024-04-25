import { PostsTypes } from './posts'

export namespace FavoritesTypes {
  export interface Image {
    id: number
    post: string
    image: string
  }

  export interface Item {
    id: number
    user: string
    post: PostsTypes.Item
  }

  export interface Response {
    count: number
    next: string | null
    previous: string | null
    results: Item[]
  }
}
