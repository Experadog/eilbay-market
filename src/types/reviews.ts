import { UsersTypes } from './users'

export namespace ReviewsTypes {
  export interface Response {
    count: number
    next: string | null
    previous: string | null
    results: Item[]
  }
  
  export interface Item {
    id: number
    user: UsersTypes.Item
    review: string
    stars: number
    parent_review: any
    children: Item[]
    created_at: string
    post: string
  }
  
  export interface User {
    id?: string
    username: string
    image: any
    user_type?: string
  }
}
