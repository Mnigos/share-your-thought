'use client'

import { Button } from '@repo/ui/components/button'
import { Textarea } from '@repo/ui/components/textarea'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { redirect } from 'next/navigation'

import type { Thought } from '../../types/thoughts'
import { editThought } from '../../actions/thoughts'

namespace EditThoughtForm {
  export type Props = Readonly<{
    thought: Thought
  }>
}

function EditThoughtForm({ thought }: EditThoughtForm.Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [contentValue, setContentValue] = useState(thought.content)

  async function handleSubmit(formData: FormData) {
    const content = formData.get('content')?.toString()

    if (!content) return

    setIsLoading(true)

    await editThought(content, thought.id)

    setIsLoading(false)

    redirect('/thoughts')
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2">
      <Textarea
        placeholder="Write your thought..."
        name="content"
        value={contentValue}
        onChange={({ target }) => {
          setContentValue(target.value)
        }}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="gap-1">
          {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}

export { EditThoughtForm }
