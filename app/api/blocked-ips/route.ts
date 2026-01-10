import { visitorStore } from "@/lib/visitor-store"

export async function GET() {
  const blockedIPs = visitorStore.getBlockedIPs()
  return Response.json({ blockedIPs })
}

export async function POST(request: Request) {
  try {
    const { ip, reason, action } = await request.json()

    if (action === "block") {
      visitorStore.blockIP(ip, reason)
      return Response.json({ success: true, message: "IP blocked" })
    } else if (action === "unblock") {
      visitorStore.unblockIP(ip)
      return Response.json({ success: true, message: "IP unblocked" })
    }

    return Response.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Error managing blocked IPs:", error)
    return Response.json({ error: "Failed to manage blocked IP" }, { status: 500 })
  }
}
