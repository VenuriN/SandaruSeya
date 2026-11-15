import { createContext, useContext, useState, useEffect } from 'react'

const defaultTheme = {
  isDark: true,
  toggleTheme: () => {},
  colors: {
    background: '#0A0A0A',
    surface: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    accent: '#C9A962',
    accentLight: '#E8D5A3',
    border: '#333333'
  }
}

const ThemeContext = createContext(defaultTheme)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider')
    return {
      isDark: true,
      toggleTheme: () => {},
      colors: {
        background: '#0A0A0A',
        surface: '#1A1A1A',
        text: '#FFFFFF',
        textSecondary: '#CCCCCC',
        accent: '#C9A962',
        accentLight: '#E8D5A3',
        border: '#333333'
      }
    }
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  useEffect(() => {
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const colors = {
    light: {
      background: '#FAFAF5',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textSecondary: '#666666',
      accent: '#C9A962',
      accentLight: '#E8D5A3',
      border: '#E0E0E0'
    },
    dark: {
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      accent: '#C9A962',
      accentLight: '#E8D5A3',
      border: '#333333'
    }
  }

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? colors.dark : colors.light
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
