export namespace BannerTypes {
  export interface Response {
    count: number
    next: string | null
    previous: string | null
    results: Item[]
  }
  
  export interface Item {
    id: number
    image: string
  }
}
