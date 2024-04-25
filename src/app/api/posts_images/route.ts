import { NextResponse } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function POST(
  request: Request,
) {
  const res = await request.json()

  try {
    const response = await fetcher('/posts_images/', {
      authorizedRequest: true,
      method: 'POST',
      body: JSON.stringify(res),
    })

    return NextResponse.json(response)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
