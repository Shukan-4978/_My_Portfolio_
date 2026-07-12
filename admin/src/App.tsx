import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import '@/index.css'

import Login from '@/pages/Login'
import AdminLayout from '@/components/layout/AdminLayout'
import Dashboard from '@/pages/Dashboard'
import Projects from '@/pages/Projects'
import Skills from '@/pages/Skills'
import Experience from '@/pages/Experience'
import Certificates from '@/pages/Certificates'
import Achievements from '@/pages/Achievements'
import Blogs from '@/pages/Blogs'

import Messages from '@/pages/Messages'
import PortfolioData from '@/pages/PortfolioData'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/blogs" element={<Blogs />} />

            <Route path="/messages" element={<Messages />} />
            <Route path="/portfolio-data" element={<PortfolioData />} />
            <Route path="/social-links" element={<PortfolioData />} />
            <Route path="/seo" element={<PortfolioData />} />
            <Route path="/visitors" element={<Dashboard />} />
            <Route path="/analytics" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
