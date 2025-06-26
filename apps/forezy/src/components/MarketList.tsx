'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, TrendingUp, Users } from 'lucide-react'

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

export default function MarketList() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const response = await fetch('http://localhost:3001/api/markets')
        const data = await response.json()
        
        if (data.success) {
          setMarkets(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch markets:', error)
        // Fallback to mock data
        setMarkets([
          {
            id: '1',
            title: 'Will Bitcoin reach $100k by end of 2024?',
            description: 'Bitcoin price prediction for the end of 2024',
            outcome_a: 'Yes',
            outcome_b: 'No',
            resolution_time: '2024-12-31T23:59:59Z',
            total_liquidity: 10000,
            total_shares_a: 5000,
            total_shares_b: 5000,
            status: 'active',
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: '2',
            title: 'Will Ethereum 2.0 launch before June 2024?',
            description: 'Ethereum 2.0 mainnet launch prediction',
            outcome_a: 'Yes',
            outcome_b: 'No',
            resolution_time: '2024-06-30T23:59:59Z',
            total_liquidity: 15000,
            total_shares_a: 8000,
            total_shares_b: 7000,
            status: 'active',
            created_at: '2024-01-01T00:00:00Z'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMarkets()
  }, [])

  function calculatePrice(shares: number, totalLiquidity: number): number {
    if (shares === 0) return 0.5
    return (shares / totalLiquidity) * 100
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {markets.map((market) => {
        const priceA = calculatePrice(market.total_shares_a, market.total_liquidity)
        const priceB = calculatePrice(market.total_shares_b, market.total_liquidity)
        
        return (
          <Link
            key={market.id}
            href={`/markets/${market.id}`}
            className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {market.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {market.description}
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Resolves {formatDate(market.resolution_time)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>${market.total_liquidity.toLocaleString()} liquidity</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Current Prices</div>
                  <div className="flex space-x-4">
                    <div>
                      <div className="text-xs text-gray-500">{market.outcome_a}</div>
                      <div className="font-semibold text-green-600">${priceA.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{market.outcome_b}</div>
                      <div className="font-semibold text-red-600">${priceB.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Active
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
} 