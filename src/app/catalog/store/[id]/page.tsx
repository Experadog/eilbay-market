import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PostsAPI } from '@/api/posts.api'
import { UsersAPI } from '@/api/users.api'
import { PostsTypes } from '@/types/posts'
import { UsersTypes } from '@/types/users'

interface Props { 
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user: UsersTypes.Root = await UsersAPI.getSingle(params.id)

  return {
    title: user.username,
  }
}

export default async function Page({ params }:  Props) {
  const user: UsersTypes.Root = await UsersAPI.getSingle(params.id)
  const posts: PostsTypes.Response = await PostsAPI.getStorePosts(params.id)

  if (!user.id) return (
    <h1 className="italic text-xl">Упс. Что-то пошло не так!</h1>
  )

  return (
    <div className="space-y-4">
      {!!posts.results.length && (
        <div className="grid grid-cols-3 phone:gap-1 my-3 tablet:my-5 desktop:my-8">
          {posts.results.map(({ id, images_post, name }) => (
            <div
              className="w-full"
              key={id}
            >
              <Link href={`/catalog/product/view/${id}`}>
                <Image
                  src={images_post[0]?.image || '/img/no-product-2.png'}
                  alt={name}
                  width={450}
                  height={300}
                  className="'w-full object-cover h-[130px] tablet:h-[200px] laptop:h-[300px] desktop:h-[350px] shadow-[2px_2px_14px_-4px_rgba(0,0,0,0.3)] border border-slate-300 cursor-pointer"
                />
              </Link>
            </div>
          ))}
        </div>
      )}

      {!posts.results.length && (
        <div className="flex justify-center">
          <Image
            src="/img/empty-list-goods.png"
            alt="Empty List Goods"
            width={350}
            height={350}
          />
        </div>
      )}
    </div>
  )
}
