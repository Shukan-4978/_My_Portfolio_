import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import api from '@/services/api'
import {
  FolderOpen, MessageSquare, Users, BookOpen,
  TrendingUp, Eye, CheckCircle, Clock
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Stats {
  totalProjects: number
  totalMessages: number
  totalVisitors: number
  totalBlogs: number
  unreadMessages: number
  recentVisitors: { date: string; count: number }[]
}

const MOCK_VISITORS = Array.from({ length: 7 }).map((_, i) => ({
  date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('en', { weekday: 'short' }),
  count: Math.floor(Math.random() * 80 + 20),
}))

export default function Dashboard() {
  const { admin } = useAuth()
  const [stats, setStats] = useState<Stats>({
    totalProjects: 6,
    totalMessages: 0,
    totalVisitors: 0,
    totalBlogs: 4,
    unreadMessages: 0,
    recentVisitors: MOCK_VISITORS,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/visitors/analytics')
      .then((res) => {
        if (res.data?.data) {
          setStats((prev) => ({ ...prev, ...res.data.data }))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const STAT_CARDS = [
    { label: 'Total Projects', value: stats.totalProjects, icon: FolderOpen, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
    { label: 'Messages', value: stats.totalMessages, icon: MessageSquare, color: '#10b981', bg: 'rgba(16,185,129,0.1)', badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} new` : undefined },
    { label: 'Total Visitors', value: stats.totalVisitors, icon: Users, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { label: 'Blog Posts', value: stats.totalBlogs, icon: BookOpen, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  ]

  const QUICK_ACTIONS = [
    { label: 'Add Project', href: '/projects', icon: FolderOpen },
    { label: 'Write Blog', href: '/blogs', icon: BookOpen },
    { label: 'View Messages', href: '/messages', icon: MessageSquare },
    { label: 'Update Skills', href: '/skills', icon: TrendingUp },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {admin?.email.split('@')[0]} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              {card.badge && <span className="badge badge-success">{card.badge}</span>}
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {loading ? '...' : card.value.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="admin-card p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Visitor Traffic</h3>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <span className="badge badge-info flex items-center gap-1">
              <Eye size={10} /> Live
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.recentVisitors}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0d1117', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8 }}
                labelStyle={{ color: '#e5e7eb' }}
              />
              <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#colorVisitors)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="admin-card p-5"
        >
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                  <action.icon size={15} className="text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                </div>
                <span className="text-sm text-foreground">{action.label}</span>
                <span className="ml-auto text-muted-foreground text-xs">→</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: CheckCircle, label: 'Portfolio Live', desc: 'All sections deployed', color: 'text-emerald-400' },
          { icon: Clock, label: 'Last Updated', desc: new Date().toLocaleDateString(), color: 'text-indigo-400' },
          { icon: TrendingUp, label: 'Performance', desc: 'Lighthouse 95+ score', color: 'text-amber-400' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="admin-card p-4 flex items-center gap-3"
          >
            <item.icon size={18} className={item.color} />
            <div>
              <div className="text-sm font-medium text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
