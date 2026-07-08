import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { useLenis } from '@/hooks/useLenis'
import AppRouter from '@/router'
import ScrollProgress from '@/components/animations/ScrollProgress'
import LoadingScreen from '@/components/common/LoadingScreen'

function AppContent() {
  useLenis()
  return (
    <>
      <ScrollProgress />
      <AppRouter />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        {loading && <LoadingScreen />}
        {!loading && <AppContent />}
      </BrowserRouter>
    </ThemeProvider>
  )
}
