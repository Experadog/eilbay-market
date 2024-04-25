import { fetcher } from '@/configs/fetcher'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetcher('/accounts/users/', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const user = await response.json()

    return Response.json(user)
  } catch (error: any) {
    return Response.json(error)
  }
}
