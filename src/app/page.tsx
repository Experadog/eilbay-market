'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import Banner from '@/components/elements/MainBanner'
import { Pagination } from '@/components/elements/Pagination'
import { ProductsFilter } from '@/components/elements/ProductsFilter'
import { EmptyResult } from '@/components/ui/EmptyResult'
import { Product } from '@/components/ui/Product'
import CardSkeleton from '@/components/ui/Skeleton'
import axiosRequest from '@/configs/axios'
import Container from '@/layouts/container'
import { Grid } from '@/layouts/grid'
import { useCategoriesStore } from '@/store/useCategoriesStore'
import { BannerTypes } from '@/types/banners'
import { PostsTypes } from '@/types/posts'

import Loading from './loading'

const limit = 20

const Page = () => {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isProductsFetching, setIsProductFetching] = useState(true)

  const [banners, setBanners] = useState<BannerTypes.Item[]>([])
  const [posts, setPosts] = useState<PostsTypes.Response>()

  const searchParams = useSearchParams()
  const categories = useCategoriesStore(state => state.categories)

  const offset = searchParams.get('offset') || 0

  const fetchData = async () => {
    try {
      const { data: banners } = await axiosRequest.get<BannerTypes.Response>('/settings/banners/')
      setBanners(banners.results)
    } catch (error) {
      console.error(error)
    } finally {
      setIsPageLoading(false)
    }
  }

  const getPosts = useCallback(async () => {
    const urlParams = new URLSearchParams(searchParams.toString())
    const params = Object.fromEntries(urlParams)
  
    try {
      const { data: posts } = await axiosRequest.get<PostsTypes.Response>('/posts/', {
        params: {
          limit,
          ...params,
        },
      })

      setPosts(posts)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => setIsProductFetching(false), 300)
    }
  }, [searchParams])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  if (isPageLoading) return <Loading />
  return (
    <Container className="space-y-5">
      <Banner banners={banners} />

      <ProductsFilter withInputs categories={categories} />

      {!isProductsFetching && posts && (
        <EmptyResult count={posts.count} />
      )}

      {isProductsFetching && (
        <Grid>
          {Array.from({ length: limit }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </Grid>
      )}

      <Grid>
        {!isProductsFetching && posts?.results.map((post) => {
          return (
            <div
              className="w-full"
              key={post.id}
            >
              <Product {...post} />
            </div>
          )
        })}
      </Grid>

      {posts && posts.count > limit && (
        <Pagination
          currentPage={Math.floor(+offset / limit) + 1}
          totalPages={Math.ceil(posts?.count / limit)}
          limit={limit}
          postsCount={posts?.count}
        />
      )}
    </Container>
  )
}

export default Page
