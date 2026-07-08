import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background blobs */}
      <div className="fixed top-20 left-20 w-96 h-96 rounded-full filter blur-3xl opacity-10 animate-blob"
           style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
      <div className="fixed bottom-20 right-20 w-80 h-80 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000"
           style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black shadow-lg"
               style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            SP
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Shukan Prajapati's Portfolio CMS</p>
        </div>

        {/* Form */}
        <div className="admin-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shukanp0509@gmail.com"
                  className="admin-input pl-9"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="admin-input pl-9 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center py-2 px-4 bg-red-500/10 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="admin-btn w-full justify-center py-3">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-3 bg-secondary/50 rounded-xl">
            <p className="text-xs text-muted-foreground text-center">
              🔐 Secured with JWT Authentication + Rate Limiting
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          © 2024 Shukan Prajapati — Portfolio Admin v1.0
        </p>
      </motion.div>
    </div>
  )
}
