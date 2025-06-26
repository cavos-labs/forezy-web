import WithdrawForm from '@/components/WithdrawForm'

export default function WalletPage() {
  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Withdraw Funds</h1>
      <WithdrawForm />
    </div>
  )
}
