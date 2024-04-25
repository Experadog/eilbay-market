import { NextRequest } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const posts = await fetcher(`/post_types/${id}`)

    return Response.json(posts)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
