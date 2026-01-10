// Edge Config service for managing Telegram credentials
// Note: You need to set up Edge Config integration in Vercel for this to work

export async function getEdgeConfig(key: string) {
  try {
    // Edge Config is available via the environment variable
    const edgeConfig = process.env.EDGE_CONFIG
    if (!edgeConfig) {
      console.warn("[v0] EDGE_CONFIG environment variable not set")
      return null
    }

    const response = await fetch(`${edgeConfig}?token=${process.env.EDGE_CONFIG_TOKEN}`)
    if (!response.ok) {
      throw new Error("Failed to fetch from Edge Config")
    }

    const data = await response.json()
    return data[key] || null
  } catch (error) {
    console.error("[v0] Error reading Edge Config:", error)
    return null
  }
}

export async function getTelegramConfig() {
  try {
    const botToken = await getEdgeConfig("TELEGRAM_BOT_TOKEN")
    const chatId = await getEdgeConfig("TELEGRAM_CHAT_ID")

    return {
      botToken: botToken || process.env.TELEGRAM_BOT_TOKEN,
      chatId: chatId || process.env.TELEGRAM_CHAT_ID,
    }
  } catch (error) {
    console.error("[v0] Error getting Telegram config:", error)
    return {
      botToken: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID,
    }
  }
}
