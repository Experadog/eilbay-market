import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { CategoriesAPI } from '@/api/categories.api'
import { PostsAPI } from '@/api/posts.api'
import { PromotionsAPI } from '@/api/promotions.api'
import { PageTitle } from '@/components/elements/PageTitle'
import { ProductEdit } from '@/components/forms/ProductEdit'
import Slider from '@/components/Slider'
import Container from '@/layouts/container'
import { CategoriesTypes } from '@/types/categories'
import { PostTypes } from '@/types/post_types'
import { PostsTypes } from '@/types/posts'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post:  PostsTypes.Root = await PostsAPI.getSinglePost(params.id)

  return {
    title: `Изменение ${post.name}`,
  }
}

export default async function Page({ params }: Props) {
  const accessToken = cookies().get('accessToken')?.value
  if(!accessToken) return redirect('/auth/signin')
  const post: PostsTypes.Root = await PostsAPI.getSinglePost(params.id)
  const categories: CategoriesTypes.Item[] = await CategoriesAPI.get()
  const postTypes: PostTypes.Reponse =  await PromotionsAPI.getMy(post.owner.id)

  return (
    <Container className="w-full py-6 tablet:py-12">
      <div className="relative flex items-center justify-center mb-6 tablet:mb-12">
        <PageTitle leftButton title="Изменение товара" />
      </div>

      <div className="flex phone:flex-col laptop:flex-row gap-5">
        <div className="flex flex-col flex-1">
          <div className="flex h-[312px] tablet:h-[400px] w-full space-x-2">
            <Slider
              images={post?.images_post} 
              postID={post?.id}
              removeButton
              addImage
            />
          </div>
        </div>

        <ProductEdit
          post={post}
          categories={categories}
          postTypes={postTypes}
        />
      </div>
    </Container>
  )
}
