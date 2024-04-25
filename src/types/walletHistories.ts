export namespace WalletHistoriesTypes {
  export interface Response {
    count: number
    next: string | null
    previous: string | null
    results: Item[]
  }
  export interface Item {
    id: string
    wallet: string
    money: string
    created_at: string
  }
}
