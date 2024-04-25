'use client'

import React from 'react'

import { Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
// import Image from 'next/image'

import { PageTitle } from '@/components/elements/PageTitle'
// import { not_found_bg } from '@/images'
import Container from '@/layouts/container'

const Advertisement = () => {
  return (
    <Container>
      <PageTitle leftButton />
      <div className="flex flex-col items-center justify-center space-y-7">

        <div className="text-center space-y-5">
          <p className="text-4xl font-semibold">Реклама</p>
          <p className="text-5xl font-semibold">1240 - 1500</p>
          <p className="text-xl font-medium">Приблизительный охват объявлений при работе Рекламы от 7 дней (182 - 273)</p>
          <p className="text-xl font-medium">Охват формируется ежедневно в зависимости от конкуренции в категории</p>
        </div>

        <div>
          <div>
            <p className="text-2xl font-semibold">
              Бюджет в день
            </p>
            
            {/* <Image src={not_found_bg} alt="icon" /> */}
          </div>
          <div>
            <Slider w={800} defaultValue={20} min={0} max={300} step={10}>
              <SliderTrack bg="gray">
                <SliderFilledTrack bg="blue" />
              </SliderTrack>
              <SliderThumb boxSize={4} />
            </Slider>
          </div>
        </div>

        <div className="bg-btnBg py-10 px-8 rounded-xl">
          {/* <Image src={not_found_bg} alt="icon" /> */}
          <p className="text-2xl font-medium">Реклама + VIP поможет совершить сделку в два раза быстрее</p>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Кешбек <span className="text-white bg-btnBg rounded-lg px-2 py-1">7%</span></p>
            <p className="text-btnBg text-lg font-semibold">1.75 KGS</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Бюджет в день</p>
            <p className="text-xl font-semibold">до 23.25 KGS</p>
          </div>
          <p className="text-xl font-medium">Баланс кошелька: 87 KGS</p>
          <p className="text-lg font-medium">Вы можете приостановить расходы в любое время после запуска Рекламы</p>
        </div>

        <div className="flex space-x-5">
          <Button variant="outline" colorScheme="blue" className="w-full">Деактивировать</Button>
          <Button colorScheme="blue" className="w-full">Запустить рекламу</Button>
        </div>

      </div>
    </Container>
    
  )
}

export default Advertisement
