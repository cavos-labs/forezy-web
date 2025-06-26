import { Suspense } from 'react'
import Header from '@/components/Header'
import MarketList from '@/components/MarketList'
import WalletConnect from '@/components/WalletConnect'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Active Prediction Markets
              </h1>
              <Suspense fallback={<div>Loading markets...</div>}>
                <MarketList />
              </Suspense>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Connect Wallet
              </h2>
              <WalletConnect />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 