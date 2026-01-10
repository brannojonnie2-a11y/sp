import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fallback to environment variables if Edge Config is not set up
    const botToken = process.env.TELEGRAM_BOT_TOKEN || ""
    const chatId = process.env.TELEGRAM_CHAT_ID || ""

    return NextResponse.json({
      botToken,
      chatId,
    })
  } catch (error) {
    console.error("[v0] Error getting Telegram config:", error)
    return NextResponse.json({ error: "Failed to retrieve configuration" }, { status: 500 })
  }
}
