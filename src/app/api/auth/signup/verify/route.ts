import { fetcher } from '@/configs/fetcher'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetcher('/accounts/users/account_activate/', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const verify = await response.json()

    return Response.json(verify)
  } catch (error: any) {
    return Response.json(error)
  }
}
