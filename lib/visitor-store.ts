// In-memory store for visitors and blocked IPs
// In production, this would use a database

interface Visitor {
  ip: string
  country: string
  timestamp: number
  userAgent: string
}

interface BlockedIP {
  ip: string
  blockedAt: number
  reason?: string
}

class VisitorStore {
  private visitors: Map<string, Visitor> = new Map()
  private blockedIPs: Map<string, BlockedIP> = new Map()
  private maxVisitors = 100

  addVisitor(ip: string, country: string, userAgent: string) {
    this.visitors.set(ip, {
      ip,
      country,
      timestamp: Date.now(),
      userAgent,
    })

    // Keep only recent visitors
    if (this.visitors.size > this.maxVisitors) {
      const sorted = Array.from(this.visitors.entries())
        .sort((a, b) => b[1].timestamp - a[1].timestamp)
        .slice(0, this.maxVisitors)
      this.visitors = new Map(sorted)
    }
  }

  getRecentVisitors(minutes = 5): Visitor[] {
    const cutoffTime = Date.now() - minutes * 60 * 1000
    return Array.from(this.visitors.values())
      .filter((v) => v.timestamp > cutoffTime)
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  blockIP(ip: string, reason?: string) {
    this.blockedIPs.set(ip, {
      ip,
      blockedAt: Date.now(),
      reason,
    })
  }

  unblockIP(ip: string) {
    this.blockedIPs.delete(ip)
  }

  isIPBlocked(ip: string): boolean {
    return this.blockedIPs.has(ip)
  }

  getBlockedIPs(): BlockedIP[] {
    return Array.from(this.blockedIPs.values()).sort((a, b) => b.blockedAt - a.blockedAt)
  }
}

export const visitorStore = new VisitorStore()
