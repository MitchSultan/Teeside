import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { AnalyticsModule } from '@/components/dashboard/AnalyticsModule'
import {
  getAnalyticsOverviewData,
  getRealtimeAnalyticsData,
  getSuggestedBreakdownsData,
} from '@/lib/queries/analytics'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function AdminAnalyticsPage() {
  const [overview, realtime, suggested] = await Promise.all([
    getAnalyticsOverviewData(),
    getRealtimeAnalyticsData(),
    getSuggestedBreakdownsData(),
  ])

  return (
    <>
      <AdminHeader title="Analytics" />
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6 bg-slate-950 min-h-screen">
        <AnalyticsModule
          initialOverview={overview}
          initialRealtime={realtime}
          initialSuggested={suggested}
        />
      </div>
    </>
  )
}
