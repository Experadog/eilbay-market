export namespace CategoriesTypes {
  export interface Item {
    id: string
    name: string
    icon: string
    slug: string
    children: CategoriesTypes.Item[]
  }
}
