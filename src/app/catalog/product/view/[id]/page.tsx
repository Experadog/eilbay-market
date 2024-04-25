import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { CategoriesAPI } from '@/api/categories.api'
import { PostReviewsAPI } from '@/api/postReviews.api'
import { PostsAPI } from '@/api/posts.api'
import { UsersAPI } from '@/api/users.api'
import { Pagination } from '@/components/elements/Pagination'
import ReviewsFilter from '@/components/elements/ReviewsFilter'
import SimilarPostsSlider from '@/components/elements/SimilarProductsSlider'
import { ProductReview } from '@/components/forms/ProductReview'
import { Review } from '@/components/Review'
import Slider from '@/components/Slider'
import { ProductOwnerCard } from '@/components/ui/ProductOwnerCard'
import { ProductTitle } from '@/components/ui/ProductTitle'
import Container from '@/layouts/container'
import { CategoriesTypes } from '@/types/categories'
import { PostsTypes } from '@/types/posts'
import { ReviewsTypes } from '@/types/reviews'
import { UsersTypes } from '@/types/users'

interface Props {
  params: { id: string }
  searchParams: Record<string, string>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: PostsTypes.Root = await PostsAPI.getSinglePost(params.id)

  return {
    title: post.name,
    description: post.description,
  }
}

export default async function Page({ params, searchParams }: Props) {
  const post: PostsTypes.Root = await PostsAPI.getSinglePost(params.id)
  const category: CategoriesTypes.Item = await CategoriesAPI.getSingleCategory(post.category)
  const similarPosts: PostsTypes.Response = await PostsAPI.getSimilarPosts(post.category)
  const post_reviews: ReviewsTypes.Response = await PostReviewsAPI.getPostReviews(post.id, searchParams)
  const my_profile: UsersTypes.Item = await UsersAPI.getMyProfile()
  const accessToken = cookies().get('accessToken')?.value

  const offset: number = +searchParams.offset || 0
  const limit: number = 9

  return (
    <Container>
      <div className="py-2">
        <ProductTitle
          post_id={post.id}
          canEdit={post.owner.id === my_profile?.id}
          name={post.name}
          owner={post.owner}
          product_number={post.product_number}
          rating={post.rating}
        />
      </div>

      <div className="flex gap-5 justify-between flex-col tablet:flex-row">
        <div className="flex w-full tablet:w-3/5 h-[40vh] tablet:h-[60vh] gap-3">
          <Slider images={post.images_post} />
        </div>

        <div className="flex tablet:w-2/5 phone:w-full flex-col gap-y-3">
          <ProductOwnerCard 
            owner={post.owner}
            price={post.price}
          />

          <div className="gap-[10px]">
            <div className="border-[#E8ECF4] border-solid border-b-[1px] pb-5">
              <p className="text-base font-semibold">
                О карточке
              </p>

              <p className="my-3 text-sm font-normal">
                Название: {post.name}
              </p>

              <p className="text-sm font-normal">
                Описание: {post.description}
              </p>
            </div>

            {
              post.category && (
                <div className="py-[14px] border-[#E8ECF4] border-solid border-b-[1px]">
                  <p className="text-base font-semibold">Дополнительная информация</p>

                  <Link href={`/catalog?search=&category=${category.id}`}>
                    <p className="my-3 font-normal text-sm">Категория : <span className="underline text-[#0D99F4]">{category.name}</span></p>
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {
        similarPosts.count && (
          <div className="my-5">
            <div className="flex items-center gap-3 mb-4">
              <p className="font-semibold text-lg tablet:text-2xl">
                Похожие товары
              </p>
              <Link
                href={`/catalog?search=&category=${post.category}`}
                className="text-[#3190FF] text-sm tablet:text-lg font-medium"
              >
                смотреть все
              </Link>
            </div>

            <SimilarPostsSlider similarPosts={similarPosts} />
          </div>
        )
      } 

      <div className="flex flex-col space-y-3 mt-8">
        <ProductReview post_id={post.id} />

        <div>
          <p className="text-lg tablet:text-2xl font-semibold mt-[15px] tablet:mt-[30px] mb-[8px]">
            Отзывы
          </p>

          <ReviewsFilter />
        </div>

        {
          !accessToken && (
            <div className="flex flex-col items-center py-10 text-center">
              <p className="font-bold">
                Авторизуйтесь чтобы оставить отзыв
              </p>
              <p>
                Поделитесь мнением о покупке и помогите другим покупателям сделать выбор
              </p>
            </div>
          )
        }

        {
          (!post_reviews.count && accessToken) && (
            <div className="flex flex-col items-center py-10 text-center">
              <p className="font-bold">
                Отзывов пока нет — ваш может стать первым
              </p>
              <p>
                Поделитесь мнением о покупке и помогите другим покупателям сделать выбор
              </p>
            </div>
          )
        }

        <div className="flex flex-col">
          {!!post_reviews.count && post_reviews.results.map((item) => (
            <Review
              key={item.id}
              {...item}
            />
          ))}
        </div>

        <Pagination
          currentPage={Math.floor(offset / limit) + 1}
          totalPages={Math.ceil(post_reviews.count / limit)}
          limit={limit}
          postsCount={post_reviews.count}
        />
      </div>
    </Container>
  )
}
