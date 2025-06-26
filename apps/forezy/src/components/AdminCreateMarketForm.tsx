'use client'

import { useState } from 'react'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminCreateMarketForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    outcome_a: '',
    outcome_b: '',
    resolution_time: '',
    initial_liquidity: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setShowSuccess(false)
    setShowError(false)
    setTimeout(() => {
      setIsLoading(false)
      if (
        form.title &&
        form.description &&
        form.outcome_a &&
        form.outcome_b &&
        form.resolution_time &&
        form.initial_liquidity &&
        !isNaN(Number(form.initial_liquidity)) &&
        Number(form.initial_liquidity) > 0
      ) {
        setShowSuccess(true)
        setForm({
          title: '',
          description: '',
          outcome_a: '',
          outcome_b: '',
          resolution_time: '',
          initial_liquidity: '',
        })
      } else {
        setShowError(true)
      }
    }, 1200)
  }

  return (
    <div className="bg-background border border-secondary rounded-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-text-secondary mb-1">Market Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Will Bitcoin reach $100k by end of 2024?"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1">Description</label>
          <textarea
            name="description"
            className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the event and any relevant details."
            rows={3}
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs text-text-secondary mb-1">Outcome A (e.g. Yes)</label>
            <input
              type="text"
              name="outcome_a"
              className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.outcome_a}
              onChange={handleChange}
              placeholder="Yes"
              disabled={isLoading}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-text-secondary mb-1">Outcome B (e.g. No)</label>
            <input
              type="text"
              name="outcome_b"
              className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.outcome_b}
              onChange={handleChange}
              placeholder="No"
              disabled={isLoading}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1">Resolution Date/Time</label>
          <input
            type="datetime-local"
            name="resolution_time"
            className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.resolution_time}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1">Initial Liquidity (USDC)</label>
          <input
            type="number"
            min="1"
            step="any"
            name="initial_liquidity"
            className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.initial_liquidity}
            onChange={handleChange}
            placeholder="1000"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary text-background font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Market'}
        </button>
        {showSuccess && (
          <div className="flex items-center gap-2 text-green-500 text-sm mt-2">
            <CheckCircle className="h-4 w-4" /> Market created successfully!
          </div>
        )}
        {showError && (
          <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
            <AlertCircle className="h-4 w-4" /> Please fill all fields with valid values.
          </div>
        )}
      </form>
    </div>
  )
} 