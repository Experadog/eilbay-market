// import { Button } from '@chakra-ui/react'
// import Cookies from 'js-cookie'
// import Image from 'next/image'
// import Link from 'next/link'
// import { AiOutlineEdit } from 'react-icons/ai'

import { UsersAPI } from '@/api/users.api'
import ProfileTitle from '@/components/ProfileTitle'
import { UsersTypes } from '@/types/users'

// import { Loader } from '@/components/ui/Loader'
// import { productEmpty } from '@/images'
// import { PostTypes } from '@/types/post_types'

// import ModalWindow from './components/modal'
// import Slider from './components/slider'

// interface BannerType {
//   banner: string
//   id: number
// }

export default async function Page() {
  const my_profile: UsersTypes.Root = await UsersAPI.getMyProfile()

  // const [isLoading, setIsLoading] = React.useState(true)
  // const [userID, setUserID] = React.useState('')
  // const [postTypes, setPostTypes] = React.useState<PostTypes.Reponse>()
  // const [banner, setBanner] = React.useState<BannerType[]>()

  // const getData = async (owner: string) => {
  //   try {
  //     const res = await (await fetch(`/api/post_types/?owner=${owner}`)).json()
  //     setPostTypes(res)

  //     const { results } = await (await fetch(`/api/profile/banners/?user=${owner}`)).json()
  //     setBanner(results)
  //   } catch(error) {
  //     console.error(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // React.useEffect(() => {
  //   setUserID(Cookies.get('userID') as string)

  //   if (userID) {
  //     getData(userID)
  //   }
  // }, [userID])

  // if (isLoading) return <Loader />
  return (
    <div>
      <ProfileTitle
        user={my_profile}
        href="/profile"
        profile
      />

      <div className="text-center py-20">
        Акции от магазина на стадии разработки
      </div>
      {/* 
      <div className="py-[25px] tablet:py-[50px]">
        <div className="flex justify-between items-center">
          <p className="text-left font-semibold tablet:text-2xl phone:text-sm">
            Акции от магазина:
          </p>

          <div className="flex items-center">
            <ModalWindow owner={userID} />

            <Link
              href={`/profile/promotions/edit/${postTypes?.results[0]?.id || ''}`}
              className="p-0 tablet:text-2xl phone:text-lg"
            >
              <Button className="p-0 tablet:text-2xl phone:text-lg" variant="unstyled">
                <AiOutlineEdit />
              </Button>
            </Link>
          </div>
        </div>

        {
          postTypes?.count
            ? postTypes.results.map((item) => (
              <Slider
                key={item.id}
                {...item}
              />
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
      </div>

      {
        banner && banner.length > 0 &&  (
          <div className="border-[1px] h-[280px] tablet:h-[360px] rounded-2xl mb-[25px] tablet:mb-12">
            <Image 
              width={1000}
              height={1000}
              alt="banner"
              src={banner[0].banner}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        )
      } */}
    </div>
  )
}
