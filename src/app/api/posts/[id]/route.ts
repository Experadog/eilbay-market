import { NextRequest, NextResponse } from 'next/server'

import { fetcher } from '@/configs/fetcher'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const res = await fetcher(`/posts/${id}/`)

    return NextResponse.json(res)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const res = await fetcher(`/posts/${id}/`,{
      authorizedRequest: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.json()),
    })

    return NextResponse.json(res)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    const body = await request.json()

    const res = await fetcher(`/posts/${id}/`, {
      authorizedRequest: true,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return NextResponse.json(res)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const res = await fetcher(`/posts/${id}/`, {
      authorizedRequest: true,
      method: 'DELETE',
    })

    return NextResponse.json(res)
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status,
    })
  }
}
