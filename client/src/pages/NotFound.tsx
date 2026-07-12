import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-[120px] md:text-[180px] font-black leading-none gradient-text select-none mb-4"
        >
          404
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like this page doesn't exist. Maybe you followed a broken link, or the page was moved.
        </p>

        {/* Decorative code snippet */}
        <div className="glass-card p-4 mb-8 max-w-sm mx-auto text-left font-mono text-sm">
          <span className="text-muted-foreground">const </span>
          <span className="text-blue-400">page</span>
          <span className="text-muted-foreground"> = </span>
          <span className="text-emerald-400">router</span>
          <span className="text-foreground">.find(</span>
          <span className="text-amber-400">'/this-url'</span>
          <span className="text-foreground">)</span>
          <br />
          <span className="text-red-400">// → undefined</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => history.back()} className="btn-outline">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
