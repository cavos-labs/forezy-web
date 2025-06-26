import express from 'express';

interface CreateMarketRequest {
  title: string;
  description: string;
  outcome_a: string;
  outcome_b: string;
  resolution_time: string;
  initial_liquidity: number;
}

interface ResolveMarketRequest {
  market_id: string;
  winning_outcome: 'a' | 'b';
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const router = express.Router();

// POST /api/admin/markets
router.post('/markets', (req, res) => {
  try {
    const marketData: CreateMarketRequest = req.body;
    
    // Mock market creation
    const newMarket = {
      id: Date.now().toString(),
      ...marketData,
      creator: '0x1234567890123456789012345678901234567890',
      total_shares_a: marketData.initial_liquidity / 2,
      total_shares_b: marketData.initial_liquidity / 2,
      status: 'active' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const response: ApiResponse<any> = {
      success: true,
      data: newMarket,
      message: 'Market created successfully'
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create market'
    });
  }
});

// POST /api/admin/markets/:id/resolve
router.post('/markets/:id/resolve', (req, res) => {
  try {
    const { id } = req.params;
    const { winning_outcome }: ResolveMarketRequest = req.body;
    
    // Mock market resolution
    const response: ApiResponse<any> = {
      success: true,
      data: {
        market_id: id,
        winning_outcome,
        resolved_at: new Date().toISOString()
      },
      message: 'Market resolved successfully'
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to resolve market'
    });
  }
});

export default router; 