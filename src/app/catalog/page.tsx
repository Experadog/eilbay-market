import { Metadata } from 'next'

import { CategoriesAPI } from '@/api/categories.api'
import { PostsAPI } from '@/api/posts.api'
import { Pagination } from '@/components/elements/Pagination'
import { ProductsFilter } from '@/components/elements/ProductsFilter'
import SearchInput from '@/components/SearchInput'
import { EmptyResult } from '@/components/ui/EmptyResult'
import { Product } from '@/components/ui/Product'
import Container from '@/layouts/container'
import { Grid } from '@/layouts/grid'
import { CategoriesTypes } from '@/types/categories'
import { PostsTypes } from '@/types/posts'

export const metadata: Metadata = {
  title: 'Каталог',
}
const limit = 5

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>
}) => {
  const offset = +searchParams.offset || 0

  const posts: PostsTypes.Response = await PostsAPI.get(searchParams, limit)
  const categories: CategoriesTypes.Item[] = await CategoriesAPI.get()

  return (
    <Container className="space-y-4">
      <p className="text-xl font-semibold">
        Результаты поиска: <span className="underline">{searchParams.search}</span>
      </p>

      <SearchInput categories={categories} />

      <ProductsFilter categories={categories} />

      <Grid>
        {posts.results.map((post) => (
          <div
            className="w-full"
            key={post.id}
          >
            <Product {...post} />
          </div>
        ))}
      </Grid>

      <EmptyResult count={posts.count} />

      <Pagination
        currentPage={Math.floor(offset / limit) + 1}
        totalPages={Math.ceil(posts.count / limit)}
        limit={limit}
        postsCount={posts.count}
      />
    </Container>
  )
}

export default Page
