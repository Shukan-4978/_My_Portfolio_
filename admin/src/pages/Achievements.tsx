import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '@/services/api'
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react'
import type { Achievement as IAchievement } from '@/types'

const EMPTY_ACHIEVEMENT: Omit<IAchievement, '_id' | 'createdAt'> = {
  title: '',
  description: '',
  type: 'Badge',
  date: '',
  icon: '',
  url: '',
  rank: ''
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<IAchievement[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editAch, setEditAch] = useState<IAchievement | null>(null)
  const [form, setForm] = useState(EMPTY_ACHIEVEMENT)
  const [saving, setSaving] = useState(false)

  const fetchAchievements = async () => {
    try {
      const res = await api.get('/achievements')
      setAchievements(res.data.data.items || [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAchievements() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this achievement?')) return
    await api.delete(`/achievements/${id}`)
    fetchAchievements()
  }

  const openCreate = () => {
    setEditAch(null)
    setForm(EMPTY_ACHIEVEMENT)
    setModalOpen(true)
  }

  const openEdit = (ach: IAchievement) => {
    setEditAch(ach)
    setForm({
      title: ach.title,
      description: ach.description,
      type: ach.type,
      date: ach.date ? new Date(ach.date).toISOString().split('T')[0] : '',
      icon: ach.icon || '',
      url: ach.url || '',
      rank: ach.rank || ''
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editAch) {
        await api.put(`/achievements/${editAch._id}`, form)
      } else {
        await api.post('/achievements', form)
      }
      fetchAchievements()
      setModalOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
          <p className="text-sm text-muted-foreground">Manage your awards and recognition</p>
        </div>
        <button onClick={openCreate} className="admin-btn">
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center text-primary">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : achievements.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No achievements found. Add your first one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {achievements.map((ach) => (
                  <motion.tr
                    layout
                    key={ach._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{ach.title}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {ach.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(ach.date || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(ach)}
                          className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(ach._id)}
                          className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="admin-card w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-background/80 backdrop-blur-md px-6 py-4 border-b border-border flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold text-foreground">
                  {editAch ? 'Edit Achievement' : 'Add Achievement'}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                  <input
                    required
                    className="admin-input"
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="admin-input resize-none"
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                    <input
                      required
                      className="admin-input"
                      value={form.type}
                      onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as any }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                    <input
                      type="date"
                      required
                      className="admin-input"
                      value={form.date as string}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">URL (Optional)</label>
                    <input
                      type="url"
                      className="admin-input"
                      value={form.url}
                      onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Rank (Optional)</label>
                    <input
                      className="admin-input"
                      value={form.rank}
                      onChange={(e) => setForm((p) => ({ ...p, rank: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-6">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="admin-btn">
                    {saving ? <Loader2 className="animate-spin" size={16} /> : 'Save Achievement'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
