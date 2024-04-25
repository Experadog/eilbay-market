import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useCreateQueryString = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    if (name !== 'offset') {
      params.delete('offset')
    }

    if (name === 'parent_category') {
      params.delete('child_category')
    }

    if (name === 'clear' && value === '') {
      return router.push(pathname)
    }

    router.push('?' + params.toString())
  }

  return {
    createQueryString,
  }
}
