import { EditThoughtDialog } from '~/components/thoughts'
import { getThoughtById } from '~/server/actions/thoughts'
import type { EditThoughtPageProps } from '~/app/types/props'

export default async function EditThoughtPage({
  params,
}: EditThoughtPageProps) {
  const thought = await getThoughtById(params.id)

  return <EditThoughtDialog thought={thought} />
}
