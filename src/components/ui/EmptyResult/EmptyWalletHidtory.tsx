import Image from 'next/image'

import { productEmpty } from '@/images'

interface Props {
  count: number
}

export const EmptyWalletHistory = ({ count }: Props) => {
  return !count && (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={productEmpty}
        alt="empty"
        className="w-[70%] tablet:w-[40%] laptop:w-[35%]"
      />
    </div>
  )
}
