import MarketDetail from '@/components/MarketDetail'

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  // For now, just pass the id to the component and use mock data inside
  return <MarketDetail marketId={params.id} />
}
