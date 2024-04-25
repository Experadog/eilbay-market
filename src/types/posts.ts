import { UsersTypes } from './users'

export namespace PostsTypes {
  export interface Image {
    id: number
    post: string
    image: string
  }

  export interface Item {
    id: string
    product_number: number
    post_type: number
    main_post_type: any
    provider_or_manufacturer: any
    category: string
    name: string
    description: string
    price: string
    images_post: Image[]
    review_count: number
    created_at: string
    owner: UsersTypes.Root
    rating: number
    slug: string
  }

  export interface Response {
    count: number
    next: string | null
    prev: string | null
    results: PostsTypes.Item[]
  }

  export interface Root {
    id: string
    product_number: number
    post_type: number
    main_post_type: any
    category: string
    provider_or_manufacturer: any
    name: string
    description: string
    price: string
    rating: number
    images_post: Image[]
    created_at: string
    owner: UsersTypes.Item
    slug: string
  }
}
