import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'

import { ConnectForm } from '~/components/connect'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="flex w-full flex-col gap-8 p-4 md:w-[512px]">
        <CardHeader>
          <CardTitle className="text-center text-3xl">
            Let&apos;s get started
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ConnectForm />
        </CardContent>
      </Card>
    </main>
  )
}
