import { NextResponse } from 'next/server'
import { syncRealtimeMetrics } from '@/lib/analytics/sync'

export async function GET() {
  const result = await syncRealtimeMetrics()

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    realtimeSync: result,
  })
}

export async function POST() {
  return GET()
}
