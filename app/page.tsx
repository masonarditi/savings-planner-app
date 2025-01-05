'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Linkedin, Github } from 'lucide-react'
import { XLogo } from '@/components/x-logo'
import { PlaidConnectButton } from '@/components/plaid-connect-button'

export default function LandingPage() {
  const [savings, setSavings] = useState<string>('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Number(savings) > 0) {
      router.push(`/dashboard?savings=${savings}`)
    }
  }

  const handlePlaidConnect = () => {
    router.push('/connect-bank')
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">
            Welcome to Savings Planner 🐷
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-lg text-gray-600 mb-8">
            Let's help you distribute your savings into meaningful goals.
            Start by entering your total savings amount or connect your bank.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="max-w-sm mx-auto mb-16">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  placeholder="Enter your total savings"
                  className="pl-8 transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!savings || Number(savings) <= 0}
                >
                  Start Planning
                </Button>
              </motion.div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-4">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <PlaidConnectButton onClick={handlePlaidConnect} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="text-gray-600"
        >
          <p className="mb-4">Built with ❤️ by Mason Arditi</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="https://x.com/mason_arditi" 
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <XLogo className="w-5 h-5" />
            </Link>
            <Link 
              href="https://linkedin.com/in/mason-arditi" 
              target="_blank"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link 
              href="https://github.com/masonarditi" 
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

