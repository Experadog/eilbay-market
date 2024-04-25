import React from 'react'

import cls from './styles.module.css'

export const Loader = () => {
  return (
    <div className={cls.loader}>
      <div className={cls.ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
