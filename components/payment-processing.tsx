"use client"

import { useEffect } from "react"
import { t, type Language } from "@/lib/translations"

interface PaymentProcessingProps {
  onComplete: () => void
  language?: Language
}

export function PaymentProcessing({ onComplete, language = "en" }: PaymentProcessingProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 7000) // 7 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h1 className="text-2xl sm:text-[32px] font-bold text-white mb-8">{t("processing.title", language)}</h1>

        {/* Green Loading Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            {/* Outer rotating circle */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#1ed760] border-r-[#1ed760] animate-spin"></div>

            {/* Inner static circle */}
            <div className="absolute inset-2 rounded-full border-4 border-[#1ed760] flex items-center justify-center">
              {/* Checkmark will appear after completion */}
              <svg className="w-10 h-10 text-[#1ed760]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-[#a7a7a7] text-sm sm:text-lg">{t("processing.message", language)}</p>
      </div>
    </div>
  )
}
