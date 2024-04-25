'use client'

import { useCallback, useEffect, useState } from 'react'

import { AxiosError } from 'axios'

import { Pagination } from '@/components/elements/Pagination'
import ProfileTitle from '@/components/ProfileTitle'
import { Review } from '@/components/Review'
import { Loader } from '@/components/ui/Loader'
import axiosRequest from '@/configs/axios'
import Container from '@/layouts/container'
import { useUserStore } from '@/store/useUserStore'
import { ReviewsTypes } from '@/types/reviews'

interface Props {
  searchParams: Record<string, string>
}

const Page = ({ searchParams }: Props) => {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [reviews, setReviews] = useState<ReviewsTypes.Response>()

  const profile = useUserStore(state => state.user)

  const offset: number = +searchParams.offset || 0
  const limit: number = 9

  const getReview = useCallback(async () => {
    try {
      const { data } = await axiosRequest.get('/store_reviews/', {
        params: {
          shop: profile?.id,
          ordering: '-created_at',
          ...searchParams,
          limit: '10',
        },
      })
      setReviews(data)

    } catch (e) {
      const error = e as AxiosError

      throw new Error(error.message)
    } finally {
      setIsPageLoading(false)
    }
  }, [profile?.id, searchParams])

  useEffect(() => {
    getReview()
  }, [getReview])

  if (isPageLoading) return <Loader />
  return (
    <Container className="space-y-4">
      {profile && (
        <ProfileTitle 
          href="/profile/view"
          user={profile}
          profile
        />
      )}

      {reviews?.results.map(({ id, user, review, stars, created_at }) => (
        <Review
          key={id}
          id={id}
          user={user}
          review={review}
          stars={stars}
          created_at={created_at}
        />
      ))}

      {
        reviews && (
          <div className="pt-[20px] tablet:pt-[40px]">
            <Pagination
              currentPage={Math.floor(offset / limit) + 1}
              totalPages={Math.ceil(reviews.count / limit)}
              limit={limit}
              postsCount={reviews.count}
            />
          </div>
        )
      }
    </Container>
  )
}

export default Page
