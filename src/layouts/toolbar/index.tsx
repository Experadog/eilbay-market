import Link from 'next/link'
import { IoMdAddCircle } from 'react-icons/io'
import { MdHome, MdFavorite } from 'react-icons/md'
import { RiUser3Fill } from 'react-icons/ri'

import { fetcher } from '@/configs/fetcher'
import { CategoriesTypes } from '@/types/categories'

import Container from '../container'

import { BottomSidebar } from './BottomSidebar'

interface PropsLinks {
  id: number
  icon: React.JSX.Element
  path: string
}

const  ToolbarIcons: PropsLinks[] = [
  {
    id: 1,
    icon: <IoMdAddCircle />,
    path: '/catalog/product',
  },
  {
    id: 2,
    icon: <MdFavorite />,
    path: '/catalog/product/favorites',
  },
  {
    id: 3,
    icon: <RiUser3Fill />,
    path: '/profile/view',
  },
]

const getCategories = async () => {
  const response = await fetcher('/categories/')

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export const Toolbar = async () => {
  const categories: CategoriesTypes.Item[] = await getCategories()

  return (
    <div className="block laptop:hidden fixed z-[51] bottom-0 w-[100%] bg-[#003D65]">
      <Container className="flex items-center">
        <div className="w-[100%] flex items-center justify-between">
          <Link
            href="/"
            className="text-white text-[24px] tablet:text-[34px]"
          >
            <MdHome />
          </Link>

          <BottomSidebar categories={categories} />

          {
            ToolbarIcons.map(({ path, id, icon }) => (
              <Link
                href={path}
                key={id}
                className="text-white text-[24px] tablet:text-[34px]"
              >
                {icon}
              </Link>
            ))
          }
        </div>
      </Container>
    </div>
  )
}
