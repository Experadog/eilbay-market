export namespace UsersTypes {
  export interface Root {
    id: string
    username: string
    image: string
    rating: number
    user_type: string
    description: string | null
    phone_number: string | null
    email: string
    password: string
    country: string | null
    reviews_count: number
    user_status: UserStatus
    user_banner: UserBanner
    social_owner: SocialOwner[]
    is_recommended: boolean
    posts_count: number
    user_stars: number
    balance: number
  }

  export interface Item {
    id: string
    username: string
    image: string
    rating: number
    user_type: string
    social_owner: SocialOwner[]
    user_stars: string
    country: string
    description: string
    phone_number: string
    review_count: string
    email: string
    is_recommended: boolean
  }

  export interface SocialType {
    id: number
    logo: string
    title: string
  }

  export interface SocialOwner {
    id: number
    social_type: SocialType
    link: string
    owner: string
  }

  export interface UserStatus {
    id: number
    user: string
    is_agree: boolean
    is_active: boolean
    is_premium: boolean
    password_last_update: string
    created_at: string
  }

  export interface UserBanner {
    id: number
    banner: string
  }

  export interface Form {
    username: string
    email: string
    password: string
    confirm_password: string
    old_password: string
    is_agree: boolean
  }
}
