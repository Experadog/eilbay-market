import { NextRequest } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function GET(
  request: NextRequest,
) {
  try {
    const searchParams = request.nextUrl.searchParams

    const banners = await fetcher(`/accounts/banners/?${searchParams.toString()}`)

    return Response.json(banners)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
