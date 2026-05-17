'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate, formatCurrency } from '@/lib/utils' // Keep for potential future use or if utility functions are needed.
import { MOCK_INTAKE_RECORDS, MOCK_FOLLOW_UP_TASKS, MOCK_REPORTS } from '@/lib/data'
import { Search, Plus, Download, Eye } from 'lucide-react'

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  // ── Feature 1: Intake Queue Management (/dashboard/intake-queue) ──────────────────────
  if (slug === 'intake-queue') {
    const items = MOCK_INTAKE_RECORDS.filter(i =>
      (!search || i.clientNameRaw.toLowerCase().includes(search.toLowerCase()) || i.initialNotes.toLowerCase().includes(search.toLowerCase())) &&
      (!statusFilter || i.status === statusFilter)
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="Intake Queue"
          subtitle={`${items.length} intake records total`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />New Intake Record</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search intake records..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processed">Processed</option>
                <option value="Requires Clarification">Requires Clarification</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Client Name</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => setSelected(selected === item.id ? null : item.id)}
                    className={`hover:bg-zinc-50 cursor-pointer transition-colors ${selected === item.id ? 'bg-indigo-50' : ''}`}
                  >
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.clientNameRaw}</td>
                    <td className="px-6 py-3 text-zinc-500">{item.clientContactRaw || 'N/A'}</td>
                    <td className="px-6 py-3 text-zinc-700">{item.source}</td>
                    <td className="px-6 py-3">
                      <Badge variant={
                        item.status === 'Pending' ? 'warning' :
                        item.status === 'Processed' ? 'success' :
                        item.status === 'Requires Clarification' ? 'error' : 'secondary'
                      }>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3">
                      <button className="text-zinc-400 hover:text-zinc-700 p-1"><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {items.length} of {MOCK_INTAKE_RECORDS.length} intake records
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 2: Follow-up Dashboard (/dashboard/follow-up-dashboard) ──────────────────────
  if (slug === 'follow-up-dashboard') {
    const items = MOCK_FOLLOW_UP_TASKS.filter(i =>
      !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="Follow-up Dashboard"
          subtitle={`${items.length} follow-up tasks`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />Add Follow-up Task</Button>}
        />
        <div className="mb-4">
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(item.id)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {String(item.title).slice(0, 2).toUpperCase()}
                  </div>
                  <Badge variant={
                    item.status === 'Completed' ? 'success' :
                    item.status === 'Overdue' ? 'error' :
                    item.status === 'Pending' ? 'warning' : 'info'
                  }>{item.status}</Badge>
                </div>
                <h3 className="font-semibold text-zinc-900 text-sm mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-xs mb-3">{item.type}</p>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Priority: {item.priority}</span>
                  <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // ── Feature 3: ROI Reports (/dashboard/roi-reports) ──────────────────────
  if (slug === 'roi-reports') {
    const items = MOCK_REPORTS.filter(i =>
      !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.period.toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="ROI Reports"
          subtitle={`${items.length} reports`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download size={14} className="mr-1" />Export</Button>
              <Button size="sm"><Plus size={14} className="mr-1" />New Report</Button>
            </div>
          }
        />
        <Card>
          <CardHeader>
            <div className="relative max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Period</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50 cursor-pointer" onClick={() => setSelected(item.id)}>
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.title}</td>
                    <td className="px-6 py-3 text-zinc-500">{item.period}</td>
                    <td className="px-6 py-3 text-zinc-700">{item.type}</td>
                    <td className="px-6 py-3">
                      <Badge variant={
                        item.status === 'Generated' ? 'success' :
                        item.status === 'Pending' ? 'info' : 'error'
                      }>{item.status}</Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{new Date(item.generatedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Default: feature hub ──────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <AppHeader title="Features" subtitle="Select a feature to get started" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { slug: 'intake-queue', name: 'Intake Queue', description: 'Manage incoming client requests and notes, turning messy input into actionable records.', count: MOCK_INTAKE_RECORDS.length },
          { slug: 'follow-up-dashboard', name: 'Follow-up Dashboard', description: 'Prioritize and track all client follow-up tasks to ensure no client is missed.', count: MOCK_FOLLOW_UP_TASKS.length },
          { slug: 'roi-reports', name: 'ROI Reports', description: 'Generate client-ready reports to prove value, track retention, and demonstrate ROI without manual effort.', count: MOCK_REPORTS.length },
        ].map(f => (
          <a key={f.slug} href={`/dashboard/${f.slug}`}>
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <Eye size={20} />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">{f.name}</h3>
                <p className="text-zinc-500 text-sm mb-4">{f.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">{f.count} records</span>
                  <span className="text-xs font-medium text-indigo-600">Open →</span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}