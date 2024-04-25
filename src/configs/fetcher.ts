'use server'

import { cookies } from 'next/headers'

const version = 'v1'
const BASE_API_URL = `http://eilbay.com/api/${version}`

interface FetcherOptions extends RequestInit {
  authorizedRequest?: boolean
  params?: Record<string, string | number>
}

export async function fetcher(url: string, options?: FetcherOptions) {
  let headers: HeadersInit = {
    ...(options?.headers ?? {}),
  }

  if (options?.authorizedRequest) {
    const accessToken = cookies().get('accessToken')?.value

    if (accessToken) {
      headers = {
        ...headers,
        'Authorization': `Bearer ${accessToken}`,
      }
    }
  }

  const requestOptions: RequestInit = {
    ...options,
    headers,
  }

  let searchParams = ''
  if (options?.params) {
    const params = new URLSearchParams()

    Object.entries(options.params).forEach(([key, value]) => {
      params.append(key, String(value))
    })

    searchParams = params.toString()
  }

  const response = await fetch(`${BASE_API_URL}${url}?${searchParams}`, requestOptions)

  return response
}
