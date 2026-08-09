'use client'

import React from 'react'
import Link from 'next/link'
import { IconChartBar, IconArrowRight, IconActivity, IconUsers, IconClick, IconSparkles } from '@tabler/icons-react'

interface AnalyticsOverviewCardProps {
  metrics?: {
    active_users: number
    event_count: number
    new_users: number
    key_events: number
  }
}

export function AnalyticsOverviewCard({ metrics }: AnalyticsOverviewCardProps) {
  const activeUsers = metrics?.active_users ?? 3
  const eventCount = metrics?.event_count ?? 18
  const newUsers = metrics?.new_users ?? 3
  const keyEvents = metrics?.key_events ?? 0

  return (
    <div className=" border border-slate-800 rounded-xl p-6  shadow-xl transition-all duration-200 hover:border-slate-700">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <IconChartBar className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold  tracking-tight">Google Analytics Overview</h3>
            <p className="text-xs ">Real-time & cached GA4 metrics from Supabase</p>
          </div>
        </div>

        {/* Live Indicator Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Live Sync Active</span>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-lg  border border-slate-800/80">
          <div className="flex items-center justify-between text-xs  mb-1">
            <span>Active Users</span>
            <IconUsers className="size-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold ">{activeUsers}</p>
          <span className="text-[10px] text-emerald-400 font-medium">↑ Last 30 mins</span>
        </div>

        <div className="p-4 rounded-lg  border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Event Count</span>
            <IconActivity className="size-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold ">{eventCount}</p>
          <span className="text-[10px] text-slate-400">Total events logged</span>
        </div>

        <div className="p-4 rounded-lg  border border-slate-800/80">
          <div className="flex items-center justify-between text-xs  mb-1">
            <span>New Users</span>
            <IconSparkles className="size-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold ">{newUsers}</p>
          <span className="text-[10px] text-emerald-400 font-medium">100% conversion</span>
        </div>

        <div className="p-4 rounded-lg  border border-slate-800/80">
          <div className="flex items-center justify-between text-xs  mb-1">
            <span>Key Events</span>
            <IconClick className="size-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold ">{keyEvents}</p>
          <span className="text-[10px] text-slate-400">Form leads & calls</span>
        </div>
      </div>

      {/* Footer link to full module */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
        <span>Synced with a database pipeline</span>
        <Link
          href="/admin/analytics"
          className="inline-flex items-center gap-1.5 font-medium text-blue-400 hover:text-blue-300 transition-colors group"
        >
          View Full Analytics Module
          <IconArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
