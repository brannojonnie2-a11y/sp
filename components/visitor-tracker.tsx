"use client"

import { useEffect } from "react"

export function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch("/api/visitors/track", { method: "POST" })
      } catch (error) {
        console.error("[v0] Error tracking visitor:", error)
      }
    }

    trackVisitor()
  }, [])

  return null
}
