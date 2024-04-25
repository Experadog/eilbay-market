import { NextResponse } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function POST(
  request: Request,
) {
  const body = await request.json()

  try {
    const response = await fetcher('/accounts/token/verify/', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    return NextResponse.json(response)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
