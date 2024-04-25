import { NextRequest } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function GET(
  request: NextRequest,
) {
  try {
    const searchParams = request.nextUrl.searchParams

    const posts = await fetcher(`/reviews/?${searchParams.toString()}`)

    return Response.json(posts)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
