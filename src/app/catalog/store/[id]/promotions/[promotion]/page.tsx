'use client'

import React from 'react'

import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

// import ProfileTitle from '@/components/ProfileTitle'
import { ProductsNotFound } from '@/components/elements/productsNotFound'
import Container from '@/layouts/container'
import { PostTypes } from '@/types/post_types'

interface Props {
  params: {
    promotion: string
    id: string
  }
}

export default function Page({ params }: Props) {
  const [postTypes, setPostTypes] = React.useState<PostTypes.Item | null>(null)

  const getPostTypes = async(id: string) => {
    const postTypes = await (await fetch(`/api/post_types/${id}`)).json()

    setPostTypes(postTypes)
  }

  React.useEffect(() => {
    getPostTypes(params.promotion)
  }, [params.promotion])

  return (
    <Container>
      {/* <ProfileTitle
        userId={params.id}
        href={`catalog/store/${params.id}`}
      /> */}

      <Flex className="flex-wrap items-center">
        <Text className="text-left font-semibold text-[24px] mr-4">
          Акции: {postTypes?.title}
        </Text>
      </Flex>

      {!postTypes?.post_type_posts.length && (
        <ProductsNotFound>
          <Flex className="flex-col items-center">
            <Text className="phone:text-[20px] tablet:text-[25px] font-bold py-3 text-center">К сожалению ничего не найдено</Text>
          </Flex>
        </ProductsNotFound>
      )}

      <Grid className="grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-3 laptop:gap-8 desktop:grid-cols-3 gap-1 tablet:gap-4 py-5">
        {postTypes?.post_type_posts.map(({ id, images_post }) => (
          <GridItem
            key={id}
            className="shadow-[0_0_19px_-0_rgba(61,66,74,0.20)] rounded-sm tablet:rounded-lg overflow-hidden relative"
          >
            <Link href={`/catalog/product/view/${id}`}>
              <Image
                src={images_post[0].image}
                alt=""
                width={1000}
                height={1000}
                className="w-full object-cover h-[200px] tablet:h-[320px] desktop:h-[380px]"
              />
            </Link>
          </GridItem>
        ))}
      </Grid>

    </Container>
  )
}
