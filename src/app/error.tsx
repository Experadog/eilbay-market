'use client'

import Image from 'next/image'

import { went_wrong } from '@/images'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center h-[100vh]">
        <Image 
          src={went_wrong}
          alt="went wrong"
          width={300}
          height={300}
        />
        <p className="text-3xl my-2">Упс, что-то пошло не так...</p>
        <p className="my-2">{error.message}</p>
        <button 
          className=""
          onClick={() => reset()}
        >
          Попробуйте еще раз
        </button>
      </body>
    </html>
  )
}
