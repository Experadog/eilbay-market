import { fetcher } from '@/configs/fetcher'

export async function GET() {
  try {
    const categories = await (await fetcher('/categories/')).json()

    return Response.json(categories)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
