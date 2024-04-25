import { fetcher } from '@/configs/fetcher'

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json()

    const response = await fetcher('/accounts/users/get_user_by_token/', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    return Response.json(response)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
