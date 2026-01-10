import { visitorStore } from "@/lib/visitor-store"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const minutes = Number.parseInt(searchParams.get("minutes") || "5")

  const visitors = visitorStore.getRecentVisitors(minutes)

  return Response.json({ visitors })
}
