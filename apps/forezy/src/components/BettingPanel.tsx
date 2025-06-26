'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

interface Market {
  id: string
  title: string
  description: string
  outcome_a: string
  outcome_b: string
  resolution_time: string
  total_liquidity: number
  total_shares_a: number
  total_shares_b: number
  status: 'active' | 'resolved' | 'pending_payout'
  created_at: string
}

const MOCK_USER_BALANCE = 1234.56

export default function BettingPanel({ market }: { market: Market }) {
  const [amount, setAmount] = useState('')
  const [outcome, setOutcome] = useState<'a' | 'b'>('a')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [shares, setShares] = useState(0)

  function calculateShares(amount: string): number {
    // Mock: 1 USDC = 1 share for simplicity
    const amt = Number(amount)
    if (isNaN(amt) || amt <= 0) return 0
    return amt
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
    setShares(calculateShares(e.target.value))
  }

  function handleBuy(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setShowSuccess(false)
    setShowError(false)
    setTimeout(() => {
      setIsLoading(false)
      if (amount && !isNaN(Number(amount)) && Number(amount) > 0 && Number(amount) <= MOCK_USER_BALANCE) {
        setShowSuccess(true)
        setAmount('')
        setShares(0)
      } else {
        setShowError(true)
      }
    }, 1200)
  }

  return (
    <div className="bg-background border border-secondary rounded-lg p-6">
      <div className="mb-4 text-sm text-text-secondary">
        <span className="font-semibold text-text-primary">Your Balance:</span> {MOCK_USER_BALANCE} USDC
      </div>
      <form onSubmit={handleBuy} className="space-y-4">
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg font-semibold border transition-colors ${
              outcome === 'a'
                ? 'bg-primary text-background border-primary'
                : 'bg-background text-text-secondary border-secondary hover:bg-secondary hover:text-background'
            }`}
            onClick={() => setOutcome('a')}
            disabled={isLoading}
          >
            {market.outcome_a}
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg font-semibold border transition-colors ${
              outcome === 'b'
                ? 'bg-secondary text-background border-secondary'
                : 'bg-background text-text-secondary border-secondary hover:bg-primary hover:text-background'
            }`}
            onClick={() => setOutcome('b')}
            disabled={isLoading}
          >
            {market.outcome_b}
          </button>
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1">Amount to Spend (USDC)</label>
          <input
            type="number"
            min="1"
            step="any"
            className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            disabled={isLoading}
          />
        </div>
        <div className="text-xs text-text-secondary mb-2">
          You will receive <span className="font-semibold text-primary">{shares}</span> shares of <span className="font-semibold">{outcome === 'a' ? market.outcome_a : market.outcome_b}</span>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary text-background font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
          disabled={isLoading}
        >
          <ArrowRight className="h-5 w-5" /> Buy {outcome === 'a' ? market.outcome_a : market.outcome_b}
        </button>
        {showSuccess && (
          <div className="flex items-center gap-2 text-green-500 text-sm mt-2">
            <CheckCircle className="h-4 w-4" /> Bet placed successfully!
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