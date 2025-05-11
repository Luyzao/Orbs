'use client'
import { createContext, useEffect, useState } from 'react'

type ThemeContextType = {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if (isDarkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    console.log('Trocando o tema...')
    setIsDarkMode((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
