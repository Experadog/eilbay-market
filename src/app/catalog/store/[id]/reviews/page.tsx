import { Metadata } from 'next'
import { cookies } from 'next/headers'

import { ReviewsAPI } from '@/api/reviews.api'
import { UsersAPI } from '@/api/users.api'
import { Pagination } from '@/components/elements/Pagination'
import { StoreReview } from '@/components/forms/StoreReview'
import { Review } from '@/components/Review'
import EmptyReviews from '@/components/ui/EmptyResult/EmptyReviews'
import { ReviewsTypes } from '@/types/reviews'
import { UsersTypes } from '@/types/users'

interface Props {
  params: { id: string }
  searchParams: Record<string, string>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user: UsersTypes.Root = await UsersAPI.getSingle(params.id)

  return {
    title: `Отзывы ${user.username}`,
  }
}

export default async function Page({ params, searchParams }: Props) {
  const user: UsersTypes.Root = await UsersAPI.getSingle(params.id)
  const reviews: ReviewsTypes.Response = await ReviewsAPI.getStoreReviews(params.id, searchParams)
  const accessToken = cookies().get('accessToken')?.value

  const offset: number = +searchParams.offset || 0
  const limit: number = 9

  return (
    <div className="space-y-4">
      <div className="py-[25px] tablet:py-[50px]">
        {
          accessToken && <StoreReview shop={user.id} />
        }
      
        <div className="gap-y-[23px] justify-between flex-wrap pb-[20px] tablet:pb-[40px]">
          <div>
            <p 
              className="text-lg tablet:text-xl font-semibold pb-[10px]"
            >
              Все отзывы ({reviews.count})
            </p>

            <EmptyReviews accessToken={accessToken} reviewsCount={reviews.count} />

            <div className="flex flex-col-reverse">
              {
                reviews.results.reverse().map(({ id, created_at, review, user, stars }) => (
                  <Review
                    id={id}
                    key={id}
                    created_at={created_at}
                    review={review}
                    user={user}
                    stars={stars}
                  />
                ))
              }
            </div>
          </div>
        </div>

        <Pagination
          currentPage={Math.floor(offset / limit) + 1}
          totalPages={Math.ceil(reviews.count / limit)}
          limit={limit}
          postsCount={reviews.count}
        />
      </div>
    </div>
  )
}
