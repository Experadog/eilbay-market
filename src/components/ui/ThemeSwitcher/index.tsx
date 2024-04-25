'use client'

import React from 'react'

import { useColorMode } from '@chakra-ui/react'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'

export const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div onClick={toggleColorMode} className="cursor-pointer">
      {colorMode === 'light' ? <IoSunnyOutline /> : <IoMoonOutline />}
    </div>
  )
}

