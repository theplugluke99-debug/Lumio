'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function useSpeechToText(onResult: (text: string) => void) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  }, [])

  const startListening = useCallback(() => {
    if (!isSupported) return
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SR()
    recognition.lang = 'en-GB'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognition.onresult = (e: any) => {
      onResult(e.results[0][0].transcript)
    }
    recognitionRef.current = recognition
    recognition.start()
  }, [isSupported, onResult])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  return { isListening, isSupported, startListening, stopListening }
}
