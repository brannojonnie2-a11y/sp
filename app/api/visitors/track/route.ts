import { getClientIP } from "@/lib/get-client-ip"
import { getGeolocation } from "@/lib/get-geolocation"
import { visitorStore } from "@/lib/visitor-store"
import { headers } from "next/headers"

export async function POST(request: Request) {
  try {
    const ip = await getClientIP()

    if (visitorStore.isIPBlocked(ip)) {
      return Response.json({ blocked: true }, { status: 403 })
    }

    const headersList = await headers()
    const userAgent = headersList.get("user-agent") || "unknown"

    const geo = await getGeolocation(ip)

    visitorStore.addVisitor(ip, geo.country, userAgent)

    return Response.json({ success: true })
  } catch (error) {
    console.error("[v0] Error tracking visitor:", error)
    return Response.json({ error: "Failed to track visitor" }, { status: 500 })
  }
}
