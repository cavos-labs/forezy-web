export interface User {
  id: string;
  email: string;
  wallet_address?: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface Market {
  id: string;
  title: string;
  description: string;
  outcome_a: string; // "Yes"
  outcome_b: string; // "No"
  resolution_time: string;
  resolved_outcome?: number; // 0 = unresolved, 1 = outcome_a, 2 = outcome_b
  creator: string;
  total_liquidity: number;
  total_shares_a: number;
  total_shares_b: number;
  status: 'active' | 'resolved' | 'pending_payout';
  created_at: string;
  updated_at: string;
}

export interface UserShare {
  id: string;
  user_id: string;
  market_id: string;
  outcome: 'a' | 'b';
  shares: number;
  created_at: string;
}

export interface MarketPrice {
  market_id: string;
  outcome_a_price: number;
  outcome_b_price: number;
  total_liquidity: number;
}

export interface CreateMarketRequest {
  title: string;
  description: string;
  outcome_a: string;
  outcome_b: string;
  resolution_time: string;
  initial_liquidity: number;
}

export interface BuySharesRequest {
  market_id: string;
  outcome: 'a' | 'b';
  amount: number;
}

export interface ResolveMarketRequest {
  market_id: string;
  winning_outcome: 'a' | 'b';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface WalletInfo {
  address: string;
  balance: number;
  network: string;
}

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  block_number?: number;
  gas_used?: number;
} 