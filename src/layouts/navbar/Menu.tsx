import React from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { CurrenciesSelect } from '@/components/elements/CurrenciesSelect'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { 
  about_us,
  butterfly,
  chat,
  currency,
  for_buyers,
  for_partners,
  for_suppliers,
  fulfillment,
  pro_account,
  theme,
} from '@/images'
import { useCurrenciesStore } from '@/store/useCurrenciesStore'

interface Props {
  id: number
  title: string
  icon: string
  path: string
}

const pagesList: Props[] = [
  {
    id: 1,
    title: 'Pro аккаунты',
    icon: pro_account,
    path: '/subscribe',
  },
  {
    id: 2,
    title: 'Фулфилмент',
    icon: fulfillment,
    path: '/fulfillment',
  },
  {
    id: 3,
    title: 'Покупателям',
    icon: for_buyers,
    path: '/for_buyers',
  },
  {
    id: 4,
    title: 'Поставщикам',
    icon: for_suppliers,
    path: '/for_suppliers',
  },
  {
    id: 5,
    title: 'Партнерам',
    icon: for_partners,
    path: '/for_partners',
  },
  {
    id: 6,
    title: 'О нас',
    icon: about_us,
    path: '/about_us',
  },
]

const Menu = () => {
  // const [currencies, setCurrencies] = React.useState<CurrenciesTypes.Response>()
  const currencies = useCurrenciesStore(state => state.currencies)
  const [searchValue, setSearchValue] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { colorMode } = useColorMode()
  const router = useRouter()

  const redirectToSearch = () => {
    if (searchValue) {
      router.push(`/catalog/?search=${searchValue}`)
      setSearchValue('')
      onClose()
    }
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      redirectToSearch()
    }
  }

  const fetchData = async () => {
    // try {
    //   const currencies = await (await fetch('/api/settings/currencies/')).json()
    //   setCurrencies(currencies)
    // } catch (error: any) {
    //   console.error('Error', error)
    // }
  }

  const onClickLink = (path: string) => {
    router.push(path)
    onClose()
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="laptop:hidden flex">
      <button 
        onClick={onOpen}
        
      >
        <RxHamburgerMenu
          className="text-[25px] phone:text-[30px] tablet:text-[40px] cursor-pointer text-white"
        />
      </button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className="text-[#1F81BF] top-4 text-base"/>
          <DrawerHeader>
            <div className="flex items-end gap-1">
              <Image
                src={butterfly}
                alt="butterfly"
                width={22}
                height={22}
                className="w-7"
              />
              <p className="text-2xl text-[#1F81BF] font-normal font-marmelad">Eilbay</p>
            </div>
          </DrawerHeader>

          <DrawerBody className="px-0">
            <div className="desktop:hidden flex laptop:w-4/6 mx-auto px-6">
              <input
                placeholder="Найти в Eilbay"
                type="text"
                className="w-full outline-none py-2 pl-2 bg-white text-black placeholder:text-[#797979] border-2 border-[#58A6DF] rounded-s-xl"
                onChange={e => setSearchValue(e.target.value)}
                value={searchValue}
                onKeyDown={handleEnterPress}
              />

              <div
                className="bg-[#58A6DF] flex items-center px-4 py-2 rounded-e-xl"
                onClick={redirectToSearch}
              >
                <FaSearch
                  className="text-2xl text-white cursor-pointer"
                />
              </div>
            </div>

            <div className={twMerge('flex items-center justify-between bg-[#f3f3f3] py-3 px-6 my-5', colorMode === 'dark' && 'bg-[#061324]')}>
              <div className="flex items-center gap-3">
                <Image 
                  src={currency}
                  alt="icon"
                  width={22}
                  height={22}
                />
                <p className="text-[#0072B4] font-medium">
                  Валюта
                </p>
              </div>
              <div className="tablet:w-[100px] rounded-full overflow-hidden">
                {!!currencies?.results && <CurrenciesSelect currencies={currencies.results} menu />}
              </div>
            </div>

            <div 
              onClick={() => onClickLink('https://t.me/Eldiyarom')} 
              className={twMerge('bg-[#f3f3f3] py-3 px-6 cursor-pointer my-5', colorMode === 'dark' && 'bg-[#061324]')}
            >
              <div className="flex items-center gap-3">
                <Image 
                  src={chat}
                  alt="icon"
                  width={22}
                  height={22}
                />
                <p className="text-[#0072B4] font-medium">
                  Чат
                </p>
              </div>

              <p className="text-[#888888] text-sm mt-2">Чат с консультантом</p>
            </div>

            <div className={twMerge('bg-[#f3f3f3] py-3 px-6 my-5', colorMode === 'dark' && 'bg-[#061324]')}>
              <div className="flex items-center gap-3">
                <Image 
                  src={theme}
                  alt="icon"
                  width={22}
                  height={22}
                />
                <p className="text-[#0072B4] font-medium">
                  Тема
                </p>
              </div>

              <div className="flex items-center gap-2 text-3xl text-[#0072B4] mt-2">
                <p className="text-[#888888] text-sm">{colorMode === 'light' ? 'Светлая' : 'Темная'}</p>
                <ThemeSwitcher />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {
                pagesList.map(({ id, title, path, icon }) => (
                  <div 
                    key={id}
                    className={twMerge('flex items-center gap-3 bg-[#f3f3f3] py-3 px-6 cursor-pointer', colorMode === 'dark' && 'bg-[#061324]')}
                    onClick={() => onClickLink(path)}
                  >
                    <Image 
                      src={icon}
                      alt="icon"
                      width={22}
                      height={22}
                    />
                    <p className="text-[#0072B4] font-medium">
                      {title}
                    </p>
                  </div>
                ))
              }
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Menu
