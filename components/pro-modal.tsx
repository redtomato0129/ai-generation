'use client'

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Check, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingSpinner } from '@/components/loading-spinner'

import { useProModal } from '@/hooks/use-pro-modal'
import { cn } from '@/lib/utils'
import { TOOLS } from '@/constants'

export const ProModal = () => {
  const proModal = useProModal()
  const [isLoading, setIsLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error: unknown) {
      setIsLoading(false)
      toast.error('Something went wrong.')
      console.error('[STRIPE_CLIENT_ERROR]: ', error)
    } finally {
      setTimeout(() => setIsLoading(false), 1500)
    }
  }

  return (
    <Dialog open={isLoading || proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Jarvis
              <Badge className="uppercase text-sm py-1" variant="premium">
                pro
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {TOOLS.map(tool => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                    <tool.icon className={cn('w-6 h-6', tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>

                <Check className="text-green-500 w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full gap-x-4"
            onClick={onSubscribe}
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            Upgrade
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Zap className="w-4 h-4 fill-white" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
