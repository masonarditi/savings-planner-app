'use client'

import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface PlaidConnectButtonProps {
  onClick: () => void
}

export function PlaidConnectButton({ onClick }: PlaidConnectButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 border-2 hover:bg-gray-50"
    >
      <Image
        src="/plaid-logo.png"
        alt="Plaid Logo"
        width={20}
        height={20}
        className="dark:invert"
      />
      <span>Connect Bank Account (coming soon)</span>
    </Button>
  )
} 