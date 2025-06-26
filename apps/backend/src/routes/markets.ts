import express from 'express';

// Local types for now - will be replaced with shared package
interface Market {
  id: string;
  title: string;
  description: string;
  outcome_a: string;
  outcome_b: string;
  resolution_time: string;
  resolved_outcome?: number;
  creator: string;
  total_liquidity: number;
  total_shares_a: number;
  total_shares_b: number;
  status: 'active' | 'resolved' | 'pending_payout';
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const router = express.Router();

// Mock data for development
const mockMarkets: Market[] = [
  {
    id: '1',
    title: 'Will Bitcoin reach $100k by end of 2024?',
    description: 'Bitcoin price prediction for the end of 2024',
    outcome_a: 'Yes',
    outcome_b: 'No',
    resolution_time: '2024-12-31T23:59:59Z',
    creator: '0x1234567890123456789012345678901234567890',
    total_liquidity: 10000,
    total_shares_a: 5000,
    total_shares_b: 5000,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Will Ethereum 2.0 launch before June 2024?',
    description: 'Ethereum 2.0 mainnet launch prediction',
    outcome_a: 'Yes',
    outcome_b: 'No',
    resolution_time: '2024-06-30T23:59:59Z',
    creator: '0x1234567890123456789012345678901234567890',
    total_liquidity: 15000,
    total_shares_a: 8000,
    total_shares_b: 7000,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Will the US approve a Bitcoin ETF in 2024?',
    description: 'SEC approval of Bitcoin ETF prediction',
    outcome_a: 'Yes',
    outcome_b: 'No',
    resolution_time: '2024-12-31T23:59:59Z',
    creator: '0x1234567890123456789012345678901234567890',
    total_liquidity: 20000,
    total_shares_a: 12000,
    total_shares_b: 8000,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// GET /api/markets - List all markets
router.get('/', (req, res) => {
  try {
    const { status } = req.query;
    
    let filteredMarkets = mockMarkets;
    
    if (status) {
      filteredMarkets = mockMarkets.filter(market => market.status === status);
    }
    
    const response: ApiResponse<Market[]> = {
      success: true,
      data: filteredMarkets
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch markets'
    });
  }
});

// GET /api/markets/:id - Get specific market
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const market = mockMarkets.find(m => m.id === id);
    
    if (!market) {
      return res.status(404).json({
        success: false,
        error: 'Market not found'
      });
    }
    
    const response: ApiResponse<Market> = {
      success: true,
      data: market
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market'
    });
  }
});

export default router; 