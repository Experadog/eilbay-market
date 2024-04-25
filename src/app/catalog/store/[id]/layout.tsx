import React from 'react'

import { UsersAPI } from '@/api/users.api'
import ProfileTitle from '@/components/ProfileTitle'
import Container from '@/layouts/container'
import { UsersTypes } from '@/types/users'

interface Props { 
  params: { id: string }
  children: React.ReactNode
}

export default async function Layout({ params, children }: Props) {
  const user: UsersTypes.Root = await UsersAPI.getSingle(params.id)
  
  return (
    <Container>
      <ProfileTitle
        user={user}
        href={`/catalog/store/${params.id}`}
      />

      <div className="py-[25px] tablet:py-[50px]">
        {children}
      </div>
    </Container>
  )
}
