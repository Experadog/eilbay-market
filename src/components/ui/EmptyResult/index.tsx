import Image from 'next/image'

import { productEmpty } from '@/images'

interface Props {
  count: number
}

export const EmptyResult = ({ count }: Props) => {
  return !count && (
    <div className="flex flex-col items-center justify-center">
      <p className="font-medium text-[20px] tablet:text-[24px] dark:text-slate-300">
        По вашему запросу ничего не найдено
      </p>
      <Image
        src={productEmpty}
        alt="empty"
        className="w-[70%] tablet:w-[40%] laptop:w-[35%]"
      />
    </div>
  )
}
