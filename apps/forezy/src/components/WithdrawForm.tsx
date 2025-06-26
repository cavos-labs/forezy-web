'use client'

import { useState } from 'react'
import { ArrowDownCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const MOCK_WITHDRAWABLE = 789.12

export default function WithdrawForm() {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  function handleWithdraw(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setShowSuccess(false)
    setShowError(false)
    setTimeout(() => {
      setIsLoading(false)
      if (amount && !isNaN(Number(amount)) && Number(amount) > 0 && Number(amount) <= MOCK_WITHDRAWABLE) {
        setShowSuccess(true)
        setAmount('')
      } else {
        setShowError(true)
      }
    }, 1200)
  }

  return (
    <div className="bg-background border border-secondary rounded-lg p-8">
      <div className="mb-4 text-sm text-text-secondary">
        <span className="font-semibold text-text-primary">Withdrawable Balance:</span> {MOCK_WITHDRAWABLE} USDC
      </div>
      <form onSubmit={handleWithdraw} className="space-y-4">
        <div>
          <label className="block text-xs text-text-secondary mb-1">Amount to Withdraw (USDC)</label>
          <input
            type="number"
            min="1"
            step="any"
            className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary text-background font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <ArrowDownCircle className="h-5 w-5" />}
          Withdraw
        </button>
        {showSuccess && (
          <div className="flex items-center gap-2 text-green-500 text-sm mt-2">
            <CheckCircle className="h-4 w-4" /> Withdrawal successful!
          </div>
        )}
        {showError && (
          <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
            <AlertCircle className="h-4 w-4" /> Invalid amount or insufficient balance.
          </div>
        )}
      </form>
    </div>
  )
} 