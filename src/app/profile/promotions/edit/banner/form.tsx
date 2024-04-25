'use client'

import React from 'react'

import {
  Button,
  ButtonGroup,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import Image from 'next/image'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { MdDownloadDone } from 'react-icons/md'


interface Props {
  createBanner: (banner: File[]) => void
}

export default function Form({ createBanner }: Props) {
  const [banner, setBanner] = React.useState<File[]>()

  const onChangeInputBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const allImages = Array.from(e.target.files)

      setBanner(allImages)
    }
  }

  return (
    <>
      {
        banner
          ? (
            <div className="flex flex-col w-full space-y-4">
              <Image
                src={URL.createObjectURL(banner[0])}
                alt="Banner"
                width={1920}
                height={1080}
                className="w-full cursor-pointer h-96 rounded-lg"
              />

              <ButtonGroup>
                <Button
                  rightIcon={<MdDownloadDone className="text-xl" />}
                  className="text-white bg-btnBg hover:bg-btnBgHover"
                  onClick={() => createBanner(banner)}
                >
                  Сохранить
                </Button>

                <Button 
                  className="text-white bg-slate-400"
                  onClick={() => setBanner(undefined)}
                >
                  Сбросить
                </Button>
              </ButtonGroup>
            </div>
          )
          : (
            <div className="flex items-center justify-center w-full">
              <FormLabel className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <IoCloudUploadOutline className="text-3xl font-bold" />
                  <p className="mb-2 text-sm">Нажмите для загрузки!</p>
                </div>
                <Input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  value={banner}
                  onChange={onChangeInputBanner}
                />
              </FormLabel>
            </div>
          )
      }
    </>
  )
}
