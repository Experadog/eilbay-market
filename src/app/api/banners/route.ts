import { fetcher } from '@/configs/fetcher'

export async function GET() {
  try {
    const banners = await fetcher('/settings/banners/')

    return Response.json(banners)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
