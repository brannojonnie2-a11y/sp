import { LiveVisitorsDashboard } from "@/components/live-visitors-dashboard"
import { BlockedIPsDashboard } from "@/components/blocked-ips-dashboard"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor visitors and manage blocked IPs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveVisitorsDashboard />
          <BlockedIPsDashboard />
        </div>
      </div>
    </main>
  )
}
