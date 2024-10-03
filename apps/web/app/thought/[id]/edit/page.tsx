import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@repo/ui/components/card'

import type { EditThoughtPageProps } from '~/app/types/props'
import { ThoughtForm } from '~/components/thoughts'
import { getThoughtById } from '~/server/actions/thoughts'

export default async function EditThoughtPage({
  params,
}: EditThoughtPageProps) {
  const thought = await getThoughtById(params.id)

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="flex w-full flex-col gap-8 p-4 md:w-[512px]">
        <CardHeader>
          <CardTitle className="text-center">Edit thought</CardTitle>
        </CardHeader>

        <CardContent>
          <ThoughtForm thought={thought} />
        </CardContent>
      </Card>
    </main>
  )
}
