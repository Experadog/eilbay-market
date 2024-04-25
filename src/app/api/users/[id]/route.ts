import { NextResponse } from 'next/server'

import { fetcher } from '@/configs/fetcher'


export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const res = await fetcher(`/accounts/users/${id}/`)

    return NextResponse.json(res)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
