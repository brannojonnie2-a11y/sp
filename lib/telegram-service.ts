// Send notifications to Telegram
export async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.warn("[v0] Telegram credentials not configured")
    return false
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      console.error("[v0] Telegram API error:", await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error("[v0] Error sending Telegram notification:", error)
    return false
  }
}
