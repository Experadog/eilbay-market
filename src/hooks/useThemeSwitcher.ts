import React from 'react'

import Cookies from 'js-cookie'

export default function useThemeSwitcher() {
  const [themeColor, setThemeColor] = React.useState<'light' | 'dark'>('light')

  const toggleThemeColor = () => {
    setThemeColor(prevThemeColor => {
      const newThemeColor = prevThemeColor === 'light' ? 'dark' : 'light'
      Cookies.set('themeColor', newThemeColor)
      if (newThemeColor === 'dark') {
        window.document.documentElement.classList.add('dark')
      } else {
        window.document.documentElement.classList.remove('dark')
      }
      return newThemeColor
    })
  }

  React.useEffect(() => {
    const colorThemeFromLC = Cookies.get('themeColor') as 'dark' | 'light'

    if (colorThemeFromLC) {
      setThemeColor(colorThemeFromLC)
    }

    if (colorThemeFromLC === 'dark') {
      window.document.documentElement.classList.add('dark')
    }
  }, [])

  return {
    themeColor,
    toggleThemeColor,
  }
}
