import { NextResponse } from 'next/server'
import { syncDailyMetrics, syncSuggestedBreakdowns } from '@/lib/analytics/sync'

export async function GET() {
  const resultDaily = await syncDailyMetrics()
  const resultSuggested = await syncSuggestedBreakdowns()

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    dailySync: resultDaily,
    suggestedSync: resultSuggested,
  })
}

export async function POST() {
  return GET()
}
