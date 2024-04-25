import { NextRequest, NextResponse } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const res = await fetcher(`/favorites/${id}/`, {
      method: 'DELETE',
      authorizedRequest: true,
    })

    return NextResponse.json(res)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
