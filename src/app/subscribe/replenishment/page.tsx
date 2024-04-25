'use client'

import React from 'react'

import { 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Radio, 
  RadioGroup, 
  Stack, 
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PageTitle } from '@/components/elements/PageTitle'
import PaymentModal from '@/components/forms/PaymentForm/PaymentForm'
import { BASE_API_URL } from '@/configs/axios'
import Container from '@/layouts/container'
import { UsersTypes } from '@/types/users'

const Replenishment = () => {
  const [paymentAmount, setPaymentAmount] = React.useState<number | null>(null)
  const [selectedValue, setSelectedValue] = React.useState('')
  const [user, setUser] = React.useState<UsersTypes.Root>()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const accessToken = Cookies.get('accessToken')

  const handleRadioChange = (nextValue: string) => {
    const amount = nextValue === '11' ? null : parseInt(nextValue) * 100
    setPaymentAmount(amount)
    setSelectedValue(nextValue)
  }
  
  const openModal = () => {
    if(paymentAmount) {
      onOpen()
    } else {
      toast({
        title: 'Выберите сумму пополнения!',
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'bottom',
      })
    }
  }
  const closeModal = () => onClose()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = event.target.value.replace(/[^\d]/g, '')
    setPaymentAmount(parseInt(onlyDigits) || null)
  }

  const getMyProfile = async () => {
    try {
      const response = await (await fetch(`${BASE_API_URL}/accounts/users/get_userinfo`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        cache: 'no-cache',
      })).json()
  
      setUser(response)
    } catch (error: any) {
      throw new Error('Failed to fetch data')
    }
  }

  React.useEffect(() => {
    getMyProfile()
  }, [])

  if(!accessToken) return redirect('/auth/signin')
  return (
    <Container>
      <div className="relative">
        <div className="mt-5">
          <PageTitle leftButton rightButton={<Link className="text-linksColor" href="/subscribe/history/">История покупок</Link>} />
        </div>
        <div className="flex flex-col justify-center mt-14">
          <p className="font-semibold pb-3">Выберите сумму пополнения</p>
          <RadioGroup value={selectedValue} onChange={handleRadioChange}>
            <Stack spacing={4}>
              {[...Array(10)].map((_, index) => {
                const value = 1400 - index * 100
                return (
                  <div key={index} className="border-b-2 p-3 flex items-center justify-between">
                    <label className="flex items-center justify-between cursor-pointer w-full">
                      <p className="font-semibold">{value} KGS</p>
                      <Radio size="lg" value={`${value / 100}`} />
                    </label>
                  </div>
                )
              })}
              <div className="border-b-[2px] p-3 flex items-center justify-between">
                <label className="flex items-center justify-between cursor-pointer w-full">
                  <p className="font-semibold">Другая сумма</p>
                  <Radio size="lg" value="11" />
                </label>
              </div>
            </Stack>
          </RadioGroup>
        </div>
        {selectedValue === '11' && (
          <div className="mt-12 gap-7 flex flex-wrap">
            <FormControl className="basis-[450px] flex-1">
              <FormLabel>Введите сумму</FormLabel>
              <Input pattern="[0-9]*" placeholder="Введите сумму" className="rounded-2xl h-14" onChange={handleInputChange} />
            </FormControl>
          </div>
        )}
        <PaymentModal 
          onClose={onClose} 
          isOpen={isOpen} 
          closeModal={closeModal} 
          paymentAmount={paymentAmount}
          user={user}
        />
        <Button onClick={openModal} colorScheme="twitter" className="mt-12 w-full px-7 py-7 rounded-2xl mb-12">Открыть форму оплаты</Button>
      </div>
    </Container>
  )
}

export default Replenishment
