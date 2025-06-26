'use client'

import { useState } from 'react'
import { TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react'

const MOCK_HOLDINGS = [
  {
    market: {
      id: '1',
      title: 'Will Bitcoin reach $100k by end of 2024?',
      outcome_a: 'Yes',
      outcome_b: 'No',
      resolution_time: '2024-12-31T23:59:59Z',
    },
    outcome: 'a',
    shares: 100,
    current_price: 1.23,
    status: 'active',
  },
  {
    market: {
      id: '2',
      title: 'Will Ethereum 2.0 launch before June 2024?',
      outcome_a: 'Yes',
      outcome_b: 'No',
      resolution_time: '2024-06-30T23:59:59Z',
    },
    outcome: 'b',
    shares: 50,
    current_price: 0.87,
    status: 'resolved',
    resolved_winner: 'b',
    paid_out: true,
  },
  {
    market: {
      id: '3',
      title: 'Will the US approve a Bitcoin ETF in 2024?',
      outcome_a: 'Yes',
      outcome_b: 'No',
      resolution_time: '2024-12-31T23:59:59Z',
    },
    outcome: 'a',
    shares: 25,
    current_price: 1.05,
    status: 'resolved',
    resolved_winner: 'b',
    paid_out: false,
  },
]

const MOCK_BALANCE = 1234.56

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function PortfolioList() {
  const [holdings] = useState(MOCK_HOLDINGS)
  const [balance] = useState(MOCK_BALANCE)

  return (
    <div>
      <div className="mb-6 text-lg font-semibold text-text-primary">
        On-platform Balance: <span className="text-primary">{balance} USDC</span>
      </div>
      <div className="space-y-4">
        {holdings.map((h, i) => (
          <div key={i} className="bg-background border border-secondary rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="font-semibold text-text-primary mb-1">{h.market.title}</div>
              <div className="text-xs text-text-secondary mb-2">
                Resolves: {formatDate(h.market.resolution_time)}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-text-secondary">Shares:</span>
                <span className="font-semibold text-primary">{h.shares}</span>
                <span className="text-text-secondary">on</span>
                <span className={h.outcome === 'a' ? 'text-primary' : 'text-secondary'}>
                  {h.outcome === 'a' ? h.market.outcome_a : h.market.outcome_b}
                </span>
                <span className="text-text-secondary">@ ${h.current_price.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 min-w-[120px]">
              {h.status === 'active' && (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-background">
                  Active
                </div>
              )}
              {h.status === 'resolved' && h.resolved_winner === h.outcome && (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-background gap-1">
                  <CheckCircle className="h-4 w-4" /> Won
                </div>
              )}
              {h.status === 'resolved' && h.resolved_winner !== h.outcome && (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-text-secondary gap-1">
                  <XCircle className="h-4 w-4" /> Lost
                </div>
              )}
              {h.status === 'resolved' && h.resolved_winner === h.outcome && h.paid_out && (
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Paid Out
                </div>
              )}
              {h.status === 'resolved' && h.resolved_winner === h.outcome && !h.paid_out && (
                <div className="text-xs text-yellow-400 flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Pending Payout
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 