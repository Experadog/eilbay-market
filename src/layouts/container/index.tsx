import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: Props) {
  return (
    <div className={`desktop:max-w-[1440px] tablet:w-[90%] w-full mx-auto desktop:px-10 tablet:px-8 phone:px-3 py-4 ${className}`}>
      {children}
    </div>
  )
}
