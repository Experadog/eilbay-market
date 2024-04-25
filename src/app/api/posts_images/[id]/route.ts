import { NextRequest, NextResponse } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const res = await fetcher(`/posts_images/${id}/`, {
      authorizedRequest: true,
      method: 'DELETE',
    })

    return NextResponse.json(res)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
