'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wallet, TrendingUp, User, Settings, ArrowDownCircle } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()

  const navigation = [
    { name: 'Markets', href: '/', icon: TrendingUp },
    { name: 'Portfolio', href: '/portfolio', icon: User },
    { name: 'Wallet', href: '/wallet', icon: ArrowDownCircle },
    { name: 'Admin', href: '/admin', icon: Settings },
  ]

  return (
    <header className="bg-background shadow-sm border-b border-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <Wallet className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-text-primary">Forezy</span>
          </Link>

          {/* Centered Navigation */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-background'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary/20'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button (hidden for MVP) */}
        </div>
      </div>
    </header>
  )
} 