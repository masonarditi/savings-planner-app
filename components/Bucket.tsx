'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, Plus, Minus, Trash2 } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EditGoalDialog } from './edit-goal-dialog'
import { Input } from "@/components/ui/input"

interface BucketProps {
  id: number
  name: string
  amount: number
  goal: number
  emoji: string
  onAmountChange: (id: number, amount: number) => void
  onGoalChange: (id: number, goal: number) => void
  onRemove: (id: number) => void
}

const presetAmounts = [10, 25, 50, 100]

export function Bucket({ id, name, amount, goal, emoji, onAmountChange, onGoalChange, onRemove }: BucketProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const [isEditingGoal, setIsEditingGoal] = useState(false)
  const [showNegativePopup, setShowNegativePopup] = useState(false)
  const progress = goal > 0 ? (amount / goal) * 100 : 0

  const handleAddAmount = (value: number) => {
    onAmountChange(id, amount + value)
  }

  const handleRemoveAmount = (value: number) => {
    if (amount - value < 0) {
      setShowNegativePopup(true)
      setTimeout(() => setShowNegativePopup(false), 3000) // Auto-hide after 3 seconds
      return
    }
    onAmountChange(id, amount - value)
  }

  const handleCustomAmountSubmit = (isAdd: boolean) => {
    const value = Number(customAmount)
    if (value > 0) {
      if (!isAdd && amount - value < 0) {
        setShowNegativePopup(true)
        setTimeout(() => setShowNegativePopup(false), 3000) // Auto-hide after 3 seconds
        return
      }
      isAdd ? handleAddAmount(value) : handleRemoveAmount(value)
      setCustomAmount('')
    }
  }

  return (
    <Card 
      className="mb-4 transition-all duration-300 ease-in-out hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="text-2xl mr-2">{emoji}</span>
            {name}
          </h3>
          <div className="flex items-center gap-2">
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
                    onClick={() => setIsEditingGoal(true)}
                  >
                    Edit Goal
                  </DropdownMenu.Item>
                  <DropdownMenu.Item 
                    className="text-sm px-2 py-1.5 outline-none cursor-pointer hover:bg-red-100 text-red-600 rounded-md flex items-center"
                    onClick={() => onRemove(id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Bucket
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
        <Progress value={progress} className="w-full h-2 mb-3" />
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span className="font-medium">💰 ${amount.toFixed(2)}</span>
          <span className="font-medium">Goal: ${goal.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-2">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    onClick={() => handleAddAmount(preset)}
                    className="w-full justify-start"
                  >
                    ${preset}
                  </Button>
                ))}
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={() => handleCustomAmountSubmit(true)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-1/2 bg-red-500 hover:bg-red-600 text-white">
                <Minus className="h-4 w-4 mr-2" /> Remove
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-2">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    onClick={() => handleRemoveAmount(preset)}
                    className="w-full justify-start"
                  >
                    ${preset}
                  </Button>
                ))}
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={() => handleCustomAmountSubmit(false)} size="icon">
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Popover open={showNegativePopup}>
          <PopoverTrigger asChild>
            <div />
          </PopoverTrigger>
          <PopoverContent className="bg-red-100 text-red-600 p-2 rounded-md">
            Can't be negative, dummy!
          </PopoverContent>
        </Popover>
      </CardContent>

      <EditGoalDialog
        open={isEditingGoal}
        onOpenChange={setIsEditingGoal}
        currentGoal={goal}
        onSave={(newGoal) => onGoalChange(id, newGoal)}
      />
    </Card>
  )
}