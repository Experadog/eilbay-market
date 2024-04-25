import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { CategoriesAPI } from '@/api/categories.api'
import { PromotionsAPI } from '@/api/promotions.api'
import { UsersAPI } from '@/api/users.api'
import { PageTitle } from '@/components/elements/PageTitle'
import { ProductCreate } from '@/components/forms/ProductCreate'
import Container from '@/layouts/container'
import { CategoriesTypes } from '@/types/categories'
import { PostTypes } from '@/types/post_types'
import { UsersTypes } from '@/types/users'

export const metadata: Metadata = {
  title: 'Создание товара',
}

export default async function Page() {
  const accessToken = cookies().get('accessToken')?.value
  if(!accessToken) return redirect('/auth/signin')
  const my_profile: UsersTypes.Root = await UsersAPI.getMyProfile()
  const categories: CategoriesTypes.Item[] = await CategoriesAPI.get()
  const postTypes: PostTypes.Reponse = await PromotionsAPI.getMy(my_profile.id)

  return (
    <Container>
      <div className="relative my-4">
        <PageTitle leftButton title="Создание нового товара" />
      </div>

      <ProductCreate postTypes={postTypes} categories={categories} />
    </Container>
  )
}
