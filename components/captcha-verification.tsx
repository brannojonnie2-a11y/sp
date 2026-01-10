"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useTranslation } from "@/lib/language-context"
import { RefreshCw } from "lucide-react"

interface CaptchaVerificationProps {
  onVerify: () => void
}

export function CaptchaVerification({ onVerify }: CaptchaVerificationProps) {
  const [captchaCode, setCaptchaCode] = useState("")
  const [userInput, setUserInput] = useState("")
  const [error, setError] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const { t } = useTranslation()

  const generateCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    setCaptchaCode(code)
    setUserInput("")
    setError(false)
  }

  useEffect(() => {
    generateCode()
  }, [])

  const handleVerify = async () => {
    if (userInput === captchaCode) {
      setIsVerifying(true)
      try {
        await fetch("/api/captcha-verified", { method: "POST" })
        onVerify()
      } catch (err) {
        console.error("[v0] Captcha verification error:", err)
        onVerify() // proceed anyway to not block user
      }
    } else {
      setError(true)
      setUserInput("")
    }
  }

  return (
    <div className="w-full max-w-[400px] bg-[#121212] p-8 rounded-lg space-y-8 border border-[#2a2a2a]">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">{t.captcha.title}</h1>
        <p className="text-[#a7a7a7] text-sm">{t.captcha.subtitle}</p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="relative group">
          <div className="bg-[#2a2a2a] px-8 py-4 rounded-md text-3xl font-mono tracking-[0.5em] text-[#1ed760] select-none italic font-bold border-2 border-dashed border-[#1ed760]/30">
            {captchaCode}
          </div>
          <button
            onClick={generateCode}
            className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 text-[#a7a7a7] hover:text-white transition-colors"
            title={t.captcha.getNewCode}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 w-full">
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={userInput}
              onChange={(val) => {
                setUserInput(val)
                setError(false)
              }}
            >
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-12 h-12 bg-[#2a2a2a] border-[#727272] text-white text-xl focus:border-[#1ed760] rounded-md"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{t.captcha.incorrectCode}</p>}

          <Button
            onClick={handleVerify}
            disabled={userInput.length < 4 || isVerifying}
            className="w-full bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold h-12 rounded-full transition-all text-base"
          >
            {isVerifying ? t.captcha.verifying : t.captcha.verifyButton}
          </Button>
        </div>
      </div>

      <p className="text-[#a7a7a7] text-[10px] text-center leading-tight">{t.captcha.footerText}</p>
    </div>
  )
}
