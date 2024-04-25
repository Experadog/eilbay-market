import { NextRequest, NextResponse } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = request.json()
    const id = params.id

    const review = await fetcher(`/reviews/?post__id=?${id}`, {
      authorizedRequest: true,
      method: 'POST',
      body: JSON.stringify(body),
    })

    return NextResponse.json(review)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
