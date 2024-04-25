'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  // useToast,
} from '@chakra-ui/react'
// import Cookies from 'js-cookie'
// import { useRouter } from 'next/navigation'
import { FaCreditCard } from 'react-icons/fa'

import { Textfield } from '@/components/ui/Textfield'
// import { BASE_API_URL } from '@/configs/axios'
import { Forms } from '@/helpers/form'
import { UsersTypes } from '@/types/users'


type PaymentModalProps = {
  isOpen: boolean
  onClose: () => void
  closeModal: () => void
  paymentAmount: number | null
  user?: UsersTypes.Root
}

interface FormValues {
  card_number: string
  card_exp_month: string
  card_exp_year: string
  card_holder_name: string
  card_cvv: number
}

declare global {
  interface Window {
    FreedomPaySDK: any
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  closeModal, 
  // onClose, 
  paymentAmount,
  // user,
}) => {
  const [sdkLoaded, setSdkLoaded] = React.useState(false)
  // const router = useRouter()
  // const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<FormValues>()

  function pay(amount: number) {
    if (sdkLoaded) {

      const data = {
        token: 'uwWb6CCMRaXjYKshrVzJRsXj1fnWeHDN',
        payment: {
          amount: amount,
          language: 'ru',
          description: 'Описание заказа',
        },
        successCallback: function (payment: any) {
          console.log(payment)
        },
        errorCallback: function (payment: any) {
          console.log(payment)
        },
      }

      //@ts-ignore
      const widget = window.PayBox(data)

      widget.create()
    
      // const widget = window.FreedomPaySDK
    }
  }

  // const pay = async (data: FormValues) => {
  //   if (sdkLoaded) {
  //     const JSPaymentOptions = {
  //       order_id: `id_${Math.random().toString(36).substr(2, 9)}`,
  //       auto_clearing: 0,
  //       amount: paymentAmount,
  //       currency: 'KGS',
  //       description: 'Описание заказа',
  //       test: 1,
  //       options: {
  //         user: {
  //           email: user?.email,
  //           phone: user?.phone_number,
  //         },
  //       },
  //     }

  //     const JSTransactionOptionsBankCard = {
  //       type: 'bank_card',
  //       options: {
  //         card_number: data.card_number,
  //         card_holder_name: data.card_holder_name,
  //         card_exp_month: data.card_exp_month,
  //         card_exp_year: data.card_exp_year,
  //       },
  //     }

  //     const JSTokenResponse = await window.FreedomPaySDK.tokenize(
  //       JSTransactionOptionsBankCard,
  //     )

  //     const JSTransactionOptionsBankCardToken = {
  //       type: 'tokenized_card',
  //       options: {
  //         token: JSTokenResponse.token,
  //         card_cvv: data.card_cvv,
  //       },
  //     }

  //     try {
  //       let JSPayResult = await window.FreedomPaySDK.charge(
  //         JSPaymentOptions,
  //         JSTransactionOptionsBankCardToken,
  //       )

  //       if (JSPayResult.payment_status === 'need_confirm') {
  //         JSPayResult = await window.FreedomPaySDK.confirmInIframe(
  //           JSPayResult,
  //           '3dsForm',
  //         )
  //       }

  //       if(JSPayResult.payment_status === 'success') {
  //         await fetch(`${BASE_API_URL}/wallets/add_payment_id/`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-type': 'application/json',
  //             'Authorization': `Bearer ${Cookies.get('accessToken')}`,
  //           },
  //           body: JSON.stringify({
  //             user: user?.id,
  //             balance: paymentAmount,
  //             payment_id: JSPayResult.payment_id,
  //           }),
  //         })

  //         await fetch(`${BASE_API_URL}/wallets/add_money/`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-type': 'application/json',
  //             'Authorization': `Bearer ${Cookies.get('accessToken')}`,
  //           },
  //           body: JSON.stringify({
  //             payment_id: JSPayResult.payment_id,
  //             money: String(paymentAmount),
  //           }),
  //         })

  //         router.push('/profile/view')
  //         toast({
  //           title: 'Успешно пополнено!',
  //           status: 'success',
  //           duration: 2500,
  //           isClosable: true,
  //           position: 'bottom',
  //         })
  //         onClose()
  //       }
  //     } catch (JSErrorObject: any) {
  //       console.error(JSErrorObject.response, 'what')
  //       toast({
  //         title: JSErrorObject.response.error_message,
  //         status: 'error',
  //         duration: 2500,
  //         isClosable: true,
  //         position: 'bottom',
  //       })
  //     }
  //   }
  // }

  React.useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://cdn.freedompay.money/widget/pbwidget.js?' + 1 * Number(new Date())
      document.body.appendChild(script)

      script.onload = () => {
        window.FreedomPaySDK?.setup(
          'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm83+JnviY39r+dCVS90ed42pteqJx4ObulURowDIcWAb0vVLclUTOuHNgNh7qLwapFWDtKivwkVCnpz5Yzoy5v5E4UvXpLl5BVGDsaaxEqY3WWmroKPPyEIsnLeSFe3exHuy5ntKyN5w5DWcfyhduWe+6Vk3yiz2z1FB7XQl6ulUilYgo4upW0Rmv6ZtlqmSaFEHX4Mj195bh3kFLchQLZ5T9foFS+bB10LwuMuVednCYCvGtfIB3yGzUt+kljVlh3Hh/6MxHvsuX4swS9V3pl3J3xWVEv5pPpddXVHRW4D8w+ItAhoODF/AJNPtnF6+/tp7/0kqYIAqtZyRLWH6pwIDAQAB',
          'qgCN7SmHwXLTLnuMXgL3TZ43v29doxi4',
        )
        setSdkLoaded(true)
      }

      

      // (function (p, a, y, b, o, x) {
      //   o = p.createElement(a);
      //   x = p.getElementsByTagName(a)[0];
      //   o.async = 1;
      //   o.src = 'https://cdn.freedompay.money/widget/pbwidget.js?' + 1 * new Date();
      //   x.parentNode.insertBefore(o, x);
      // })(document, 'script');

      // const script = document.createElement('script')
      // script.src = 'https://static.paybox.money/sdk/stable/js-sdk-1.0.0.js'
      // script.async = true
      // document.body.appendChild(script)

      // script.onload = () => {
      //   window.FreedomPaySDK?.setup(
      //     'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm83+JnviY39r+dCVS90ed42pteqJx4ObulURowDIcWAb0vVLclUTOuHNgNh7qLwapFWDtKivwkVCnpz5Yzoy5v5E4UvXpLl5BVGDsaaxEqY3WWmroKPPyEIsnLeSFe3exHuy5ntKyN5w5DWcfyhduWe+6Vk3yiz2z1FB7XQl6ulUilYgo4upW0Rmv6ZtlqmSaFEHX4Mj195bh3kFLchQLZ5T9foFS+bB10LwuMuVednCYCvGtfIB3yGzUt+kljVlh3Hh/6MxHvsuX4swS9V3pl3J3xWVEv5pPpddXVHRW4D8w+ItAhoODF/AJNPtnF6+/tp7/0kqYIAqtZyRLWH6pwIDAQAB',
      //     'qgCN7SmHwXLTLnuMXgL3TZ43v29doxi4',
      //   )
      //   setSdkLoaded(true)
      // }
    }
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent className="py-2">
        <ModalHeader className="py-2">Оплата картой</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-5">
          <p className="text-center font-medium">Выбранная сумма: {paymentAmount} KGS</p>

          <Textfield 
            label="Номер карты:"
            placeholder="XXXX XXXX XXXX XXXX"
            leftElement={<FaCreditCard />}
            error={errors.card_number && errors.card_number.message}
            {...register('card_number', Forms.Options.Rules.Paymant.Number)}
          />

          <Textfield
            label="Имя на карте:"
            placeholder="Имя на карте"
            error={errors.card_holder_name && errors.card_holder_name.message}
            {...register('card_holder_name', Forms.Options.Rules.Paymant.Name)}
          />

          <div className="flex gap-3">
            <Textfield 
              label="Срок действия (ММ):"
              type="number"
              placeholder="Срок действия (MM)"
              error={errors.card_exp_month && errors.card_exp_month.message}
              {...register('card_exp_month', Forms.Options.Rules.Paymant.Date)}
            />

            <Textfield 
              label="Срок действия (ГГ):"
              type="number"
              placeholder="Срок действия (ГГ)"
              maxLength={2}
              error={errors.card_exp_year && errors.card_exp_year.message}
              {...register('card_exp_year', Forms.Options.Rules.Paymant.Date)}
            />
          </div>

          <Textfield 
            label="CVV:"
            type="number"
            placeholder="CVV"
            error={errors.card_cvv && errors.card_cvv.message}
            {...register('card_cvv', Forms.Options.Rules.Paymant.Cvv)}
          />

          <Button 
            onClick={handleSubmit(() => pay(100))}
            colorScheme="blue"
            className="w-full rounded-3xl py-6" 
          >
            Оплатить
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PaymentModal
