import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import {
  LayoutDashboard, FolderOpen, Wrench, Briefcase,
  Award, Trophy, BookOpen, Settings,
  FileText, Users, Star, LogOut, ChevronLeft, Menu,
  Send, Link, Search, BarChart3
} from 'lucide-react'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: FolderOpen, label: 'Projects', to: '/projects' },
  { icon: Wrench, label: 'Skills', to: '/skills' },
  { icon: Briefcase, label: 'Experience', to: '/experience' },
  { icon: Award, label: 'Certificates', to: '/certificates' },
  { icon: Trophy, label: 'Achievements', to: '/achievements' },
  { icon: BookOpen, label: 'Blog', to: '/blogs' },
  { icon: Star, label: 'Testimonials', to: '/testimonials' },
  { icon: Settings, label: 'Services', to: '/services' },
  { icon: Send, label: 'Messages', to: '/messages' },
  { icon: Users, label: 'Visitors', to: '/visitors' },
  { icon: BarChart3, label: 'Analytics', to: '/analytics' },
  { icon: Link, label: 'Social Links', to: '/social-links' },
  { icon: FileText, label: 'Portfolio Data', to: '/portfolio-data' },
  { icon: Search, label: 'SEO', to: '/seo' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-screen bg-card border-r border-border flex-shrink-0 overflow-hidden"
      style={{ minWidth: collapsed ? 72 : 260 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                   style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                SP
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Admin Panel</div>
                <div className="text-xs text-muted-foreground">Shukan's Portfolio</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={17} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        {admin && (
          <div className="px-3 py-2 mb-1">
            <AnimatePresence>
              {!collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="text-xs font-medium text-foreground truncate">{admin.email}</div>
                  <div className="text-xs text-muted-foreground capitalize">{admin.role}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={17} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
}
