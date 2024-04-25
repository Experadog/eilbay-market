import { cookies } from 'next/headers'

import { BASE_API_URL } from '@/configs/axios'

export async function GET() {
  try {
    const getUser = await (await fetch(`${BASE_API_URL}/accounts/users/get_userinfo/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
      },
    })).json()

    return Response.json(getUser)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
