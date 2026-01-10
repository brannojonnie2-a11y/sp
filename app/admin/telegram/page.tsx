"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TelegramAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [botToken, setBotToken] = useState("")
  const [chatId, setChatId] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = () => {
    if (password === "weareme") {
      setIsAuthenticated(true)
      setPassword("")
      fetchConfig()
    } else {
      setMessage("Invalid password")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const fetchConfig = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/telegram/get")
      const data = await response.json()
      setBotToken(data.botToken || "")
      setChatId(data.chatId || "")
    } catch (error) {
      setMessage("Failed to fetch configuration")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!botToken || !chatId) {
      setMessage("Please fill in all fields")
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/admin/telegram/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken, chatId }),
      })

      const data = await response.json()
      if (response.ok) {
        setMessage("Configuration updated successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage(data.error || "Failed to update configuration")
      }
    } catch (error) {
      setMessage("Failed to save configuration")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to access Telegram settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            {message && <p className="text-sm text-red-500">{message}</p>}
            <Button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-700">
              Login
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Telegram Settings</h1>
          <p className="text-muted-foreground">Manage bot token and chat ID</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Bot Token</label>
              <Input
                type="password"
                placeholder="Enter Telegram bot token"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Chat ID</label>
              <Input
                type="text"
                placeholder="Enter Telegram chat ID"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
              />
            </div>

            {message && (
              <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>{message}</p>
            )}

            <Button onClick={handleSave} disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
              {loading ? "Saving..." : "Save Configuration"}
            </Button>

            <Button onClick={() => setIsAuthenticated(false)} variant="outline" className="w-full">
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
