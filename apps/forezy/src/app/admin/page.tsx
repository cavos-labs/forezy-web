import AdminCreateMarketForm from '@/components/AdminCreateMarketForm'

export default function AdminPage() {
  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Admin: Create Market</h1>
      <AdminCreateMarketForm />
    </div>
  )
}
