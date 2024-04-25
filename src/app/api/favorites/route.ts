import { NextRequest } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function GET(request: NextRequest) {
  try {
    let searchParams = request.nextUrl.searchParams.toString()
    
    
    if (!searchParams) {
      searchParams = 'offset=0'
    }
    
    const favorites = await fetcher(`/favorites/?${searchParams}`, {
      authorizedRequest: true,
    })
  
    return Response.json(favorites)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
