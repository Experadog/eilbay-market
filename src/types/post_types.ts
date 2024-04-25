import { PostsTypes } from './posts'

export namespace PostTypes {
  export interface Reponse {
    count: number
    next: string | null
    previous: string | null
    results: Item[]
  }
  
  export interface Item {
    id: number
    title: string
    owner: string
    post_type_posts: PostsTypes.Item[]
  }
}
