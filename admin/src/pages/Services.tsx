import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '@/services/api'
import { Plus, Pencil, Trash2, Loader2, X, PlusCircle } from 'lucide-react'
import type { Service as IService } from '@/types'

export default function Services() {
  const [services, setServices] = useState<IService[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: [] as string[],
    order: 0,
  })
  
  const [featureInput, setFeatureInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchServices = async () => {
    try {
      const res = await api.get('/services')
      setServices(res.data.data.items || res.data.data || [])
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const openModal = (service?: IService) => {
    if (service) {
      setEditingId(service._id)
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: service.features || [],
        order: service.order,
      })
    } else {
      setEditingId(null)
      setFormData({
        title: '',
        description: '',
        icon: '',
        features: [],
        order: 0,
      })
    }
    setFeatureInput('')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] })
      setFeatureInput('')
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddFeature()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, formData)
        alert('Service updated successfully')
      } else {
        await api.post('/services', formData)
        alert('Service created successfully')
      }
      fetchServices()
      closeModal()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/services/${id}`)
        alert('Service deleted successfully')
        fetchServices()
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete service')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground mt-1">Manage your service offerings.</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="p-4 font-medium">Order</th>
                <th className="p-4 font-medium">Icon</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No services found. Add one to get started.
                  </td>
                </tr>
              ) : (
                services.sort((a, b) => a.order - b.order).map((service) => (
                  <tr key={service._id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">{service.order}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-500">
                        {service.icon}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-foreground">{service.title}</td>
                    <td className="p-4 text-muted-foreground max-w-xs truncate">{service.description}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(service)}
                          className="p-2 text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/10 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl admin-card max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold">{editingId ? 'Edit Service' : 'Add Service'}</h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. Full Stack Web Development"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Icon Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. FaCode"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="admin-input min-h-[100px] py-3"
                    placeholder="Brief description of the service..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Features (Press Enter to add)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={handleFeatureKeyDown}
                      className="admin-input"
                      placeholder="e.g. REST API Development"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-colors"
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-lg text-sm"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="hover:text-indigo-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.features.length === 0 && (
                      <p className="text-sm text-muted-foreground py-1">No features added yet.</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Save Service'}
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
