'use client'

import { useEffect, useRef, useState } from 'react'

import { useColorMode } from '@chakra-ui/react'
import { IoIosArrowDown } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', maybeHandler)

    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  })

  return domNode
}

interface Props {
  label: string
  children: React.ReactNode
}

const Dropdown = ({
  label,
  children,
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { colorMode } = useColorMode()

  const domNode = useClickOutside(() => {
    setDropdownOpen(false)
  })

  return (
    <div className="relative w-full text-left h-full">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex w-full h-full items-center justify-between px-3"
      >
        <p className="capitalize">{label.toLocaleLowerCase()}</p>

        <IoIosArrowDown />
      </button>

      <div
        ref={domNode}
        className={twMerge(dropdownOpen ? 'top-full opacity-100 visible' : 'top-0 invisible opacity-0', colorMode === 'light' ? 'bg-white text-black' : 'bg-[#1A202C] text-white border-2', 'flex flex-col absolute left-0 shadow-lg rounded-md w-full px-3 py-2 mt-2 transition-all z-50')}
        onClick={() => setDropdownOpen(false)}
      >
        {children}
      </div>
    </div>
  )
}

export default Dropdown
