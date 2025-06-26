'use client'

import { useState } from 'react'
import { Copy, LogIn, LogOut, Wallet, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const MOCK_USER = {
  email: 'user@example.com',
  wallet: '0x28fF5B1234567890abcdef1234567890abcdef12',
  balance: 1234.56,
}

export default function WalletConnect() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [depositAmount, setDepositAmount] = useState('')

  function handleLogin() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsLoading(false)
    }, 1000)
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setDepositAmount('')
    setShowSuccess(false)
    setShowError(false)
  }

  function handleDeposit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setShowSuccess(false)
    setShowError(false)
    setTimeout(() => {
      setIsLoading(false)
      if (depositAmount && !isNaN(Number(depositAmount)) && Number(depositAmount) > 0) {
        setShowSuccess(true)
        setDepositAmount('')
      } else {
        setShowError(true)
      }
    }, 1200)
  }

  return (
    <div>
      {!isLoggedIn ? (
        <button
          className="w-full flex items-center justify-center gap-2 bg-primary text-background font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <LogIn className="h-5 w-5" />}
          Login / Register with Email
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="font-mono text-sm text-text-secondary">{MOCK_USER.wallet}</span>
            <button
              className="ml-1 p-1 rounded hover:bg-background/20"
              onClick={() => navigator.clipboard.writeText(MOCK_USER.wallet)}
              title="Copy address"
            >
              <Copy className="h-4 w-4 text-text-secondary" />
            </button>
          </div>
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">Balance:</span> {MOCK_USER.balance} USDC
          </div>
          <form onSubmit={handleDeposit} className="space-y-2">
            <label className="block text-xs text-text-secondary mb-1">Deposit Amount (USDC)</label>
            <input
              type="number"
              min="1"
              step="any"
              className="w-full px-3 py-2 rounded border border-secondary bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
              placeholder="Enter amount"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-background font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors mt-2"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Wallet className="h-5 w-5" />}
              Deposit
            </button>
          </form>
          {showSuccess && (
            <div className="flex items-center gap-2 text-green-500 text-sm mt-2">
              <CheckCircle className="h-4 w-4" /> Deposit successful!
            </div>
          )}
          {showError && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
              <AlertCircle className="h-4 w-4" /> Invalid amount. Please enter a valid number.
            </div>
          )}
          <button
            className="w-full flex items-center justify-center gap-2 bg-background border border-secondary text-secondary font-semibold py-2 px-4 rounded-lg hover:bg-secondary hover:text-background transition-colors mt-4"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      )}
    </div>
  )
} 