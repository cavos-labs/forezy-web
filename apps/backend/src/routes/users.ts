import express from 'express';

interface User {
  id: string;
  email: string;
  wallet_address?: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

interface UserShare {
  id: string;
  user_id: string;
  market_id: string;
  outcome: 'a' | 'b';
  shares: number;
  created_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const router = express.Router();

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    wallet_address: '0x1234567890123456789012345678901234567890',
    balance: 1000,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const mockUserShares: UserShare[] = [
  {
    id: '1',
    user_id: '1',
    market_id: '1',
    outcome: 'a',
    shares: 100,
    created_at: '2024-01-01T00:00:00Z'
  }
];

// GET /api/users/:address/balance
router.get('/:address/balance', (req, res) => {
  try {
    const { address } = req.params;
    const user = mockUsers.find(u => u.wallet_address === address);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const response: ApiResponse<{ balance: number }> = {
      success: true,
      data: { balance: user.balance }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user balance'
    });
  }
});

// GET /api/users/:address/shares
router.get('/:address/shares', (req, res) => {
  try {
    const { address } = req.params;
    const user = mockUsers.find(u => u.wallet_address === address);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const userShares = mockUserShares.filter(share => share.user_id === user.id);
    
    const response: ApiResponse<UserShare[]> = {
      success: true,
      data: userShares
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user shares'
    });
  }
});

export default router; 