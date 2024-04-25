'use client'

import React from 'react'

import { Radio, RadioGroup } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { IoArrowBackOutline } from 'react-icons/io5'

import { PageTitle } from '@/components/elements/PageTitle'
import { butterfly, subcribeFive, subcribeFour, subcribeOne, subcribeThree, subcribeTwo } from '@/images'
import Container from '@/layouts/container'

const Subscribe = () => {
  // const router = useRouter()
  return (
    <Container>
      <div className="flex flex-col gap-8">
        {/* <div>
          <Button
            leftIcon={<IoArrowBackOutline />}
            variant="ghost"
            onClick={() => router.back()}
          >
            Назад
          </Button>
        </div> */}
        <div className="mt-3">
          <PageTitle 
            leftButton
          />
        </div>
        <div className="flex flex-col tablet:flex-row gap-[30px] tablet:gap-10">

          <div className="flex flex-col justify-center items-center gap-[25px]">
            <Image 
              src={butterfly}
              alt="butterfly" 
            />
            <div className="text-center">
              <p className="text-[24px] font-[700]">Eilbay Premium</p>
              <p className="text-[17px] font-[500] text-center">
                Открой мир свободной торговли с подпиской Eilbay Premium!
              </p>
            </div>
            <RadioGroup defaultValue="1">
              <div className="flex flex-col items-center justify-center text-sm bg-gray-100 rounded-xl px-2">
                  
                <div className="py-2">
                  <Radio value="1">
                    <div className="flex items-center gap-5 border-b-[1px]">
                      <div className="flex flex-col font-medium text-black">
                        Ежегодно
                        <span className="font-normal text-xs text-black">$36 в год</span>
                      </div>
                      <p className="text-sm text-black">3$ в месяц</p>
                    </div>
                  </ Radio>
                </div>

                <div className="pb-2">
                  <Radio value="2">
                    <div className="flex items-center font-medium gap-5 text-black">
                      Ежемесячно
                      <span className="font-normal text-sm text-black">5$ в месяц</span>
                    </div>
                  </Radio>
                </div>

              </div>
            </ RadioGroup>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
              <Image src={subcribeOne} alt="icon" className="w-10 h-10 tablet:w-12 tablet:h-12" />
              <div>
                <p className="text-base font-semibold text-black">Доступ к заказам</p>
                <p className="text-sm text-black">
                  Откроется доступ к каталогу заказов на рынке Eilbay, раскрывая перед вами перспективы продаж и предоставляя возможности успешно предлагать свою продукцию
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
              <Image src={subcribeTwo} alt="icon" className="w-10 h-10 tablet:w-12 tablet:h-12" />
              <div>
                <p className="text-base font-semibold text-black">Доступ к поставщикам</p>
                <p className="text-sm text-black">
                  Откроется доступ к каталогу поставщиков на рынка Eilbay, создавая для вас уникальные возможности общения и торговли, а также обогащая ваш опыт выбора.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
              <Image src={subcribeThree} alt="icon" className="w-10 h-10 tablet:w-12 tablet:h-12" />
              <div>
                <p className="text-base font-semibold text-black">Доступ к прямым производителям</p>
                <p className="text-sm text-black">
                  Открывается доступ к каталогу прямых производителей на рынке Eilbay, предоставляя вам уникальную возможность находить высококачественных производителей без посредников.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
              <Image src={subcribeFour} alt="icon" className="w-10 h-10 tablet:w-12 tablet:h-12" />
              <div>
                <p className="text-base font-semibold text-black">Исскуственный интелект у вас под рукой!</p>
                <p className="text-sm text-black">
                  Искусственный интеллект будет вашим надежным помощником, обеспечивая удовольствие от использования и оказывая помощь в различных сферах, включая оформление товаров и многое другое.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
              <Image src={subcribeFive} alt="icon" className="w-10 h-10 tablet:w-12 tablet:h-12" />
              <div>
                <p className="text-base font-semibold text-black">40% - Скидки на рекламу карточек</p>
                <p className="text-sm text-black">
                  У вас появляется уникальная возможность получить эксклюзивную 40% скидку на продвижение ваших товаров в топе категорий и поиска. Сделайте свои карточки более видимыми и привлекательными для потребителей, обеспечивая максимальное внимание к вашему бренду.

                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-gray-100 rounded-md p-1">
          <p className="text-lg font-semibold pl-2 text-black">Eilbay premium</p>
          <p className="text-black">
            Бесплатная версия Eilbay открывает пользователям возможность находить товары по всему миру и общаться с поставщиками напрямую. В Eilbay Premium ваши возможности станут еще шире.
          </p>
          <p className="text-black">
            Мы сделали подписку Eilbay Premium платной, поскольку большинство возможностей, которые мы предоставляем для наших пользователей, требуют затрат. За исключением пользователей, которые зарегистрировались, мы делаем упор на привлечение новых пользователей каждый день, чтобы маштабировать рынок, объединяющий многих предпринимателей. Также мы оплачиваем труд наших специалистов, которые ежедневно занимаются обновлением и добавлением каталога заказов, поставщиков, производителей.
          </p>
          <p className="text-black">
            Мы также оплачиваем услуги платных сервисов искусственного интеллекта для вашего удобства. Кроме того, мы предоставляем 40% скидку на рекламу, чтобы создать лучшие условия для наших премиум-пользователей.
          </p>
        </div>


        <div className="sticky bottom-16 tablet:bottom-20 laptop:bottom-5 text-center">  
          <Link href={'/subscribe/replenishment/'}>
            <button 
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0078A6] to-[#16BFFF] text-white hover:scale-105 duration-150"
            >
              Подключить за 5,00 $ в месяц
            </button>
          </Link>
        </div>

      </div>
    </Container>
  )
}

export default Subscribe
