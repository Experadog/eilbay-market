import React from 'react'

import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { WalletHistoriesAPI } from '@/api/walletHistories'
import { PageTitle } from '@/components/elements/PageTitle'
import { EmptyWalletHistory } from '@/components/ui/EmptyResult/EmptyWalletHidtory'
import { main_icon } from '@/images'
import Container from '@/layouts/container'
import { WalletHistoriesTypes } from '@/types/walletHistories'


const PurchaseHistory = async () => {
  const accessToken = cookies().get('accessToken')?.value
  if(!accessToken) return redirect('/auth/signin')
  const WalletHistories: WalletHistoriesTypes.Response = await WalletHistoriesAPI.get()

  return (
    <Container>
      <div>
        <PageTitle 
          leftButton
          title="История пополнения"
        />
        <EmptyWalletHistory count={WalletHistories.count} />
        <div className="flex flex-col my-9 gap-5">
          {WalletHistories?.results.map(({ id, money, created_at }) => (
            <div key={id} className="flex justify-between border-b-2 p-4 items-center">
              <div className="flex items-center gap-7">
                <Image src={main_icon} alt="фото товара" />
                <div>
                  <p className="font-semibold">Ежемесячная подписка</p>
                  <p>{created_at}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold">{money}</p>
              </div>
            </div>
          
          ))}
        </div>
      </div>
    </Container>
  )
}


export default PurchaseHistory
