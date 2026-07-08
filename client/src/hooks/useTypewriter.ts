import { useEffect, useState } from 'react'

export function useTypewriter(words: string[], speed = 100, deleteSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[wordIndex]

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return
      }
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, deleteSpeed)
      return () => clearTimeout(timeout)
    }

    if (displayText === currentWord) {
      setIsPaused(true)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(currentWord.slice(0, displayText.length + 1))
    }, speed)
    return () => clearTimeout(timeout)
  }, [displayText, wordIndex, isDeleting, isPaused, words, speed, deleteSpeed, pauseTime])

  return displayText
}
