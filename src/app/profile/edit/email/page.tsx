'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import EmailEdit from '@/components/forms/EmailEdit'
import Container from '@/layouts/container'
import { useUserStore } from '@/store/useUserStore'

export default function Page() {
  const profile = useUserStore(store => store.user)

  const accessToken = Cookies.get('accessToken')
  const router = useRouter()
  if(!accessToken) return router.push('/auth/signin')

  return (
    <Container className="flex flex-col items-center justify-center h-[80vh] tablet:h-[90vh]">
      {profile && <EmailEdit user={profile} />}
    </Container>
  )
}
