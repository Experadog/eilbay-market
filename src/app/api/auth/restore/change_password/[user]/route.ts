import { fetcher } from '@/configs/fetcher'

export async function PATCH(
  request: Request,
  { params }: { params: { user: string } },
) {
  try {
    const body = await request.json()

    const response = await fetcher(`/accounts/users/${params.user}/update_password/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return Response.json(response)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
