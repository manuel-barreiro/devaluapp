import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ThemeToggler from '@/components/ThemeToggler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevaluApp',
  description: 'Calculá cuanto se devalúa tu sueldo en Argentina',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col justify-center items-center">
              {children}
            </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
