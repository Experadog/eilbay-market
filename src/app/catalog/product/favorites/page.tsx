import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { CategoriesAPI } from '@/api/categories.api'
import { FavoritesAPI } from '@/api/favorites.api'
import { PageTitle } from '@/components/elements/PageTitle'
import { Pagination } from '@/components/elements/Pagination'
import { ProductsFilter } from '@/components/elements/ProductsFilter'
import { Product } from '@/components/ui/Product'
import { emptyFavorites } from '@/images'
import Container from '@/layouts/container'
import { Grid } from '@/layouts/grid'
import { CategoriesTypes } from '@/types/categories'
import { FavoritesTypes } from '@/types/favorites'

export const metadata: Metadata = {
  title: 'Избранное',
}

export default async function Favorites({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  const accessToken = cookies().get('accessToken')?.value
  if(!accessToken) return redirect('/auth/signin')

  const limit = 20
  const offset = +searchParams.offset || 0

  const favorites: FavoritesTypes.Response = await FavoritesAPI.get(searchParams, limit)
  const categories: CategoriesTypes.Item[] = await CategoriesAPI.get()

  const foundProducts = favorites.results.map(({ post }) => {
    const isInfavorites = favorites.results.find(item => item.post.id === post.id)
    return { post, isInfavorites }
  })

  return (
    <Container className="space-y-4 pb-6 tablet:pb-[75px] tablet:pt-[40px]">
      <PageTitle leftButton title={'Избранное'} />
      <ProductsFilter categories={categories} />
      {!favorites.count && <FavoritesEmpty postsCount={favorites.count} />}
      <Grid>
        {foundProducts.reverse().map(({ post, isInfavorites }) => (
          <div className="w-full" key={post.id}>
            <Product {...post} isInfavorites={isInfavorites} />
          </div>
        ))}
      </Grid>
      {favorites.count > limit && (
        <div className="pt-4 tablet:pt-[40px]">
          <Pagination
            currentPage={Math.floor(offset / limit) + 1}
            totalPages={Math.ceil(favorites.count / limit)}
            limit={limit}
            postsCount={favorites.count}
          />
        </div>
      )}
    </Container>
  )
}

const FavoritesEmpty = ({ postsCount }: { postsCount: number }) => {
  if (!!postsCount) return null

  return (
    <div className="flex flex-col items-center">
      <p className="text-[16px] tablet:text-[18px] dark:text-slate-300">
        К сожалению, ничего не смогли найти!
      </p>

      <Image
        src={emptyFavorites}
        alt="empty"
        className="w-[70%] tablet:w-[40%] laptop:w-[35%]"
      />
    </div>
  )
}
