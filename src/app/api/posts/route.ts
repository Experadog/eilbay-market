import { NextRequest, NextResponse } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function GET(
  request: NextRequest,
) {
  try {
    const searchParams = request.nextUrl.searchParams

    const posts = await fetcher(`/posts/?${searchParams.toString()}`)

    return Response.json(posts)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}

export async function POST(
  request: Request,
) {
  const res = await request.json()

  try {
    const response = await fetcher(
      '/posts/',
      {
        authorizedRequest: true,
        method: 'POST',
        body: JSON.stringify(res),
      },
    )

    return NextResponse.json(response)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
