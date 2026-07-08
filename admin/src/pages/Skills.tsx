import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '@/services/api'
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react'

interface Skill {
  _id: string
  name: string
  icon: string
  category: string
  level: number
  yearsExp: number
  order: number
}

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other']

const EMPTY_SKILL = {
  name: '',
  icon: '',
  category: 'Frontend',
  level: 80,
  yearsExp: 1,
  order: 0,
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editSkill, setEditSkill] = useState<Skill | null>(null)
  const [form, setForm] = useState(EMPTY_SKILL)
  const [saving, setSaving] = useState(false)

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills')
      setSkills(res.data.data.items || [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSkills() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return
    await api.delete(`/skills/${id}`)
    fetchSkills()
  }

  const openCreate = () => {
    setEditSkill(null)
    setForm(EMPTY_SKILL)
    setModalOpen(true)
  }

  const openEdit = (s: Skill) => {
    setEditSkill(s)
    setForm({
      name: s.name, icon: s.icon, category: s.category,
      level: s.level, yearsExp: s.yearsExp, order: s.order
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editSkill) {
        await api.put(`/skills/${editSkill._id}`, form)
      } else {
        await api.post('/skills', form)
      }
      fetchSkills()
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
          <h1 className="text-2xl font-bold text-foreground">Skills</h1>
          <p className="text-sm text-muted-foreground">Manage your technical skills</p>
        </div>
        <button onClick={openCreate} className="admin-btn">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="animate-spin text-indigo-500 mx-auto" size={32} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Skill</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Proficiency</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((s, i) => (
                  <motion.tr
                    key={s._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.yearsExp} years exp</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge badge-info">{s.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden w-32">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.level}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{s.level}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(s)} className="admin-btn-ghost p-1.5"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(s._id)} className="admin-btn-danger p-1.5"><Trash2 size={14} /></button>
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
              className="admin-card w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-foreground">{editSkill ? 'Edit Skill' : 'Add Skill'}</h2>
                <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input className="admin-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Level (%)</label>
                    <input type="number" className="admin-input" min={0} max={100} value={form.level} onChange={e => setForm({...form, level: Number(e.target.value)})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Years Exp</label>
                    <input type="number" step="0.5" className="admin-input" value={form.yearsExp} onChange={e => setForm({...form, yearsExp: Number(e.target.value)})} required />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setModalOpen(false)} className="admin-btn-ghost flex-1 justify-center">Cancel</button>
                  <button type="submit" disabled={saving} className="admin-btn flex-1 justify-center">
                    {saving ? <Loader2 size={15} className="animate-spin" /> : 'Save'}
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
