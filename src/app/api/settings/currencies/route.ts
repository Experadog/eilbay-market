import { fetcher } from '@/configs/fetcher'

export async function GET() {
  try {
    const currencies = await (await fetcher('/settings/currencies')).json()

    return Response.json(currencies)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
