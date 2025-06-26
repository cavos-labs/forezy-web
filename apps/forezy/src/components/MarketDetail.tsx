import BettingPanel from './BettingPanel'
import { Clock, TrendingUp } from 'lucide-react'

const MOCK_MARKETS = [
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
    created_at: '2024-01-01T00:00:00Z',
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
    created_at: '2024-01-01T00:00:00Z',
  },
]

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function MarketDetail({ marketId }: { marketId: string }) {
  const market = MOCK_MARKETS.find((m) => m.id === marketId) || MOCK_MARKETS[0]
  const priceA = (market.total_shares_a / market.total_liquidity) * 100
  const priceB = (market.total_shares_b / market.total_liquidity) * 100

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-background rounded-lg shadow-lg p-8 border border-secondary">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          {market.title}
        </h1>
        <p className="text-text-secondary mb-4">{market.description}</p>
        <div className="flex flex-wrap gap-6 mb-6 text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Resolves {formatDate(market.resolution_time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>${market.total_liquidity.toLocaleString()} liquidity</span>
          </div>
        </div>
        <div className="flex gap-8 mb-8">
          <div className="flex flex-col items-center">
            <span className="text-xs text-text-secondary">{market.outcome_a}</span>
            <span className="text-lg font-bold text-primary">${priceA.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-text-secondary">{market.outcome_b}</span>
            <span className="text-lg font-bold text-secondary">${priceB.toFixed(2)}</span>
          </div>
        </div>
        <BettingPanel market={market} />
      </div>
    </div>
  )
} 