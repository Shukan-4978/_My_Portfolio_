import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '@/services/api'
import { Plus, Pencil, Trash2, Loader2, X, PlusCircle } from 'lucide-react'
import type { Experience as IExperience } from '@/types'

const EMPTY_EXPERIENCE: Omit<IExperience, '_id' | 'createdAt'> = {
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  current: false,
  description: [],
  type: 'Full-time',
  location: '',
  skills: []
}

export default function Experience() {
  const [experiences, setExperiences] = useState<IExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editExp, setEditExp] = useState<IExperience | null>(null)
  const [form, setForm] = useState(EMPTY_EXPERIENCE)
  const [saving, setSaving] = useState(false)
  const [descInput, setDescInput] = useState('')
  const [skillInput, setSkillInput] = useState('')

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experience')
      setExperiences(res.data.data.items || [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchExperiences() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return
    await api.delete(`/experience/${id}`)
    fetchExperiences()
  }

  const openCreate = () => {
    setEditExp(null)
    setForm(EMPTY_EXPERIENCE)
    setModalOpen(true)
  }

  const openEdit = (exp: IExperience) => {
    setEditExp(exp)
    setForm({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
      current: exp.current,
      description: exp.description || [],
      type: exp.type,
      location: exp.location || '',
      skills: exp.skills || []
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const submitData = { ...form }
      if (!submitData.endDate) delete submitData.endDate
      if (editExp) {
        await api.put(`/experience/${editExp._id}`, submitData)
      } else {
        await api.post('/experience', submitData)
      }
      fetchExperiences()
      setModalOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const addDesc = () => {
    if (descInput.trim()) {
      setForm(p => ({ ...p, description: [...p.description, descInput.trim()] }))
      setDescInput('')
    }
  }

  const addSkill = () => {
    if (skillInput.trim()) {
      setForm(p => ({ ...p, skills: [...(p.skills || []), skillInput.trim()] }))
      setSkillInput('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Experience</h1>
          <p className="text-sm text-muted-foreground">Manage your work history</p>
        </div>
        <button onClick={openCreate} className="admin-btn">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center text-primary">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : experiences.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No experiences found. Add your first one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Duration</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {experiences.map((exp) => (
                  <motion.tr
                    layout
                    key={exp._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{exp.company}</td>
                    <td className="px-4 py-3">{exp.role}</td>
                    <td className="px-4 py-3">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                      {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                    </td>
                    <td className="px-4 py-3">{exp.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(exp)}
                          className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(exp._id)}
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
              className="admin-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-background/80 backdrop-blur-md px-6 py-4 border-b border-border flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold text-foreground">
                  {editExp ? 'Edit Experience' : 'Add Experience'}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Company</label>
                    <input
                      required
                      className="admin-input"
                      value={form.company}
                      onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                    <input
                      required
                      className="admin-input"
                      value={form.role}
                      onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      className="admin-input"
                      value={form.startDate as string}
                      onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1 flex items-center justify-between">
                      End Date
                      <label className="flex items-center gap-1.5 font-normal cursor-pointer text-xs">
                        <input 
                          type="checkbox" 
                          checked={form.current} 
                          onChange={(e) => {
                            setForm(p => ({ ...p, current: e.target.checked, endDate: e.target.checked ? '' : p.endDate }))
                          }} 
                        />
                        Current
                      </label>
                    </label>
                    <input
                      type="date"
                      className="admin-input disabled:opacity-50"
                      disabled={form.current}
                      required={!form.current}
                      value={form.endDate as string}
                      onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                    <input
                      required
                      className="admin-input"
                      value={form.type}
                      onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as IExperience['type'] }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                    <input
                      required
                      className="admin-input"
                      value={form.location}
                      onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Description Bullets</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      className="admin-input flex-1"
                      placeholder="Add a bullet point..."
                      value={descInput}
                      onChange={(e) => setDescInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') { e.preventDefault(); addDesc() }
                      }}
                    />
                    <button type="button" onClick={addDesc} className="admin-btn">
                      <PlusCircle size={16} /> Add
                    </button>
                  </div>
                  <ul className="space-y-1.5">
                    {form.description.map((desc, i) => (
                      <li key={i} className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-md text-sm">
                        <span className="flex-1">{desc}</span>
                        <button
                          type="button"
                          onClick={() => setForm(p => ({ ...p, description: p.description.filter((_, idx) => idx !== i) }))}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Skills</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      className="admin-input flex-1"
                      placeholder="e.g. React"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') { e.preventDefault(); addSkill() }
                      }}
                    />
                    <button type="button" onClick={addSkill} className="admin-btn">
                      <PlusCircle size={16} /> Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(form.skills || []).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1.5">
                        {skill}
                        <button
                          type="button"
                          onClick={() => setForm(p => ({ ...p, skills: p.skills?.filter((_, idx) => idx !== i) }))}
                          className="hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
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
                    {saving ? <Loader2 className="animate-spin" size={16} /> : 'Save Experience'}
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
