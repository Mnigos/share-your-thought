import '@repo/ui/tailwind.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  )
}
