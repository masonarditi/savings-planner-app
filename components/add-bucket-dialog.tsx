'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

interface AddBucketDialogProps {
  onAddBucket: (name: string, goal: number) => void
}

export function AddBucketDialog({ onAddBucket }: AddBucketDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState<number>(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && goal > 0) {
      onAddBucket(name, goal)
      setOpen(false)
      setName('')
      setGoal(0)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Bucket
        </Button>
      </Dialog.Trigger>
      
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              <div className="fixed inset-0 overflow-y-auto z-50">
                <div className="min-h-full flex items-center justify-center p-4">
                  <motion.div
                    className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 focus:outline-none"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                  >
                    <Dialog.Title className="text-xl font-semibold mb-4">
                      Create New Savings Bucket
                    </Dialog.Title>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Bucket Name
                        </label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Travel Fund"
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="goal" className="text-sm font-medium">
                          Savings Goal ($)
                        </label>
                        <Input
                          id="goal"
                          type="number"
                          min="0"
                          step="0.01"
                          value={goal}
                          onChange={(e) => setGoal(Number(e.target.value))}
                          placeholder="0.00"
                          className="w-full"
                        />
                      </div>
                      
                      <div className="flex gap-2 justify-end pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-blue-500 hover:bg-blue-600"
                          disabled={!name.trim() || goal <= 0}
                        >
                          Create Bucket
                        </Button>
                      </div>
                    </form>
                    
                    <Dialog.Close asChild>
                      <button
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Dialog.Close>
                  </motion.div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}