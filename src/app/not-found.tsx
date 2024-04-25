import Image from 'next/image'
import Link from 'next/link'

import { not_found_man } from '@/images'
 
export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="hidden laptop:flex w-[45%] items-end h-[100vh]">
        <Image 
          src={not_found_man}
          alt="not found"
          width={600}
          height={600}
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-center h-[80vh] w-full tablet:w-3/4 laptop:w-2/5">
        <div className="text-center">
          <p className="text-6xl tablet:text-8xl font-medium">404</p>

          <p className="text-2xl teblet:text-4xl font-semibold my-2 tablet:my-5">
            <span className="block">Ой!</span>
            Страница не найдена
          </p>

          <p className="text-[#B0B0B0] text-base tablet:text-xl my-2 tablet:my-5">
            Страница не существует или временно не работает. 
            Рекомендуем вернуться на главный экран
          </p>

          <Link href="/">
            <button className="py-2 tablet:py-4 px-8 tablet:px-16 bg-black text-white rounded-3xl">
              Главная
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
