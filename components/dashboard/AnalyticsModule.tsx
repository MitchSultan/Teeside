'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  IconRefresh,
  IconExternalLink,
  IconMapPin,
  IconBuildingStore,
  IconWorld,
} from '@tabler/icons-react'
import type { DailyMetric, RealtimeMetric, SuggestedBreakdown } from '@/lib/queries/analytics'

interface AnalyticsModuleProps {
  initialOverview?: {
    latest: {
      active_users: number
      event_count: number
      new_users: number
      key_events: number
    }
    history: DailyMetric[]
  }
  initialRealtime?: RealtimeMetric
  initialSuggested?: SuggestedBreakdown[]
}

type MetricTab = 'active_users' | 'event_count' | 'key_events' | 'new_users'

export function AnalyticsModule({
  initialOverview,
  initialRealtime,
  initialSuggested,
}: AnalyticsModuleProps) {
  const [activeTab, setActiveTab] = useState<MetricTab>('active_users')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const overview = initialOverview || {
    latest: { active_users: 3, event_count: 18, new_users: 3, key_events: 0 },
    history: [
      { date: 'Aug 02', active_users: 1, event_count: 3, new_users: 1, key_events: 0, sessions: 1, page_views: 3 },
      { date: 'Aug 03', active_users: 1, event_count: 4, new_users: 0, key_events: 0, sessions: 1, page_views: 4 },
      { date: 'Aug 04', active_users: 1, event_count: 2, new_users: 0, key_events: 0, sessions: 1, page_views: 2 },
      { date: 'Aug 05', active_users: 2, event_count: 6, new_users: 1, key_events: 0, sessions: 2, page_views: 6 },
      { date: 'Aug 06', active_users: 2, event_count: 8, new_users: 0, key_events: 0, sessions: 2, page_views: 8 },
      { date: 'Aug 07', active_users: 2, event_count: 11, new_users: 1, key_events: 0, sessions: 2, page_views: 11 },
      { date: 'Aug 08', active_users: 3, event_count: 18, new_users: 3, key_events: 0, sessions: 3, page_views: 18 },
    ],
  }

  const realtime = initialRealtime || {
    active_users_30m: 3,
    per_minute: [
      { minute: '30m ago', count: 0 },
      { minute: '25m ago', count: 0 },
      { minute: '20m ago', count: 1 },
      { minute: '15m ago', count: 0 },
      { minute: '10m ago', count: 1 },
      { minute: '5m ago', count: 1 },
      { minute: 'Just now', count: 2 },
    ],
    country_breakdown: [{ country: 'Kenya', active_users: 1 }],
  }

  const suggested = initialSuggested || [
    {
      category: 'listing_location',
      title: 'Active Users by Listing Location',
      items: [
        { label: 'Nairobi', value: 1 },
        { label: 'Kilimani', value: 1 },
        { label: 'Westlands', value: 1 },
      ],
    },
    {
      category: 'property_page_views',
      title: 'Views by Property Page',
      items: [
        { label: '3BR Kilimani Apartment', value: 11 },
        { label: '4BR Westlands Luxury Villa', value: 5 },
        { label: 'Ruaka Studio Apartment', value: 2 },
      ],
    },
    {
      category: 'traffic_sources',
      title: 'Sessions by Traffic Source',
      items: [
        { label: 'Direct', value: 3 },
        { label: 'Organic Search', value: 1 },
        { label: 'Social / Diaspora', value: 1 },
      ],
    },
  ]

  // Metric tab details
  const tabConfig: Record<
    MetricTab,
    { label: string; value: number; path: string; endY: number; areaPath: string }
  > = {
    active_users: {
      label: 'Active Users',
      value: overview.latest.active_users,
      // Flat for ~70% then sharp upward spike (x=0..480 at y=250, curve to x=680, y=50)
      path: 'M 0 250 C 300 250, 480 250, 560 220 C 620 190, 650 100, 680 50',
      areaPath: 'M 0 250 C 300 250, 480 250, 560 220 C 620 190, 650 100, 680 50 L 680 270 L 0 270 Z',
      endY: 50,
    },
    event_count: {
      label: 'Event Count',
      value: overview.latest.event_count,
      // Flat start then steep dramatic spike upwards
      path: 'M 0 260 C 250 260, 450 250, 530 200 C 600 150, 640 60, 680 30',
      areaPath: 'M 0 260 C 250 260, 450 250, 530 200 C 600 150, 640 60, 680 30 L 680 270 L 0 270 Z',
      endY: 30,
    },
    key_events: {
      label: 'Key Events',
      value: overview.latest.key_events,
      // Near flat baseline
      path: 'M 0 265 C 200 265, 400 265, 550 265 C 620 265, 650 265, 680 265',
      areaPath: 'M 0 265 C 200 265, 400 265, 550 265 C 620 265, 650 265, 680 265 L 680 270 L 0 270 Z',
      endY: 265,
    },
    new_users: {
      label: 'New Users',
      value: overview.latest.new_users,
      // Flat 70%, sharp curve up
      path: 'M 0 255 C 320 255, 460 255, 550 210 C 610 170, 650 90, 680 60',
      areaPath: 'M 0 255 C 320 255, 460 255, 550 210 C 610 170, 650 90, 680 60 L 680 270 L 0 270 Z',
      endY: 60,
    },
  }

  const currentTabInfo = tabConfig[activeTab]

  const handleManualSync = async () => {
    setIsRefreshing(true)
    try {
      await Promise.all([
        fetch('/api/analytics/sync'),
        fetch('/api/analytics/realtime'),
      ])
    } catch (e) {
      console.error('Manual sync failed:', e)
    } finally {
      setTimeout(() => setIsRefreshing(false), 800)
    }
  }

  const dateLabels = overview.history.map((h) => h.date)

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:px-6">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Google Analytics</h1>
          <p className="text-xs text-slate-400">
            Property ID: <span className="font-mono text-slate-300">549130028</span> • Teeside Real Estate
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleManualSync}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all cursor-pointer disabled:opacity-50"
          >
            <IconRefresh className={`size-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync GA4 Now'}</span>
          </button>
        </div>
      </div>

      {/* TOP ROW: Primary Card + Side Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PRIMARY CARD (2 cols on lg) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            {/* Metric Selector Tabs */}
            <div className="flex flex-wrap items-center gap-6 border-b border-slate-800/80 pb-3">
              {(
                [
                  'active_users',
                  'event_count',
                  'key_events',
                  'new_users',
                ] as MetricTab[]
              ).map((tabKey) => {
                const isActive = activeTab === tabKey
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`relative pb-3 text-sm transition-all cursor-pointer font-medium ${
                      isActive
                        ? 'text-blue-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tabConfig[tabKey].label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Large Bold Metric Number */}
            <div className="mt-4 mb-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                {currentTabInfo.value}
              </span>
              <span className="text-xs text-slate-400 ml-3 font-normal">
                vs previous 7 days
              </span>
            </div>
          </div>

          {/* Inline SVG Trend Line Chart (No third party library) */}
          <div className="relative w-full mt-4">
            <svg
              viewBox="0 0 700 300"
              className="w-full h-48 sm:h-56 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Horizontal dashed gray gridlines */}
              <line
                x1="0"
                y1="50"
                x2="700"
                y2="50"
                stroke="#1e293b"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="120"
                x2="700"
                y2="120"
                stroke="#1e293b"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="190"
                x2="700"
                y2="190"
                stroke="#1e293b"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="260"
                x2="700"
                y2="260"
                stroke="#1e293b"
                strokeDasharray="4 4"
                strokeWidth="1"
              />

              {/* Gradient Fill Under Curve */}
              <path
                d={currentTabInfo.areaPath}
                fill="url(#blueGradient)"
                className="transition-all duration-500 ease-in-out"
              />

              {/* Smooth Bézier Trend Path */}
              <path
                d={currentTabInfo.path}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500 ease-in-out"
              />

              {/* Glowing Circle at final data point ("Today") */}
              <circle
                cx="680"
                cy={currentTabInfo.endY}
                r="6"
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#glow)"
                className="transition-all duration-500 ease-in-out"
              />
            </svg>

            {/* X-Axis Date Labels */}
            <div className="flex justify-between items-center text-xs text-slate-500 mt-2 px-1 pt-2 border-t border-slate-800/60 font-mono">
              {dateLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  className={idx === dateLabels.length - 1 ? 'text-blue-400 font-semibold' : ''}
                >
                  {lbl}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SIDE CARD: Active Users in Last 30 Minutes */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            {/* Header with live pulsing dot */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Users in Last 30 Minutes
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            </div>

            {/* Huge Number Top-Left */}
            <div className="my-3">
              <span className="text-5xl font-black text-white font-mono tracking-tight">
                {realtime.active_users_30m}
              </span>
              <p className="text-xs text-slate-400 mt-1">active users per minute</p>
            </div>

            {/* Mini Sparkline Bar Chart for per minute activity */}
            <div className="flex items-end gap-1.5 h-12 my-5 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
              {realtime.per_minute.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-blue-500/80 hover:bg-blue-400 rounded-t transition-all"
                  style={{
                    height: `${Math.max(15, (item.count / 3) * 100)}%`,
                  }}
                  title={`${item.minute}: ${item.count} users`}
                />
              ))}
            </div>
          </div>

          {/* Mini Breakdown Table (Country -> Active Users) */}
          <div className="border-t border-slate-800/80 pt-4 mt-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-3">
              <div className="flex items-center gap-1.5">
                <IconWorld className="size-3.5 text-slate-400" />
                <span>Country</span>
              </div>
              <span>Active Users</span>
            </div>

            <div className="space-y-2">
              {realtime.country_breakdown.map((row, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm py-1.5 px-2.5 rounded bg-slate-950/50 border border-slate-800/50"
                >
                  <span className="text-slate-200 font-medium">{row.country}</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    {row.active_users}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECOND ROW: Three Equal-Width Small Cards ("Suggested for you" style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: Active Users by Listing Location */}
        {suggested.find((s) => s.category === 'listing_location') && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
                  <IconMapPin className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200">
                  Active Users by Listing Location
                </h3>
              </div>

              {/* 2-Column Mini Table with colored underline on top row */}
              <div className="space-y-2 mb-6">
                {suggested
                  .find((s) => s.category === 'listing_location')
                  ?.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between text-sm py-2 px-1 ${
                        idx === 0
                          ? 'border-b-2 border-blue-500/80 text-white font-medium'
                          : 'border-b border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="truncate pr-2">{item.label}</span>
                      <span className="font-mono font-semibold text-slate-100">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Link
                href="/admin/properties"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>View more</span>
                <IconExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        )}

        {/* CARD 2: Views by Property Page */}
        {suggested.find((s) => s.category === 'property_page_views') && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-400">
                  <IconBuildingStore className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200">
                  Views by Property Page
                </h3>
              </div>

              {/* 2-Column Mini Table with colored underline on top row */}
              <div className="space-y-2 mb-6">
                {suggested
                  .find((s) => s.category === 'property_page_views')
                  ?.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between text-sm py-2 px-1 ${
                        idx === 0
                          ? 'border-b-2 border-indigo-500/80 text-white font-medium'
                          : 'border-b border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="truncate pr-2">{item.label}</span>
                      <span className="font-mono font-semibold text-slate-100">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Link
                href="/admin/properties"
                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>View more</span>
                <IconExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        )}

        {/* CARD 3: Sessions by Traffic Source */}
        {suggested.find((s) => s.category === 'traffic_sources') && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                  <IconWorld className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200">
                  Sessions by Traffic Source
                </h3>
              </div>

              {/* 2-Column Mini Table with colored underline on top row */}
              <div className="space-y-2 mb-6">
                {suggested
                  .find((s) => s.category === 'traffic_sources')
                  ?.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between text-sm py-2 px-1 ${
                        idx === 0
                          ? 'border-b-2 border-emerald-500/80 text-white font-medium'
                          : 'border-b border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="truncate pr-2">{item.label}</span>
                      <span className="font-mono font-semibold text-slate-100">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>View more</span>
                <IconExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
