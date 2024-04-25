import React from 'react'

import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react'

interface Props {
  label?: string
  error?: string
  placeholder?: string
  rows: number
  maxLength?: number
}

export const TextAreafield = React.forwardRef((
  {
    error,
    label,
    placeholder = 'Описание',
    rows,
    maxLength,
    ...rest
  }: Props,
  ref: React.LegacyRef<HTMLTextAreaElement> | undefined,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>
        {label}
      </FormLabel>
      <Textarea
        p={'16px'}
        rounded="23"
        bg="#f3f3f3"
        placeholder={placeholder}
        _placeholder={{ 'color':'#78828A' }}
        color={'black'}
        ref={ref}
        resize="none"
        rows={rows}
        maxLength={maxLength}
        {...rest}
      />
      <FormErrorMessage>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
})
