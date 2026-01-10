"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Visitor {
  ip: string
  country: string
  timestamp: number
  userAgent: string
}

export function LiveVisitorsDashboard() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch("/api/visitors/list?minutes=5")
        const data = await res.json()
        setVisitors(data.visitors || [])
      } catch (error) {
        console.error("[v0] Error fetching visitors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitors()
    const interval = setInterval(fetchVisitors, 3000) // Refresh every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Visitors</CardTitle>
        <CardDescription>Last 5 minutes of activity</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : visitors.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No recent visitors</div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {visitors.map((visitor, idx) => (
              <div
                key={`${visitor.ip}-${visitor.timestamp}-${idx}`}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-semibold">{visitor.ip}</span>
                    <Badge variant="outline">{visitor.country}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{formatTime(visitor.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
