// import { Flex, Text } from '@chakra-ui/react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'

// import ProfileTitle from '@/components/ProfileTitle'
// import { Loader } from '@/components/ui/Loader'
// import { productEmpty } from '@/images'
// import { PostTypes } from '@/types/post_types'

// import 'swiper/css'
// import 'swiper/css/bundle'
// import 'swiper/css/pagination'


export default async function Page() {
  // const [isLoading, setIsLoading] = React.useState(true)
  // const [postTypes, setPostTypes] = React.useState<PostTypes.Reponse>()

  // const breakPoints = {
  //   320: {
  //     slidesPerView: 2,
  //   },
  //   1024: {
  //     slidesPerView: 4,
  //   },
  //   1440: {
  //     slidesPerView: 5,
  //   },
  // }

  // const getPostTypes = async (owner: string) => {
  //   try {
  //     const res = await (await fetch(`/api/post_types/?owner=${owner}`)).json()

  //     setPostTypes(res)
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // React.useEffect(() => {
  //   getPostTypes(params.id)
  // }, [params.id])

  // if (isLoading) return <Loader />
  return (
    <div>
      <div className="text-center py-20">
        Акции от магазина на стадии разработки
      </div>
      {/* <div className="py-[25px] tablet:py-[50px]">
        <Flex className="justify-between items-center">
          <Text className="text-left font-semibold tablet:text-[24px] phone:text-[16px]">
            Акции от магазина:
          </Text>
        </Flex>

        {
          postTypes?.count
            ? postTypes.results.map(({ id, owner, post_type_posts, title }) => (
              <Flex className="flex-col py-2" key={id}>
                <Flex className="items-center justify-between">
                  <Flex className="items-center space-x-3">
                    <Text className="text-left font-semibold text-[20px]">
                      {title}
                    </Text>

                    {!!post_type_posts.length && (
                      <Link href={`/catalog/store/${owner}/promotions/${id}`}>
                        <Text className="text-[#3190FF] font-medium">
                          смотреть все
                        </Text>
                      </Link>
                    )}
                  </Flex>
                </Flex>

                <Swiper
                  breakpoints={breakPoints}
                  spaceBetween={10}
                  autoplay={{ delay: 2000 }}
                  speed={500}
                  modules={[Navigation, Pagination, A11y, Autoplay]}
                  className="mySwiper w-full"
                >
                  {post_type_posts.map((post) => (
                    <SwiperSlide key={post.id}>
                      <Link href={`/catalog/product/view/${post.id}`}>
                        <Image
                          src={post.images_post[0]?.image || '/img/no-product-2.png'}
                          alt={post.name}
                          width={310}
                          height={310}
                          className="object-cover !w-[310px] !h-[310px] rounded-lg"
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Flex>
            ))
            : (
              <div className="flex flex-col items-center justify-center">
                <Image
                  alt="Empty Product"
                  src={productEmpty}
                  className="w-[60%] tablet:w-[50%] laptop:w-[30%]"
                />
              </div>
            )
        }
      </div> */}
    </div>
  )
}
