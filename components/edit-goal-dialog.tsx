'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface EditGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentGoal: number
  onSave: (newGoal: number) => void
}

export function EditGoalDialog({ open, onOpenChange, currentGoal, onSave }: EditGoalDialogProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newGoal = Number(formData.get('goal'))
    if (newGoal > 0) {
      onSave(newGoal)
      onOpenChange(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
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
                  Edit Savings Goal
                </Dialog.Title>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="goal" className="text-sm font-medium">
                      New Goal Amount ($)
                    </label>
                    <Input
                      id="goal"
                      name="goal"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={currentGoal}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                      Save Goal
                    </Button>
                  </div>
                </form>
                
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 w-4" />
                  </button>
                </Dialog.Close>
              </motion.div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 