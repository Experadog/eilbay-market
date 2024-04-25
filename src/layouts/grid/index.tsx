import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface Props {
  children: ReactNode
  className?: string
}

export const Grid = ({
  children,
  className,
}: Props) => {
  return (
    <div 
      className={twMerge(
        'grid grid-cols-2 phone:gap-x-2 phone:gap-y-4 laptop:gap-x-4 laptop:grid-cols-3 desktop:grid-cols-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
