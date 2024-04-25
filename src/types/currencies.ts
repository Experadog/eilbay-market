export namespace CurrenciesTypes {
  export interface Response {
    count: number
    next: string | null
    previous: string | null
    results: Item[]
  }
  
  export interface Item {
    id: number
    flag: string
    name: string
  }

  export interface Root {
    base: string
    results: { [key: string]: number }
    updated: string
    ms: number
  }
}
