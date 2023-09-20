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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col justify-center items-center">
              <Card className="w-10/12 md:w-6/12 h-auto border-t-4 rounded-t-sm border-t-green-600">
                <div className="flex justify-end px-2 py-1">
                    <ThemeToggler />
                </div>
                <CardHeader>
                  <CardTitle className="font-extrabold text-4xl mb-2">DevaluApp</CardTitle>
                  <CardDescription className="text-xl">¿Qué tan devaluado estás?</CardDescription>
                </CardHeader>

                  {children}

              </Card >
            </main>
          </ThemeProvider>
      </body>
    </html>
  )
}
