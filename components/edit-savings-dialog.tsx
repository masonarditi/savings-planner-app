'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface EditSavingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentSavings: number
  onSave: (newSavings: number) => void
}

export function EditSavingsDialog({ open, onOpenChange, currentSavings, onSave }: EditSavingsDialogProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newSavings = Number(formData.get('savings'))
    if (newSavings >= 0) {
      onSave(newSavings)
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
                  Edit Total Savings
                </Dialog.Title>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="savings" className="text-sm font-medium">
                      Total Savings Amount ($)
                    </label>
                    <Input
                      id="savings"
                      name="savings"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={currentSavings}
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
                      Save Changes
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
    </Dialog.Root>
  )
} 