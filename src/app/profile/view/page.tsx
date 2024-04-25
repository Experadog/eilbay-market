'use client'

import { useCallback, useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ProfileTitle from '@/components/ProfileTitle'
import { Loader } from '@/components/ui/Loader'
import axiosRequest from '@/configs/axios'
import Container from '@/layouts/container'
import { useUserStore } from '@/store/useUserStore'
import { PostsTypes } from '@/types/posts'
import { UsersTypes } from '@/types/users'

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const setUserToStore = useUserStore(state => state.setUser)
  const profile = useUserStore(state => state.user)
  
  const [posts, setPosts] = useState<PostsTypes.Response | null>(null)

  const router = useRouter()
  
  const getProfile = useCallback(async () => {
    try {
      const { data: user } = await axiosRequest.get<UsersTypes.Root>('/accounts/users/get_userinfo')
      setUserToStore(user)
      
      const { data: posts } = await axiosRequest.get<PostsTypes.Response>('/posts/', {
        params: {
          owner: user.id,
        },
      })
      setPosts(posts)

    } catch (e) {
      const error = e as AxiosError

      throw new Error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [setUserToStore])

  useEffect(() => {
    getProfile()
  }, [getProfile, router])

  if (isLoading) return <Loader />
  return (
    <Container>
      {profile && (
        <ProfileTitle 
          href="/profile/view"
          user={profile}
          profile
        />
      )}

      {posts && posts.results.length > 0 ? (
        <div className="grid grid-cols-3 phone:gap-1 my-3 tablet:my-5 desktop:my-8">
          {posts.results.map(({ id, images_post, name }) => (
            <div className="w-full" key={id}>
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
      ) : (
        <div className="flex justify-center">
          <Image src="/img/empty-list-goods.png" alt="Empty List Goods" width={350} height={350} />
        </div>
      )}
    </Container>
  )
}

export default Page
