import React from 'react'

import { 
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react'

interface Props {
  label?: string
  children?: React.ReactNode
  placeholder?: string
  error?: string
  color?: string
  defaultValue?: string
}

export const Selectfield = React.forwardRef((
  {
    children,
    error,
    placeholder = 'Выберите',
    label,
    defaultValue,
    color = 'black',
    ...rest
  }: Props,
  ref: React.LegacyRef<HTMLSelectElement> | undefined,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel className="text-[14px]">
        {label}
      </FormLabel>

      <Select
        size="lg"
        fontSize={16}
        color={color}
        bg="#f3f3f3"
        fontWeight="400"
        borderRadius={23}
        height={45}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={ref}
        {...rest}
      >
        {children}
      </Select>

      <FormErrorMessage>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
})
