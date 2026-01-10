"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, getLanguageFromCountry, type Language, type TranslationKeys } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if language is already stored
    const storedLanguage = localStorage.getItem("spotify-language") as Language | null
    if (storedLanguage && translations[storedLanguage]) {
      setLanguageState(storedLanguage)
      setIsInitialized(true)
      return
    }

    // Detect language from geolocation
    const detectLanguage = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        const countryCode = data.country_code
        const detectedLanguage = getLanguageFromCountry(countryCode)
        setLanguageState(detectedLanguage)
        localStorage.setItem("spotify-language", detectedLanguage)
      } catch (error) {
        console.error("Failed to detect language:", error)
        // Fallback to browser language
        const browserLang = navigator.language.split("-")[0] as Language
        if (translations[browserLang]) {
          setLanguageState(browserLang)
        }
      } finally {
        setIsInitialized(true)
      }
    }

    detectLanguage()
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("spotify-language", lang)
  }

  const t = translations[language]

  // Don't render children until language is initialized to prevent flash of wrong language
  if (!isInitialized) {
    return null
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
