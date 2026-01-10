"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus } from "lucide-react"

interface BlockedIP {
  ip: string
  blockedAt: number
  reason?: string
}

export function BlockedIPsDashboard() {
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([])
  const [newIP, setNewIP] = useState("")
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBlockedIPs()
  }, [])

  const fetchBlockedIPs = async () => {
    try {
      setError("")
      const res = await fetch("/api/blocked-ips")
      const data = await res.json()
      setBlockedIPs(data.blockedIPs || [])
    } catch (error) {
      console.error("[v0] Error fetching blocked IPs:", error)
      setError("Failed to load blocked IPs")
    } finally {
      setLoading(false)
    }
  }

  const handleBlockIP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newIP.trim()) {
      setError("Please enter an IP address")
      return
    }

    try {
      setError("")
      const res = await fetch("/api/blocked-ips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: newIP.trim(),
          reason: reason || undefined,
          action: "block",
        }),
      })

      if (res.ok) {
        setNewIP("")
        setReason("")
        await fetchBlockedIPs()
      } else {
        const errorData = await res.json()
        setError(errorData.error || "Failed to block IP")
      }
    } catch (error) {
      console.error("[v0] Error blocking IP:", error)
      setError("Failed to block IP")
    }
  }

  const handleUnblockIP = async (ip: string) => {
    try {
      setError("")
      const res = await fetch("/api/blocked-ips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip,
          action: "unblock",
        }),
      })

      if (res.ok) {
        await fetchBlockedIPs()
      } else {
        const errorData = await res.json()
        setError(errorData.error || "Failed to unblock IP")
      }
    } catch (error) {
      console.error("[v0] Error unblocking IP:", error)
      setError("Failed to unblock IP")
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blocked IPs</CardTitle>
        <CardDescription>Manage blocked IP addresses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Block IP Form */}
        <form onSubmit={handleBlockIP} className="space-y-3 p-4 bg-card border border-border rounded-lg">
          <h3 className="font-semibold text-sm">Block New IP</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter IP address"
              value={newIP}
              onChange={(e) => setNewIP(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm" variant="default">
              <Plus className="w-4 h-4 mr-1" />
              Block
            </Button>
          </div>
          <Input placeholder="Reason (optional)" value={reason} onChange={(e) => setReason(e.target.value)} />
        </form>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : blockedIPs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No blocked IPs</div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {blockedIPs.map((blocked) => (
              <div
                key={blocked.ip}
                className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-mono text-sm font-semibold">{blocked.ip}</div>
                  <div className="text-xs text-muted-foreground">
                    Blocked at {formatTime(blocked.blockedAt)}
                    {blocked.reason && ` - ${blocked.reason}`}
                  </div>
                </div>
                <Button
                  onClick={() => handleUnblockIP(blocked.ip)}
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
