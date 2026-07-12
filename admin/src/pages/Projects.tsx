import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '@/services/api'
import type { Project } from '@/types'
import { Plus, Pencil, Trash2, Loader2, Star, Github, ExternalLink, X, Upload } from 'lucide-react'

const EMPTY_PROJECT: Omit<Project, '_id' | 'createdAt'> = {
  title: '',
  description: '',
  longDescription: '',
  techStack: [],
  images: [],
  github: '',
  live: '',
  category: [],
  featured: false,
  order: 0,
  features: [],
  challenges: [],
}

interface ProjectModalProps {
  project?: Project | null
  onClose: () => void
  onSave: () => void
}

function ProjectModal({ project, onClose, onSave }: ProjectModalProps) {
  const [form, setForm] = useState<Omit<Project, '_id' | 'createdAt'>>(
    project ? { ...project } : EMPTY_PROJECT
  )
  const [loading, setLoading] = useState(false)
  const [techInput, setTechInput] = useState('')
  const [featInput, setFeatInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (project?._id) {
        await api.put(`/projects/${project._id}`, form)
      } else {
        await api.post('/projects', form)
      }
      onSave()
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addTech = () => {
    if (techInput.trim()) {
      setForm((p) => ({ ...p, techStack: [...p.techStack, techInput.trim()] }))
      setTechInput('')
    }
  }

  const addFeature = () => {
    if (featInput.trim()) {
      setForm((p) => ({ ...p, features: [...(p.features || []), featInput.trim()] }))
      setFeatInput('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="admin-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-bold text-lg text-foreground">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Project title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Short Description *</label>
            <textarea
              className="admin-input resize-none"
              rows={2}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Brief description"
              required
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Long Description</label>
            <textarea
              className="admin-input resize-none"
              rows={3}
              value={form.longDescription || ''}
              onChange={(e) => setForm((p) => ({ ...p, longDescription: e.target.value }))}
              placeholder="Detailed description"
            />
          </div>

          {/* GitHub + Live */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                <Github size={13} /> GitHub URL
              </label>
              <input
                className="admin-input"
                value={form.github || ''}
                onChange={(e) => setForm((p) => ({ ...p, github: e.target.value }))}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                <ExternalLink size={13} /> Live URL
              </label>
              <input
                className="admin-input"
                value={form.live || ''}
                onChange={(e) => setForm((p) => ({ ...p, live: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                className="admin-input flex-1"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Type a technology and press Enter"
              />
              <button type="button" onClick={addTech} className="admin-btn px-3">+</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.techStack.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-blue-500/15 text-blue-400 border border-blue-500/20">
                  {t}
                  <button type="button" onClick={() => setForm((p) => ({ ...p, techStack: p.techStack.filter((_, j) => j !== i) }))}>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                className="admin-input flex-1"
                value={featInput}
                onChange={(e) => setFeatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Add a feature"
              />
              <button type="button" onClick={addFeature} className="admin-btn px-3">+</button>
            </div>
            <div className="space-y-1">
              {(form.features || []).map((f, i) => (
                <div key={i} className="flex items-center justify-between text-sm text-foreground bg-secondary px-3 py-1.5 rounded-lg">
                  <span>{f}</span>
                  <button type="button" onClick={() => setForm((p) => ({ ...p, features: (p.features || []).filter((_, j) => j !== i) }))}>
                    <X size={12} className="text-muted-foreground hover:text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Category + Featured */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="featured" className="text-sm text-foreground flex items-center gap-1">
                <Star size={13} className="text-yellow-400" /> Featured
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Order</label>
              <input
                type="number"
                className="admin-input w-20"
                value={form.order}
                onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
              <Upload size={13} /> Preview Image URL
            </label>
            <input
              className="admin-input"
              value={((form.images[0] as any)?.url || form.images[0]) || ''}
              onChange={(e) => setForm((p) => ({ ...p, images: [e.target.value] }))}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="admin-btn-ghost flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="admin-btn flex-1 justify-center">
              {loading ? <Loader2 size={15} className="animate-spin" /> : project ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects')
      setProjects(res.data.data.items || [])
    } catch {
      // use empty array
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`)
    fetchProjects()
  }

  const openCreate = () => { setEditProject(null); setModalOpen(true) }
  const openEdit = (p: Project) => { setEditProject(p); setModalOpen(true) }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground">{projects.length} projects</p>
        </div>
        <button onClick={openCreate} className="admin-btn">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="animate-spin text-blue-500 mx-auto" size={32} />
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No projects yet. Add your first!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Preview', 'Title', 'Category', 'Featured', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      {p.images[0] && (
                        <img src={(p.images[0] as any).url || p.images[0]} alt={p.title} className="w-16 h-10 object-cover rounded-lg" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{p.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">{p.description}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.category.map((c) => (
                          <span key={c} className="badge badge-info text-xs">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {p.featured ? (
                        <span className="badge badge-success">✓ Featured</span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="admin-btn-ghost p-1.5 hover:text-blue-400"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="admin-btn-danger p-1.5"
                          title="Delete"
                        >
                          <Trash2 size={14} />
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

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ProjectModal
            project={editProject}
            onClose={() => setModalOpen(false)}
            onSave={fetchProjects}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
