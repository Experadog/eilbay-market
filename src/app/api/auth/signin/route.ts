import { fetcher } from '@/configs/fetcher'

export async function POST(request: Request) {
  const body = await request.json()

  const jwt = await (await fetcher('/accounts/token/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })).json()

  return Response.json(jwt)
}
