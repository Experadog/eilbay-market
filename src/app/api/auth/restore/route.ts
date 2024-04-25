import { fetcher } from '@/configs/fetcher'

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json()

    const response = await fetcher('/accounts/users/check_email_to_exist_user/', {
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
