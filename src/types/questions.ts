export namespace QuestionsTypes {
  export interface Item {
    id: number
    question: string
    name: string
    email: string
    phone_number: string
  }

  export interface Response {
    count: number
    previous: string | null
    next: string | null
    results: Item[]
  }
}
