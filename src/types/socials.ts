export namespace SocialsTypes {
  export interface Response {
    count: number
    next: any
    previous: any
    results: Item[]
  }
  
  export interface Item {
    id: number
    logo: string
    title: string
  }
}
