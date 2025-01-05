'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, MoreVertical, Home, Linkedin, Github } from 'lucide-react'
import { Bucket } from '@/components/Bucket'
import { AddBucketDialog } from '@/components/add-bucket-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { EditSavingsDialog } from '@/components/edit-savings-dialog'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { XLogo } from '@/components/x-logo'

interface BucketType {
  id: number
  name: string
  amount: number
  goal: number
  emoji: string
}

const emojis = ['✈️', '🍔', '🏃‍♂️', '🏠', '🚗', '📚', '🎮', '🎸', '🐶', '👕']

export default function SavingsDistribution() {
  const router = useRouter()
  const [totalSavings, setTotalSavings] = useState(1000)
  const [isEditingSavings, setIsEditingSavings] = useState(false)
  const [buckets, setBuckets] = useState<BucketType[]>([
    { id: 1, name: 'Travel', amount: 0, goal: 500, emoji: '✈️' },
    { id: 2, name: 'Food', amount: 0, goal: 300, emoji: '🍔' },
    { id: 3, name: 'Marathons', amount: 0, goal: 200, emoji: '🏃‍♂️' },
  ])

  const addBucket = (name: string, goal: number) => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
    setBuckets([
      ...buckets,
      { 
        id: Date.now(), 
        name: name.trim(), 
        amount: 0, 
        goal: goal, 
        emoji: randomEmoji 
      }
    ])
  }

  const removeBucket = (id: number) => {
    setBuckets(buckets.filter(bucket => bucket.id !== id))
  }

  const allocateFunds = (id: number, amount: number) => {
    const updatedBuckets = buckets.map(bucket => 
      bucket.id === id ? { ...bucket, amount: Number(amount) } : bucket
    )
    setBuckets(updatedBuckets)
  }

  const updateGoal = (id: number, goal: number) => {
    const updatedBuckets = buckets.map(bucket => 
      bucket.id === id ? { ...bucket, goal: Number(goal) } : bucket
    )
    setBuckets(updatedBuckets)
  }

  const remainingFunds = totalSavings - buckets.reduce((sum, bucket) => sum + bucket.amount, 0)

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show" 
      className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-12">
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent pb-1">
            Savings Planner
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl animate-bounce translate-y-[2px]">🐷</span>
            <span className="text-sm text-gray-500 font-medium">
              Your Financial Goals Tracker
            </span>
          </div>
        </div>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                <span className="text-2xl mr-2">💰</span> Total Savings
              </h2>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="bg-white rounded-lg shadow-lg p-2 z-50">
                    <DropdownMenu.Item 
                      className="text-sm px-2 py-1.5 outline-none cursor-pointer hover:bg-gray-100 rounded-md flex items-center"
                      onClick={() => setIsEditingSavings(true)}
                    >
                      Edit Total Savings
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">${totalSavings.toFixed(2)}</span>
              <p className="text-sm font-medium text-gray-600">
                Remaining: <span className="font-semibold text-green-600">${remainingFunds.toFixed(2)}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-8">
        <AddBucketDialog onAddBucket={addBucket} />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {buckets.map(bucket => (
            <motion.div
              key={bucket.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <Bucket
                id={bucket.id}
                name={bucket.name}
                amount={bucket.amount}
                goal={bucket.goal}
                emoji={bucket.emoji}
                onAmountChange={allocateFunds}
                onGoalChange={updateGoal}
                onRemove={removeBucket}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <EditSavingsDialog
        open={isEditingSavings}
        onOpenChange={setIsEditingSavings}
        currentSavings={totalSavings}
        onSave={setTotalSavings}
      />

      <motion.div 
        variants={itemVariants}
        className="text-gray-600 mt-12 text-center"
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
  )
}

