import { getClientIP } from "@/lib/get-client-ip"
import { visitorStore } from "@/lib/visitor-store"

export async function GET() {
  const ip = await getClientIP()
  const isBlocked = visitorStore.isIPBlocked(ip)

  return Response.json({ isBlocked, ip })
}
