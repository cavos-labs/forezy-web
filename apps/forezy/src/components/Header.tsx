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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-text-primary">Forezy</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
} 