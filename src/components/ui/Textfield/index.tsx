import React from 'react'

import { 
  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  InputRightElement,
} from '@chakra-ui/react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

interface Props {
  label: string
  error?: string
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  defaultValue?: string | number
  styles?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  maxLength?: number
  rightElement?: React.ReactNode
  leftElement?: React.ReactNode
}

export const Textfield = React.forwardRef((
  {
    error,
    label,
    type = 'text',
    placeholder = 'Введите ваше имя',
    defaultValue,
    onKeyDown,
    maxLength,
    styles,
    rightElement,
    leftElement,
    ...rest
  }: Props,
  ref: React.LegacyRef<HTMLInputElement> | undefined,
) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>

      <InputGroup>
        {
          leftElement && (
            <InputLeftElement py={22}>
              {leftElement}
            </InputLeftElement>
          )
        }

        <Input
          placeholder={placeholder}
          rounded="full"
          bg="#f3f3f3"
          className={`placeholder:text-[#78828A] ${styles}`}
          color="black"
          py={22}
          ref={ref}
          type={
            type === 'password' 
              ? showPassword ? 'text' : 'password' 
              : type
          }
          {...rest}
          defaultValue={defaultValue}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
        />

        {
          type === 'password' && (
            <InputRightElement className="mt-[3px] mr-[10px]">
              <IoEyeOutline
                className={twMerge('hidden text-xl cursor-pointer text-black', showPassword && 'block')}
                onClick={() => setShowPassword(prev => !prev)}
              />
              <IoEyeOffOutline
                className={twMerge('text-xl cursor-pointer text-black', !!showPassword && 'hidden')}
                onClick={() => setShowPassword(prev => !prev)}
              />
            </InputRightElement>
          )
        }

        {rightElement && <InputRightElement className="mt-[3px] mr-[10px]">{rightElement}</InputRightElement>}
      </InputGroup>

      <FormErrorMessage>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
})
