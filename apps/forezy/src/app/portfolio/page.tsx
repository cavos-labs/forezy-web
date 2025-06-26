import PortfolioList from '@/components/PortfolioList'

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">My Bets / Portfolio</h1>
      <PortfolioList />
    </div>
  )
}
