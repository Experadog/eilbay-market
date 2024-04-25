'use client'

import React from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { UserEdit } from '@/components/forms/UserEdit'
import Container from '@/layouts/container'
import { useUserStore } from '@/store/useUserStore'

export default function Page() {
  const profile = useUserStore(state => state.user)

  const accessToken = Cookies.get('accessToken')
  const router = useRouter()

  if(!accessToken) return router.push('/auth/signin')

  return (
    <Container>
      {
        profile && (
          <UserEdit
            user={profile}
          />
        )
      }
    </Container>
  )
}
