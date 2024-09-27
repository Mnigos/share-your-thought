'use client'

import { LoaderCircle } from 'lucide-react'
import { Button } from '@repo/ui/components/button'
import { Textarea } from '@repo/ui/components/textarea'
import { useState } from 'react'

import { createThought } from '../../actions/thoughts'

export function CreateThoughtForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    const content = formData.get('content')?.toString()

    if (!content) return

    setIsLoading(true)

    await createThought(content)

    setIsLoading(false)
  }

  return (
    <form className="flex flex-col gap-2" action={handleSubmit}>
      <Textarea placeholder="Write your thought..." name="content" />

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="gap-1">
          {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
